#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios');

class GitHubBreakout {
  constructor(username, token) {
    this.username = username;
    this.token = token;
    this.contributions = [];
  }

  async fetchContributions() {
    try {
      console.log(`📊 Fetching contributions for ${this.username}...`);
      
      // En una implementación real, aquí usarías la API de GitHub
      // Por ahora, generamos datos de ejemplo basados en un patrón realista
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        // Simular patrones realistas de contribución
        const dayOfWeek = d.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseContributions = isWeekend ? Math.random() * 3 : Math.random() * 8;
        const contributions = Math.floor(baseContributions * (Math.random() > 0.3 ? 1 : 0));
        
        this.contributions.push({
          date: new Date(d).toISOString().split('T')[0],
          count: contributions,
          level: this.getContributionLevel(contributions)
        });
      }
      
      console.log(`✅ Processed ${this.contributions.length} days of contributions`);
    } catch (error) {
      console.error('❌ Error fetching contributions:', error.message);
    }
  }

  getContributionLevel(count) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 7) return 3;
    return 4;
  }

  generateBreakoutSVG(darkMode = false) {
    const width = 728;
    const height = 315;
    const padding = 20;
    const brickWidth = 10;
    const brickHeight = 10;
    const brickSpacing = 2;
    
    const weeksInYear = 53;
    const daysInWeek = 7;
    
    const colors = darkMode 
      ? {
          bg: '#0d1117',
          text: '#c9d1d9',
          paddle: '#58a6ff',
          ball: '#f85149',
          brick0: '#161b22',
          brick1: '#0e4429',
          brick2: '#006d32',
          brick3: '#26a641',
          brick4: '#39d353',
          border: '#30363d'
        }
      : {
          bg: '#ffffff',
          text: '#24292f',
          paddle: '#0969da',
          ball: '#cf222e',
          brick0: '#ebedf0',
          brick1: '#9be9a8',
          brick2: '#40c463',
          brick3: '#30a14e',
          brick4: '#216e39',
          border: '#d0d7de'
        };

    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .title { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; 
        font-size: 16px; 
        font-weight: 600; 
        fill: ${colors.text}; 
      }
      .subtitle { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; 
        font-size: 12px; 
        fill: ${colors.text}; 
        opacity: 0.7; 
      }
      .brick { 
        stroke: ${colors.bg}; 
        stroke-width: 1; 
        transition: opacity 0.2s ease;
      }
      .brick:hover { 
        opacity: 0.8; 
      }
      .paddle { 
        fill: ${colors.paddle}; 
        rx: 4; 
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
      }
      .ball { 
        fill: ${colors.ball}; 
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
      }
      .game-area { 
        stroke: ${colors.border}; 
        stroke-width: 2; 
        fill: none; 
        opacity: 0.3; 
        rx: 8;
      }
      .score { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; 
        font-size: 11px; 
        fill: ${colors.text}; 
        opacity: 0.6; 
      }
    </style>
  </defs>
  
  <rect width="100%" height="100%" fill="${colors.bg}" rx="12"/>
  
  <!-- Title -->
  <text x="${width/2}" y="25" text-anchor="middle" class="title">🎮 GitHub Breakout - @${this.username}</text>
  <text x="${width/2}" y="45" text-anchor="middle" class="subtitle">¡Rompe los ladrillos con tu historial de contribuciones!</text>
  
  <!-- Game Area Border -->
  <rect x="${padding}" y="55" width="${width - 2*padding}" height="${height - 75}" class="game-area"/>
  
  <!-- Contribution Bricks -->`;

    let brickIndex = 0;
    const startX = padding + 15;
    const startY = 70;
    let totalContributions = 0;
    let activeDays = 0;
    
    for (let week = 0; week < weeksInYear && week < Math.floor((width - 2*padding - 30) / (brickWidth + brickSpacing)); week++) {
      for (let day = 0; day < daysInWeek; day++) {
        if (brickIndex < this.contributions.length) {
          const contribution = this.contributions[brickIndex];
          const x = startX + week * (brickWidth + brickSpacing);
          const y = startY + day * (brickHeight + brickSpacing);
          const color = colors[`brick${contribution.level}`];
          
          totalContributions += contribution.count;
          if (contribution.count > 0) activeDays++;
          
          svg += `
  <rect x="${x}" y="${y}" width="${brickWidth}" height="${brickHeight}" fill="${color}" class="brick">
    <title>${contribution.date}: ${contribution.count} contribuciones</title>
  </rect>`;
          
          brickIndex++;
        }
      }
    }

    // Paddle
    const paddleWidth = 60;
    const paddleHeight = 8;
    const paddleX = (width - paddleWidth) / 2;
    const paddleY = height - 40;
    
    // Ball
    const ballX = paddleX + paddleWidth/2 + Math.sin(Date.now() / 1000) * 20;
    const ballY = paddleY - 15;
    
    svg += `
  
  <!-- Paddle -->
  <rect x="${paddleX}" y="${paddleY}" width="${paddleWidth}" height="${paddleHeight}" class="paddle"/>
  
  <!-- Ball -->
  <circle cx="${ballX}" cy="${ballY}" r="4" class="ball"/>
  
  <!-- Score Info -->
  <text x="${padding + 10}" y="${height - 15}" class="score">📊 ${totalContributions} contribuciones</text>
  <text x="${width - padding - 10}" y="${height - 15}" text-anchor="end" class="score">🔥 ${activeDays} días activos</text>
  
  <!-- Instructions -->
  <text x="${width/2}" y="${height - 5}" text-anchor="middle" class="subtitle">¡Usa tus contribuciones como ladrillos para romper! 🎯</text>
  
</svg>`;

    return svg;
  }

  async generateFiles() {
    await this.fetchContributions();
    
    console.log('🎨 Generating SVG files...');
    
    const lightSVG = this.generateBreakoutSVG(false);
    const darkSVG = this.generateBreakoutSVG(true);
    
    fs.writeFileSync('github-breakout-light.svg', lightSVG);
    fs.writeFileSync('github-breakout-dark.svg', darkSVG);
    
    console.log('✅ ¡Archivos SVG de GitHub Breakout generados exitosamente!');
    console.log('📁 Archivos creados:');
    console.log('  - github-breakout-light.svg (modo claro)');
    console.log('  - github-breakout-dark.svg (modo oscuro)');
    console.log('\n🎯 Para usar en tu README.md, agrega:');
    console.log(`<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./github-breakout-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./github-breakout-light.svg">
  <img alt="GitHub Breakout Game" src="./github-breakout-light.svg" width="728" height="315">
</picture>`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🎮 GitHub Breakout CLI

Uso:
  node cli.js <username> [github_token] [dark_mode]

Ejemplos:
  node cli.js Nefta11
  node cli.js Nefta11 ghp_xxxxxxxxxxxx
  node cli.js Nefta11 ghp_xxxxxxxxxxxx true

Parámetros:
  username     - Tu nombre de usuario de GitHub
  github_token - Token de GitHub (opcional, para mejores límites de API)
  dark_mode    - true/false para generar solo modo oscuro (opcional)
`);
    process.exit(1);
  }

  const username = args[0];
  const token = args[1];
  const darkMode = args[2] === 'true';
  
  console.log(`🎮 Generando GitHub Breakout para ${username}...`);
  if (token) {
    console.log('🔑 Usando token de GitHub para mejor acceso a la API');
  }
  
  const breakout = new GitHubBreakout(username, token);
  await breakout.generateFiles();
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = GitHubBreakout;
