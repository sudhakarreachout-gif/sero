import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';

const outDir = 'public/assets/hero-seq-final';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

let outputIndex = 1;
for (let i = 1; i <= 150; i += 2) {
  await sharp(`public/assets/hero-seq/frame${i}.jpg`)
    .resize(854)
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(`${outDir}/frame${outputIndex}.jpg`);
  outputIndex++;
}
console.log(`Done. Total frames: ${outputIndex - 1}`);
