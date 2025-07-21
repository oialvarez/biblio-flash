# Registro de Decisiones de Arquitectura (ADR)

Este documento registra las decisiones de arquitectura importantes tomadas durante el desarrollo de BiblioFlash. El propósito es tener un contexto histórico de por qué la arquitectura es como es.

---

## ADR-001: Elección de Vite como Herramienta de Frontend

- **Fecha**: 2025-07-19
- **Estado**: Aceptado

### Contexto

El proyecto se inició con `create-react-app` (CRA), el estándar de facto durante mucho tiempo para proyectos de React. Sin embargo, el ecosistema de JavaScript ha evolucionado, y herramientas más modernas ofrecen mejoras significativas en rendimiento y experiencia de desarrollo.

### Decisión

Se decidió migrar el proyecto de `create-react-app` a **Vite**. Vite utiliza la compilación nativa de ES modules en el navegador, lo que resulta en un arranque del servidor de desarrollo casi instantáneo y Hot Module Replacement (HMR) mucho más rápido.

### Consecuencias

- **Positivas**:
  - Mejora drástica en la velocidad del servidor de desarrollo.
  - Configuración más simple y moderna.
  - Experiencia de desarrollo más fluida.
- **Negativas**:
  - Requiere una pequeña curva de aprendizaje para quienes solo conocen CRA.
  - Se invirtió tiempo en la migración inicial.

---

## ADR-002: Estrategia Híbrida para Generación de Contenido con IA

- **Fecha**: 2025-07-20
- **Estado**: Aceptado

### Contexto

La generación de mazos de tarjetas se basa en la API de OpenAI. Una estrategia de "generación bajo demanda" pura podría ser costosa y lenta si muchos usuarios solicitan los mismos temas. Una estrategia de "generación masiva offline" podría retrasar el lanzamiento y generar contenido que nadie usa.

### Decisión

Se implementó un **modelo híbrido con cacheo incremental en Firestore**. Cuando un usuario solicita un mazo con una combinación de `topic` y `count` específica, la Cloud Function:
1.  Busca en la colección `deckCache` si ya existe una respuesta para esa combinación.
2.  Si existe, la devuelve inmediatamente, ahorrando costos y tiempo.
3.  Si no existe, llama a la API de OpenAI, devuelve el resultado al usuario y **guarda la nueva respuesta en `deckCache`** para futuras solicitudes.

Además, los mazos generados se guardan en la colección `decks` asociados a un `ownerId`.

### Consecuencias

- **Positivas**:
  - Optimización de costos de la API de OpenAI a largo plazo.
  - Mejora de la velocidad de respuesta para temas populares.
  - La base de datos de contenido se construye orgánicamente con base en la demanda real.
- **Negativas**:
  - Lógica de backend ligeramente más compleja (requiere la gestión de dos colecciones).

---

## ADR-003: Autenticación con Firebase y Google SSO

- **Fecha**: 2025-07-21
- **Estado**: Aceptado

### Contexto

Para que los usuarios puedan tener colecciones de mazos personales, es necesario un sistema de autenticación. Se necesita una solución que sea segura, escalable y fácil de implementar para un MVP.

### Decisión

Se decidió utilizar **Firebase Authentication**, comenzando con **Google Sign-In (SSO)** como el único proveedor de identidad. La gestión del estado de autenticación en el frontend se maneja a través de un `AuthContext` de React, y las rutas se protegen para que solo los usuarios autenticados puedan acceder al contenido principal.

### Consecuencias

- **Positivas**:
  - Implementación rápida y segura, aprovechando la infraestructura de Google.
  - Experiencia de usuario sin fricciones (los usuarios no necesitan crear una nueva contraseña).
  - Fácilmente extensible a otros proveedores (Facebook, Apple, etc.) en el futuro.
- **Negativas**:
  - Crea una dependencia del ecosistema de Google.
