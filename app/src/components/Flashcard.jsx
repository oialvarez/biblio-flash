import React, { useState } from 'react';
import styles from './Flashcard.module.css';

const Flashcard = ({ question, answer, isFlipped, onFlip }) => {
  return (
    <div className={styles.flashcardContainer} onClick={onFlip}>
      <div className={`${styles.flashcard} ${isFlipped ? styles.isFlipped : ''}`}>
        <div className={styles.flashcardFaceFront}>
          <p>{question}</p>
        </div>
        <div className={styles.flashcardFaceBack}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
