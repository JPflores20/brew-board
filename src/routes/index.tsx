import { createFileRoute } from "@tanstack/react-router";
import { WelcomeModal } from "@/components/welcome_modal";
import { BackgroundEffects } from "@/components/dashboard/BackgroundEffects";
import { Header } from "@/components/dashboard/Header";
import { ProjectGrid } from "@/components/dashboard/ProjectGrid";

// Definimos y exportamos la ruta principal (raíz "/") usando el enrutador
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

// Componente principal de la vista del Dashboard (Panel)
function DashboardIndex() {
  return (
    <div className="relative min-h-screen text-zinc-100">
      {/* Capa de efectos visuales de fondo */}
      <BackgroundEffects />

      {/* Contenedor principal para el contenido centrado y espaciado */}
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Encabezado con reloj, saludo y buscador */}
        <Header />
        {/* Cuadrícula interactiva con las tarjetas de proyectos */}
        <ProjectGrid />
      </div>
      
      {/* Modal de bienvenida que solo se muestra a usuarios nuevos */}
      <WelcomeModal />
    </div>
  );
}
