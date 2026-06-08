import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects-data";

export function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
    >
      <ExternalLink
        className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {project.description}
        {project.tagline ? (
          <span className="mt-1 block italic opacity-80">{project.tagline}</span>
        ) : null}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full bg-secondary/70 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}