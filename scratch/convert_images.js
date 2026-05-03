import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = './public';
const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png'));

console.log(`Found ${files.length} PNG files in ${dir}`);

async function convert() {
  for (const file of files) {
    const input = path.join(dir, file);
    const outputName = file.replace(/\.png$/i, '.webp');
    const output = path.join(dir, outputName);
    
    try {
      await sharp(input).webp({ quality: 80 }).toFile(output);
      console.log(`Successfully converted ${file} to ${outputName}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

convert();
