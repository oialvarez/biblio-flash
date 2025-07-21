import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DeckCard.module.css';

const DeckCard = ({ deck }) => {
  return (
    <Link to={`/decks/${deck.id}`} className={styles.deckCardLink}>
      <article className={styles.deckCard}>
        <h3 className={styles.deckTitle}>{deck.title}</h3>
        <p className={styles.deckDescription}>{deck.description}</p>
      </article>
    </Link>
  );
};

export default DeckCard;
