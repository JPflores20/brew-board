import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/project_card";
import { projects } from "@/lib/projects_data";
import { SearchPalette } from "@/components/search_palette";

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
  component: DashboardIndex,
});

function DashboardIndex() {
  const [isDark, setIsDark] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);

    // Load favorites
    const savedFavs = localStorage.getItem("brew-board-favorites");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {}
    }

    // Start clock
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const toggleFavorite = (url: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(url);
      const newFavs = isFav ? prev.filter((f) => f !== url) : [...prev, url];
      localStorage.setItem("brew-board-favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) return "Buenos días, Equipo";
    if (hour >= 12 && hour < 19) return "Buenas tardes, Equipo";
    return "Buenas noches, Equipo";
  };

  const formattedTime = time.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sortedProjects = [...projects].sort((a, b) => {
    const aFav = favorites.includes(a.url);
    const bFav = favorites.includes(b.url);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  return (
    <div className="relative min-h-screen text-zinc-100">
      {/* Animated Gemini-style background — fixed so it doesn't scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      >
        {/* Subtle grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
          }}
        />
        {/* Floating orbs */}
        <div className="animate-orb-a absolute -top-[10vw] -left-[10vw] h-[45vw] w-[45vw] rounded-full bg-blue-600 opacity-40 blur-[120px]" />
        <div className="animate-orb-b absolute top-[10vh] -right-[12vw] h-[40vw] w-[40vw] rounded-full bg-violet-600 opacity-40 blur-[130px]" />
        <div className="animate-orb-c absolute -bottom-[10vw] left-[20vw] h-[42vw] w-[42vw] rounded-full bg-cyan-500 opacity-30 blur-[140px]" />
        <div className="animate-orb-d absolute bottom-[5vh] right-[15vw] h-[30vw] w-[30vw] rounded-full bg-fuchsia-500 opacity-25 blur-[120px]" />
        {/* Soft vignette to keep contrast on cards */}
        <div className="absolute inset-0 bg-slate-950/30" />

        {/* Background Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="relative mb-16 flex flex-col items-center justify-center text-center">
          <div
            className="absolute right-0 top-0 flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <SearchPalette />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center">
            {/* Contenedor group para sincronizar efectos del logo y la aurora */}
            <div
              className="group relative mb-8 cursor-pointer animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              {/* Efecto Aurora (brilla y se expande al hacer hover) */}
              <div className="absolute -inset-6 animate-pulse rounded-full bg-linear-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-40 blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 group-hover:blur-3xl" />

              {/* Logo más grande con escala y rotación 3D simulada */}
              <img
                src="/logos/BREWMAN.jpeg"
                alt="BREWMAN Logo"
                className="relative h-40 w-40 rounded-[2rem] object-cover shadow-2xl ring-2 ring-white/10 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 group-hover:-rotate-3 group-hover:shadow-[0_20px_50px_rgba(8,-112,184,0.4)] group-hover:ring-white/30"
              />
            </div>

            {/* Reloj Dinámico */}
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md animate-fade-up transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ animationDelay: "150ms", animationFillMode: "both" }}
            >
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span>{mounted ? formattedTime : "--:--"}</span>
            </div>

            <h1
              className="bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text pb-2 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl animate-fade-up"
              style={{ animationDelay: "200ms", animationFillMode: "both" }}
            >
              {mounted ? getGreeting() : "Cargando..."}
            </h1>
            <p
              className="mt-4 text-sm text-zinc-400 sm:text-base animate-fade-up"
              style={{ animationDelay: "300ms", animationFillMode: "both" }}
            >
              Panel de herramientas
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project, project_index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={project_index}
              isFavorite={favorites.includes(project.url)}
              onToggleFavorite={() => toggleFavorite(project.url)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
