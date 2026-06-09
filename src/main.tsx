import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Obtenemos la instancia configurada del enrutador de la aplicación
const router = getRouter();

// Buscamos el elemento raíz en el documento HTML donde React se acoplará
const rootElement = document.getElementById("root")!;

// Si el contenedor está vacío (sin SSR previo), inicializamos React
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    // StrictMode ayuda a encontrar errores comunes durante el desarrollo mediante renderizados dobles
    <StrictMode>
      {/* Proveemos el sistema de rutas a toda la aplicación */}
      <RouterProvider router={router} />
    </StrictMode>
  );
}
