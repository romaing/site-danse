const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

async function cleanAndImport() {
  console.log('🧹 Nettoyage et réimport des données...\n');

  // Supprimer tous les anciens contenus
  console.log('🗑️ Suppression des anciens contenus...');

  const collections = ['professeurs', 'stages', 'seances'];

  for (const collection of collections) {
    try {
      let deletedCount = 0;
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        // Récupérer une page d'éléments
        const response = await fetch(`${STRAPI_URL}/api/${collection}?pagination[page]=${page}&pagination[limit]=50`, {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        });

        if (!response.ok) {
          hasMore = false;
          break;
        }

        const data = await response.json();
        const items = data.data;

        if (items.length === 0) {
          hasMore = false;
          break;
        }

        console.log(`📋 ${collection} page ${page}: ${items.length} entrées à supprimer`);

        // Supprimer chaque entrée
        for (const item of items) {
          await fetch(`${STRAPI_URL}/api/${collection}/${item.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${STRAPI_TOKEN}`
            }
          });
          deletedCount++;
        }

        page++;
      }

      console.log(`✅ ${collection}: ${deletedCount} entrées supprimées`);
    } catch (error) {
      console.error(`❌ Erreur nettoyage ${collection}:`, error.message);
    }
  }

  console.log('\n✅ Nettoyage terminé');
  console.log('🎯 Base de données propre et prête pour l\'import !');
}

cleanAndImport().catch(console.error);