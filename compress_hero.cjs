const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = './public/assets/hero-seq/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

async function compress() {
  console.log(`Starting compression of ${files.length} files...`);
  let totalSaved = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    
    const tmpPath = filePath + '.tmp';
    try {
      await sharp(filePath)
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(tmpPath);
      
      const newStats = fs.statSync(tmpPath);
      const newSize = newStats.size;
      
      if (newSize < originalSize) {
        fs.renameSync(tmpPath, filePath);
        totalSaved += (originalSize - newSize);
        console.log(`Optimized ${file}: ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB`);
      } else {
        fs.unlinkSync(tmpPath);
        console.log(`Skipped ${file} (already optimal)`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  console.log(`\nCompression complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

compress();
