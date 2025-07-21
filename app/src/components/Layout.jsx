import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Layout.module.css';

const getNavLinkClass = ({ isActive }) => {
  return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
};

function Layout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirigimos al usuario a la página de login después de cerrar sesión
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar la sesión:", error);
      // Opcionalmente, mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <h1><Link to="/" className={styles.homeLink}>BiblioFlash</Link></h1>
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/decks" className={getNavLinkClass}>Decks</NavLink>
          {currentUser && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar Sesión
            </button>
          )}
        </nav>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 BiblioFlash. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Layout;
