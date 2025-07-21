import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Obtenemos las instancias de los servicios de Firebase que inicializamos en nuestro archivo de config
const functions = getFunctions();
const db = getFirestore();
const auth = getAuth();

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
    throw new Error('Ocurrió un error al generar el mazo de tarjetas.');
  }
};

/**
 * Obtiene los mazos de tarjetas del usuario actual desde Firestore.
 * @returns {Promise<Array<object>>} Un array de objetos, donde cada objeto es un mazo.
 * @throws {Error} Si el usuario no está autenticado o si ocurre un error en la consulta.
 */
export const getUserDecks = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log("Intento de obtener mazos sin usuario autenticado.");
    return []; // Devolvemos un array vacío si no hay usuario
  }

  // Creamos una consulta para obtener solo los mazos del usuario actual, ordenados por fecha de creación.
  const decksQuery = query(
    collection(db, "decks"), 
    where("ownerId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  try {
    const querySnapshot = await getDocs(decksQuery);
    const decks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return decks;
  } catch (error) {
    console.error("Error al obtener los mazos del usuario:", error);
    throw new Error("No se pudieron cargar tus mazos.");
  }
};

/**
 * Obtiene un mazo específico por su ID desde Firestore.
 * Verifica que el mazo pertenezca al usuario actual.
 * @param {string} deckId El ID del mazo a obtener.
 * @returns {Promise<object>} El objeto del mazo.
 * @throws {Error} Si el mazo no se encuentra, no pertenece al usuario o hay un error.
 */
export const getDeckById = async (deckId) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado.");
  }

  const deckRef = doc(db, "decks", deckId);
  
  try {
    const docSnap = await getDoc(deckRef);

    if (!docSnap.exists()) {
      throw new Error("El mazo no existe o fue eliminado.");
    }

    const deckData = docSnap.data();

    // Seguridad: Asegurarse de que el mazo pertenece al usuario que lo solicita
    if (deckData.ownerId !== user.uid) {
      console.warn(`Intento de acceso no autorizado al mazo ${deckId} por el usuario ${user.uid}`);
      throw new Error("No tienes permiso para acceder a este mazo.");
    }

    return { id: docSnap.id, ...deckData };

  } catch (error) {
    console.error(`Error al obtener el mazo ${deckId}:`, error);
    // Re-lanzamos el error para que el hook que lo llama pueda manejarlo.
    throw error;
  }
};
