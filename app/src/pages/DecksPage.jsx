import React, { useState } from 'react';
import DeckList from '../components/DeckList';
import { generateDeck } from '../services/deckService'; // Importamos nuestro servicio
import styles from './DecksPage.module.css'; // Importamos los estilos

// Datos de ejemplo hasta que conectemos con Firestore
const sampleDecks = [
  { id: '1', title: 'Salmos de Sabiduría', description: 'Una selección de Salmos para la meditación diaria.' },
  { id: '2', title: 'Proverbios para la Vida', description: 'Consejos prácticos de los Proverbios.' },
  { id: '3', title: 'Vocabulario Clave del Nuevo Testamento', description: 'Términos esenciales en griego y su significado.' },
];

const DecksPage = () => {
  // Estado para el formulario y la llamada a la API
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newDeck, setNewDeck] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setNewDeck(null);

    try {
      const generatedDeck = await generateDeck(topic, count);
      setNewDeck(generatedDeck);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Generando...' : 'Generar Mazo'}
        </button>
      </form>

      {isLoading && <div className={`${styles.feedbackMessage} ${styles.loading}`}>Creando tu mazo, por favor espera...</div>}
      {error && <div className={`${styles.feedbackMessage} ${styles.error}`}>{error}</div>}
      {newDeck && (
        <div className={`${styles.feedbackMessage} ${styles.success}`}>
          ¡Éxito! Se generó un nuevo mazo con {newDeck.cards.length} tarjetas. Lo verás en la lista de abajo una vez que implementemos la conexión con Firestore.
        </div>
      )}

      <hr />

      <h2>Mazos Disponibles</h2>
      <p>Estos son los mazos que hemos preparado para ti.</p>
      <DeckList decks={sampleDecks} />
    </div>
  );
};

export default DecksPage;
