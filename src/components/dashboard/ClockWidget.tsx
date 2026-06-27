import { Clock } from "lucide-react";
import { useClock } from "@/hooks/useClock";
import { useEffect, useState } from "react";

/**
 * Componente visual que muestra la hora actual en tiempo real.
 * Utiliza el hook personalizado `useClock` para obtener la hora y maneja
 * el estado de montaje para evitar errores de hidratación durante el SSR.
 *
 * @returns {JSX.Element} Un widget con un icono de reloj y la hora formateada.
 */
export function ClockWidget() {
  // Obtenemos la hora formateada desde el hook personalizado
  const { formattedTime } = useClock();
  
  // Estado para controlar cuándo el componente se ha montado en el cliente, evitando errores de hidratación (SSR)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marcamos el componente como montado una vez cargado en el navegador
    setIsMounted(true);
  }, []);

  // Mientras no esté montado, mostramos una versión estática u oculta para coincidir con el renderizado inicial
  if (!isMounted) {
    return (
      <div
        className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xl font-medium text-zinc-300 backdrop-blur-md opacity-0"
      >
        <Clock className="h-6 w-6 text-yellow-500" />
        <span className="font-mono tracking-wider">--:--:--</span>
      </div>
    );
  }

  // Una vez montado, mostramos el widget animado con la hora real
  return (
    <div
      className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xl font-medium text-zinc-300 backdrop-blur-md animate-fade-up transition-opacity duration-500 opacity-100"
      style={{ animationDelay: "150ms", animationFillMode: "both" }}
    >
      <Clock className="h-6 w-6 text-yellow-500" />
      <span className="font-mono tracking-wider">{formattedTime}</span>
    </div>
  );
}
