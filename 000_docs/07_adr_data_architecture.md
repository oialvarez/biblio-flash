# ADR-001: Arquitectura de Datos Inicial

- **Título**: Arquitectura de Datos Inicial - Generación Bajo Demanda vía OpenAI
- **Fecha**: 2025-07-21
- **Estado**: Aceptado

## Contexto

El núcleo de BiblioFlash es su vasto contenido de flashcards, que debe ser flexible y escalable. Se evaluaron dos enfoques principales:

1.  **Modelo Pre-poblado (Híbrido)**: Generar todo el contenido de flashcards masivamente con OpenAI, validarlo y almacenarlo en Firestore para que la app lo consuma desde allí.
2.  **Modelo Bajo Demanda**: Generar el contenido de las flashcards en tiempo real a través de una llamada a la API de OpenAI cada vez que el usuario lo necesite.

El conflicto principal radica en el balance entre **costo/rendimiento/calidad** (Modelo Híbrido) vs. **velocidad de desarrollo y flexibilidad inicial** (Modelo Bajo Demanda).

## Decisión

Para la fase inicial del producto (MVP), adoptaremos el **Modelo Bajo Demanda**.

La arquitectura será la siguiente:
1.  La aplicación cliente (React) solicitará contenido (ej. "un mazo de 10 tarjetas sobre los Salmos").
2.  La solicitud se enviará a una **Cloud Function de Firebase**.
3.  Esta Cloud Function actuará como un backend seguro, llamará a la API de OpenAI con la instrucción precisa y gestionará la clave de la API.
4.  La Cloud Function devolverá el contenido generado por la IA a la aplicación cliente.

### 3.1. Estrategia de Cacheo y Población Gradual

Para optimizar costos y rendimiento a largo plazo, implementaremos una estrategia de cacheo:

1.  **Generar un ID Único**: Para cada solicitud de contenido (ej. "10 tarjetas de Salmos"), la Cloud Function creará un identificador único y determinista.
2.  **Consultar Cache (Firestore)**: Antes de llamar a OpenAI, la función buscará en una colección de Firestore (`generated_content`) un documento con este ID.
3.  **Cache Hit**: Si el documento existe, se devolverá el contenido directamente desde Firestore, evitando el costo y la latencia de la API de OpenAI.
4.  **Cache Miss**: Si el documento no existe, la función llamará a OpenAI. Una vez recibida la respuesta, **la guardará en Firestore** con el ID único antes de devolverla al cliente.

Este enfoque permite que la base de datos de contenido se pueble orgánicamente con el uso, haciendo que la aplicación sea progresivamente más rápida y económica.
5.  **Cloud Firestore** se utilizará exclusivamente para almacenar datos específicos del usuario: su progreso, rachas, mazos personalizados y puntuaciones del SRS.

## Consecuencias

### Positivas
-   **Optimización del Time-to-Market**: Se reduce drásticamente el tiempo de desarrollo inicial al eliminar la necesidad de un proceso masivo de generación, limpieza y carga de datos.
-   **Máxima Flexibilidad**: Permite validar la propuesta de valor del contenido generado por IA directamente con los usuarios.
-   **Bajo Costo de Almacenamiento**: Los costos de Firestore serán mínimos al inicio.

### Negativas y Mitigaciones
-   **Costo de API**: El costo operativo dependerá del uso de la API de OpenAI. **Mitigación**: Se asume que con un número bajo de usuarios iniciales, el costo será manejable y servirá como un indicador del interés en el producto.
-   **Latencia**: La experiencia de usuario tendrá una mayor latencia al generar nuevas tarjetas. **Mitigación**: Se pueden emplear indicadores de carga (`spinners`) y estrategias de precarga para mejorar la percepción de velocidad.
-   **Consistencia de Datos**: Existe el riesgo de "alucinaciones" o respuestas inconsistentes de la IA. **Mitigación**: Se implementarán prompts muy específicos y validaciones en la Cloud Function.

## Plan Futuro (Post-MVP)

Esta arquitectura con cacheo se considera la **solución óptima y evolutiva**. Combina un rápido time-to-market con una auto-optimización a largo plazo. El "Modelo Híbrido" original (generación masiva offline) se convierte en una opción secundaria, a considerar solo si se necesita precargar una cantidad masiva de contenido específico antes del lanzamiento.
