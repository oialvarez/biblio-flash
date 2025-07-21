import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <h1><Link to="/" className={styles.homeLink}>BiblioFlash</Link></h1>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/decks">Decks</Link>
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
