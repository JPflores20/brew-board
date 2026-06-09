import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { NotFoundComponent } from "../components/not_found_component";
import { ErrorComponent } from "../components/error_component";

import "../styles.css";

// Definimos la ruta raíz principal que envuelve a todas las demás rutas de la aplicación
// Recibe el contexto global de React Query para compartirlo entre componentes
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  // Asignamos los componentes personalizados para manejar errores y páginas no encontradas a nivel global
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Componente base que sirve como contenedor maestro de la aplicación
function RootComponent() {
  // Obtenemos la instancia del cliente de React Query desde el contexto de la ruta
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Outlet indica dónde se renderizarán los componentes de las rutas hijas (como index.tsx) */}
      <Outlet />
    </QueryClientProvider>
  );
}
