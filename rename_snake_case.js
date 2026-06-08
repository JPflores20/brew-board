import fs from "fs";
import path from "path";

function toSnakeCase(str) {
  // Replace kebab-case with snake_case
  return str.replace(/-/g, "_");
}

const srcDir = path.join(process.cwd(), "src");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const allFiles = [];
walkDir(srcDir, (f) => allFiles.push(f));

// First pass: rename files
const renames = [];
for (const file of allFiles) {
  const dir = path.dirname(file);
  const ext = path.extname(file);
  const base = path.basename(file, ext);

  if (base.includes("-")) {
    const newBase = toSnakeCase(base);
    const newFile = path.join(dir, newBase + ext);
    renames.push({ old: file, new: newFile, oldBase: base, newBase: newBase });
  }
}

// Perform renames
for (const { old, new: newFile } of renames) {
  fs.renameSync(old, newFile);
  console.log(`Renamed: ${path.basename(old)} -> ${path.basename(newFile)}`);
}

// Re-read files after rename
const newFiles = [];
walkDir(srcDir, (f) => newFiles.push(f));

// Second pass: update imports in all files
for (const file of newFiles) {
  if (
    file.endsWith(".ts") ||
    file.endsWith(".tsx") ||
    file.endsWith(".js") ||
    file.endsWith(".jsx")
  ) {
    let content = fs.readFileSync(file, "utf-8");
    let changed = false;

    // We only want to replace imports like:
    // import { X } from "@/components/project-card";
    // import { X } from "../components/ui/alert-dialog";
    // We can just look for the old base names in the content if they are part of a string path

    for (const { oldBase, newBase } of renames) {
      // Regex to match imports/exports that contain the oldBase name
      // e.g. from ".../project-card" or import ".../project-card"
      const regex = new RegExp(`(['"\`])(.*?)${oldBase}(['"\`])`, "g");
      if (regex.test(content)) {
        content = content.replace(regex, `$1$2${newBase}$3`);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content, "utf-8");
      console.log(`Updated imports in: ${path.basename(file)}`);
    }
  }
}

console.log("Done");
