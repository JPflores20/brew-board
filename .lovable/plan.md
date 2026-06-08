## Panel de Proyectos (Project Hub)

### Objetivo
Reemplazar la landing placeholder por un panel de control moderno, minimalista y responsivo que actúe como hub central de aplicaciones, con soporte para modo claro/oscuro.

### Estructura de archivos

```
src/
  routes/
    index.tsx          → Página principal con el grid de proyectos
  components/
    project-card.tsx   → Tarjeta individual de proyecto
  lib/
    projects-data.ts   → Arreglo tipado con los 3 proyectos de ejemplo
```

### Tareas de implementación

1. **Datos de ejemplo**
   - Crear `src/lib/projects-data.ts` con un arreglo tipado `Project[]`.
   - Incluir los 3 proyectos con: nombre, descripción, lema, stack (array), URL y un campo para el icono (usar nombres de iconos de lucide-react).

2. **Componente de tarjeta**
   - Crear `src/components/project-card.tsx`.
   - Renderizar como `<a>` nativo con `target="_blank"` y `rel="noopener noreferrer"`.
   - Diseño: fondo con `bg-card/70 backdrop-blur-md border border-border/50` para el glassmorphism sutil, sombra suave (`shadow-sm`), bordes redondeados.
   - Hover: translateY negativo ligero + aumento de sombra (`hover:-translate-y-1 hover:shadow-lg`) con transición suave (`transition-all duration-300`).
   - Contenido:
     - Icono representativo (lucide-react) arriba.
     - Título en semibold.
     - Descripción de 1–2 líneas con `text-muted-foreground`.
     - Badges del stack en la parte inferior (`inline-flex` con `bg-secondary/80 text-secondary-foreground`).
     - Icono de enlace externo (`ExternalLink`) en esquina superior derecha.

3. **Página principal**
   - Reemplazar `src/routes/index.tsx`.
   - Agregar `head()` con meta tags SEO apropiados (título: "Panel de Proyectos | Hub central de aplicaciones").
   - Layout:
     - **Header**: título "Panel de Proyectos", subtítulo "Hub central de aplicaciones", botón para alternar tema claro/oscuro.
     - **Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` con gap.
     - Usar el componente `ProjectCard` iterando sobre el arreglo de datos.
   - Estado de tema: usar `useState` para alternar la clase `dark` en `<html>` y persistir preferencia en `localStorage`.

4. **Estilos y diseño**
   - Usar los tokens semánticos existentes (`bg-background`, `text-foreground`, `bg-card`, etc.) para compatibilidad automática con modo oscuro.
   - No requiere cambios en `src/styles.css`; el sistema de tokens ya cubre light/dark.
   - Mantener márgenes generosos (`px-4 py-12` o similar) para aire visual.

5. **Verificación**
   - Validar que no quede el placeholder `data-lovable-blank-page-placeholder`.
   - Revisar que las tarjetas sean links funcionales con `target="_blank"`.
   - Confirmar que la grilla responda correctamente en breakpoints móvil/tablet/desktop.
   - Asegurar que no haya imports duplicados ni errores de tipado (strict TS).
