import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      // La redirección ocurrirá automáticamente gracias al observador en AuthContext
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      // Aquí podríamos mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Bienvenido a BiblioFlash</h1>
        <p className={styles.subtitle}>Tu compañero para el estudio de las Escrituras.</p>
        <button onClick={handleLogin} className={styles.loginButton}>
          <img src="/google-logo.svg" alt="Google logo" className={styles.googleLogo} />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
