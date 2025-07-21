import { getFunctions, httpsCallable } from 'firebase/functions';

// Obtenemos la instancia de Functions que inicializamos en nuestro archivo de config
const functions = getFunctions();

/**
 * Llama a la Cloud Function 'generateDeckV2' para crear un nuevo mazo de tarjetas.
 * @param {string} topic El tema sobre el cual generar el mazo (ej. "Salmos").
 * @param {number} count El número de tarjetas a generar.
 * @returns {Promise<object>} El objeto del mazo de tarjetas generado.
 * @throws {Error} Si la llamada a la función falla.
 */
export const generateDeck = async (topic, count) => {
  console.log(`Solicitando mazo: ${topic}, ${count} tarjetas...`);

  // Obtenemos una referencia a nuestra función callable en la nube
  const generateDeckCallable = httpsCallable(functions, 'generateDeckV2');

  try {
    const result = await generateDeckCallable({ topic, count });
    console.log('Respuesta de la Cloud Function:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error al llamar a la Cloud Function:', error);
    // Podríamos personalizar el mensaje de error según el código de error
    throw new Error('No se pudo generar el mazo de tarjetas. Inténtalo de nuevo.');
  }
};
