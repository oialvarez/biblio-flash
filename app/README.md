# BiblioFlash: Web App (React + Vite)

Este directorio (`/app`) contiene el código fuente de la Progressive Web App (PWA) de BiblioFlash, construida con React y Vite.

## 1. Visión del Proyecto

BiblioFlash es una aplicación diseñada para ayudar a hispanohablantes a aprender inglés bíblico a través de un sistema de flashcards interactivo y gamificado. Para una visión completa, la arquitectura y el backlog del producto, por favor consulta la documentación principal en la carpeta `../000_docs`.

## 2. Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: La versión está especificada en el archivo `.nvmrc`.
- **nvm (Node Version Manager)**: Recomendado para gestionar la versión de Node.js y asegurar la consistencia del entorno.

## 3. Configuración del Entorno

Sigue estos pasos para poner en marcha el entorno de desarrollo local:

1.  **Clonar el repositorio** (si aún no lo has hecho).
2.  **Navegar a la carpeta de la app**:
    ```bash
    cd app
    ```
3.  **Establecer la versión de Node.js correcta**:
    ```bash
    nvm use
    ```
4.  **Instalar las dependencias del proyecto**:
    ```bash
    npm install
    ```
5.  **Configurar las variables de entorno**:
    - Crea una copia del archivo de ejemplo: `cp .env.local.example .env.local`
    - Abre el nuevo archivo `.env.local` y rellena las credenciales de tu proyecto de Firebase. Estas claves son seguras y no se subirán al repositorio.

## 4. Ejecutar el Proyecto

Una vez configurado el entorno, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo con Hot-Module Replacement (HMR). Abre tu navegador en la URL que te indique la terminal (normalmente `http://localhost:5173`).

## 5. Estructura y Arquitectura

El proyecto sigue los principios de **Clean Architecture**, **SOLID** y **DRY**. Nuestra estructura de carpetas refleja esta filosofía:

-   `src/components`: Componentes de React reutilizables (la capa de **Presentación**).
-   `src/pages`: Componentes que representan las páginas de la aplicación (también **Presentación**).
-   `src/hooks`: Hooks personalizados que encapsulan la lógica de los casos de uso (la capa de **Aplicación**).
-   `src/services`: Módulos que interactúan con servicios externos como Firebase (la capa de **Infraestructura**).
-   `src/styles`: Estilos globales y variables de CSS.

Para más detalles sobre nuestros principios de arquitectura, consulta el documento `02_arquitectura_tecnica.md` en la carpeta `../000_docs`.
