# Product Backlog: BiblioFlash

Este documento es la única fuente de verdad para el proyecto BiblioFlash. Contiene la lista priorizada de funcionalidades (Épicas e Historias de Usuario), su estado y el camino a seguir.

## Metodología

Utilizaremos un enfoque ágil. Las historias se mueven de `Pendiente` a `En Progreso` y finalmente a `Completado`. La prioridad puede cambiar en función de la retroalimentación y las necesidades del proyecto.

---

## Épica 0: Fundación y Despliegue (Completada)

*Como equipo de desarrollo, necesitábamos una infraestructura robusta, un entorno de desarrollo consistente y un backend funcional en la nube para poder construir la aplicación.*

| ID | Historia de Usuario | Prioridad | Estado |
| :-- | :------------------------------------------------------------------------------------------------ | :-------- | :--- |
| **INF-1** | Configurar y asegurar el proyecto de Firebase (Firestore, Storage, Hosting). | Crítica | ✅ Completado |
| **INF-2** | Establecer un frontend moderno y rápido con Vite y React. | Crítica | ✅ Completado |
| **INF-3** | Estandarizar el entorno de desarrollo con NVM y `.nvmrc`. | Crítica | ✅ Completado |
| **INF-4** | Crear la estructura base del frontend (carpetas, layout, enrutamiento). | Crítica | ✅ Completado |
| **INF-5** | Implementar una Cloud Function (`generateDeckV2`) para generar mazos con OpenAI. | Crítica | ✅ Completado |
| **INF-6** | Asegurar la clave de API de OpenAI usando Firebase Secret Manager. | Crítica | ✅ Completado |
| **INF-7** | Implementar una estrategia de cacheo en Firestore para la función. | Crítica | ✅ Completado |
| **INF-8** | Desplegar exitosamente la Cloud Function a producción. | Crítica | ✅ Completado |

---

## Épica 1: Sistema de Autenticación y Perfil de Usuario

*Como usuario, quiero poder crear una cuenta y gestionar mi perfil para tener una experiencia personalizada y guardar mi progreso.*

| ID | Historia de Usuario | Prioridad | Estado |
| :-- | :------------------------------------------------------------------------------- | :-------- | :--- |
| **U-1** | Como nuevo usuario, quiero poder registrarme e iniciar sesión con un solo clic usando mi cuenta de Google. | Crítica | ⏳ Pendiente |
| **U-2** | Como usuario autenticado, quiero poder cerrar sesión de forma segura.             | Alta      | ⏳ Pendiente |
| **U-3** | Como usuario registrado, quiero tener una página de perfil básica.                 | Media     | ⏳ Pendiente |
| **U-4** | Como nuevo usuario, quiero poder registrarme usando mi correo y contraseña.      | Media     | ⏳ Pendiente |

---

## Épica 2: Gestión y Visualización de Mazos de Tarjetas (Decks)

*Como usuario, quiero poder ver los mazos de tarjetas disponibles, elegir uno para empezar a estudiar y solicitar la creación de nuevos mazos.*

| ID | Historia de Usuario | Prioridad | Estado |
| :-- | :------------------------------------------------------------------------------- | :-------- | :--- |
| **D-1** | Como usuario, quiero ver una lista de todos los mazos de tarjetas disponibles leídos desde Firestore.   | Alta      | ⏳ Pendiente |
| **D-2** | Como usuario, quiero poder solicitar la generación de un nuevo mazo (UI para llamar a `generateDeckV2`). | Alta      | ⏳ Pendiente |
| **D-3** | Como usuario, al hacer clic en un mazo, quiero ser llevado a una página de detalle del mazo. | Alta      | ⏳ Pendiente |
| **D-4** | Como usuario, quiero poder crear mis propios mazos de tarjetas personalizados.   | Baja      | ⏳ Pendiente |

---

## Épica 3: Experiencia de Aprendizaje (Flashcards)

*Como estudiante, quiero una interfaz de flashcards interactiva y efectiva para memorizar vocabulario y pasajes bíblicos.*

| ID | Historia de Usuario | Prioridad | Estado |
| :-- | :------------------------------------------------------------------------------- | :-------- | :--- |
| **F-1** | Como estudiante, quiero poder ver una tarjeta a la vez de un mazo seleccionado.  | Alta      | ⏳ Pendiente |
| **F-2** | Como estudiante, quiero poder "voltear" la tarjeta para ver la respuesta/traducción. | Alta      | ⏳ Pendiente |
| **F-3** | Como estudiante, quiero poder escuchar la pronunciación en inglés de la tarjeta. | Alta      | ⏳ Pendiente |
| **F-4** | Como estudiante, quiero poder calificar mi respuesta (fácil, difícil) para el SRS. | Media     | ⏳ Pendiente |
| **F-5** | Como estudiante, quiero que la app me muestre las tarjetas usando un algoritmo SRS. | Media     | ⏳ Pendiente |

---

## Épica 4: Gamificación y Seguimiento del Progreso

*Como usuario, quiero elementos de juego y ver mi progreso para mantenerme motivado a seguir aprendiendo.*

| ID | Historia de Usuario | Prioridad | Estado |
| :-- | :------------------------------------------------------------------------------- | :-------- | :--- |
| **G-1** | Como usuario, quiero ver mi racha de días de estudio en mi perfil.               | Media     | ⏳ Pendiente |
| **G-2** | Como usuario, quiero ganar puntos o insignias por completar sesiones de estudio. | Baja      | ⏳ Pendiente |
