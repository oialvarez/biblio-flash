import React from 'react';
import styles from './DeckList.module.css';

// Datos de ejemplo hasta que conectemos con Firestore
const sampleDecks = [
  { id: '1', title: 'Salmos de Sabiduría', description: 'Una selección de Salmos para la meditación diaria.' },
  { id: '2', title: 'Proverbios para la Vida', description: 'Consejos prácticos de los Proverbios.' },
  { id: '3', title: 'Vocabulario Clave del Nuevo Testamento', description: 'Términos esenciales en griego y su significado.' },
];

const DeckList = () => {
  return (
    <div className={styles.deckListContainer}>
      <h2 className={styles.title}>Mazos Disponibles</h2>
      <div className={styles.decksGrid}>
        {sampleDecks.map((deck) => (
          <div key={deck.id} className={styles.deckCard}>
            <h3 className={styles.deckTitle}>{deck.title}</h3>
            <p className={styles.deckDescription}>{deck.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckList;
