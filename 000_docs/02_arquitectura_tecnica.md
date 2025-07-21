# Arquitectura Técnica: BiblioFlash

Este documento describe la arquitectura técnica propuesta para la aplicación **BiblioFlash**, construida sobre la plataforma de **Google Firebase**.

> **Nota Arquitectónica Importante**: Las decisiones clave de arquitectura, como la estrategia de generación de datos y la autenticación, se registran en el [**Registro de Decisiones de Arquitectura (ADR)](./04_adr.md)**. Se recomienda consultarlo para entender el *porqué* de la estructura actual.

## 1. Diagrama de Arquitectura General

```
+-----------------------+      +---------------------------+      +-----------------------+
|      App Cliente      |      |     Backend (Firebase)    |      |    Servicios Externos   |
| (React.js PWA)        |      |                           |      | (Ej. Text-to-Speech)  |
+-----------------------+      +---------------------------+      +-----------------------+
        |                                 |                                 |
        |------------- HTTPS ------------->| Firebase Authentication       |                                 |
        |                                 | (Login, Registro)             |                                 |
        |                                 +---------------------------+                                 |
        |                                 |                                 |                                 |
        |----------- Firestore SDK ------->| Cloud Firestore               |                                 |
        | (Lectura/Escritura de datos)    | (DB NoSQL en tiempo real)     |                                 |
        |                                 +---------------------------+                                 |
        |                                 |                                 |                                 |
        |----------- Storage SDK -------->| Cloud Storage for Firebase    |                                 |
        | (Subida/Descarga de audios)     | (Almacenamiento de archivos)  |                                 |
        |                                 +---------------------------+                                 |
        |                                 |                                 |                                 |
        |------------- HTTPS ------------->| Cloud Functions for Firebase  |---------- API Call --------->|
        | (Lógica de negocio compleja)    | (Backend sin servidor)        |                                 |
        +---------------------------------+---------------------------+---------------------------------+

```

## 2. Componentes de Firebase

### 2.1. **Firebase Authentication**
- **Propósito**: Gestionar la identidad de los usuarios.
- **Implementación (Actual)**: Para el MVP, se ha implementado la autenticación exclusivamente a través de **Google Sign-In (SSO)**. La lógica de autenticación en el frontend está encapsulada en un **Contexto de React (`AuthContext.jsx`)**, que provee un hook `useAuth()` para que cualquier componente pueda acceder al estado del usuario (`currentUser`) y a las funciones de `loginWithGoogle` y `logout`. Este enfoque centraliza la gestión de la sesión del usuario.

### 2.2. **Cloud Firestore**
- **Propósito**: Base de datos principal de la aplicación (NoSQL).
- **Implementación**: Almacenará todos los datos de la aplicación, incluyendo:
  - El contenido de las flashcards (palabras, traducciones, ejemplos).
  - Los textos de los Salmos y Proverbios.
  - Los datos del perfil del usuario (progreso, rachas, insignias).
  - Las notas y mazos personalizados de los usuarios.
- **Ventajas**: Sincronización en tiempo real, capacidades offline robustas y un modelo de seguridad granular.

### 2.3. **Cloud Storage for Firebase**
- **Propósito**: Almacenamiento de archivos multimedia.
- **Implementación**: Se utilizará para almacenar todos los archivos de audio (`.mp3`) de las pronunciaciones en inglés. La aplicación cliente descargará estos archivos bajo demanda para su reproducción.

### 2.4. **Cloud Functions for Firebase**
- **Propósito**: Ejecutar lógica de backend sin necesidad de gestionar un servidor.
- **Implementación**: Se utilizarán para tareas como:
  - **Procesamiento de datos**: Lógica para el algoritmo de repetición espaciada si es muy compleja para el cliente.
  - **Notificaciones Push**: Enviar recordatorios de estudio a los usuarios.
  - **Integraciones con APIs de terceros**: Por ejemplo, si se decide usar una API de Text-to-Speech para generar audios dinámicamente.
  - **Mantenimiento**: Tareas programadas para actualizar o limpiar datos.

## 3. Frontend (Aplicación Cliente)

