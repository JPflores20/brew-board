import { Moon, Sun } from "lucide-react";
import { SearchPalette } from "@/components/search_palette";
import { ClockWidget } from "./ClockWidget";
import { useThemeManager } from "@/hooks/useThemeManager";
import { useClock } from "@/hooks/useClock";
import { useEffect, useState } from "react";

// Componente principal de encabezado que contiene controles de tema, búsqueda, reloj interactivo y saludo
export function Header() {
  // Obtenemos estado y función para cambiar el tema claro/oscuro
  const { isDark, toggleTheme } = useThemeManager();
  // Obtenemos la función para renderizar el saludo basado en la hora del día
  const { getGreeting } = useClock();
  // Estado para gestionar la hidratación segura entre servidor (SSR) y cliente
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Confirmamos el montaje en el entorno del navegador
    setIsMounted(true);
  }, []);

  // Función para mostrar el saludo solo cuando estemos en el cliente y evitar problemas de hidratación
  const renderGreeting = () => {
    if (!isMounted) {
      return "Cargando...";
    }
    return getGreeting();
  };

  return (
    <header className="relative mb-16 flex flex-col items-center justify-center text-center">
      <div
        className="absolute right-0 top-0 flex items-center gap-3 animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        {/* Componente de paleta de comandos para búsqueda de utilidades y proyectos */}
        <SearchPalette />
        {/* Botón interactivo para alternar visualmente entre el modo oscuro y claro */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Alternar tema"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-8 flex flex-col items-center">
        {/* Contenedor group para sincronizar efectos interactivos del logo y el resplandor aurora */}
        <div
          className="group relative mb-8 cursor-pointer animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          {/* Efecto Aurora (brilla y se expande fluidamente al hacer hover) */}
          <div className="absolute -inset-6 animate-pulse rounded-full bg-linear-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-40 blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 group-hover:blur-3xl" />

          {/* Imagen de logo central con escala y rotación simulando 3D al interactuar */}
          <img
            src="/logos/BREWMAN.jpeg"
            alt="BREWMAN Logo"
            className="relative h-40 w-40 rounded-[2rem] object-cover shadow-2xl ring-2 ring-white/10 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 group-hover:-rotate-3 group-hover:shadow-[0_20px_50px_rgba(8,-112,184,0.4)] group-hover:ring-white/30"
          />
        </div>

        {/* Instancia del widget de reloj en tiempo real */}
        <ClockWidget />

        {/* Título de la página con texto de saludo y efecto de degradado de color dinámico */}
        <h1
          className="bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text pb-2 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl animate-fade-up"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          {renderGreeting()}
        </h1>
        <p
          className="mt-4 text-sm text-zinc-400 sm:text-base animate-fade-up"
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        >
          Panel de herramientas
        </p>
      </div>
    </header>
  );
}
