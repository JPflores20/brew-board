import { ProjectCard } from "@/components/project_card";
import { projects } from "@/lib/projects_data";
import { useFavorites } from "@/hooks/useFavorites";

// Componente que organiza y renderiza la lista completa de proyectos de la interfaz en forma de cuadrícula
export function ProjectGrid() {
  // Extraemos la lista de URLs favoritas y la función de alternar desde nuestro hook
  const { favorites, toggleFavorite } = useFavorites();

  // Clonamos el arreglo de proyectos original y lo ordenamos para priorizar los favoritos en la parte superior
  const sortedProjects = [...projects].sort((projectA, projectB) => {
    const isProjectAFavorite = favorites.includes(projectA.url);
    const isProjectBFavorite = favorites.includes(projectB.url);
    
    // Si el proyecto A es favorito y el B no lo es, A se ubica primero en la lista
    if (isProjectAFavorite && !isProjectBFavorite) {
      return -1;
    }
    // Si el proyecto B es favorito y el A no lo es, B se ubica primero
    if (!isProjectAFavorite && isProjectBFavorite) {
      return 1;
    }
    // Si ambos comparten el mismo estado (ambos favoritos o ninguno), mantienen su orden relativo por defecto
    return 0;
  });

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* Recorremos todos los proyectos ordenados e instanciamos sus tarjetas correspondientes */}
      {sortedProjects.map((project, index) => {
        // Evaluamos en tiempo real si el proyecto que estamos recorriendo es uno de los favoritos
        const isFavorite = favorites.includes(project.url);
        
        return (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            isFavorite={isFavorite}
            onToggleFavorite={() => toggleFavorite(project.url)}
          />
        );
      })}
    </section>
  );
}
