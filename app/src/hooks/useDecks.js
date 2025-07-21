import { useState, useEffect, useCallback } from 'react';
import { getUserDecks, generateDeck } from '../services/deckService';

export const useDecks = () => {
  // Estado para la lista de mazos del usuario
  const [userDecks, setUserDecks] = useState([]);
  const [decksLoading, setDecksLoading] = useState(true);
  const [decksError, setDecksError] = useState(null);

  // Estado para la generación de un nuevo mazo
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [generatedDeck, setGeneratedDeck] = useState(null);

  // Función para cargar los mazos, envuelta en useCallback para estabilidad
  const fetchDecks = useCallback(async () => {
    try {
      setDecksLoading(true);
      const decks = await getUserDecks();
      setUserDecks(decks);
    } catch (err) {
      setDecksError(err.message);
    } finally {
      setDecksLoading(false);
    }
  }, []);

  // Cargar los mazos iniciales al montar el hook
  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  // Función para manejar la generación de un nuevo mazo
  const handleGenerateDeck = async (topic, count) => {
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedDeck(null);

    try {
      const deckData = await generateDeck(topic, count);
      setGeneratedDeck(deckData);
      // Refrescamos la lista de mazos para incluir el nuevo
      await fetchDecks(); 
      return deckData;
    } catch (err) {
      setGenerationError(err.message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    userDecks,
    decksLoading,
    decksError,
    isGenerating,
    generationError,
    generatedDeck,
    handleGenerateDeck,
  };
};
