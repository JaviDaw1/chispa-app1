# Chispa App

Este proyecto, llamado "Chispa", parece ser una aplicación de citas o coincidencias ("matching") construida con React y Vite. Permite a los usuarios registrarse, crear y editar perfiles, navegar por otros perfiles, dar "Me gusta", recibir notificaciones de "Chispazos" (matches), chatear, configurar preferencias, gestionar usuarios bloqueados y ajustar varias configuraciones.

## Características Principales

Basado en la estructura de archivos y los textos de localización, la aplicación incluye las siguientes funcionalidades:

*   **Autenticación de Usuarios:** Permite a los usuarios registrarse [1-3] e iniciar sesión [4-6]. Incluye funcionalidad para recuperar la contraseña [7-9].
*   **Gestión de Perfiles:** Los usuarios pueden crear [1-3, 10-12], ver [9, 13, 14] y editar su perfil [9, 13, 14]. El perfil incluye información básica (nombre, apellido, género, fecha de nacimiento, ubicación), biografía e intereses [1-3, 10-12]. Se muestra el estado de conexión del usuario (en línea, última conexión) [9, 13, 14].
*   **Descubrimiento de Perfiles:** Los usuarios pueden navegar y dar "Me gusta" a otros perfiles ("Swipe") [15-17].
*   **Chispazos (Matches):** Se notifica a los usuarios cuando hay un "Chispazo" (coincidencia) [15-17]. Se puede ver una lista de "Chispazos" [4-6, 15-17].
*   **Mensajería (Chats):** Los usuarios pueden chatear con sus "Chispazos" [4-6, 18-20]. Incluye envío de mensajes, visualización de mensajes leídos y scroll automático [21]. Se usa WebSocket para la comunicación en tiempo real, con un fallback a HTTP si no está disponible [22, 23].
*   **Preferencias:** Los usuarios pueden configurar sus preferencias de búsqueda, como género de interés, rango de edad y distancia máxima [18-20, 24]. Se muestra una alerta si las preferencias no están configuradas [18, 20, 25].
*   **Gestión de Bloqueos:** Los usuarios pueden bloquear a otros usuarios [25-30] (desde el chat o el swipe) [27, 30-34] y ver una lista de usuarios bloqueados, con la opción de desbloquearlos [25-30].
*   **Configuración:** Página dedicada a gestionar la cuenta y preferencias, incluyendo seguridad (cambio de contraseña), idioma, notificaciones, usuarios bloqueados, documentación y soporte [20, 25, 26, 35].
*   **Internacionalización (i18n):** La aplicación soporta múltiples idiomas (Inglés, Español, Francés) [4-6, 36].
*   **Cambio de Tema:** Permite alternar entre modo claro y oscuro [28, 37].
*   **Manejo de Errores:** Incluye páginas y componentes para errores (ej. 404, errores de validación de formularios, errores de carga) [38-44].

## Tecnologías Utilizadas

El proyecto está construido utilizando las siguientes tecnologías y librerías:

*   **Frontend:**
    *   **React** [45]
    *   **Vite** [45]
    *   **Tailwind CSS** para estilos [45]
    *   **React Router DOM** para navegación [46]
    *   **i18next** y **react-i18next** para internacionalización [45]
    *   **Lucide React** para iconos [46]
    *   **Framer Motion** para animaciones (usado en notificaciones) [46, 47]
    *   **Axios** para peticiones HTTP [45]
    *   **jwt-decode** para manejar tokens JWT [46]
    *   **react-swipeable** para la funcionalidad de swipe en la página principal [46, 48]
    *   **react-toastify** para notificaciones flotantes [46]
    *   **SockJS-client** y **stompjs** para comunicación WebSocket [46]
*   **Herramientas de Desarrollo:**
    *   **ESLint** para análisis de código [46]

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente [49, 50]:

