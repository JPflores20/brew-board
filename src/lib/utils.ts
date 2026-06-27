/**
 * @fileoverview Utilidades generales y funciones auxiliares compartidas.
 * Principalmente utilizado para la manipulación y combinación de clases CSS de Tailwind.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Función de utilidad para concatenar dinámicamente clases de Tailwind CSS.
 * Utiliza `clsx` para resolver clases condicionales y `twMerge` para eliminar
 * conflictos de clases de Tailwind (por ejemplo, sobrescribir `px-2` con `p-4`).
 * 
 * @param {...ClassValue[]} inputs - Lista de clases o condiciones a evaluar.
 * @returns {string} La cadena de clases de Tailwind resultante sin conflictos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
