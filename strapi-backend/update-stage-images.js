const fs = require('fs');
const path = require('path');
const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1MjY2MzIzLCJleHAiOjE3MzUyNzM1MjN9.default_token';

// Mapping des images de stages
const stageImages = {
  'Stage Danse & Ski à Pralognan': 'stage-pralognan-new.jpg',
  'Stage de Danse de Salon à Royan': 'stage-royan.jpg', 
  'Stage Multi-danses à Laguiole': 'stage-laguiole-dance.jpg',
  'Stage de Pâques - Vallée de l\'Yonne': 'stage-yonne.jpg'
};

// Charger les images uploadées
const imagesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'uploaded-images.json'), 'utf8'));

// Récupérer tous les stages
async function getStages() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/stages`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Erreur:', error.message, error.response?.status, error.response?.data);
    return [];
  }
}

// Associer les images aux stages
async function updateStageImages() {
  console.log('🖼️ Association des images aux stages...');
  
  const stages = await getStages();
  
  for (const stage of stages) {
    const imageName = stageImages[stage.titre];
    
    if (imageName && imagesData[imageName]) {
      try {
        await axios.put(`${STRAPI_URL}/api/stages/${stage.documentId}`, {
          data: {
            image: imagesData[imageName].id
          }
        }, {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`✅ Image associée à ${stage.titre}: ${imageName}`);
      } catch (error) {
        console.error(`❌ Erreur pour ${stage.titre}:`, error.message, error.response?.data);
      }
    } else {
      console.log(`⚠️ Aucune image trouvée pour: ${stage.titre}`);
    }
  }
  
  console.log('🎉 Association des images terminée !');
}

// Exécuter la fonction
updateStageImages().catch(console.error);