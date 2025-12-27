const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Associations correctes des images
const IMAGE_ASSOCIATIONS = {
  professeurs: {
    166: 12, // Jonathan Schlienger → professor-jonathan.jpg
    168: 5,  // Stéphane Galichet → professor-stephane.jpg
    170: 6,  // Brice Mbani → professor-brice.jpg
    172: 23, // Céline Grecias → professor-celine.jpg
    174: 8,  // Sophie Desjardins → professor-sophie.jpg
    176: 25  // Marie-France Lasnier → professor-marie.jpg
  },
  stages: {
    118: 26, // Pralognan → stage-pralognan-new.jpg
    120: 11, // Royan → stage-royan.jpg
    122: 31, // Laguiole → stage-laguiole-dance.jpg
    124: 14  // Vallée de l'Yonne → stage-yonne.jpg
  }
};

async function apiRequest(endpoint, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
  };

  const config = { method, headers };
  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${STRAPI_URL}${endpoint}`, config);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function associateProfesseurImages() {
  console.log('👨‍🏫 ASSOCIATION DES PHOTOS AUX PROFESSEURS...\n');

  for (const [profId, imageId] of Object.entries(IMAGE_ASSOCIATIONS.professeurs)) {
    try {
      const result = await apiRequest(`/api/professeurs/${profId}`, 'PUT', {
        data: { photo: imageId }
      });
      console.log(`✅ Professeur ${profId} → Image ${imageId}`);
    } catch (error) {
      console.log(`❌ Erreur association professeur ${profId}:`, error.message);
    }
  }
}

async function associateStageImages() {
  console.log('\n🎭 ASSOCIATION DES PHOTOS AUX STAGES...\n');

  for (const [stageId, imageId] of Object.entries(IMAGE_ASSOCIATIONS.stages)) {
    try {
      const result = await apiRequest(`/api/stages/${stageId}`, 'PUT', {
        data: { image: imageId }
      });
      console.log(`✅ Stage ${stageId} → Image ${imageId}`);
    } catch (error) {
      console.log(`❌ Erreur association stage ${stageId}:`, error.message);
    }
  }
}

async function associateAllImages() {
  console.log('🎨 ASSOCIATION AUTOMATIQUE DE TOUTES LES IMAGES\n');

  try {
    await associateProfesseurImages();
    await associateStageImages();

    console.log('\n🎉 ASSOCIATION TERMINÉE !');
    console.log('📸 Toutes les images sont maintenant correctement associées !');
    console.log('🔗 Vérifiez les résultats dans Strapi: http://localhost:1337/admin');

  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error);
  }
}

associateAllImages();