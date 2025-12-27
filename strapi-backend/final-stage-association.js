const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Mapping des stages corrects
const stageMappings = [
  { name: 'Pralognan', id: null, imageId: 26 },
  { name: 'Royan', id: null, imageId: 11 },
  { name: 'Laguiole', id: null, imageId: 31 },
  { name: 'Yonne', id: null, imageId: 14 }
];

async function getStages() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/stages`, {
      headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.log('Erreur récupération stages:', error.message);
    return [];
  }
}

async function associateStageImages() {
  console.log('🎭 RECHERCHE ET ASSOCIATION DES IMAGES AUX STAGES\n');

  const stages = await getStages();
  console.log(`📋 ${stages.length} stages trouvés`);

  // Associer par titre
  const associations = {
    'Stage Danse & Ski à Pralognan': 26,      // pralognan
    'Stage de Danse de Salon à Royan': 11,    // royan
    'Stage Multi-danses à Laguiole': 31,      // laguiole
    'Stage de Pâques - Vallée de l\'Yonne': 14 // yonne
  };

  for (const stage of stages) {
    console.log(`Stage trouvé: ID ${stage.id}, titre: ${stage.attributes?.titre}`);

    if (stage.attributes && stage.attributes.titre) {
      const titre = stage.attributes.titre;
      const imageId = associations[titre];

      console.log(`Recherche image pour "${titre}" → ${imageId ? 'Trouvé ID ' + imageId : 'Pas trouvé'}`);

      if (imageId) {
        try {
          console.log(`Associer "${titre}" (ID ${stage.id}) avec Image ${imageId}...`);

          const response = await fetch(`${STRAPI_URL}/api/stages/${stage.id}`, {
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
            const result = await response.json();
            console.log(`✅ "${titre}" → Image associée avec succès !`);
          } else {
            const error = await response.text();
            console.log(`❌ Échec "${titre}": ${response.status} - ${error}`);
          }
        } catch (error) {
          console.log(`❌ Erreur réseau "${titre}":`, error.message);
        }

        // Pause
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log(`⏭️ Pas d'image associée pour "${titre}"`);
      }
    } else {
      console.log(`⏭️ Stage sans titre ou attributs`);
    }
  }

  console.log('\n🎉 TRAITEMENT TERMINÉ !');
  console.log('Vérifiez dans Strapi: http://localhost:1337/admin');
}

associateStageImages();