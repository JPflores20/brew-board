import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Función de utilidad para concatenar dinámicamente clases de Tailwind CSS.
// Utiliza clsx para construir clases condicionales y twMerge para resolver
// conflictos entre clases de Tailwind (por ejemplo, sobrescribir px-2 con p-4).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
