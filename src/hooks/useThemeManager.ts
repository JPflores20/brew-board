/**
 * @file useThemeManager.ts
 * @description Hook para administrar y alternar el tema visual (claro/oscuro) de la aplicación.
 */
import { useState, useEffect } from "react";

/**
 * Hook personalizado para administrar el tema claro/oscuro de la aplicación.
 * @returns Objeto con un indicador booleano del tema actual y una función para alternarlo.
 */
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

  /**
   * Función para alternar el tema entre claro y oscuro.
   * Modifica las clases del elemento raíz de forma automática.
   */
  const toggleTheme = () => {
    const rootElement = document.documentElement;
    
    // Agregamos o quitamos la clase "dark" en el elemento raíz
    rootElement.classList.toggle("dark");
    
    // Invertimos el estado actual del tema
    setIsDark(!isDark);
  };

  // Retornamos el estado actual del tema y la función para alternarlo
  return { isDark, toggleTheme };
}
