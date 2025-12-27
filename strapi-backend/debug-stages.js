const fs = require('fs');
const path = require('path');

// Configuration Strapi
const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

async function apiRequest(endpoint, method = 'GET', data = null, useAuth = true) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  if (useAuth) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const config = {
    method,
    headers
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`❌ Erreur API ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

// Test d'import des stages uniquement
async function debugStages() {
  console.log('🔍 Debug des stages...\n');

  // Charger les données des stages
  const stagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'stages.json'), 'utf8')).stages;

  console.log(`📊 ${stagesData.length} stages à importer`);
  console.log('Premier stage:', stagesData[0]);

  // Tester chaque stage individuellement
  for (let i = 0; i < Math.min(stagesData.length, 2); i++) {
    const stage = stagesData[i];
    console.log(`\n🧪 Test stage ${i + 1}: ${stage.titre}`);

    try {
      // Essayer avec titre seulement
      const simpleData = { titre: stage.titre };
      console.log('Données envoyées:', simpleData);

      const result = await apiRequest('/stages', 'POST', { data: simpleData }, true);
      console.log('✅ Succès:', result.data);

      // Supprimer l'entrée de test
      await apiRequest(`/stages/${result.data.id}`, 'DELETE', null, true);
      console.log('🗑️ Entrée de test supprimée');

    } catch (error) {
      console.log('❌ Erreur:', error.message);
    }
  }
}

debugStages().catch(console.error);