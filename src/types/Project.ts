import { type LucideIcon } from "lucide-react";

// Interfaz que define la estructura de datos para un Proyecto.
// Garantiza el tipado estricto en la lista de proyectos y componentes.
export interface Project {
  // Nombre del proyecto
  name: string;
  // Descripción detallada de la función principal del proyecto
  description: string;
  // Lema o eslogan opcional del proyecto
  tagline?: string;
  // Lista de tecnologías o entorno bajo el cual opera el proyecto
  stack: string[];
  // URL o enlace directo hacia la plataforma del proyecto
  url: string;
  // Ícono de lucide-react para representarlo gráficamente
  icon: LucideIcon;
}
