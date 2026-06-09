import { useState, useEffect } from "react";

// Hook personalizado para administrar el tema claro/oscuro de la aplicación
export function useThemeManager() {
  // Estado para saber si el tema actual es oscuro
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Obtenemos el elemento raíz (html)
    const rootElement = document.documentElement;
    
    // Comprobamos si la clase "dark" ya está aplicada al cargar la página
    const isDarkTheme = rootElement.classList.contains("dark");
    setIsDark(isDarkTheme);
  }, []);

  // Función para alternar el tema entre claro y oscuro
  const toggleTheme = () => {
    const rootElement = document.documentElement;
    
    // Agregamos o quitamos la clase "dark" en el elemento raíz de forma automática
    rootElement.classList.toggle("dark");
    
    // Invertimos el estado actual del tema
    setIsDark(!isDark);
  };

  // Retornamos el estado actual del tema y la función para alternarlo
  return { isDark, toggleTheme };
}
