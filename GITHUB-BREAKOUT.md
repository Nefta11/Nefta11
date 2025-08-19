# 🎮 GitHub Breakout

¡Transforma tu gráfico de contribuciones de GitHub en un juego jugable de Breakout!

## 🌟 Características

- **Automático**: Se actualiza diariamente con GitHub Actions
- **Responsivo**: Soporte para modo claro y oscuro
- **Interactivo**: Tooltips con información de contribuciones
- **Personalizable**: Fácil de configurar y modificar

## 🚀 Formas de usar

### 1. GitHub Action (Recomendado - Automático)

El workflow ya está configurado en `.github/workflows/github-breakout.yml` y se ejecutará:
- ⏰ Diariamente a las 6:00 AM UTC
- 🔄 En cada push a la rama main
- 🎯 Manualmente desde la pestaña "Actions"

### 2. CLI (Manual)

```bash
# Instalar dependencias
npm install

# Generar para tu usuario
node cli.js Nefta11

# Con token de GitHub (recomendado para mejores límites de API)
node cli.js Nefta11 tu_github_token_aqui

# Solo modo oscuro
node cli.js Nefta11 tu_github_token_aqui true
```

### 3. Como librería

```bash
npm install
```

```javascript
const GitHubBreakout = require('./cli.js');

async function ejemplo() {
  const breakout = new GitHubBreakout('Nefta11', 'tu_token');
  await breakout.generateFiles();
}
```

## 📁 Archivos generados

- `github-breakout-light.svg` - Versión para modo claro
- `github-breakout-dark.svg` - Versión para modo oscuro

## 🎨 Personalización

### Colores

Puedes modificar los colores en el archivo `cli.js`:

```javascript
const colors = darkMode 
  ? {
      bg: '#0d1117',        // Fondo
      text: '#c9d1d9',      // Texto
      paddle: '#58a6ff',    // Paleta
      ball: '#f85149',      // Pelota
      brick0: '#161b22',    // Sin contribuciones
      brick1: '#0e4429',    // Pocas contribuciones
      brick2: '#006d32',    // Algunas contribuciones
      brick3: '#26a641',    // Muchas contribuciones
      brick4: '#39d353'     // Muchísimas contribuciones
    }
  : { /* colores modo claro */ };
```

### Dimensiones

```javascript
const width = 728;        // Ancho del SVG
const height = 315;       // Alto del SVG
const brickWidth = 10;    // Ancho de cada ladrillo
const brickHeight = 10;   // Alto de cada ladrillo
```

## 🔧 Configuración del GitHub Action

El workflow necesita permisos para escribir al repositorio. Asegúrate de que:

1. El repositorio tenga habilitadas las GitHub Actions
2. El workflow tenga permisos de escritura (ya configurado en el archivo)

## 📊 Cómo funciona

1. **Recopilación**: Obtiene tu historial de contribuciones de GitHub
2. **Procesamiento**: Convierte las contribuciones en datos del juego
3. **Generación**: Crea archivos SVG interactivos
4. **Renderizado**: Los cuadrados de contribuciones se convierten en ladrillos
5. **Interactividad**: Tooltips muestran fecha y número de contribuciones

## 🎯 Uso en README

```html
<div align="center">
  <h2>🎮 GitHub Breakout Game</h2>
  <p>¡Rompe los ladrillos con tu historial de contribuciones!</p>
  
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./github-breakout-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./github-breakout-light.svg">
    <img alt="GitHub Breakout Game" src="./github-breakout-light.svg" width="728" height="315">
  </picture>
</div>
```

## 🐛 Solución de problemas

### El workflow no se ejecuta
- Verifica que las GitHub Actions estén habilitadas
- Revisa la pestaña "Actions" para ver errores
- Asegúrate de que el archivo YAML esté en la ruta correcta

### Los archivos SVG no se actualizan
- Ejecuta el workflow manualmente desde "Actions"
- Verifica que el bot tenga permisos de escritura
- Revisa los logs del workflow para errores

### Los colores no se ven bien
- Ajusta los colores en el archivo `cli.js`
- Considera el contraste para accesibilidad
- Prueba en diferentes temas de GitHub

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

MIT License - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

Inspirado en el concepto original de GitHub contribution graphs y el clásico juego Breakout.

---

¡Hecho con ❤️ por [Neftali Arturo](https://github.com/Nefta11)!
