# Requisitos del Producto: BiblioFlash

Este documento detalla los requisitos funcionales y no funcionales para la aplicación **BiblioFlash**. Se basa en la visión del proyecto y las funcionalidades.

## 1. Funcionalidades Principales (Core Features)

### 1.1. Módulo de Aprendizaje con Flashcards
- **Contenido**: 5,000+ flashcards con vocabulario y frases bíblicas.
- **Interactividad**:
  - **Frente**: Palabra o frase en inglés.
  - **Dorso**: Traducción al español, definición clara y versículo de ejemplo en contexto.
  - **Audio**: Pronunciación de alta calidad para cada palabra/frase en inglés, grabada por un hablante nativo.
- **Sistema de Repetición Espaciada (SRS)**: Implementar un algoritmo (similar a SM-2) para optimizar la memorización, presentando las tarjetas más difíciles con mayor frecuencia.

### 1.2. Biblioteca de Contenido Bíblico
- **Salmos y Proverbios**: Acceso completo a todos los Salmos y Proverbios.
- **Múltiples Versiones**: Permitir al usuario cambiar entre versiones de la Biblia (ej. KJV, NVI en inglés; RVR1960, NVI en español).
- **Lectura Bilingüe**: Opción para ver el texto en inglés y español en paralelo.

### 1.3. Búsqueda y Navegación
- **Búsqueda Global**: Buscar palabras, frases o temas en toda la base de datos de la aplicación (flashcards, Salmos, Proverbios).
- **Filtros**: Filtrar contenido por libro de la Biblia, tema (ej. "Fe", "Perdón") o dificultad.

### 1.4. Gestión de Usuarios y Autenticación
- **Cuentas de Usuario**: Los usuarios deben poder registrarse, iniciar sesión y cerrar sesión de forma segura.
- **Proveedores de Identidad**: Soportar inicialmente el inicio de sesión único (SSO) con **Google**. Otros proveedores (Facebook, etc.) y el registro con correo/contraseña se considerarán en futuras iteraciones.
- **Persistencia de Datos**: La cuenta de usuario es fundamental para guardar el progreso, los mazos personalizados y las preferencias a través de múltiples dispositivos.

## 2. Funcionalidades de Soporte y Gamificación

### 2.1. Seguimiento del Progreso del Usuario
- **Panel de Control**: Mostrar estadísticas como palabras aprendidas, racha de estudio diario y tiempo de estudio.
- **Historial de Repaso**: Visualizar las palabras y frases repasadas.

### 2.2. Personalización
- **Mazos Personalizados**: Permitir a los usuarios crear y gestionar sus propios mazos de flashcards.
- **Favoritos**: Marcar palabras, frases o Salmos como favoritos para un acceso rápido.
- **Ajustes de Estudio**: Configurar el número de tarjetas por sesión y la velocidad de las transiciones.

### 2.3. Gamificación
- **Rachas (Streaks)**: Recompensar la consistencia en el estudio diario.
- **Insignias y Logros**: Otorgar insignias por alcanzar hitos (ej. "100 palabras aprendidas", "Primer Salmo completado").

## 3. Características Adicionales (Propuestas de Valor)

- **Modos de Estudio Alternativos**: 
  - **Modo Quiz**: Pruebas de opción múltiple y rellenar espacios en blanco.
  - **Modo Escucha**: Solo audio para practicar la comprensión auditiva.
- **Comparación de Pronunciación**: (Técnicamente avanzado) Permitir al usuario grabar su voz y compararla con la pronunciación nativa.
- **Contenido Contextual**: Pequeños artículos explicando la relevancia teológica de ciertas palabras clave (ej. "Covenant").

## 4. Requisitos No Funcionales

### 4.1. Diseño y Experiencia de Usuario (UI/UX)
- **Interfaz**: Limpia, intuitiva y estéticamente agradable. Paleta de colores: Morado, blanco, verde claro y celeste.
- **Experiencia**: Fluida, sin demoras y con transiciones suaves.

### 4.2. Técnicos
- **Plataforma**: Firebase (Firestore, Authentication, Storage, Functions).
- **Acceso Offline**: El contenido principal (mazos descargados, progreso) debe estar disponible sin conexión a internet.
- **Sincronización**: El progreso del usuario, notas y favoritos deben sincronizarse en la nube a través de su cuenta.

### 4.3. Monetización
- **Modelo Freemium**: 
  - **Gratuito**: Acceso a un número limitado de mazos y funcionalidades básicas.
  - **Premium (Suscripción)**: Acceso ilimitado a todo el contenido, modos de estudio avanzados y creación de mazos ilimitados.
