import { useState } from "react";
import { Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "./LoginModal";
import { EditModeControls } from "./EditModeControls";

/**
 * Propiedades requeridas para el componente Header.
 */
interface HeaderProps {
  editMode: boolean;
  onEditModeChange: (active: boolean) => void;
}

/**
 * Componente de cabecera de la aplicación.
 * Contiene el logotipo, título y el botón de configuración (engranaje) para
 * acceder al modo de edición si el usuario tiene privilegios de administrador.
 *
 * @param {HeaderProps} props - Propiedades del header.
 * @returns {JSX.Element} El componente de cabecera con sus modales y controles de edición.
 */
export function Header({ editMode, onEditModeChange }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGearClick = () => {
    if (user) {
      // Alternar el modo de edición si el usuario ya ha iniciado sesión
      onEditModeChange(!editMode);
    } else {
      // Mostrar el modal de inicio de sesión si no está autenticado
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    onEditModeChange(true);
  };

  // Guardar los cambios realizados en el modo de edición
  const handleSave = async () => {
    setSaving(true);
    try {
      await (window as any).__dashboardSave?.();
    } finally {
      setSaving(false);
      onEditModeChange(false);
    }
  };

  // Cancelar los cambios de edición y salir del modo de edición
  const handleCancel = () => {
    (window as any).__dashboardCancel?.();
    onEditModeChange(false);
  };

  // Cerrar la sesión de administrador
  const handleLogout = async () => {
    handleCancel();
    await signOut();
  };

  return (
    <>
      <header className="w-full flex justify-center items-center px-6 md:px-12 py-8 relative">
        {/* Centered: Logo & Titles stacked */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logos/BREWMAN.jpeg"
            alt="BREWMAN Logo"
            className="h-20 w-20 rounded-full object-cover shadow-[0_0_20px_rgba(250,204,21,0.2)] ring-1 ring-yellow-500/40"
          />
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl md:text-[28px] font-bold tracking-widest text-zinc-100 uppercase leading-none mb-1.5">
              PRP ONE VIEW
            </h1>
            <p className="text-[10px] md:text-xs text-yellow-500 font-semibold tracking-[0.25em] uppercase">
              Control • Eficiencia • Calidad
            </p>
          </div>
        </div>

        {/* Gear icon — top right */}
        <button
          id="admin-gear-btn"
          onClick={handleGearClick}
          title={user ? (editMode ? "Desactivar edición" : "Activar edición") : "Acceso administrador"}
          className={`absolute right-6 md:right-12 p-2.5 rounded-xl border transition-all duration-300 group
            ${editMode
              ? "border-yellow-500/60 bg-yellow-500/10 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
              : "border-white/10 bg-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
            }`}
        >
          <Settings
            className={`h-5 w-5 transition-transform duration-500 ${editMode ? "rotate-90 text-yellow-400" : "group-hover:rotate-45"}`}
          />
        </button>
      </header>

      {/* Login modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Edit mode floating bar */}
      {editMode && (
        <EditModeControls
          onSave={handleSave}
          onCancel={handleCancel}
          onLogout={handleLogout}
          saving={saving}
        />
      )}
    </>
  );
}
