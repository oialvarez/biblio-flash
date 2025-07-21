import { useState, useEffect, useCallback } from 'react';
import { getDeckById } from '../services/deckService';

export const useStudySession = (deckId) => {
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyProgress, setStudyProgress] = useState({});
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deckId) return;

    const fetchDeck = async () => {
      try {
        setLoading(true);
        setError(null);
        const deckData = await getDeckById(deckId);
        setDeck(deckData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  const goToNextCard = useCallback(() => {
    if (!deck) return;
    setIsFlipped(false); // Reset flip state on navigation
    setCurrentCardIndex(prevIndex => 
      prevIndex < deck.cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  }, [deck]);

  const goToPreviousCard = useCallback(() => {
    setIsFlipped(false); // Reset flip state on navigation
    setCurrentCardIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  }, []);

  const currentCard = deck ? deck.cards[currentCardIndex] : null;
  const isFirstCard = currentCardIndex === 0;
  const isLastCard = deck ? currentCardIndex === deck.cards.length - 1 : false;

  const flipCard = () => {
    setIsFlipped(prev => !prev);
  };

  const restartSession = useCallback(() => {
    setCurrentCardIndex(0);
    setStudyProgress({});
    setIsFlipped(false);
    setIsSessionComplete(false);
  }, []);

  const recordResponse = useCallback((response) => {
    if (!currentCard || !deck) return;

    setStudyProgress(prev => ({
      ...prev,
      [currentCard.id]: response,
    }));

    if (currentCardIndex === deck.cards.length - 1) {
      setIsSessionComplete(true);
    } else {
      goToNextCard();
    }
  }, [currentCard, deck, currentCardIndex, goToNextCard]);

  return {
    deck,
    currentCard,
    loading,
    error,
    goToNextCard,
    goToPreviousCard,
    isFirstCard,
    isLastCard,
    currentCardNumber: currentCardIndex + 1,
    totalCards: deck ? deck.cards.length : 0,
    isFlipped,
    flipCard,
    recordResponse,
    studyProgress,
    isSessionComplete,
    restartSession,
  };
};
