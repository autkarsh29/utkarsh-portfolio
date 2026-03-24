const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/sequence');
const outputDir = path.join(__dirname, '../public/sequence'); // Save in the same place

async function optimizeImages() {
  console.log('🚀 Starting Image Optimization (PNG -> WebP)...');
  
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  let count = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

    await sharp(inputPath)
      .webp({ quality: 75 }) // High quality but significantly smaller
      .toFile(outputPath);

    count++;
    if (count % 10 === 0) {
      console.log(`✅ Processed ${count}/${files.length} frames...`);
    }
  }

  console.log('✨ DONE! 120 frames converted to WebP.');
  console.log('⚠️ You can now safely delete the .png files to save space.');
}

optimizeImages().catch(err => {
  console.error('❌ Error optimizing images:', err);
  process.exit(1);
});
