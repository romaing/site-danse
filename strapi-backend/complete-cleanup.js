const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Nettoyage complet de toutes les données
async function completeCleanup() {
  console.log('🧹 Nettoyage COMPLET de toutes les données...\n');

  const collections = ['professeurs', 'stages', 'seances'];

  for (const collection of collections) {
    try {
      console.log(`\n🗑️ Nettoyage de ${collection}...`);

      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetch(`${STRAPI_URL}/api/${collection}?pagination[page]=${page}&pagination[limit]=100`, {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const items = data.data;

          if (items.length === 0) {
            hasMore = false;
            continue;
          }

          console.log(`📄 Page ${page}: ${items.length} éléments`);

          // Supprimer tous les éléments de cette page
          for (const item of items) {
            try {
              await fetch(`${STRAPI_URL}/api/${collection}/${item.id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${STRAPI_TOKEN}`
                }
              });
              process.stdout.write('.');
            } catch (deleteError) {
              console.log(`❌ Erreur suppression ${item.id}`);
            }
          }

          page++;
        } else {
          console.log(`❌ Erreur récupération page ${page}`);
          hasMore = false;
        }
      }

      console.log(`\n✅ ${collection} nettoyé`);

    } catch (error) {
      console.error(`❌ Erreur nettoyage ${collection}:`, error.message);
    }
  }

  console.log('\n🎉 Nettoyage COMPLET terminé !');
  console.log('Base de données vide et prête pour import propre.');
}

completeCleanup().catch(console.error);