import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects-data";

const techStyles: Record<string, string> = {
  React: "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
  TypeScript: "bg-blue-500/10 text-blue-300 border-blue-400/20",
  Firebase: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  Tailwind: "bg-sky-500/10 text-sky-300 border-sky-400/20",
  Bun: "bg-pink-500/10 text-pink-300 border-pink-400/20",
};

const defaultTech = "bg-white/5 text-zinc-300 border-white/10";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const Icon = project.icon;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${index * 90}ms` }}
      className="group animate-fade-up relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/20"
    >
      {/* Subtle gradient sheen on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <ExternalLink
        className="absolute right-4 top-4 h-4 w-4 text-zinc-400 opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-blue-500/20 via-indigo-500/10 to-violet-500/20 text-blue-200 shadow-inner shadow-white/5 transition-colors duration-300 group-hover:text-cyan-200">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h2 className="relative text-lg font-semibold tracking-tight text-zinc-50">
        {project.name}
      </h2>
      <p className="relative mt-1.5 text-sm leading-relaxed text-zinc-400">
        {project.description}
        {project.tagline ? (
          <span className="mt-1 block italic text-zinc-500">{project.tagline}</span>
        ) : null}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              techStyles[tech] ?? defaultTech
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}