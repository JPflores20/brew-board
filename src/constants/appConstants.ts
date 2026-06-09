// Objeto que contiene las constantes globales de la aplicación
export const APP_CONSTANTS = {
  // Clave utilizada para guardar los favoritos en el almacenamiento local (localStorage)
  LOCAL_STORAGE_FAVORITES_KEY: "brew-board-favorites",
  // Clave para registrar si el usuario ya vio el mensaje de bienvenida en el almacenamiento local
  LOCAL_STORAGE_WELCOMED_KEY: "brew-board-welcomed",
  // Configuración regional por defecto para formatos de fecha y hora
  LOCALE: "es-MX",
  // Imagen en formato SVG codificada en base64 para generar un efecto de ruido de fondo
  BACKGROUND_NOISE_SVG:
    "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E",
};
