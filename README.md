# Aplicación MVP para generar playlists en Spotify
**Universidad Politécnica de Chiapas**

**Integrantes:**
- Cortés Ruiz Ilya — 243710
- Hernández Muñoz Brittany Aurora — 243707
  
**Grupo 5C**

Dashboard interactivo desarrollado con Next.js y TypeScript. Permite que el usuario inicie sesión con Spotify, configure parámetros de vibra, y generar recomendaciones de canciones por género, permite aceptar o descartar canciones y exportar la selección como playlist a su cuenta de Spotify.

## Arquitectura

```
src/
├── app/
│   ├── page.tsx           # Landing — Login con Spotify
│   ├── dashboard/         # Dashboard principal
│   ├── favorites/         # Vista de canciones aceptadas
│   └── error/             # Página de error de autenticación
├── components/
│   ├── SideBar.tsx        # Navegación lateral
│   ├── TrackCard.tsx      # Card de canción con acciones
│   ├── GenreSelector.tsx  # Selector de géneros (max 5)
│   └── VibeSlider.tsx     # Slider de parámetros de vibra
├── hooks/
│   ├── useGenres.ts       # Fetch de géneros disponibles
│   ├── useRecommendations.ts # Fetch de recomendaciones
│   └── useFavorites.ts    # Gestión de favoritos
├── services/
│   └── api.ts             # Cliente HTTP centralizado
└── types/
    └── index.ts           # Interfaces TypeScript
```

## Requisitos

- Node.js 18+
- npm
- Backend corriendo en `http://127.0.0.1:4000`

## Instalación

```bash
git clone https://github.com/Ilyavosky/SpotifyPlaylistGenerator-FRONTEND.git
cd SpotifyPlaylistGenerator-FRONTEND
git checkout develop
npm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto

## Ejecución

```bash
# Desarrollo (debe correr en 127.0.0.1 para las cookies)
npx next dev -H 127.0.0.1

# Build de producción
npm run build
npm start
```

La app estará disponible en `http://127.0.0.1:3000`.

## Flujo de uso

1. Abre `http://127.0.0.1:3000`
2. Click en **Conectar con Spotify** — redirige a la pantalla de autorización de Spotify
3. Acepta los permisos — el backend setea las cookies y redirige al dashboard
4. En el dashboard:
   - Escribe un nombre para la playlist
   - Selecciona entre 1 y 5 géneros
   - Ajusta los sliders de Energía, Positividad y Bailabilidad
   - Click en **Generar**
5. En las recomendaciones:
   - Click en el corazón para aceptar un track
   - Click en la X para descartarlo
6. Click en **Exportar a Spotify** para crear la playlist en tu cuenta
7. Click en **Ver en Spotify** para abrir la playlist directamente
8. Click en el corazón de la barra lateral para ver todos los favoritos
9. Click en el botón de salida para cerrar sesión

## Declaración de uso de IA

Este proyecto fue desarrollado con asistencia de Claude (Anthropic) como herramienta de apoyo para la generación de código en las partes criticas debido a que la API de Spotify sufrió cambios drásticos, y sigue en desarrollo, muchos endpoints cambiaron y se volvió más estricta. Nuestro equipo revisó, validó, adaptó y comprende todo el código que fue diseñado con el uso de IA 

