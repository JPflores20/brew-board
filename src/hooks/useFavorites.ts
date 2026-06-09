import { useState, useEffect } from "react";
import { APP_CONSTANTS } from "@/constants/appConstants";

// Hook personalizado para gestionar los enlaces favoritos usando el almacenamiento local
export function useFavorites() {
  // Estado para guardar la lista de URLs marcadas como favoritas
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Al cargar, intentamos recuperar los favoritos guardados previamente en el localStorage
    const savedFavorites = localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_FAVORITES_KEY);
    if (savedFavorites) {
      try {
        // Analizamos y establecemos los favoritos si existen en el almacenamiento
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        // En caso de que el JSON sea inválido, registramos el error
        console.error("Error al analizar los favoritos", error);
      }
    }
  }, []);

  // Función para agregar o quitar una URL de la lista de favoritos
  const toggleFavorite = (url: string) => {
    setFavorites((previousFavorites) => {
      // Verificamos si la URL ya está en los favoritos
      const isFavorite = previousFavorites.includes(url);
      let newFavorites: string[];

      if (isFavorite) {
        // Si ya es favorito, lo eliminamos de la lista
        newFavorites = previousFavorites.filter((favoriteUrl) => favoriteUrl !== url);
      } else {
        // Si no es favorito, lo añadimos al final de la lista
        newFavorites = [...previousFavorites, url];
      }

      // Guardamos la nueva lista en el localStorage
      localStorage.setItem(
        APP_CONSTANTS.LOCAL_STORAGE_FAVORITES_KEY,
        JSON.stringify(newFavorites)
      );
      
      // Devolvemos el nuevo estado
      return newFavorites;
    });
  };

  // Retornamos los favoritos actuales y la función para alternar su estado
  return { favorites, toggleFavorite };
}
