import { Save, X, LogOut } from "lucide-react";

/**
 * Propiedades para los controles del modo de edición.
 */
interface EditModeControlsProps {
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
  saving?: boolean;
}

/**
 * Componente que muestra una barra flotante con los controles (Guardar, Cancelar, Cerrar sesión)
 * cuando el dashboard está en modo de edición.
 *
 * @param {EditModeControlsProps} props - Propiedades para los controles de edición.
 * @returns {JSX.Element} Barra de controles de edición flotante.
 */
export function EditModeControls({ onSave, onCancel, onLogout, saving }: EditModeControlsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-[#061017]/95 border border-yellow-500/30 rounded-2xl px-5 py-3 shadow-[0_0_30px_rgba(250,204,21,0.15)] backdrop-blur-md">
      <span className="text-xs font-semibold text-yellow-400 tracking-widest uppercase mr-2">
        ✏️ Modo Edición
      </span>

      <button
        id="edit-save-btn"
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-60"
      >
        <Save className="h-4 w-4" />
        {saving ? "Guardando..." : "Guardar"}
      </button>

      <button
        id="edit-cancel-btn"
        onClick={onCancel}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold text-xs px-4 py-2 rounded-xl border border-white/10 transition-all duration-200"
      >
        <X className="h-4 w-4" />
        Cancelar
      </button>

      <button
        id="edit-logout-btn"
        onClick={onLogout}
        className="flex items-center gap-2 text-zinc-500 hover:text-red-400 text-xs px-2 py-2 transition-all duration-200"
        title="Cerrar sesión"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
