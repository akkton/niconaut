import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const outDir = join(projectRoot, 'public');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#2337ff"/>
  <g font-family="Arial, Helvetica, sans-serif" fill="#ffffff">
    <text x="96" y="130" font-size="26" letter-spacing="3" opacity="0.85">NICOLASNEUMANN.BLOG</text>
    <g font-family="Georgia, 'Times New Roman', serif" font-weight="700">
      <text x="96" y="270" font-size="68">Curious about opportunity.</text>
      <text x="96" y="358" font-size="68">Building things.</text>
      <text x="96" y="446" font-size="68">Documenting the mess.</text>
    </g>
    <text x="96" y="555" font-size="24" opacity="0.7">by Nicolas Neumann</text>
  </g>
  <line x1="96" y1="500" x2="280" y2="500" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>
</svg>`;

const outPath = join(outDir, 'og-default.png');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
const meta = await sharp(outPath).metadata();
console.log(`wrote ${outPath} (${meta.width}x${meta.height}, ${meta.format})`);
