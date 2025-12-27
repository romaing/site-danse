const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Test simple d'import
async function testImport() {
  console.log('🧪 TEST D\'IMPORT SIMPLE...\n');

  // Test professeur
  const testProf = {
    nom: "Test",
    prenom: "Professeur"
  };

  console.log('Test professeur:', testProf);

  try {
    const response = await fetch(`${STRAPI_URL}/api/professeurs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: testProf })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Professeur créé:', result.data);

      // Vérifier la récupération
      const checkResponse = await fetch(`${STRAPI_URL}/api/professeurs/${result.data.id}`, {
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        console.log('✅ Professeur récupéré:', checkData.data.attributes);
      }

    } else {
      const error = await response.text();
      console.log('❌ Erreur création:', error);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testImport().catch(console.error);