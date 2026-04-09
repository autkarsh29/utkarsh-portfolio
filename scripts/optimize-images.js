const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/sequence');
const outputDir = path.join(__dirname, '../public/sequence'); // Save in the same place

async function optimizeImages() {
  console.log('🚀 Starting Tier-2 Image Re-Optimization (WebP -> WebP 60%)...');
  
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp'));
  let count = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const tempPath = path.join(outputDir, `temp_${file}`);
    const finalPath = path.join(outputDir, file);

    // Read into Buffer first to avoid file locking issues
    const inputBuffer = fs.readFileSync(inputPath);
    
    // Re-compress at quality 60
    await sharp(inputBuffer)
      .webp({ quality: 60, effort: 6 }) // Slower compression but better results
      .toFile(tempPath);

    // Swap files
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, finalPath);

    count++;
    if (count % 10 === 0) {
      console.log(`✅ Re-compressed ${count}/${files.length} frames...`);
    }
  }

  console.log('✨ DONE! 120 frames re-optimized to Quality 60.');
}

optimizeImages().catch(err => {
  console.error('❌ Error optimizing images:', err);
  process.exit(1);
});
