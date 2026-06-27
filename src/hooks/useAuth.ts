/**
 * @file useAuth.ts
 * @description Hook personalizado para gestionar el estado de autenticación
 * de usuarios utilizando Firebase Auth.
 */
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Hook para obtener y manejar la sesión del usuario actual.
 * @returns Un objeto con el usuario activo, el estado de carga y las funciones de iniciar/cerrar sesión.
 */
export function useAuth() {
  // Estado para almacenar los datos del usuario autenticado
  const [user, setUser] = useState<User | null>(null);
  // Estado para indicar si la validación de autenticación está en curso
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribirse a los cambios de estado de autenticación en Firebase
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    // Limpiar la suscripción cuando el componente se desmonta
    return unsubscribe;
  }, []);

  /**
   * Inicia sesión utilizando correo electrónico y contraseña.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   */
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Cierra la sesión activa del usuario en Firebase.
   */
  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return { user, loading, signIn, signOut };
}
