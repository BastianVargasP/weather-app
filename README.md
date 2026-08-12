# 🌤️ Weather App

Aplicación web de clima construida con **React** y **Vite**, que permite buscar cualquier lugar del mundo y visualizar su clima actual, pronóstico por hora y pronóstico diario, con soporte para unidades métricas e imperiales.

🔗 **Demo:** [bastianvargasp.github.io/weather-app](https://bastianvargasp.github.io/weather-app)

---

## ✨ Funcionalidades

- **Búsqueda de lugares** en tiempo real mediante la API de geocodificación de Open-Meteo, con lista de resultados desplegable (nombre, país y bandera).
- **Clima actual** de la ubicación seleccionada: temperatura, sensación térmica, humedad, viento y precipitación.
- **Pronóstico diario** de 7 días, con temperatura máxima/mínima e ícono representativo del clima por día.
- **Pronóstico por hora**, con selector de día y arranque desde la medianoche cuando se consulta el día.
- **Cambio de unidades** entre sistema Métrico e Imperial (°C/°F, km/h / mph, mm / in), con selección individual por tipo de unidad si se desea.
- **Estados de carga y error** visuales: overlay con spinner mientras se obtienen los datos, y banner de error si la búsqueda o la petición del clima fallan, sin perder el layout ni el contenido previamente cargado.
- **Diseño responsive**, adaptado desde mobile hasta escritorio (breakpoint principal en 1200px).

---

## 🛠️ Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (usando [rolldown-vite](https://vite.dev/guide/rolldown) como bundler)
- [ESLint](https://eslint.org/) con reglas para React Hooks y React Refresh
- [Open-Meteo API](https://open-meteo.com/) — geocodificación y pronóstico del clima (gratuita, sin necesidad de API key)
- [gh-pages](https://www.npmjs.com/package/gh-pages) para el despliegue

---

## 📁 Estructura del proyecto

```
weather-app/
├── assets/
│   ├── context/
│   │   └── WeatherContext.jsx      # Estado global: unidades, día seleccionado, coordinación de hooks
│   ├── fonts/                      # Bricolage Grotesque y DM Sans (variable fonts)
│   └── images/                     # Íconos de clima, UI y fondos
├── components/
│   ├── CurrentWeather.jsx          # Ubicación, fecha y clima actual
│   ├── DailyForecast.jsx           # Pronóstico de 7 días
│   ├── Header.jsx                  # Barra de búsqueda
│   ├── HourlyForecast.jsx          # Pronóstico por hora con selector de día
│   ├── Navbar.jsx                  # Logo, título y selector de unidades
│   ├── PlaceResultsList.jsx        # Lista desplegable de resultados de búsqueda
│   └── WeatherDetails.jsx          # Tarjetas de sensación térmica, humedad, viento, precipitación
├── hooks/
│   ├── useGeocoding.js             # Lógica de búsqueda de lugares
│   └── useForecast.js              # Lógica de obtención del clima
├── utils/
│   └── dates.js                    # Helper centralizado para nombres de día (evita bugs de zona horaria)
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
└── public/
```

### Sobre la arquitectura

- **Separación de estado y lógica de datos**: en vez de manejar todo el fetching dentro del `Context`, la lógica de red vive en custom hooks (`useGeocoding`, `useForecast`) que el `WeatherContext` orquesta. Esto mantiene el contexto enfocado en estado de UI compartido (unidades, día seleccionado) y facilita testear o reutilizar la lógica de datos por separado.
- **Componentes con responsabilidad única**: `WeatherInfo.jsx` actúa como orquestador visual, delegando en `CurrentWeather`, `WeatherDetails`, `DailyForecast` y `HourlyForecast`, cada uno consumiendo el contexto de forma independiente.
- **`value` del Context memoizado** con `useMemo` para evitar renders innecesarios en componentes que no dependen del estado que cambió.

---

## 🌐 API utilizada

El proyecto consume dos endpoints públicos de [Open-Meteo](https://open-meteo.com/), que no requieren autenticación:

| Endpoint | Uso |
|---|---|
| `geocoding-api.open-meteo.com/v1/search` | Buscar lugares por nombre |
| `api.open-meteo.com/v1/forecast` | Obtener clima actual, por hora y diario según coordenadas |

---

## 🚀 Cómo correr el proyecto localmente

```bash
# Clonar el repositorio
git clone https://github.com/bastianvargasp/weather-app.git
cd weather-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app quedará disponible en `http://localhost:5173` (o el puerto que indique Vite en consola).

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Sirve localmente el build de producción para previsualizarlo |
| `npm run lint` | Corre ESLint sobre todo el proyecto |
| `npm run deploy` | Publica el contenido de `/dist` en GitHub Pages |

---

## 📄 Licencia

Este proyecto usa las fuentes **DM Sans** y **Bricolage Grotesque**, distribuidas bajo la [SIL Open Font License 1.1](https://openfontlicense.org).
