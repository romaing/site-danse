const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Nouvelles images réelles uploadées
const REAL_IMAGES = {
  professeurs: {
    "Schlienger": 12,   // professor-jonathan.jpg
    "Galichet": 5,      // professor-stephane.jpg
    "Mbani": 6,         // professor-brice.jpg
    "Grecias": 7,       // professor-celine.jpg
    "Desjardins": 8,    // professor-sophie.jpg
    "Lasnier": 9        // professor-marie.jpg
  },
  stages: {
    "Pralognan": 10,    // stage-pralognan.jpg (Alpes)
    "Royan": 11,        // stage-royan.jpg (bord de mer)
    "Laguiole": 13,     // stage-laguiole.jpg (village)
    "Yonne": 14         // stage-yonne.jpg (campagne)
  }
};

async function updateProfesseursWithBetterPhotos() {
  console.log('📸 MISE À JOUR DES PROFESSEURS AVEC MEILLEURES PHOTOS...\n');

  // Récupérer les professeurs existants
  const profResponse = await fetch(`${STRAPI_URL}/api/professeurs`, {
    headers: { 'Authorization': `STRAPI_TOKEN` }
  });
  const profData = await profResponse.json();

  const professeurs = profData.data;
  console.log(`📋 ${professeurs.length} professeurs trouvés`);

  for (let i = 0; i < professeurs.length; i++) {
    const prof = professeurs[i];
    if (prof.attributes && prof.attributes.nom) {
      const imageId = REAL_IMAGES.professeurs[prof.attributes.nom];

      if (imageId) {
        try {
          const updateResponse = await fetch(`${STRAPI_URL}/api/professeurs/${prof.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `STRAPI_TOKEN`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: {
                photo: imageId
              }
            })
          });

          if (updateResponse.ok) {
            console.log(`✅ ${prof.attributes.nom} ${prof.attributes.prenom} → Nouvelle photo ID ${imageId}`);
          } else {
            console.log(`❌ Échec mise à jour ${prof.attributes.nom}`);
          }
        } catch (error) {
          console.log(`❌ Erreur réseau pour ${prof.attributes.nom}:`, error.message);
        }
      }
    }
  }
}

async function updateStagesWithBetterPhotos() {
  console.log('\n🏔️ MISE À JOUR DES STAGES AVEC MEILLEURES PHOTOS...\n');

  // Récupérer les stages existants
  const stageResponse = await fetch(`${STRAPI_URL}/api/stages`, {
    headers: { 'Authorization': `STRAPI_TOKEN` }
  });
  const stageData = await stageResponse.json();

  const stages = stageData.data;
  console.log(`📋 ${stages.length} stages trouvés`);

  // Mapping des stages par titre
  const stageMapping = {
    "Stage Danse & Ski à Pralognan": "Pralognan",
    "Stage de Danse de Salon à Royan": "Royan",
    "Stage Multi-danses à Laguiole": "Laguiole",
    "Stage de Pâques - Vallée de l'Yonne": "Yonne"
  };

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    if (stage.attributes && stage.attributes.titre) {
      const locationKey = stageMapping[stage.attributes.titre];
      const imageId = locationKey ? REAL_IMAGES.stages[locationKey] : null;

      if (imageId) {
        try {
          const updateResponse = await fetch(`${STRAPI_URL}/api/stages/${stage.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `STRAPI_TOKEN`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: {
                image: imageId
              }
            })
          });

          if (updateResponse.ok) {
            console.log(`✅ ${stage.attributes.titre} → Nouvelle photo ID ${imageId}`);
          } else {
            console.log(`❌ Échec mise à jour ${stage.attributes.titre}`);
          }
        } catch (error) {
          console.log(`❌ Erreur réseau pour ${stage.attributes.titre}:`, error.message);
        }
      }
    }
  }
}

async function updateAllContentWithBetterImages() {
  console.log('🎨 MISE À JOUR AVEC PHOTOS PLUS RÉALISTES\n');

  try {
    await updateProfesseursWithBetterPhotos();
    await updateStagesWithBetterPhotos();

    console.log('\n🎉 MISE À JOUR TERMINÉE !');
    console.log('📸 Les professeurs et stages ont maintenant des photos plus appropriées !');
    console.log('🔗 Vérifiez les changements dans Strapi: http://localhost:1337/admin');

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
  }
}

updateAllContentWithBetterImages();