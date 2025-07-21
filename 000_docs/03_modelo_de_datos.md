# Modelo de Datos (Cloud Firestore)

Este documento define la estructura de la base de datos NoSQL en **Cloud Firestore** para el proyecto **BiblioFlash**. La estructura está diseñada para ser escalable, eficiente y segura.

## Colecciones Principales

### 1. `users`

Almacena información del perfil y el estado de cada usuario.

- **Document ID**: `uid` (del servicio de Firebase Authentication).
- **Ejemplo de Documento** (`/users/{uid}`):
  ```json
  {
    "email": "usuario@example.com",
    "displayName": "Nombre de Usuario",
    "createdAt": "2025-07-20T22:45:22Z",
    "subscription": {
      "type": "premium", // 'free' o 'premium'
      "expires": "2026-07-20T22:45:22Z"
    },
    "stats": {
      "currentStreak": 15, // Días seguidos
      "wordsLearned": 250,
      "lastSessionTimestamp": "2025-07-20T21:00:00Z"
    }
  }
  ```

### 2. `cards`

La colección maestra que contiene todas las flashcards de la aplicación.

- **Document ID**: ID único autogenerado.
- **Ejemplo de Documento** (`/cards/{cardId}`):
  ```json
  {
    "englishText": "The Lord is my shepherd; I shall not want.",
    "spanishText": "El Señor es mi pastor; nada me faltará.",
    "audioUrl": "gs://biblioflash-prod.appspot.com/audio/psalm_23_1.mp3",
    "contextReference": "Psalm 23:1",
    "topic": "Confianza", // Para filtrado
    "book": "Psalms",
    "difficulty": "easy" // 'easy', 'medium', 'hard'
  }
  ```

### 3. `userCardData`

Almacena el progreso de aprendizaje de un usuario para una tarjeta específica. Es la base del sistema de repetición espaciada (SRS).

- **Document ID**: ID único autogenerado.
- **Ejemplo de Documento** (`/userCardData/{userCardDataId}`):
  ```json
  {
    "userId": "{uid}",
    "cardId": "{cardId}",
    "easinessFactor": 2.5, // Factor de facilidad del algoritmo SRS
    "interval": 4, // Días hasta la próxima revisión
    "repetitions": 3, // Cuántas veces se ha repasado
    "nextReviewDate": "2025-07-24T10:00:00Z",
    "isFavorite": true
  }
  ```

### 4. `content`

Almacena el contenido textual completo de los libros de la Biblia, como Salmos y Proverbios.

- **Document ID**: ID legible, ej: `psalm_23`.
- **Ejemplo de Documento** (`/content/psalm_23`):
  ```json
  {
    "book": "Psalms",
    "chapter": 23,
    "verses": [
      {
        "verse": 1,
        "english_kjv": "The Lord is my shepherd; I shall not want.",
        "spanish_rvr1960": "Jehová es mi pastor; nada me faltará."
      },
      {
        "verse": 2,
        "english_kjv": "He maketh me to lie down in green pastures...",
        "spanish_rvr1960": "En lugares de delicados pastos me hará descansar..."
      }
    ]
  }
  ```

### 5. `decks` (Opcional, para Fases Futuras)

Podría usarse para agrupar tarjetas en mazos temáticos o personalizados por el usuario.

- **Document ID**: ID único autogenerado.
- **Ejemplo de Documento** (`/decks/{deckId}`):
  ```json
  {
    "name": "Salmos de Alabanza",
    "description": "Versículos para la adoración.",
    "isSystemDeck": true, // ¿Es un mazo predefinido?
    "creatorId": "system" // o {uid} si es del usuario
  }
  ```

## Reglas de Seguridad (Concepto)

Se implementarán reglas de seguridad en Firestore para asegurar que:
- Los usuarios solo puedan leer y escribir sus propios documentos en `users` y `userCardData`.
- El contenido de `cards` y `content` sea de solo lectura para los clientes.
- La escritura en colecciones maestras solo sea posible desde un entorno de backend seguro (ej. Cloud Functions).
