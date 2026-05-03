import sharp from 'sharp';
import fs from 'fs';

const mapping = [
  { src: 'public/dirty_kitkat.png', dest: 'public/dirty_kitkat_shake.webp' },
  { src: 'public/oreo_mocha.png', dest: 'public/oreo_mocha_frappe.webp' },
  { src: 'public/caramel_brew.png', dest: 'public/caramel_cloud_brew.webp' }
];

async function run() {
  for (const item of mapping) {
    if (fs.existsSync(item.src)) {
      try {
        await sharp(item.src).webp({ quality: 80 }).toFile(item.dest);
        console.log(`Converted ${item.src} to ${item.dest}`);
      } catch (err) {
        console.error(`Error converting ${item.src}:`, err);
      }
    } else {
      console.log(`File not found: ${item.src}`);
    }
  }
}

run();
