import fs from "fs";
import path from "path";

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

const fixes = [
  { wrong: "react-alert_dialog", right: "react-alert-dialog" },
  { wrong: "react-aspect_ratio", right: "react-aspect-ratio" },
  { wrong: "react-context_menu", right: "react-context-menu" },
  { wrong: "react-dropdown_menu", right: "react-dropdown-menu" },
  { wrong: "react-hover_card", right: "react-hover-card" },
  { wrong: "input_otp", right: "input-otp" },
  { wrong: "react-navigation_menu", right: "react-navigation-menu" },
  { wrong: "react-radio_group", right: "react-radio-group" },
  { wrong: "react-scroll_area", right: "react-scroll-area" },
  { wrong: "react-toggle_group", right: "react-toggle-group" },
];

for (const file of allFiles) {
  if (file.endsWith(".ts") || file.endsWith(".tsx")) {
    let content = fs.readFileSync(file, "utf-8");
    let changed = false;
    for (const fix of fixes) {
      if (content.includes(fix.wrong)) {
        content = content.replace(new RegExp(fix.wrong, "g"), fix.right);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content, "utf-8");
      console.log(`Fixed imports in: ${path.basename(file)}`);
    }
  }
}
console.log("Done");
