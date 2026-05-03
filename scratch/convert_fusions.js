import sharp from 'sharp';
import fs from 'fs';

const mapping = [
  { src: 'C:/Users/ksudh/.gemini/antigravity/brain/eeeb53bd-84e8-4e5d-9cac-35b018525529/media__1777778190228.png', dest: 'public/dirty_kitkat_shake.webp' },
  { src: 'C:/Users/ksudh/.gemini/antigravity/brain/eeeb53bd-84e8-4e5d-9cac-35b018525529/media__1777779375103.png', dest: 'public/oreo_mocha_frappe.webp' },
  { src: 'C:/Users/ksudh/.gemini/antigravity/brain/eeeb53bd-84e8-4e5d-9cac-35b018525529/media__1777780545528.png', dest: 'public/caramel_cloud_brew.webp' }
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
