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
    <div className="relative min-h-screen overflow-hidden bg-[#070710] text-zinc-100">
      {/* Ambient background: radial gradient + colored orbs + grid mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(168,85,247,0.15), transparent 60%), radial-gradient(700px 400px at 0% 80%, rgba(245,158,11,0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-14 flex items-start justify-between gap-4">
          <div>
            <h1 className="bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Panel de Proyectos
            </h1>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Hub central de aplicaciones
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.url} project={project} index={i} />
          ))}
        </section>
      </div>
    </div>
  );
}
