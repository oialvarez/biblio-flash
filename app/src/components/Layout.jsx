import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <h1>BiblioFlash</h1>
        <nav>
          {/* Navigation links will go here */}
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
