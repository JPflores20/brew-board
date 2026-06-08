import {
  Database,
  Cog,
  BarChart3,
  Server,
  ClipboardList,
  Box,
  BookOpen,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

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
    name: "Brew Insights",
    description: "Herramienta de visualización y análisis de tendencias.",
    tagline: "MAZ allá del cielo.",
    stack: ["React", "TypeScript", "Firebase"],
    url: "https://brew-insights.web.app/login",
    icon: Database,
  },
  {
    name: "Brewing Operator Control",
    description: "Herramienta para el control operativo y gestión cervecera.",
    stack: ["React", "TypeScript", "Tailwind"],
    url: "https://breawing-operator-control.web.app/",
    icon: Cog,
  },
  {
    name: "Dashboard de autonomía",
    description: "Dashboard de autonomía cervecera",
    stack: ["Bun", "React", "TypeScript", "Tailwind"],
    url: "https://preview-bbe71.web.app/",
    icon: BarChart3,
  },
  {
    name: "SAP",
    description: "Plataforma de gestión y recursos empresariales.",
    stack: ["Enterprise", "Portal"],
    url: "https://azuevp04.modelo.gmodelo.com.mx/irj/portal?NavigationTarget=navurl://334834ed11204abf6f9fb249edec621b&NavMode=10&sap-ie=EDGE",
    icon: Server,
  },
  {
    name: "Interaction Log",
    description: "Registro y control de interacciones logísticas.",
    stack: ["Logistics", "Portal"],
    url: "https://supplyportal.ab-inbev.com/login/sso_login.asp",
    icon: ClipboardList,
  },
  {
    name: "SupplyPortal",
    description: "Portal centralizado de cadena de suministro y abastecimiento.",
    stack: ["Supply Chain", "Portal"],
    url: "https://supplyportal.ab-inbev.com/login/sso_login.asp",
    icon: Box,
  },
  {
    name: "ACADIA",
    description: "Plataforma de documentación, procedimientos y entrenamiento.",
    stack: ["Training", "Platform"],
    url: "https://ab-inbev.acadia.sysalli.com/browse/",
    icon: BookOpen,
  },
  {
    name: "GUARDIAN",
    description: "Sistema de seguridad y monitoreo Guardian.",
    stack: ["Security", "Portal"],
    url: "https://guardian.ab-inbev.com/home",
    icon: ShieldCheck,
  },
];
