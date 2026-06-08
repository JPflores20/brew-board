import { Database, Cog, BarChart3, type LucideIcon } from "lucide-react";

export type Project = {
  name: string;
  description: string;
  tagline?: string;
  stack: string[];
  url: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    name: "Plataforma de Datos Industriales",
    description: "Herramienta de visualización y análisis de datos.",
    tagline: "MAZ allá del cielo.",
    stack: ["React", "TypeScript", "Firebase"],
    url: "https://brew-insights.web.app/login",
    icon: Database,
  },
  {
    name: "Brewing Operator Control",
    description: "Herramienta para el control operativo e interfaces de planta.",
    stack: ["React", "TypeScript", "Tailwind"],
    url: "https://breawing-operator-control.web.app/",
    icon: Cog,
  },
  {
    name: "Craft Brew Insight",
    description:
      "Plataforma de seguimiento de procesos, gestión de purgas y métricas de extracto.",
    stack: ["Bun", "React", "TypeScript", "Tailwind"],
    url: "https://preview-bbe71.web.app/",
    icon: BarChart3,
  },
];