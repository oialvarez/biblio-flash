import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos un Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Creamos el Proveedor del Contexto (el componente que envolverá la app)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // onAuthStateChanged es un observador que se dispara cuando el usuario inicia o cierra sesión
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Nos desuscribimos del observador cuando el componente se desmonta
    return unsubscribe;
  }, [auth]);

    const value = useMemo(() => ({
    currentUser,
    loginWithGoogle,
    logout,
  }), [currentUser]);

  // No renderizamos nada hasta que sepamos si hay un usuario o no
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
