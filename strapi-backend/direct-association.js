const { createStrapi } = require('@strapi/strapi');

async function associateImagesDirectly() {
  console.log('🔗 ASSOCIATION DIRECTE DES IMAGES VIA STRAPI SDK\n');

  try {
    // Créer une instance Strapi
    const strapi = await createStrapi({
      cwd: process.cwd(),
      autoReload: false,
      serveAdminPanel: false
    }).load();

    console.log('✅ Strapi chargé');

    // Associations des stages
    const stageAssociations = [
      { id: 118, imageId: 26, name: 'Pralognan' },
      { id: 120, imageId: 11, name: 'Royan' },
      { id: 122, imageId: 31, name: 'Laguiole' },
      { id: 124, imageId: 14, name: 'Vallée de l\'Yonne' }
    ];

    for (const assoc of stageAssociations) {
      try {
        console.log(`Association stage ${assoc.name} (ID ${assoc.id}) avec image ${assoc.imageId}...`);

        // Utiliser l'entity service pour mettre à jour
        await strapi.entityService.update('api::stage.stage', assoc.id, {
          data: {
            image: assoc.imageId
          }
        });

        console.log(`✅ ${assoc.name} associé avec succès !`);
      } catch (error) {
        console.log(`❌ Erreur pour ${assoc.name}:`, error.message);
      }
    }

    // Associations des professeurs
    const profAssociations = [
      { id: 166, imageId: 19, name: 'Jonathan Schlienger' },
      { id: 168, imageId: 5, name: 'Stéphane Galichet' },
      { id: 170, imageId: 6, name: 'Brice Mbani' },
      { id: 172, imageId: 23, name: 'Céline Grecias' },
      { id: 174, imageId: 8, name: 'Sophie Desjardins' },
      { id: 176, imageId: 25, name: 'Marie-France Lasnier' }
    ];

    console.log('\n👨‍🏫 Association des professeurs...');

    for (const assoc of profAssociations) {
      try {
        console.log(`Association prof ${assoc.name} (ID ${assoc.id}) avec image ${assoc.imageId}...`);

        await strapi.entityService.update('api::professeur.professeur', assoc.id, {
          data: {
            photo: assoc.imageId
          }
        });

        console.log(`✅ ${assoc.name} associé avec succès !`);
      } catch (error) {
        console.log(`❌ Erreur pour ${assoc.name}:`, error.message);
      }
    }

    console.log('\n🎉 TOUTES LES ASSOCIATIONS TERMINÉES !');
    console.log('Vérifiez dans Strapi: http://localhost:1337/admin');
    console.log('Ou sur le site: http://localhost:3001/stages et http://localhost:3001/cours');

    // Fermer Strapi proprement
    await strapi.destroy();

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

associateImagesDirectly();