import React from 'react';
import DeckCard from './DeckCard';
import styles from './DeckList.module.css';

const DeckList = ({ decks }) => {
  return (
    <div className={styles.deckListContainer}>
      <h2 className={styles.title}>Mazos Disponibles</h2>
      <div className={styles.decksGrid}>
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};


export default DeckList;
