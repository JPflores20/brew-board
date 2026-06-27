/**
 * @file LoginModal.tsx
 * @description Componente modal para el inicio de sesión de administradores.
 */
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { X, LogIn, Loader2, AlertCircle } from "lucide-react";

/**
 * Propiedades esperadas para el componente LoginModal.
 * @interface LoginModalProps
 * @property {() => void} onClose - Función a ejecutar para cerrar el modal.
 * @property {() => void} onSuccess - Función a ejecutar cuando el inicio de sesión es exitoso.
 */
interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Componente LoginModal.
 * Renderiza un formulario modal para autenticar a los administradores.
 * 
 * @param {LoginModalProps} props - Las propiedades del componente.
 * @returns {JSX.Element} El elemento del modal de inicio de sesión.
 */
export function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  // Hook personalizado para manejar la autenticación
  const { signIn } = useAuth();
  
  // Estados locales para los campos del formulario y el manejo de UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * @param {React.FormEvent} e - Evento del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Limpia errores previos e inicia el estado de carga
    setError("");
    setLoading(true);
    try {
      // Intenta iniciar sesión con las credenciales dadas
      await signIn(email, password);
      onSuccess();
      onClose();
    } catch {
      // Captura y muestra un error si las credenciales fallan
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm mx-4 bg-[#061017] border border-white/10 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(250,204,21,0.15)]">
            <LogIn className="h-6 w-6 text-yellow-400" />
          </div>
          <h2 className="text-lg font-bold tracking-widest text-zinc-100 uppercase">Acceso Administrador</h2>
          <p className="text-xs text-zinc-500 mt-1">Inicia sesión para editar el tablero</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Correo</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Contraseña</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm tracking-wider transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(250,204,21,0.2)]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
