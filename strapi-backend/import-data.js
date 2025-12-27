const fs = require('fs');
const path = require('path');

// Configuration Strapi
const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'e5d3b679f8f74b43ebf3f9509aaa352f7cf2835bbbb18a8cf63024150b49c5788e883b4d6f892f84786bee878f83dbb2cac1ba926bb6716d46cff3be82b38fecbe01dd85cee2d2173f615a85ff1dece6cab63414070715d8b197cb4eeb5dbe8fe69e0f9453f28f807866e85361605b7038d038bfcb49c0985a6b96e10a862867';

// Importer les données JSON
const dataPath = path.join(__dirname, '..', 'data');

function loadJsonData(filename, key) {
  try {
    const filePath = path.join(dataPath, filename);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return data[key] || data;
    }
    return [];
  } catch (error) {
    console.warn(`⚠️  Erreur en chargeant ${filename}:`, error.message);
    return [];
  }
}

async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json'
  };

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
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`❌ Erreur API ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

async function importCollection(collectionName, data, fieldMapping = {}) {
  console.log(`\n📝 Import de ${data.length} ${collectionName}...`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of data) {
    try {
      // Appliquer le mapping des champs si nécessaire
      const mappedItem = { ...item };
      Object.keys(fieldMapping).forEach(key => {
        if (mappedItem[key] !== undefined) {
          mappedItem[fieldMapping[key]] = mappedItem[key];
          delete mappedItem[key];
        }
      });

      // Créer l'entrée
      const result = await apiRequest(`/${collectionName}`, 'POST', {
        data: mappedItem
      });

      if (result.data) {
        successCount++;

        // Publier automatiquement
        try {
          await apiRequest(`/${collectionName}/${result.data.id}`, 'PUT', {
            data: { publishedAt: new Date().toISOString() }
          });
        } catch (publishError) {
          console.warn(`⚠️  Impossible de publier ${collectionName} ID ${result.data.id}`);
        }
      }
    } catch (error) {
      console.error(`❌ Erreur import ${collectionName}:`, error.message);
      errorCount++;
    }
  }

  console.log(`✅ ${collectionName}: ${successCount} importés, ${errorCount} erreurs`);
  return { success: successCount, errors: errorCount };
}

// Script d'import automatique
async function importData() {
  console.log('🚀 Démarrage de l\'import automatique des données...\n');

  // Vérifier la connexion à Strapi
  try {
    await apiRequest('/stages?populate=*', 'GET');
    console.log('✅ Connexion à Strapi établie');
  } catch (error) {
    console.error('❌ Impossible de se connecter à Strapi. Démarrez Strapi d\'abord.');
    console.log('Commande: cd strapi-backend && npm run dev');
    return;
  }

  // Charger les données
  const professeursData = loadJsonData('professeurs.json', 'professeurs');
  const stagesData = loadJsonData('stages.json', 'stages');
  const coursData = loadJsonData('cours.json', 'danses');

  console.log(`📊 Données à importer:`);
  console.log(`  - Professeurs: ${professeursData.length}`);
  console.log(`  - Stages: ${stagesData.length}`);
  console.log(`  - Cours: ${coursData.length}`);

  // Importer les données
   console.log('\n🚀 Import des professeurs...');
   const profResults = await importCollection('professeurs', professeursData, {
     bio: 'biographie',
     specialites: 'specialites',
     email: 'email',
     telephone: 'telephone'
   });

  console.log('\n🚀 Import des stages...');
  const stageResults = await importCollection('stages', stagesData, {
    title: 'titre',
    description: 'description',
    dateStart: 'date_debut',
    dateEnd: 'date_fin',
    location: 'lieu',
    address: 'adresse',
    price: 'prix',
    status: 'statut',
    capacity: 'capacite',
    available: 'disponibles',
    level: 'niveau',
    program: 'programme',
    includes: 'inclus'
  });

  console.log('\n🚀 Import des séances...');
  const seancesData = coursData.map(cours => ({
    titre: `${cours.name} - ${cours.level}`,
    description: cours.description,
    type_danse: cours.name,
    niveau: cours.level.toLowerCase().includes('débutant') ? 'debutant' :
            cours.level.toLowerCase().includes('intermédiaire') ? 'intermediaire' :
            cours.level.toLowerCase().includes('avancé') ? 'avance' : 'debutant',
    horaire: '19h00-20h30', // horaire par défaut
    lieu: 'Salle de danse principale', // lieu par défaut
    prix_mensuel: 50, // prix par défaut
    professeur: null // à assigner manuellement
  }));

  const coursResults = await importCollection('seances', seancesData);

  // Tester avec un seul stage d'abord
  if (stagesData.length > 0) {
    const testStage = stagesData[0];
    console.log('Test avec le premier stage:', testStage);

    try {
      const result = await apiRequest('/stage', 'POST', {
        data: {
          titre: testStage.titre || testStage.name || 'Stage test',
          name: testStage.name || testStage.titre || 'Test name'
        }
      });

      console.log('✅ Import réussi pour le test:', result);
    } catch (error) {
      console.error('❌ Erreur test:', error.message);
    }
  }

  // Résumé final
  const totalSuccess = profResults.success + stageResults.success + coursResults.success;
  const totalErrors = profResults.errors + stageResults.errors + coursResults.errors;

  console.log('\n🎉 Import terminé !');
  console.log(`📈 Résumé: ${totalSuccess} entrées importées, ${totalErrors} erreurs`);

  if (totalSuccess > 0) {
    console.log('\n✅ Les données sont maintenant disponibles dans Strapi !');
    console.log('🔗 Vérifiez dans le Content Manager: http://localhost:1337/admin');
  }
}

importData().catch(console.error);