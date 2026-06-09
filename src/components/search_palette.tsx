import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { projects } from "@/lib/projects_data";
import { Search } from "lucide-react";

// Componente para manejar la paleta de comandos (Command Palette) de búsqueda rápida
export function SearchPalette() {
  // Estado que controla si el diálogo de búsqueda está abierto o cerrado
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Manejador del evento de teclado para escuchar el atajo Ctrl+K o Cmd+K
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    // Agregamos el listener a nivel documento al montarse el componente
    document.addEventListener("keydown", down);
    // Limpiamos el listener cuando el componente se desmonta
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Función que se dispara al seleccionar un proyecto en los resultados de búsqueda
  const handleSelect = (url: string) => {
    // Cerramos la paleta de búsqueda
    setOpen(false);
    // Abrimos el proyecto en una pestaña nueva de forma segura
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Botón flotante para disparar la paleta de forma manual (sin atajo de teclado) */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-between gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-zinc-400 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10 hover:text-zinc-200"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Buscar proyecto...</span>
        </div>
        {/* Etiqueta visual que indica el atajo de teclado a utilizar */}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      {/* Diálogo que contiene la paleta de comandos interactiva basada en shadcn/ui */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* Campo de entrada donde el usuario escribe el término de búsqueda */}
        <CommandInput placeholder="Escribe el nombre de un proyecto..." />
        <CommandList>
          {/* Mensaje de respaldo cuando la búsqueda no coincide con ningún proyecto */}
          <CommandEmpty>No se encontraron proyectos.</CommandEmpty>
          <CommandGroup heading="Aplicaciones">
            {/* Iteramos y renderizamos la lista de proyectos como elementos seleccionables */}
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <CommandItem
                  key={project.name}
                  value={project.name}
                  onSelect={() => handleSelect(project.url)}
                  className="flex items-center gap-3 py-3 cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5">
                    <Icon className="h-4 w-4 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.name}</p>
                    <p className="text-xs text-zinc-400">{project.description}</p>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
