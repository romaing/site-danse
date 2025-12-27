const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Fonction pour diagnostiquer les content types
async function diagnoseContentTypes() {
  console.log('🔍 Diagnostic des content types Strapi...\n');

  const collections = ['professeurs', 'stages', 'seances'];

  for (const collection of collections) {
    try {
      console.log(`📋 Vérification de ${collection}...`);

      // Tester GET
      const getResponse = await fetch(`${STRAPI_URL}/api/${collection}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        }
      });

      if (getResponse.ok) {
        const data = await getResponse.json();
        console.log(`✅ GET ${collection}: OK (${data.data.length} entrées)`);
      } else {
        console.log(`❌ GET ${collection}: ${getResponse.status} ${getResponse.statusText}`);
      }

      // Tester POST avec données minimales selon le content type
      let testData = {};
      if (collection === 'professeurs') {
        testData = { nom: 'Test', prenom: 'Test' };
      } else if (collection === 'stages') {
        testData = { titre: 'Test', description: 'Test description', prix: 100 };
      } else if (collection === 'seances') {
        testData = { titre: 'Test', description: 'Test description', type_danse: 'Rock', horaire: '20h00', lieu: 'Salle 1', prix_mensuel: 50 };
      }

      const postResponse = await fetch(`${STRAPI_URL}/api/${collection}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: testData })
      });

      if (postResponse.ok) {
        console.log(`✅ POST ${collection}: OK`);
        // Supprimer l'entrée de test
        const result = await postResponse.json();
        if (result.data?.id) {
          await fetch(`${STRAPI_URL}/api/${collection}/${result.data.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${STRAPI_TOKEN}`
            }
          });
        }
      } else {
        const errorText = await postResponse.text();
        console.log(`❌ POST ${collection}: ${postResponse.status} - ${errorText}`);
      }

      console.log('');

    } catch (error) {
      console.error(`❌ Erreur avec ${collection}:`, error.message);
    }
  }
}

diagnoseContentTypes().catch(console.error);