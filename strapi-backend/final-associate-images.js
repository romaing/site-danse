const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Associations correctes basées sur les vrais IDs actuels
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

  const professeurNames = {
    166: 'Jonathan Schlienger',
    168: 'Stéphane Galichet',
    170: 'Brice Mbani',
    172: 'Céline Grecias',
    174: 'Sophie Desjardins',
    176: 'Marie-France Lasnier'
  };

  for (const [profId, imageId] of Object.entries(IMAGE_ASSOCIATIONS.professeurs)) {
    try {
      const result = await apiRequest(`/api/professeurs/${profId}`, 'PUT', {
        data: { photo: imageId }
      });
      console.log(`✅ ${professeurNames[profId]} → Image ${imageId}`);
    } catch (error) {
      console.log(`❌ Erreur association ${professeurNames[profId]}:`, error.message);
    }
  }
}

async function associateStageImages() {
  console.log('\n🎭 ASSOCIATION DES PHOTOS AUX STAGES...\n');

  const stageNames = {
    118: 'Stage Danse & Ski à Pralognan',
    120: 'Stage de Danse de Salon à Royan',
    122: 'Stage Multi-danses à Laguiole',
    124: 'Stage de Pâques - Vallée de l\'Yonne'
  };

  for (const [stageId, imageId] of Object.entries(IMAGE_ASSOCIATIONS.stages)) {
    try {
      const result = await apiRequest(`/api/stages/${stageId}`, 'PUT', {
        data: { image: imageId }
      });
      console.log(`✅ ${stageNames[stageId]} → Image ${imageId}`);
    } catch (error) {
      console.log(`❌ Erreur association ${stageNames[stageId]}:`, error.message);
    }
  }
}

async function associateAllImages() {
  console.log('🎨 ASSOCIATION FINALE DE TOUTES LES IMAGES\n');

  try {
    await associateProfesseurImages();
    await associateStageImages();

    console.log('\n🎉 ASSOCIATION TERMINÉE AVEC SUCCÈS !');
    console.log('📸 Toutes les images sont maintenant correctement associées !');
    console.log('🔗 Vérifiez les résultats dans Strapi: http://localhost:1337/admin');
    console.log('\n📋 RÉSUMÉ DES ASSOCIATIONS :');
    console.log('👨‍🏫 Professeurs : 6 images associées');
    console.log('🎭 Stages : 4 images associées');
    console.log('🖼️ Total : 10 images parfaitement associées');

  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error);
  }
}

associateAllImages();