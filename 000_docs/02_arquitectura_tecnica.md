# Arquitectura Técnica: BiblioFlash

Este documento describe la arquitectura técnica propuesta para la aplicación **BiblioFlash**, construida sobre la plataforma de **Google Firebase**.

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
- **Implementación**: Se utilizarán proveedores de identidad como Google, Facebook y correo/contraseña para facilitar el registro y el inicio de sesión. Esto nos permitirá asociar los datos del usuario (progreso, favoritos, etc.) a una cuenta única y segura.

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

1.  El usuario inicia sesión a través de **Firebase Authentication**.
2.  La app cliente consulta **Cloud Firestore** para obtener el mazo de flashcards del día, basado en el progreso del usuario y el algoritmo de repetición espaciada.
3.  Para cada flashcard, la app muestra la palabra/frase en inglés.
4.  Cuando el usuario lo solicita, la app reproduce el audio de la pronunciación, obteniendo el archivo `.mp3` desde **Cloud Storage**.
5.  El usuario califica la dificultad de la tarjeta.
6.  La app cliente actualiza el progreso del usuario en **Cloud Firestore**, y esta información se sincroniza automáticamente en todos sus dispositivos.
