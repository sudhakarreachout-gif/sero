import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const inputDir = 'public/assets/hero-seq';
const outputDir = 'public/assets/hero-seq-small';

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

console.log('Starting...');
for (let i = 1; i <= 150; i++) {
  await sharp(join(inputDir, 'frame' + i + '.jpg'))
    .resize(960)
    .jpeg({ quality: 72 })
    .toFile(join(outputDir, 'frame' + i + '.jpg'));
  if (i % 10 === 0) console.log(i + '/150');
}
console.log('Done!');
