import { createFileRoute } from "@tanstack/react-router";
import { WelcomeModal } from "@/components/welcome_modal";
import { Header } from "@/components/dashboard/Header";
import { DashboardColumns } from "@/components/dashboard/DashboardColumns";
import { Footer } from "@/components/dashboard/Footer";

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
    <div className="flex flex-col min-h-screen bg-[#030910] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#061421] via-[#030910] to-black text-zinc-100 font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      {/* Encabezado con Logo y Menú */}
      <Header />
      
      {/* Contenedor principal de las 3 columnas */}
      <DashboardColumns />
      
      {/* Pie de página con acciones secundarias */}
      <Footer />
      
      {/* Modal de bienvenida que solo se muestra a usuarios nuevos */}
      <WelcomeModal />
    </div>
  );
}
