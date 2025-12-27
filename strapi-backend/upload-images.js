const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'e5d3b679f8f74b43ebf3f9509aaa352f7cf2835bbbb18a8cf63024150b49c5788e883b4d6f892f84786bee878f83dbb2cac1ba926bb6716d46cff3be82b38fecbe01dd85cee2d2173f615a85ff1dece6cab63414070715d8b197cb4eeb5dbe8fe69e0f9453f28f807866e85361605b7038d038bfcb49c0985a6b96e10a862867';

async function uploadImage(imagePath, altText) {
  try {
    // Use curl command instead of fetch for file upload
    const { execSync } = require('child_process');
    const curlCommand = `curl -X POST "${STRAPI_URL}/api/upload" \\
      -H "Authorization: Bearer ${STRAPI_TOKEN}" \\
      -F "files=@${imagePath}" \\
      -F "fileInfo={\\"alternativeText\\": \\"${altText}\\"}" \\
      -s`;

    const result = execSync(curlCommand, { encoding: 'utf8' });
    const parsed = JSON.parse(result);
    return parsed[0]; // Return the uploaded file info
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('📤 UPLOADING IMAGES TO STRAPI...\n');

  const imagesDir = path.join(__dirname, '..', 'temp_images');
  const uploadedImages = {};

  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Dossier temp_images introuvable');
    return;
  }

  // Upload stage images
  console.log('🎭 Uploading stage images...');
  const stageImages = [
    { file: 'stage-laguiole-dance.jpg', alt: 'Stage Multi-danses à Laguiole' },
    { file: 'stage-pralognan-new.jpg', alt: 'Stage Danse & Ski à Pralognan' },
    { file: 'stage-royan.jpg', alt: 'Stage de Danse de Salon à Royan' },
    { file: 'stage-yonne.jpg', alt: 'Stage de Pâques - Vallée de l\'Yonne' }
  ];

  for (const stageImg of stageImages) {
    const imagePath = path.join(imagesDir, stageImg.file);
    if (fs.existsSync(imagePath)) {
      console.log(`Uploading ${stageImg.file}...`);
      const uploaded = await uploadImage(imagePath, stageImg.alt);
      if (uploaded) {
        uploadedImages[stageImg.file] = uploaded;
        console.log(`✅ ${stageImg.file} uploaded (ID: ${uploaded.id})`);
      }
    } else {
      console.log(`⚠️ ${stageImg.file} not found`);
    }
  }

  // Upload professor images
  console.log('\n👨‍🏫 Uploading professor images...');
  const profImages = [
    { file: 'professor-jonathan.jpg', alt: 'Jonathan Schlienger - Moniteur de danse' },
    { file: 'professor-stephane.jpg', alt: 'Stéphane Galichet - Professeur de danse' },
    { file: 'professor-brice.jpg', alt: 'Brice Mbani - Professeur de danse' },
    { file: 'professor-celine.jpg', alt: 'Céline Grecias - Professeure de danse' },
    { file: 'professor-sophie.jpg', alt: 'Sophie Desjardins - Professeure de danse' },
    { file: 'professor-marie.jpg', alt: 'Marie-France Lasnier - Professeure de danse' }
  ];

  for (const profImg of profImages) {
    const imagePath = path.join(imagesDir, profImg.file);
    if (fs.existsSync(imagePath)) {
      console.log(`Uploading ${profImg.file}...`);
      const uploaded = await uploadImage(imagePath, profImg.alt);
      if (uploaded) {
        uploadedImages[profImg.file] = uploaded;
        console.log(`✅ ${profImg.file} uploaded (ID: ${uploaded.id})`);
      }
    } else {
      console.log(`⚠️ ${profImg.file} not found`);
    }
  }

  // Save uploaded images info to a JSON file for the import script
  const outputPath = path.join(__dirname, 'uploaded-images.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadedImages, null, 2));
  console.log(`\n💾 Uploaded images info saved to: ${outputPath}`);

  console.log('\n🎉 IMAGE UPLOAD COMPLETE!');
  console.log(`📊 ${Object.keys(uploadedImages).length} images uploaded successfully`);

  return uploadedImages;
}

uploadAllImages().catch(console.error);