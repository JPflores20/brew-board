export function Header() {
  return (
    <header className="w-full flex justify-center items-center px-6 md:px-12 py-8">
      {/* Centered: Logo & Titles stacked */}
      <div className="flex flex-col items-center gap-3">
        <img
          src="/logos/BREWMAN.jpeg"
          alt="BREWMAN Logo"
          className="h-20 w-20 rounded-full object-cover shadow-[0_0_20px_rgba(250,204,21,0.2)] ring-1 ring-yellow-500/40"
        />
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-[28px] font-bold tracking-widest text-zinc-100 uppercase leading-none mb-1.5">
            Gestor de Cervecería
          </h1>
          <p className="text-[10px] md:text-xs text-yellow-500 font-semibold tracking-[0.25em] uppercase">
            Control • Eficiencia • Calidad
          </p>
        </div>
      </div>
    </header>
  );
}
