import { useRouter } from "@tanstack/react-router";

// Componente genérico para mostrar cuando ocurre un error inesperado en la aplicación o ruta
export function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  // Registramos el error en la consola para facilitar la depuración
  console.error(error);
  
  // Obtenemos la instancia del enrutador para poder manipular la navegación
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no pudo cargar
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo salió mal de nuestro lado. Puedes intentar recargar la página o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {/* Botón para intentar cargar de nuevo la ruta actual */}
          <button
            onClick={() => {
              // Invalidamos la caché de la ruta actual para forzar una recarga limpia
              router.invalidate();
              // Reiniciamos el estado de error provisto por el enrutador
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
          {/* Enlace seguro para regresar a la página principal */}
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
