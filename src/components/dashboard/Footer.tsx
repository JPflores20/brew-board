/**
 * Componente de pie de página (Footer) de la aplicación.
 * Muestra los créditos del desarrollador en la parte inferior de la pantalla.
 *
 * @returns {JSX.Element} El elemento footer renderizado.
 */
export function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-white/5 bg-[#061017]/80 backdrop-blur-md">
      <div className="w-full mx-auto px-8 py-5 flex justify-center items-center text-xs font-semibold tracking-wider text-zinc-500">
        <p>Desarrollado por Ing. en Soft. José Luis Flores Carrillo</p>
      </div>
    </footer>
  );
}
