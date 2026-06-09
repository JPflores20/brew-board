import { useState, useEffect } from "react";
import { APP_CONSTANTS } from "@/constants/appConstants";

// Hook personalizado para manejar la hora actual y el saludo según la hora del día
export function useClock() {
  // Estado que guarda la fecha y hora actual
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Configuramos un intervalo para actualizar la hora cada segundo (1000 ms)
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Limpiamos el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  // Función para determinar el saludo adecuado basado en la hora actual
  const getGreeting = () => {
    const hour = time.getHours();
    
    // Entre las 5:00 AM y las 11:59 AM
    if (hour >= 5 && hour < 12) {
      return "Buenos días, Equipo";
    }
    // Entre las 12:00 PM y las 6:59 PM
    if (hour >= 12 && hour < 19) {
      return "Buenas tardes, Equipo";
    }
    // Resto del tiempo (noche y madrugada)
    return "Buenas noches, Equipo";
  };

  // Formateamos la hora en una cadena legible según la configuración regional definida en constantes
  const formattedTime = time.toLocaleTimeString(APP_CONSTANTS.LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Retornamos el objeto Date original, la hora formateada y la función de saludo
  return { time, formattedTime, getGreeting };
}
