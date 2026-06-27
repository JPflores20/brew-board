/**
 * @fileoverview Configuración e inicialización del enrutador de la aplicación.
 * Utiliza @tanstack/react-router junto a React Query para manejar la navegación y 
 * el estado del lado del cliente.
 */
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Función de configuración que crea y devuelve una nueva instancia del enrutador.
 * Configura también el QueryClient global, la persistencia de posición en el scroll 
 * y los tiempos de vida de la memoria caché.
 * @returns {import('@tanstack/react-router').Router} La instancia configurada del enrutador.
 */
export const getRouter = () => {
  // Inicializamos un nuevo cliente de React Query para la caché de estado del servidor
  const queryClient = new QueryClient();

  // Creamos el enrutador con las rutas autogeneradas y su contexto
  const router = createRouter({
    routeTree,
    // Pasamos el cliente de consultas al contexto global de las rutas para uso interno
    context: { queryClient },
    // Activamos la restauración de la posición del scroll al navegar hacia atrás/adelante
    scrollRestoration: true,
    // Evita precargar rutas obsoletas por defecto
    defaultPreloadStaleTime: 0,
  });

  return router;
};
