/**
 * @fileoverview Ruta principal (Dashboard) de la aplicación.
 * Muestra el hub central con columnas de proyectos, permitiendo navegar hacia
 * diferentes aplicaciones de la empresa.
 */
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/dashboard/Header";
import { DashboardColumns } from "@/components/dashboard/DashboardColumns";
import { Footer } from "@/components/dashboard/Footer";

/**
 * @const Route
 * @description Define y exporta la configuración de la ruta principal (raíz "/").
 * Incluye metadatos para SEO y asocia el componente principal que se renderizará.
 */
export const Route = createFileRoute("/")({
  // Configuración de las etiquetas meta para SEO y previsualización de enlaces
  head: () => ({
    meta: [
      { title: "Panel de Proyectos | Hub central de aplicaciones" },
      {
        name: "description",
        content:
          "Hub central para acceder a tus aplicaciones web: visualización industrial, control operativo y métricas de proceso.",
      },
      { property: "og:title", content: "Panel de Proyectos" },
      {
        property: "og:description",
        content: "Hub central de aplicaciones web.",
      },
    ],
  }),
  // Componente que se renderizará para esta ruta
  component: DashboardIndex,
});

/**
 * Componente principal de la vista del Dashboard (Panel de proyectos).
 * Mantiene el estado de edición e integra el encabezado, el contenido principal en columnas y el pie de página.
 * @returns {JSX.Element} El elemento JSX que representa el panel central.
 */
function DashboardIndex() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#030910] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#061421] via-[#030910] to-black text-zinc-100 font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      {/* Encabezado con Logo y Menú */}
      <Header editMode={editMode} onEditModeChange={setEditMode} />
      
      {/* Contenedor principal de las 3 columnas */}
      <DashboardColumns editMode={editMode} />
      
      <Footer />
    </div>
  );
}
