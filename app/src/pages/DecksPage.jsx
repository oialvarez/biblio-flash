import React, { useState } from 'react';
import { useDecks } from '../hooks/useDecks'; // Importamos nuestro nuevo hook
import DeckList from '../components/DeckList';
import styles from './DecksPage.module.css';
import GeneratedDeck from '../components/GeneratedDeck';

const DecksPage = () => {
  // Toda la lógica compleja ahora vive en el hook useDecks
  const {
    userDecks,
    decksLoading,
    decksError,
    isGenerating,
    generationError,
    generatedDeck,
    handleGenerateDeck,
  } = useDecks();

  // Estado local solo para el formulario, que es responsabilidad de esta página
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleGenerateDeck(topic, count);
  };

  return (
    <div>
      <h2>Generar Nuevo Mazo</h2>
      <p>¿No encuentras lo que buscas? ¡Crea un mazo personalizado con la ayuda de la IA!</p>

      <form onSubmit={handleSubmit} className={styles.generationForm}>
        <div className={styles.formGroup}>
          <label htmlFor="topic">Tema:</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: Los milagros de Jesús"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="count">Número de Tarjetas:</label>
          <input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            min="5"
            max="50"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={isGenerating}>
          {isGenerating ? 'Generando...' : 'Generar Mazo'}
        </button>
      </form>

      {isGenerating && <div className={`${styles.feedbackMessage} ${styles.loading}`}>Creando tu mazo, por favor espera...</div>}
      {generationError && <div className={`${styles.feedbackMessage} ${styles.error}`}>{generationError}</div>}
      {generatedDeck && <GeneratedDeck cards={generatedDeck.cards} />}

      <hr />

      <h2>Tus Mazos</h2>
      {decksLoading && <p>Cargando tus mazos...</p>}
      {decksError && <p className={styles.error}>{decksError}</p>}
      {!decksLoading && !decksError && (
        <DeckList decks={userDecks} />
      )}
    </div>
  );
};

export default DecksPage;
