/**
 * @fileoverview Módulo para capturar errores globales en memoria.
 * Útil para recuperar la pila de llamadas (stack) real de un error antes de que sea procesado
 * o absorbido por frameworks subyacentes, permitiendo un reporte o registro más detallado.
 */

// Captura el Error original de forma externa (out-of-band) para que server.ts pueda
// recuperar la pila de llamadas (stack) cuando h3 ya ha absorbido el error lanzando
// una respuesta genérica 500.

let lastCapturedError: { error: unknown; at: number } | undefined;
// Tiempo de vida máximo del error capturado en milisegundos
const TTL_MS = 5_000;

/**
 * Registra un error junto con la marca de tiempo actual para una posible recuperación posterior.
 * @param {unknown} error - El error que ha sido lanzado y capturado.
 */
function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// Verificamos si estamos en un entorno donde addEventListener esté disponible (como el navegador)
if (typeof globalThis.addEventListener === "function") {
  // Capturamos errores globales no manejados
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  
  // Capturamos promesas rechazadas no manejadas
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

/**
 * Función para consumir el último error capturado. 
 * Una vez consumido, el error es eliminado de la memoria. Si el tiempo de vida (TTL) ha expirado,
 * el error se descarta automáticamente sin retornarlo.
 * @returns {unknown} El error original capturado, o undefined si no hay ninguno reciente.
 */
export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  
  // Si ha pasado más tiempo que el TTL, ignoramos y limpiamos el error
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  
  const { error } = lastCapturedError;
  // Limpiamos el error después de consumirlo
  lastCapturedError = undefined;
  
  return error;
}