└── ./
├── public
│   ├── css
│   │   └── output.css
│   ├── images
│   │   ├── flags
│   │   │   ├── en.png
│   │   │   ├── es.png
│   │   │   └── fr.png
│   │   ├── logo_inverted.png
│   │   ├── logo_transparent.png
│   │   └── logo.jpg
│   ├── locales
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   └── vite.svg
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Alert.jsx
│   │   ├── ChatsCard.jsx
│   │   ├── Divider.jsx
│   │   ├── EditProfileForm.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── MatchCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Notification.jsx
│   │   ├── PrimaryButton.jsx
│   │   ├── ProfileField.jsx
│   │   ├── ProfileSection.jsx
│   │   ├── SettingItem.jsx
│   │   ├── Sparkle.jsx
│   │   └── ThemeSwitcher.jsx
│   ├── context
│   │   └── ThemeContext.jsx
│   ├── pages
│   │   ├── BlockedUsers.jsx
│   │   ├── ChangePassword.jsx
│   │   ├── Chat.jsx
│   │   ├── ChatsPage.jsx
│   │   ├── CreateProfile.jsx
│   │   ├── Error404.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── HomePage.jsx
│   │   ├── Language.jsx
│   │   ├── Login.jsx
│   │   ├── Match.jsx
│   │   ├── Preference.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── SignUp.jsx
│   ├── services
│   │   ├── api.js
│   │   ├── AuthService.js
│   │   ├── BlocksService.js
│   │   ├── LikesService.js
│   │   ├── MatchService.js
│   │   ├── MessagesService.js
│   │   ├── PreferenceService.js
│   │   └── ProfileService.js
│   ├── App.jsx
│   ├── i18n.js
│   ├── input.css
│   └── main.jsx
├── .eslintrc.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js

## Configuración y Ejecución

Para configurar y ejecutar el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio:** (Esto no está en las fuentes, es un paso estándar, pero se incluye por contexto)
    ```bash
    git clone <url_del_repositorio>
    cd chispa-app
    ```
2.  **Instalar dependencias:** Utiliza npm o yarn para instalar los paquetes listados en `package.json` [45].
    ```bash
    npm install
    # o yarn install
    ```
3.  **Compilar CSS de Tailwind:** Asegúrate de que Tailwind CSS esté compilado.
    ```bash
    npm run css
    # o yarn css
    ```
    *(Nota: Es posible que debas ejecutar este comando en una terminal separada durante el desarrollo o configurarlo para que se ejecute automáticamente con el servidor de desarrollo).*
4.  **Ejecutar el proyecto en modo desarrollo:** Inicia el servidor de desarrollo con Vite.
    ```bash
    npm run dev
    # o yarn dev
    ```
    Esto iniciará la aplicación, generalmente accesible en `http://localhost:5173/`.
5.  **Construir el proyecto para producción:** Para generar una versión optimizada para producción.
    ```bash
    npm run build
    # o yarn build
    ```
6.  **Previsualizar la versión de producción:**
    ```bash
    npm run preview
    # o yarn preview
    ```

*(Nota: Las URLs de servicio apuntan a `http://localhost:8080` [22, 51]. Deberás tener un backend ejecutándose en esa dirección para que la aplicación funcione completamente. La configuración de dicho backend no está detallada en estas fuentes).*

## Internacionalización

La aplicación incluye soporte para los siguientes idiomas, definidos en los archivos de localización [4-6]:

*   Español (`es.json`)
*   Inglés (`en.json`)
*   Francés (`fr.json`)

Los usuarios pueden seleccionar su idioma preferido desde la configuración [25, 26, 29].

## Tema Oscuro / Claro

La aplicación permite a los usuarios alternar entre un tema de color oscuro y uno claro, lo cual se puede configurar en la sección de ajustes [28, 37]. La configuración se guarda en el almacenamiento local del navegador [37].

## Soporte y Documentación

Según la configuración, existen enlaces teóricos a secciones de Documentación y Soporte/Ayuda [26, 28, 29].