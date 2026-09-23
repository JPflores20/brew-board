# 🍻 Brew Board

![Project Status](https://img.shields.io/badge/Status-In_Development-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-Powered-brightgreen)

**Brew Board** es una aplicación moderna, rápida y multiplataforma diseñada para la web y dispositivos móviles, construida con las últimas tecnologías del ecosistema de React. Utiliza una arquitectura robusta apoyada en **TanStack Start**, **Firebase** y empaquetada para Android usando **Capacitor**.

---

## 🚀 Características Principales

*   **Experiencia Multiplataforma:** Desarrollado pensando en la web y dispositivos móviles (Android) desde un único código base utilizando **Capacitor**.
*   **Enrutamiento y Estado de Servidor:** Utiliza **TanStack Router** y **TanStack Start** para un enrutamiento tipo archivo robusto y un manejo eficiente de las interacciones con el servidor.
*   **Manejo Eficiente del Estado:** Carga y sincronización de datos asíncronos super-potenciados con **TanStack Query**.
*   **Backend como Servicio:** Autenticación y base de datos gestionada completamente por **Firebase** (Firestore).
*   **Diseño Hermoso y Accesible:** Interfaz de usuario construida con **Tailwind CSS v4** y componentes accesibles impulsados por **Radix UI** (estilo shadcn/ui).
*   **Animaciones y Transiciones Fluidas:** Interacciones dinámicas implementadas con **Framer Motion**.
*   **Validación y Formularios:** Manejo de estado de formularios seguro y fuertemente tipado con **React Hook Form** y validación por **Zod**.
*   **Progressive Web App (PWA):** Soporte integrado para ser instalado como una PWA.

---

## 🛠️ Tecnologías (Tech Stack)

### Core
*   [React 19](https://react.dev/) - Biblioteca para construir interfaces de usuario.
*   [TypeScript](https://www.typescriptlang.org/) - JavaScript con tipado estático.
*   [Vite](https://vitejs.dev/) - Entorno de desarrollo ultrarrápido y empaquetador.

### Ecosistema TanStack
*   [TanStack Start](https://tanstack.com/start/latest) - Framework Full-Stack de React.
*   [TanStack Router](https://tanstack.com/router/latest) - Enrutamiento para aplicaciones React.
*   [TanStack Query](https://tanstack.com/query/latest) - Manejo de estado asíncrono y llamadas a la API.

### UI & Estilos
*   [Tailwind CSS v4](https://tailwindcss.com/) - Framework de utilidades CSS.
*   [Radix UI](https://www.radix-ui.com/) - Primitivas de UI sin estilo y accesibles.
*   [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animación para React.
*   [Lucide React](https://lucide.dev/) - Iconografía moderna.
*   [Sonner](https://sonner.emilkowal.ski/) - Componente de notificaciones tipo Toast.

### Backend & Móvil
*   [Firebase](https://firebase.google.com/) - Hosting, base de datos en tiempo real (Firestore) y más.
*   [Capacitor](https://capacitorjs.com/) - Runtime multiplataforma nativo para web.

---

## 📂 Estructura del Proyecto

```text
brew-board/
├── android/             # Proyecto nativo de Android generado por Capacitor
├── public/              # Archivos estáticos públicos (imágenes, iconos, etc.)
├── src/                 # Código fuente principal de la aplicación
│   ├── components/      # Componentes de UI reutilizables (Botones, Modales, etc.)
│   ├── hooks/           # Custom React hooks (ej. useDashboardConfig.ts)
│   ├── routes/          # Rutas de la aplicación (TanStack Router)
│   └── ...              # Utilidades, lib, configuraciones.
├── .firebaserc          # Configuración del proyecto de Firebase
├── capacitor.config.ts  # Configuración principal de Capacitor para builds móviles
├── firebase.json        # Configuración de despliegue de Firebase
├── firestore.rules      # Reglas de seguridad de Firebase Firestore
├── package.json         # Dependencias y scripts del proyecto
└── vite.config.ts       # Configuración de Vite y plugins
```

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

*   **Node.js** (Versión 18+ recomendada)
*   **npm** o **bun** o **yarn** (El proyecto tiene un `bun.lock`, por lo que se recomienda usar [Bun](https://bun.sh/))
*   **Android Studio** (Si planeas construir y probar la aplicación de Android)

---

## 📦 Instalación y Desarrollo Local

1.  **Clonar el repositorio**
    ```bash
    git clone <url-del-repositorio>
    cd brew-board
    ```

2.  **Instalar las dependencias**
    Puedes usar tu gestor de paquetes favorito, pero usando bun:
    ```bash
    bun install
    # o npm install
    ```

3.  **Iniciar el servidor de desarrollo**
    ```bash
    bun run dev
    # o npm run dev
    ```
    La aplicación estará disponible localmente, generalmente en `http://localhost:5173`.

---

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos (usando `npm run <script>` o `bun run <script>`):

*   `dev`: Inicia el servidor de desarrollo Vite con HMR.
*   `build`: Construye la aplicación para producción.
*   `build:dev`: Construye la aplicación en modo desarrollo.
*   `preview`: Inicia un servidor web local para previsualizar la compilación de producción.
*   `lint`: Ejecuta ESLint para buscar errores y problemas de código en el proyecto.
*   `format`: Usa Prettier para dar un formato consistente a todos los archivos.

---

## 📱 Desarrollo Móvil (Android con Capacitor)

Para trabajar con la parte nativa de Android:

1. Asegúrate de haber compilado la aplicación web primero:
   ```bash
   bun run build
   ```
2. Sincroniza los archivos web compilados con el proyecto de Android:
   ```bash
   npx cap sync android
   ```
3. Abre el proyecto en Android Studio:
   ```bash
   npx cap open android
   ```

---

## ☁️ Backend y Despliegue (Firebase)

Este proyecto utiliza Firebase. Asegúrate de tener el CLI de Firebase instalado (`npm install -g firebase-tools`).

*   **Reglas de Firestore:** Las reglas de seguridad de tu base de datos se encuentran en `firestore.rules`.
*   **Despliegue de Hosting:** El despliegue a Firebase Hosting se define en `firebase.json`.

Para desplegar a producción (una vez que hayas configurado tu proyecto de Firebase):
```bash
firebase deploy
```

---

## 🧑‍💻 Autores y Contribuciones

Proyecto en desarrollo. Las contribuciones, problemas (issues) y sugerencias (feature requests) son bienvenidos. 
