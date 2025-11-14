# 🤖 Gemini Models Health Checker

Sistema de monitoreo en tiempo real para verificar la disponibilidad de los modelos de Gemini AI utilizados en producción.

## 🚀 Demo en Vivo

Visita: [https://fabianmv.github.io/gemini-models-health-checker](https://fabianmv.github.io/gemini-models-health-checker)

## 📋 Características

- ✅ Verificación de modelos Gemini 2.5 Flash y Gemini 2.5 Pro
- ⚡ Medición de tiempos de respuesta en milisegundos
- 👥 Soporte para múltiples API keys (Fabián Muñoz, Vicente Chacón)
- 🔄 Auto-refresh cada 5 minutos
- 🤖 GitHub Actions para monitoreo automatizado cada hora
- 📊 Reportes automáticos en GitHub Actions
- 🎯 **Verificación manual automática con un solo click** (con token de GitHub)
- 📈 Gráficos interactivos con rangos de tiempo desde 5 minutos hasta 1 semana
- ⏱️ Escala de tiempo real en gráficos

## 🔑 Configuración de Verificación Automática

Para usar el botón de verificación automática sin necesidad de ir a GitHub Actions:

1. Ve a [GitHub Settings → Personal Access Tokens](https://github.com/settings/tokens/new)
2. Crea un **Classic Token** (no Fine-grained)
3. Selecciona el scope **`workflow`** (permite disparar GitHub Actions)
4. Genera el token y cópialo
5. En el dashboard, haz clic en "🔄 Ejecutar Verificación Automática"
6. La primera vez te pedirá configurar el token
7. Pega el token y guárdalo
8. ¡Listo! Ahora puedes ejecutar verificaciones con un click

El token se guarda en **localStorage** de tu navegador (solo tú lo tienes).

## 🔧 Modelos Monitoreados

| Modelo | Nombre Técnico | Uso |
|--------|----------------|-----|
| **Gemini 1.5 Flash** | `gemini-1.5-flash-002` | Alternativa rápida |
| **Gemini 2.5 Pro** | `gemini-2.5-pro` | Usado en Lambda de producción |

## 🛠️ Uso Local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/FabianIMV/gemini-models-health-checker.git
   cd gemini-models-health-checker
   ```

2. **Abre `index.html` en tu navegador:**
   ```bash
   open index.html
   # O simplemente arrastra el archivo al navegador
   ```

3. **Selecciona tu API key:**
   - Click en "Fabián Muñoz" o "Vicente Chacón" para usar API keys guardadas
   - Click en "Custom" para ingresar tu propia API key
   - Ingresa tu API key de [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Click en "Verificar Estado"** para testear ambos modelos

## 🤖 GitHub Actions (CI/CD)

### Configuración de Secrets

Ve a `Settings` → `Secrets and variables` → `Actions` y agrega:

1. **GEMINI_API_KEY_FABIAN**: API key de Fabián Muñoz
2. **GEMINI_API_KEY_VICENTE** (opcional): API key de Vicente Chacón

### Ejecución Automática

El workflow se ejecuta:
- ⏰ **Cada hora** automáticamente (genera historial)
- 🔄 **En cada push** a la rama `main`
- ▶️ **Manualmente** desde la pestaña "Actions" en GitHub

### Ver Resultados

1. **Sitio web:** https://fabianmv.github.io/gemini-models-health-checker
   - Estado actual de todas las API keys
   - Gráfica de historial de últimas 24 horas
   - Actualización automática cada 5 minutos

2. **GitHub Actions:**
   - Ve a la pestaña **"Actions"** en GitHub
   - Selecciona el workflow más reciente
   - Revisa el **"Summary"** para ver el reporte de estado

## 📁 Estructura del Proyecto

```
gemini-health-checker/
├── index.html                 # Interfaz web principal
├── .github/
│   └── workflows/
│       └── health-check.yml  # GitHub Actions workflow
└── README.md                  # Este archivo
```

## 🔐 Seguridad

- ✅ Las API keys **NO se guardan en el servidor**
- ✅ Solo se almacenan localmente en `localStorage` del navegador
- ✅ Las API keys de GitHub Actions están protegidas como **Secrets**
- ✅ El código es 100% client-side (HTML + JavaScript)

## 📊 Ejemplo de Salida

```
✅ Gemini Flash (Fabián): DISPONIBLE (1,234ms)
✅ Gemini 2.5 Pro (Fabián): DISPONIBLE (2,456ms)
```

O en caso de error:

```
❌ Gemini Flash (Fabián): ERROR - Servicio sobrecargado
✅ Gemini 2.5 Pro (Fabián): DISPONIBLE (2,456ms)
```

## 🧩 Integración con tu Lambda

Este checker usa **exactamente los mismos modelos** que tu Lambda de nutrición:

```javascript
// Lambda (backend)
const selectedModel = modelName || 'gemini-2.5-pro';
const model = this.genAI.getGenerativeModel({ model: selectedModel });

// Health Checker (frontend)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
```

## 🐛 Troubleshooting

### Error 404: Modelo no encontrado
- Verifica que tu API key tenga acceso a Gemini 2.5 Pro
- Asegúrate de estar usando la última versión de la librería

### Error 503: Servicio sobrecargado
- Google está limitando temporalmente las peticiones
- Espera unos minutos e intenta de nuevo
- Es un problema de Google, no de tu código

### API key inválida
- Verifica tu API key en [Google AI Studio](https://makersuite.google.com/app/apikey)
- Asegúrate de copiar la key completa sin espacios

## 📝 Licencia

MIT License - Hecho con ❤️ por [Fabián Muñoz](https://github.com/FabianIMV)

## 🤝 Contribuciones

¡Pull requests son bienvenidos! Para cambios mayores, abre un issue primero.

---

**Última actualización:** 14 de noviembre de 2025
