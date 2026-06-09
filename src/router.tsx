import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Función de configuración que crea y devuelve la instancia del enrutador
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
