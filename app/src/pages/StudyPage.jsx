import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudySession } from '../hooks/useStudySession';
import Flashcard from '../components/Flashcard';
import StudySummary from '../components/StudySummary';
import styles from './StudyPage.module.css';

const StudyPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const {
    deck,
    currentCard,
    loading,
    error,
    goToNextCard,
    goToPreviousCard,
    isFirstCard,
    isLastCard,
    currentCardNumber,
    totalCards,
    isFlipped,
    flipCard,
    recordResponse,
    studyProgress,
    isSessionComplete,
    restartSession,
  } = useStudySession(deckId);

  if (loading) {
    return <div className={styles.feedback}>Cargando sesión de estudio...</div>;
  }

  if (error) {
    return <div className={`${styles.feedback} ${styles.error}`}>Error: {error}</div>;
  }

  if (!deck && !loading) {
    return <div className={styles.feedback}>No se encontró el mazo.</div>;
  }

  return (
    <div className={styles.studyContainer}>
      {isSessionComplete ? (
        <StudySummary 
          studyProgress={studyProgress}
          onRestart={restartSession}
          onFinish={() => navigate('/decks')}
        />
      ) : (
        <>
          <h2 className={styles.title}>{deck.title}</h2>
          <p className={styles.deckInfo}>{deck.description}</p>

          <div className={styles.flashcardArea}>
            {currentCard ? (
              <Flashcard 
                question={currentCard.question}
                answer={currentCard.answer}
                isFlipped={isFlipped}
                onFlip={flipCard}
              />
            ) : (
              <p>Este mazo no tiene tarjetas.</p>
            )}
          </div>

          <div className={styles.navigationControls}>
            <button onClick={goToPreviousCard} disabled={isFirstCard} className={styles.navButton}>
              Anterior
            </button>
            <span className={styles.progressIndicator}>
              {currentCardNumber} / {totalCards}
            </span>
            <button onClick={goToNextCard} disabled={isLastCard} className={styles.navButton}>
              Siguiente
            </button>
          </div>

          {isFlipped && (
            <div className={styles.feedbackControls}>
              <button 
                className={`${styles.feedbackButton} ${styles.reviewButton}`}
                onClick={() => recordResponse('review')}
              >
                ❌ Repasar
              </button>
              <button 
                className={`${styles.feedbackButton} ${styles.knowButton}`}
                onClick={() => recordResponse('know')}
              >
                ✅ ¡Lo sé!
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudyPage;
