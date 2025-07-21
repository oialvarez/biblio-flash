import React from 'react';
import styles from './GeneratedDeck.module.css';

const GeneratedDeck = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className={styles.deckContainer}>
      <h3 className={styles.deckTitle}>Mazo Recién Generado</h3>
      <div className={styles.cardList}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardQuestion}>
              <strong>Pregunta:</strong> {card.question}
            </div>
            <div className={styles.cardAnswer}>
              <strong>Respuesta:</strong> {card.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedDeck;
