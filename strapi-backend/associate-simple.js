const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

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

async function associateProfessorsToStages() {
  console.log('👨‍🏫🎭 ASSOCIATION DES PROFESSEURS AUX STAGES...\n');

  try {
    // Get all stages and professors
    const [stagesResponse, profsResponse] = await Promise.all([
      apiRequest('/api/stages?populate=*'),
      apiRequest('/api/professeurs?populate=*')
    ]);

    const stages = stagesResponse.data;
    const professeurs = profsResponse.data;

    // Find professors by name
    const findProfByName = (prenom, nom) => {
      return professeurs.find(p => p.prenom === prenom && p.nom === nom);
    };

    // Define associations
    const associations = [
      {
        stageTitle: "Stage Danse & Ski à Pralognan",
        profs: [
          findProfByName("Jonathan", "Schlienger"),
          findProfByName("Stéphane", "Galichet")
        ]
      },
      {
        stageTitle: "Stage de Danse de Salon à Royan",
        profs: [
          findProfByName("Céline", "Grecias"),
          findProfByName("Sophie", "Desjardins")
        ]
      },
      {
        stageTitle: "Stage Multi-danses à Laguiole",
        profs: [
          findProfByName("Brice", "Mbani"),
          findProfByName("Céline", "Grecias"),
          findProfByName("Marie-France", "Lasnier"),
          findProfByName("Jonathan", "Schlienger"),
          findProfByName("Stéphane", "Galichet"),
          findProfByName("Sophie", "Desjardins")
        ]
      },
      {
        stageTitle: "Stage de Pâques - Vallée de l'Yonne",
        profs: [
          findProfByName("Sophie", "Desjardins"),
          findProfByName("Marie-France", "Lasnier")
        ]
      }
    ];

    // Associate professors to stages
    for (const assoc of associations) {
      // Find the stage
      const stage = stages.find(s => s.titre === assoc.stageTitle);
      if (!stage) {
        console.log(`⚠️ Stage "${assoc.stageTitle}" non trouvé`);
        continue;
      }

      // Get valid professor IDs
      const profIds = assoc.profs.filter(p => p).map(p => p.id);

      console.log(`📝 Association stage "${assoc.stageTitle}" (ID: ${stage.id}) avec ${profIds.length} professeurs...`);

      // Update the stage with professors
      try {
        const updateData = {
          data: {
            professeurs: profIds
          }
        };

        await apiRequest(`/api/stages/${stage.id}`, 'PUT', updateData);
        console.log(`✅ SUCCÈS: Professeurs associés à "${assoc.stageTitle}"`);
      } catch (error) {
        console.log(`❌ ÉCHEC: ${assoc.stageTitle} - ${error.message}`);
      }
    }

    console.log('\n🎉 ASSOCIATIONS TERMINÉES !');
    console.log('🔗 Vérifiez dans Strapi: http://localhost:1337/admin');

  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error);
  }
}

associateProfessorsToStages();