import { NavLink, Link } from 'react-router-dom';
import styles from './Layout.module.css';

const getNavLinkClass = ({ isActive }) => {
  return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
};

function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <h1><Link to="/" className={styles.homeLink}>BiblioFlash</Link></h1>
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/decks" className={getNavLinkClass}>Decks</NavLink>
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