- **Framework Propuesto**: Se utilizará **React.js** para construir una Progressive Web App (PWA).
- **Ventajas**: 
  - **Base de código única**: Desarrollar una sola vez para iOS y Android, reduciendo el tiempo y el costo.
  - **Integración nativa**: Excelente integración con los SDK de Firebase.
  - **Rendimiento**: Ofrecen un rendimiento cercano al nativo y una experiencia de usuario fluida.

## 4. Flujo de Datos (Ejemplo: Sesión de Estudio)

1.  Un usuario no autenticado que intenta acceder a una ruta protegida (ej. `/decks`) es redirigido a `/login`.
2.  En la página de login, el usuario hace clic en "Iniciar sesión con Google".
3.  Se invoca la función `loginWithGoogle` del `AuthContext`, que abre la ventana emergente de Google para la autenticación.
4.  Una vez que Firebase confirma la autenticación exitosa, el observador `onAuthStateChanged` en el `AuthContext` actualiza el estado `currentUser`.
5.  El cambio en `currentUser` provoca que el enrutador principal redirija al usuario desde `/login` a la página principal de la aplicación (`/`).
2.  La app cliente consulta **Cloud Firestore** para obtener el mazo de flashcards del día, basado en el progreso del usuario y el algoritmo de repetición espaciada.
3.  Para cada flashcard, la app muestra la palabra/frase en inglés.
4.  Cuando el usuario lo solicita, la app reproduce el audio de la pronunciación, obteniendo el archivo `.mp3` desde **Cloud Storage**.
5.  El usuario califica la dificultad de la tarjeta.
6.  La app cliente actualiza el progreso del usuario en **Cloud Firestore**, y esta información se sincroniza automáticamente en todos sus dispositivos.

## 5. Principios de Diseño y Arquitectura

Para asegurar que BiblioFlash sea una aplicación mantenible, escalable y robusta, nos comprometemos a seguir los siguientes principios de diseño de software:

### 5.1. **Clean Architecture (Arquitectura Limpia)**
Adoptaremos una separación de capas para desacoplar la lógica de negocio de los detalles de implementación (frameworks, UI, base de datos).

- **Presentation (UI)**: Nuestros componentes de React (`pages`, `components`). Su única responsabilidad es mostrar la interfaz y capturar la interacción del usuario.
- **Application (Casos de Uso)**: La lógica que orquesta el flujo de datos. Esto se implementa a través de **hooks de React personalizados**. Ya hemos aplicado este patrón con nuestro hook `useAuth()`, que expone el caso de uso de la autenticación a la UI.
- **Domain (Entidades)**: Las reglas de negocio y entidades centrales (ej. `Deck`, `Card`, `User`). Serán objetos simples sin dependencias externas.
- **Infrastructure (Infraestructura)**: Los detalles externos. Nuestro directorio `src/services` es la implementación de esta capa, donde aislamos toda la comunicación con Firebase (Firestore, Auth, etc.).

De esta manera, nuestros componentes de UI no sabrán que usan Firebase; solo llamarán a un hook, que a su vez usará un servicio. Esto nos permitiría, en el futuro, cambiar de base de datos modificando solo la capa de infraestructura.

### 5.2. **Principios SOLID**
- **S - Principio de Responsabilidad Única**: Cada componente, hook o función tendrá una única razón para cambiar. El refactor que hicimos para crear `DeckCard` a partir de `DeckList` es un ejemplo perfecto de este principio en acción.
- **O - Principio de Abierto/Cerrado**: Nuestras entidades de software estarán abiertas a la extensión, pero cerradas a la modificación. Usaremos la composición de componentes y props para extender la funcionalidad sin alterar el código existente.
- **L - Principio de Sustitución de Liskov**: Aseguraremos que los componentes derivados puedan ser usados en lugar de sus componentes base sin alterar el comportamiento del programa.
- **I - Principio de Segregación de Interfaces**: Los componentes no dependerán de props que no utilizan. Definiremos interfaces de props claras y concisas.
- **D - Principio de Inversión de Dependencias**: Los componentes de alto nivel (páginas) no dependerán directamente de los de bajo nivel (servicios de Firebase), sino de abstracciones (hooks). 

### 5.3. **DRY (Don't Repeat Yourself - No te repitas)**
Evitaremos activamente la duplicación de código mediante la creación de componentes reutilizables, hooks personalizados y funciones de utilidad, manteniendo una base de código más limpia y fácil de mantener.
