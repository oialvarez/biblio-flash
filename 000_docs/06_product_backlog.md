# Product Backlog: BiblioFlash

Este documento contiene la lista priorizada de funcionalidades (Épicas e Historias de Usuario) que se construirán para BiblioFlash. Sirve como la única fuente de verdad para el equipo de desarrollo sobre qué construir y en qué orden.

## Metodología

Utilizaremos un enfoque ágil. Las historias de usuario se moverán de este backlog a un estado "En Progreso" y luego a "Completado". La prioridad puede cambiar en función de la retroalimentación y las necesidades del negocio.

---

## Épica 1: Sistema de Autenticación y Perfil de Usuario

*Como usuario, quiero poder crear una cuenta y gestionar mi perfil para tener una experiencia personalizada y guardar mi progreso.*

| ID    | Historia de Usuario                                                              | Prioridad |
| :---- | :------------------------------------------------------------------------------- | :-------- |
| **U-1** | Como nuevo usuario, quiero poder registrarme e iniciar sesión con un solo clic usando mi cuenta de Google. | Crítica   |
| **U-2** | Como usuario autenticado, quiero poder cerrar sesión de forma segura.             | Alta      |
| **U-3** | Como usuario registrado, quiero tener una página de perfil básica.                 | Media     |
| **U-4** | Como nuevo usuario, quiero poder registrarme usando mi correo y contraseña.      | Media     |

---

## Épica 2: Gestión y Visualización de Mazos de Tarjetas (Decks)

*Como usuario, quiero poder ver los mazos de tarjetas disponibles y elegir uno para empezar a estudiar.*

| ID    | Historia de Usuario                                                              | Prioridad |
| :---- | :------------------------------------------------------------------------------- | :-------- |
| **D-1** | Como usuario, quiero ver una lista de todos los mazos de tarjetas disponibles.   | Alta      |
| **D-2** | Como usuario, al hacer clic en un mazo, quiero ser llevado a una página de detalle. | Alta      |
| **D-3** | Como usuario, quiero poder crear mis propios mazos de tarjetas personalizados.   | Baja      |

---

## Épica 3: Experiencia de Aprendizaje (Flashcards)

*Como estudiante, quiero una interfaz de flashcards interactiva y efectiva para memorizar vocabulario y pasajes bíblicos.*

| ID    | Historia de Usuario                                                              | Prioridad |
| :---- | :------------------------------------------------------------------------------- | :-------- |
| **F-1** | Como estudiante, quiero poder ver una tarjeta a la vez de un mazo seleccionado.  | Alta      |
| **F-2** | Como estudiante, quiero poder "voltear" la tarjeta para ver la respuesta/traducción. | Alta      |
| **F-3** | Como estudiante, quiero poder escuchar la pronunciación en inglés de la tarjeta. | Alta      |
| **F-4** | Como estudiante, quiero poder calificar mi respuesta (fácil, difícil) para el SRS. | Media     |
| **F-5** | Como estudiante, quiero que la app me muestre las tarjetas usando un algoritmo SRS. | Media     |

---

## Épica 4: Gamificación y Seguimiento del Progreso

*Como usuario, quiero elementos de juego y ver mi progreso para mantenerme motivado a seguir aprendiendo.*

| ID    | Historia de Usuario                                                              | Prioridad |
| :---- | :------------------------------------------------------------------------------- | :-------- |
| **G-1** | Como usuario, quiero ver mi racha de días de estudio en mi perfil.               | Media     |
| **G-2** | Como usuario, quiero ganar puntos o insignias por completar sesiones de estudio. | Baja      |
