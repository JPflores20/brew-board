import { ExternalLink, Star } from "lucide-react";
import type { Project } from "@/types/Project";
import { useRef } from "react";

const techStyles: Record<string, string> = {
  React: "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
  TypeScript: "bg-blue-500/10 text-blue-300 border-blue-400/20",
  Firebase: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  Tailwind: "bg-sky-500/10 text-sky-300 border-sky-400/20",
  Bun: "bg-pink-500/10 text-pink-300 border-pink-400/20",
};

const defaultTech = "bg-white/5 text-zinc-300 border-white/10";

// Componente de tarjeta para visualizar de forma atractiva la información de un proyecto
export function ProjectCard({
  project,
  index = 0,
  isFavorite = false,
  onToggleFavorite,
}: {
  project: Project;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}) {
  const Icon = project.icon;
  // Referencia al elemento DOM de la tarjeta para capturar las coordenadas del cursor
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Función que captura la posición relativa del ratón dentro de la tarjeta
  // Se usa para animar un destello (spotlight) que sigue al cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Inyectamos las variables CSS en la tarjeta para uso en gradientes
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      style={{ animationDelay: `${500 + index * 100}ms` }}
      className="group animate-fade-up relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
    >
      {/* Efecto de destello dinámico (Spotlight Effect) que reacciona a la posición del ratón */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--x, 0) var(--y, 0), rgba(59,130,246,0.15), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      <div className="absolute right-4 top-4 z-20 flex items-center gap-3">
        {/* Botón para anclar o desanclar el proyecto como favorito */}
        <button
          type="button"
          onClick={(e) => {
            // Evitamos que al hacer clic en favorito se abra la URL de la tarjeta
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          className={`transition-all duration-300 hover:scale-110 ${
            isFavorite
              ? "text-yellow-400 opacity-100 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
              : "text-zinc-500 opacity-40 hover:text-yellow-400 group-hover:opacity-100"
          }`}
          title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Star className="h-[18px] w-[18px]" fill={isFavorite ? "currentColor" : "none"} />
        </button>
        {/* Icono indicador visual de enlace externo */}
        <ExternalLink
          className="h-4 w-4 text-zinc-400 opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-blue-500/20 via-indigo-500/10 to-violet-500/20 text-blue-200 shadow-inner shadow-white/5 transition-colors duration-300 group-hover:text-cyan-200">
        {/* Representación visual de la categoría/herramienta principal */}
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h2 className="relative z-10 text-lg font-semibold tracking-tight text-zinc-50">
        {project.name}
      </h2>
      <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-zinc-400">
        {project.description}
        {project.tagline ? (
          <span className="mt-1 block italic text-zinc-500">{project.tagline}</span>
        ) : null}
      </p>
    </a>
  );
}
