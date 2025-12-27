const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration Strapi
const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'e5d3b679f8f74b43ebf3f9509aaa352f7cf2835bbbb18a8cf63024150b49c5788e883b4d6f892f84786bee878f83dbb2cac1ba926bb6716d46cff3be82b38fecbe01dd85cee2d2173f615a85ff1dece6cab63414070715d8b197cb4eeb5dbe8fe69e0f9453f28f807866e85361605b7038d038bfcb49c0985a6b96e10a862867';

// Charger les données
const dataPath = path.join(__dirname, '..', 'data');
const imagesPath = path.join(__dirname, 'uploaded-images.json');

function loadJsonData(filename) {
  try {
    const filePath = path.join(dataPath, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return [];
  } catch (error) {
    console.warn(`⚠️  Erreur en chargeant ${filename}:`, error.message);
    return [];
  }
}

const imagesData = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
const professeursData = loadJsonData('professeurs.json');
const stagesData = loadJsonData('stages.json');

// Mapping des images
const professorImages = {
  'Jonathan': 'professor-jonathan.jpg',
  'Stéphane': 'professor-stephane.jpg', 
  'Brice': 'professor-brice.jpg',
  'Céline': 'professor-celine.jpg',
  'Sophie': 'professor-sophie.jpg',
  'Marie-France': 'professor-marie.jpg'
};

const stageImages = {
  'Stage Danse & Ski à Pralognan': 'stage-pralognan-new.jpg',
  'Stage de Danse de Salon à Royan': 'stage-royan.jpg',
  'Stage Multi-danses à Laguiole': 'stage-laguiole-dance.jpg',
  'Stage de Pâques - Vallée de l\'Yonne': 'stage-yonne.jpg'
};

async function apiRequest(method, endpoint, data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
  };

  try {
    const response = await axios({
      method: method.toLowerCase(),
      url,
      headers,
      data
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur API ${method} ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
}

// Associer les images aux professeurs
async function associateProfessorImages() {
  console.log('👨‍🏫 Association des images aux professeurs...');
  
  // Récupérer tous les professeurs
  const response = await apiRequest('GET', '/professeurs');
  const professeurs = response.data;
  
  for (const prof of professeurs) {
    const imageName = professorImages[prof.prenom];
    if (imageName && imagesData[imageName]) {
      try {
        await apiRequest('PUT', `/professeurs/${prof.id}`, {
          data: {
            photo: imagesData[imageName].id
          }
        });
        console.log(`✅ Image associée à ${prof.prenom} ${prof.nom}`);
      } catch (error) {
        console.error(`❌ Erreur association image pour ${prof.prenom}:`, error.message);
      }
    }
  }
}

// Associer les images aux stages et compléter les données
async function updateStages() {
  console.log('🎭 Mise à jour des stages...');
  
  // Récupérer tous les stages
  const response = await apiRequest('GET', '/stages');
  const stages = response.data;
  
  for (const stage of stages) {
    // Trouver les données correspondantes
    const stageData = stagesData.find(s => s.title === stage.titre);
    if (stageData) {
      try {
        const updateData = {
          prix: stageData.price || 0,
          date_debut: stageData.dateStart ? new Date(stageData.dateStart).toISOString().split('T')[0] : null,
          date_fin: stageData.dateEnd ? new Date(stageData.dateEnd).toISOString().split('T')[0] : null,
          lieu: stageData.location || stageData.lieu || ''
        };
        
        // Ajouter l'image si disponible
        const imageName = stageImages[stage.titre];
        if (imageName && imagesData[imageName]) {
          updateData.image = imagesData[imageName].id;
        }
        
        await apiRequest('PUT', `/stages/${stage.id}`, { data: updateData });
        console.log(`✅ Stage mis à jour: ${stage.titre}`);
      } catch (error) {
        console.error(`❌ Erreur mise à jour stage ${stage.titre}:`, error.message);
      }
    }
  }
}

// Importer les professeurs manquants
async function importMissingProfessors() {
  console.log('👥 Import des professeurs manquants...');
  
  // Récupérer les professeurs existants
  const existingResponse = await apiRequest('GET', '/professeurs');
  const existingProfs = existingResponse.data;
  const existingNames = existingProfs.map(p => `${p.prenom} ${p.nom}`);
  
  for (const prof of professeursData) {
    const fullName = `${prof.prenom} ${prof.nom}`;
    if (!existingNames.includes(fullName)) {
      try {
        const imageName = professorImages[prof.prenom];
        const imageData = imageName ? imagesData[imageName] : null;
        
        const profData = {
          nom: prof.nom,
          prenom: prof.prenom,
          biographie: prof.biographie || '',
          specialites: prof.specialites || [],
          email: prof.email || null,
          telephone: prof.telephone || null,
          photo: imageData ? imageData.id : null,
          publishedAt: new Date().toISOString()
        };
        
        await apiRequest('POST', '/professeurs', { data: profData });
        console.log(`✅ Professeur importé: ${fullName}`);
      } catch (error) {
        console.error(`❌ Erreur import professeur ${fullName}:`, error.message);
      }
    }
  }
}

// Fonction principale
async function associateAndComplete() {
  console.log('🚀 Association des images et complétion des données...\n');
  
  try {
    // Importer les professeurs manquants
    await importMissingProfessors();
    
    // Associer les images aux professeurs
    await associateProfessorImages();
    
    // Mettre à jour les stages avec images et données complètes
    await updateStages();
    
    console.log('\n🎉 Association et complétion terminées avec succès !');
    console.log('🔗 Vérifiez dans le Content Manager: http://localhost:1337/admin');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error.message);
  }
}

// Exécuter
associateAndComplete().catch(console.error);