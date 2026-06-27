/**
 * @fileoverview Configuración de la ruta raíz (Root Route) del enrutador.
 * Define la estructura principal y el contexto compartido de toda la aplicación,
 * integrando proveedores globales como React Query, y manejadores de error y 'No Encontrado'.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { NotFoundComponent } from "../components/not_found_component";
import { ErrorComponent } from "../components/error_component";

import "../styles.css";

/**
 * @const Route
 * @description Ruta base que envuelve a todas las demás rutas de la aplicación.
 * Configura el contexto de estado (QueryClient) y especifica los componentes 
 * por defecto para manejo de errores (404 y generales).
 */
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  // Asignamos los componentes personalizados para manejar errores y páginas no encontradas a nivel global
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Componente contenedor principal (Root) de la aplicación.
 * Provee el contexto de React Query a los hijos y renderiza las rutas anidadas mediante `<Outlet />`.
 * @returns {JSX.Element} Componente proveedor y el puerto (Outlet) de renderizado de las rutas.
 */
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
