const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

const associations = [
  { profId: 166, imageId: 19, name: 'Jonathan Schlienger' },
  { profId: 168, imageId: 20, name: 'Stéphane Galichet' },
  { profId: 170, imageId: 21, name: 'Brice Mbani' },
  { profId: 172, imageId: 23, name: 'Céline Grecias' },
  { profId: 174, imageId: 8, name: 'Sophie Desjardins' },
  { profId: 176, imageId: 25, name: 'Marie-France Lasnier' }
];

async function associateImages() {
  console.log('🎨 ASSOCIATION AUTOMATIQUE DES PHOTOS AUX PROFESSEURS\n');

  for (const assoc of associations) {
    try {
      console.log(`Associer ${assoc.name} (ID ${assoc.profId}) avec image ID ${assoc.imageId}...`);

      const response = await fetch(`${STRAPI_URL}/api/professeurs/${assoc.profId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: { photo: assoc.imageId }
        })
      });

      if (response.ok) {
        console.log(`✅ ${assoc.name} → Photo associée avec succès !`);
      } else {
        const error = await response.text();
        console.log(`❌ Échec pour ${assoc.name}: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.log(`❌ Erreur réseau pour ${assoc.name}:`, error.message);
    }

    // Petite pause entre les requêtes
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n🎉 ASSOCIATION TERMINÉE !');
  console.log('Vérifiez les résultats dans Strapi: http://localhost:1337/admin');
  console.log('Ou sur votre site: http://localhost:3001/cours');
}

associateImages();