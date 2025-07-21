import React from 'react';
import styles from './StudySummary.module.css';

const StudySummary = ({ studyProgress, onRestart, onFinish }) => {
  const totalCards = Object.keys(studyProgress).length;
  const knownCards = Object.values(studyProgress).filter(res => res === 'know').length;

  return (
    <div className={styles.summaryContainer}>
      <h3 className={styles.summaryTitle}>¡Sesión Completada!</h3>
      <p className={styles.summaryStats}>
        Has aprendido <span className={styles.knownCount}>{knownCards}</span> de <span className={styles.totalCount}>{totalCards}</span> tarjetas.
      </p>
      <div className={styles.summaryActions}>
        <button onClick={onRestart} className={styles.actionButton}>
          Repasar de nuevo
        </button>
        <button onClick={onFinish} className={`${styles.actionButton} ${styles.finishButton}`}>
          Volver a los Mazos
        </button>
      </div>
    </div>
  );
};

export default StudySummary;
