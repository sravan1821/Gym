import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

function processImage(inputName, outputName) {
  const inputPath = path.join(publicDir, inputName);
  const outputPath = path.join(publicDir, outputName);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    return;
  }

  const data = fs.readFileSync(inputPath);
  const png = PNG.sync.read(data);

  const { width, height } = png;
  console.log(`Processing ${inputName} (${width}x${height})...`);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = png.data[idx];
      const g = png.data[idx + 1];
      const b = png.data[idx + 2];

      // Calculate maximum color intensity
      const maxVal = Math.max(r, g, b);

      if (maxVal <= 8) {
        // Deep black background -> 100% transparent
        png.data[idx + 3] = 0;
      } else if (maxVal <= 35) {
        // Smooth feather threshold transition on the edge
        const factor = (maxVal - 8) / (35 - 8);
        png.data[idx + 3] = Math.round(factor * png.data[idx + 3]);
      }
      // Inner glowing body remains 100% untouched
    }
  }

  const buffer = PNG.sync.write(png);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved transparent image to: ${outputPath} (${buffer.length} bytes)`);
}

processImage('anatomy_hologram.png', 'anatomy_hologram_transparent.png');
processImage('anatomy_hologram_back.png', 'anatomy_hologram_back_transparent.png');
