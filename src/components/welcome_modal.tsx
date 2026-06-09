import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Star, Moon, Rocket } from "lucide-react";
import { APP_CONSTANTS } from "@/constants/appConstants";

// Componente Modal que se muestra a los usuarios nuevos para introducirles las herramientas de la plataforma
export function WelcomeModal() {
  // Estado local para manejar la apertura o cierre del modal
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Consultamos en el almacenamiento local si el usuario ya interactuó con este tutorial previamente
    const hasSeenTutorial = localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_WELCOMED_KEY);
    
    // Si no lo ha visto, programamos la apertura
    if (!hasSeenTutorial) {
      // Usamos un pequeño retraso (1 segundo) para que la animación de entrada inicial termine primero
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Función ejecutada cuando el usuario decide cerrar el modal o avanzar
  const handleClose = () => {
    setIsOpen(false);
    // Guardamos una bandera (flag) en el almacenamiento para no volver a mostrar el modal
    localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE_WELCOMED_KEY, "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-slate-950/95 backdrop-blur-xl text-zinc-100 shadow-2xl shadow-blue-900/20 rounded-2xl overflow-hidden p-0">
        
        {/* Banner superior decorativo con gradientes y animación */}
        <div className="h-32 bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 relative overflow-hidden flex items-center justify-center">
          {/* Fondo texturizado para estilo orgánico */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
          {/* Icono de cohete central con animación de rebote constante */}
          <Rocket className="h-12 w-12 text-white/90 drop-shadow-lg animate-bounce" />
        </div>

        <div className="px-6 py-6">
          <DialogHeader className="mb-6 text-center sm:text-left">
            <DialogTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-300">
              ¡Bienvenido al Panel Central!
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm mt-1.5">
              Tu nueva estación de trabajo está lista. Aquí tienes 3 trucos rápidos para dominar el sistema:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mb-6">
            
            {/* Ficha descriptiva 1: Función de Búsqueda Rápida */}
            <div className="flex gap-4 items-start group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Búsqueda Ultra Rápida</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Presiona <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 border border-white/10 text-[10px]">Ctrl + K</kbd> en cualquier momento para encontrar y abrir aplicaciones al instante sin usar el ratón.
                </p>
              </div>
            </div>

            {/* Ficha descriptiva 2: Función de Favoritos (Anclaje) */}
            <div className="flex gap-4 items-start group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Sistema de Favoritos</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Haz clic en la estrella de cualquier tarjeta para anclarla. Tus aplicaciones favoritas siempre aparecerán al principio de la lista al abrir el panel.
                </p>
              </div>
            </div>

            {/* Ficha descriptiva 3: Personalización visual (Modo Oscuro/Claro) */}
            <div className="flex gap-4 items-start group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                <Moon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Personaliza tu Espacio</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Usa el botón en la esquina superior derecha para alternar entre el modo oscuro táctico y el modo claro según tus preferencias visuales.
                </p>
              </div>
            </div>

          </div>

          <DialogFooter className="sm:justify-center">
            {/* Botón de acción primaria para descartar el modal y registrar el tutorial como completado */}
            <Button 
              onClick={handleClose}
              className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium border-0 shadow-lg shadow-blue-900/30 transition-all hover:scale-105"
            >
              Entendido, ¡Comenzar a trabajar!
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
