import * as React from "react";

// Punto de quiebre (en píxeles) para considerar una pantalla como dispositivo móvil
const MOBILE_BREAKPOINT = 768;

// Hook personalizado para determinar si la ventana actual corresponde a un dispositivo móvil
export function useIsMobile() {
  // Estado que guarda si es móvil o no. Inicia como undefined para evitar diferencias durante la hidratación (SSR)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Creamos una consulta de medios (media query) para anchos menores al punto de quiebre
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Función que actualiza el estado cuando la ventana cambia de tamaño
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Escuchamos los cambios de la consulta de medios
    mql.addEventListener("change", onChange);
    
    // Evaluamos el tamaño de la pantalla inicialmente al montar el componente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Limpiamos el evento (listener) cuando el componente se desmonta para evitar fugas de memoria
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Forzamos a que el valor de retorno siempre sea booleano (true o false)
  return !!isMobile;
}
