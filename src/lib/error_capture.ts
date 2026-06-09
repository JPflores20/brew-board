// Captura el Error original de forma externa (out-of-band) para que server.ts pueda
// recuperar la pila de llamadas (stack) cuando h3 ya ha absorbido el error lanzando
// una respuesta genérica 500.

let lastCapturedError: { error: unknown; at: number } | undefined;
// Tiempo de vida máximo del error capturado en milisegundos
const TTL_MS = 5_000;

// Función para registrar el error junto con la marca de tiempo actual
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

// Función para consumir el último error capturado y limpiarlo de la memoria
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
