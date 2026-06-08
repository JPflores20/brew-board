import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Panel de Proyectos | Hub central de aplicaciones" },
      {
        name: "description",
        content:
          "Hub central para acceder a tus aplicaciones web: visualización industrial, control operativo y métricas de proceso.",
      },
      { property: "og:title", content: "Panel de Proyectos" },
      {
        property: "og:description",
        content: "Hub central de aplicaciones web.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Panel de Proyectos
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Hub central de aplicaciones
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </section>
      </div>
    </div>
  );
}
