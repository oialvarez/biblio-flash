// SDKs de Firebase
const admin = require("firebase-admin");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {defineString} = require("firebase-functions/params");
const {logger} = require("firebase-functions");

// SDK de OpenAI
const OpenAI = require("openai");

// Inicialización
admin.initializeApp();
const openAIKey = defineString("OPENAI_API_KEY");

/**
 * Genera un mazo de flashcards usando la sintaxis de Cloud Functions V2.
 * Implementa una estrategia de cacheo para optimizar costos y rendimiento.
 */
exports.generateDeckV2 = onCall(async (request) => {
  // 0. Autenticación
  if (!request.auth) {
    throw new HttpsError(
        "unauthenticated",
        "Debes estar autenticado para generar un mazo.",
    );
  }
  const {uid} = request.auth;
  const {topic, count} = request.data;

  // 1. Validar la entrada
  if (!topic || !count) {
    throw new HttpsError(
        "invalid-argument",
        "La función debe ser llamada con 'topic' y 'count'.",
    );
  }

  logger.info(`Solicitud para generar ${count} tarjetas sobre ${topic}.`);

  // 2. Lógica de cacheo
  const db = admin.firestore();
  const cacheId = `${topic.toLowerCase().replace(/\s+/g, "_")}_${count}`;
  const cacheRef = db.collection("deck_cache").doc(cacheId);

  const doc = await cacheRef.get();

  if (doc.exists) {
    logger.info(`Cache HIT para ${cacheId}. Devolviendo datos.`);
    return doc.data();
  }

  logger.info(`Cache MISS para ${cacheId}. Generando contenido.`);

  // 3. Llamada a OpenAI
  const openai = new OpenAI({apiKey: openAIKey.value()});

  const prompt = `Genera un mazo de ${count} flashcards de alta calidad ` +
    `sobre el tema bíblico "${topic}". ` +
    "Las preguntas deben ser claras y las respuestas precisas. " +
    "Devuelve el resultado exclusivamente en formato JSON, como un objeto " +
    "con una única clave \"cards\". El valor de \"cards\" debe ser un " +
    "array de objetos, donde cada objeto tiene las claves \"question\" " +
    "y \"answer\".";

  try {
    logger.info("[OpenAI] Attempting to use model: gpt-4o");
    const completion = await openai.chat.completions.create({
      messages: [{role: "user", content: prompt}],
      model: "gpt-4o",
      response_format: {type: "json_object"},
    });

    const responseJson = completion.choices[0].message.content;
    const newDeck = JSON.parse(responseJson);

    // 4. Guardar el mazo en la colección principal 'decks'
    const decksCollection = db.collection("decks");
    await decksCollection.add({
      ownerId: uid,
      title: topic, // Usamos el topic como título por ahora
      description: `Un mazo sobre ${topic} con ${count} tarjetas.`,
      cards: newDeck.cards,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    logger.info(`Mazo sobre '${topic}' guardado para el usuario ${uid}.`);

    // 5. Guardar en cache y devolver
    await cacheRef.set(newDeck);
    logger.info(`Resultado para ${cacheId} guardado en la caché.`);

    return newDeck;
  } catch (error) {
    logger.error("Error al llamar a OpenAI:", error);
    throw new HttpsError(
        "internal",
        "Ocurrió un error al generar el mazo de tarjetas.",
    );
  }
});

