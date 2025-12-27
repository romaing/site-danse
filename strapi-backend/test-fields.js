const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Test des champs requis pour chaque content type
async function testRequiredFields() {
  console.log('🧪 Test des champs requis pour chaque content type...\n');

  // Test stages
  console.log('📋 Test STAGES:');
  const stageTests = [
    { titre: 'Test Stage' },
    { titre: 'Test Stage', description: 'Test description' },
    { titre: 'Test Stage', description: 'Test description', prix: 100 },
    { titre: 'Test Stage', description: 'Test description', prix: 100, date_debut: '2024-01-01' }
  ];

  for (let i = 0; i < stageTests.length; i++) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/stages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: stageTests[i] })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Test ${i + 1} réussi:`, Object.keys(stageTests[i]).join(', '));

        // Supprimer l'entrée de test
        await fetch(`${STRAPI_URL}/api/stages/${result.data.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        });
      } else {
        const error = await response.json();
        console.log(`❌ Test ${i + 1} échoué:`, Object.keys(stageTests[i]).join(', '), '-', error.error.message);
      }
    } catch (error) {
      console.error(`❌ Erreur test ${i + 1}:`, error.message);
    }
  }

  // Test seances
  console.log('\n📋 Test SEANCES:');
  const seanceTests = [
    { titre: 'Test Seance' },
    { titre: 'Test Seance', description: 'Test description' },
    { titre: 'Test Seance', description: 'Test description', type_danse: 'Rock' },
    { titre: 'Test Seance', description: 'Test description', type_danse: 'Rock', horaire: '20h00' },
    { titre: 'Test Seance', description: 'Test description', type_danse: 'Rock', horaire: '20h00', lieu: 'Salle 1' },
    { titre: 'Test Seance', description: 'Test description', type_danse: 'Rock', horaire: '20h00', lieu: 'Salle 1', prix_mensuel: 50 }
  ];

  for (let i = 0; i < seanceTests.length; i++) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/seances`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: seanceTests[i] })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Test ${i + 1} réussi:`, Object.keys(seanceTests[i]).join(', '));

        // Supprimer l'entrée de test
        await fetch(`${STRAPI_URL}/api/seances/${result.data.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        });
      } else {
        const error = await response.json();
        console.log(`❌ Test ${i + 1} échoué:`, Object.keys(seanceTests[i]).join(', '), '-', error.error.message);
      }
    } catch (error) {
      console.error(`❌ Erreur test ${i + 1}:`, error.message);
    }
  }
}

testRequiredFields().catch(console.error);