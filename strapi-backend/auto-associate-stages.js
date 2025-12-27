const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Récupérer les vrais IDs des stages
async function getStageIds() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/stages`, {
      headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
    });
    const data = await response.json();
    return data.data.map(stage => stage.id);
  } catch (error) {
    console.log('Erreur récupération stages:', error.message);
    return [];
  }
}

async function associateStageImages() {
  console.log('🎭 ASSOCIATION AUTOMATIQUE DES IMAGES AUX STAGES\n');

  const stageIds = await getStageIds();
  console.log('Stages trouvés:', stageIds);

  if (stageIds.length === 0) {
    console.log('❌ Aucun stage trouvé');
    return;
  }

  // Images dans l'ordre : Pralognan, Royan, Laguiole, Yonne
  const imageIds = [26, 11, 31, 14]; // IDs des vraies images

  for (let i = 0; i < Math.min(stageIds.length, imageIds.length); i++) {
    const stageId = stageIds[i];
    const imageId = imageIds[i];

    try {
      console.log(`Associer Stage ${stageId} avec Image ${imageId}...`);

      const response = await fetch(`${STRAPI_URL}/api/stages/${stageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: { image: imageId }
        })
      });

      if (response.ok) {
        console.log(`✅ Stage ${stageId} → Image ${imageId} associée avec succès !`);
      } else {
        const error = await response.text();
        console.log(`❌ Échec pour stage ${stageId}: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.log(`❌ Erreur réseau pour stage ${stageId}:`, error.message);
    }

    // Pause entre les requêtes
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n🎉 ASSOCIATION TERMINÉE !');
  console.log('Vérifiez les résultats dans Strapi: http://localhost:1337/admin');
  console.log('Ou sur votre site: http://localhost:3001/stages');
}

associateStageImages();