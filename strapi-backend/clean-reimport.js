const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Suppression complète et réimport automatique
async function cleanAndReimport() {
  console.log('🧹 SUPPRESSION COMPLÈTE + RÉIMPORT AUTOMATIQUE...\n');

  const collections = ['professeurs', 'stages', 'seances'];

  // Étape 1 : Suppression complète
  console.log('🗑️ SUPPRESSION DE TOUT LE CONTENU...\n');

  for (const collection of collections) {
    console.log(`Suppression ${collection}...`);

    let page = 1;
    let deletedCount = 0;

    while (true) {
      try {
        // Récupérer une page d'éléments
        const response = await fetch(`${STRAPI_URL}/api/${collection}?pagination[page]=${page}&pagination[limit]=50`, {
          headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
        });

        if (!response.ok) break;

        const data = await response.json();
        const items = data.data;

        if (items.length === 0) break;

        // Supprimer chaque élément
        for (const item of items) {
          await fetch(`${STRAPI_URL}/api/${collection}/${item.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
          });
          deletedCount++;
        }

        page++;
      } catch (error) {
        break;
      }
    }

    console.log(`✅ ${collection}: ${deletedCount} éléments supprimés\n`);
  }

  console.log('🎯 BASE DE DONNÉES VIDE - PRÊTE POUR IMPORT\n');

  // Étape 2 : Import des données depuis les fichiers JSON
  console.log('📥 IMPORT DES DONNÉES JSON 2026...\n');

  // Import professeurs (structure simple d'abord)
  const profsData = [
    { nom: "Schlienger", prenom: "Jonathan" },
    { nom: "Galichet", prenom: "Stéphane" },
    { nom: "Mbani", prenom: "Brice" },
    { nom: "Grecias", prenom: "Céline" },
    { nom: "Desjardins", prenom: "Sophie" },
    { nom: "Lasnier", prenom: "Marie-France" }
  ];

  console.log('👨‍🏫 Import professeurs...');
  let profCount = 0;
  for (const prof of profsData) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/professeurs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: prof })
      });

      if (response.ok) {
        profCount++;
        process.stdout.write('.');
      } else {
        const error = await response.text();
        console.log(`❌ Erreur prof: ${error}`);
      }
    } catch (error) {
      console.log(`❌ Erreur réseau: ${error.message}`);
    }
  }
  console.log(` ✅ ${profCount} professeurs importés\n`);

  // Import stages (structure simple)
  const stagesData = [
    { titre: "Stage Danse & Ski à Pralognan" },
    { titre: "Stage de Danse de Salon à Royan" },
    { titre: "Stage Multi-danses à Laguiole" },
    { titre: "Stage de Pâques - Vallée de l'Yonne" }
  ];

  console.log('🎭 Import stages...');
  let stageCount = 0;
  for (const stage of stagesData) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/stages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: stage })
      });

      if (response.ok) {
        stageCount++;
        process.stdout.write('.');
      }
    } catch (error) {
      console.log(`❌ Erreur stage ${stage.titre}`);
    }
  }
  console.log(` ✅ ${stageCount} stages importés\n`);

  // Import danses (structure simple - seulement les champs obligatoires)
  const dansesData = [
    { titre: "Rock 'n' Roll", description: "Danse énergique et rythmée", type_danse: "Rock", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Tango", description: "Danse passionnée et élégante", type_danse: "Tango", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Cha Cha Cha", description: "Danse latine sensuelle et rythmée", type_danse: "Cha Cha Cha", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Rumba", description: "Danse romantique et sensuelle", type_danse: "Rumba", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Valse lente", description: "Danse élégante et romantique", type_danse: "Valse", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Quick Step", description: "Danse rapide et dynamique", type_danse: "Quick Step", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "West Coast Swing", description: "Danse moderne et créative", type_danse: "Swing", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Valse viennoise", description: "Danse tournante et élégante", type_danse: "Valse", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Slow Fox Trot", description: "Danse sophistiquée et fluide", type_danse: "Fox Trot", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Bachata", description: "Danse romantique d'origine dominicaine", type_danse: "Bachata", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Salsa Cubaine", description: "Danse latine authentique et rythmée", type_danse: "Salsa", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Kizomba", description: "Danse sensuelle d'origine angolaise", type_danse: "Kizomba", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Paso Doble", description: "Danse dramatique et passionnée", type_danse: "Paso Doble", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Samba", description: "Danse festive et énergique", type_danse: "Samba", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 },
    { titre: "Découverte danse caraïbes", description: "Initiation aux danses des Caraïbes", type_danse: "Caraïbes", horaire: "20h00", lieu: "Salle de danse", prix_mensuel: 50 }
  ];

  console.log('💃 Import danses...');
  let danseCount = 0;
  for (const danse of dansesData) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/seances`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: danse })
      });

      if (response.ok) {
        danseCount++;
        process.stdout.write('.');
      }
    } catch (error) {
      console.log(`❌ Erreur danse ${danse.titre}`);
    }
  }
  console.log(` ✅ ${danseCount} danses importées\n`);

  // Résumé final
  console.log('🎉 RÉIMPORT AUTOMATIQUE TERMINÉ !');
  console.log('📊 CONTENU FINAL :');
  console.log(`   👨‍🏫 ${profCount} professeurs`);
  console.log(`   🎭 ${stageCount} stages`);
  console.log(`   💃 ${danseCount} danses`);
  console.log(`   📈 TOTAL: ${profCount + stageCount + danseCount} éléments\n`);

  if (profCount === 6 && stageCount === 4 && danseCount === 15) {
    console.log('✅ SUCCÈS COMPLET ! Toutes les données 2026 sont maintenant dans Strapi !');
  } else {
    console.log('⚠️ Import partiel - Vérifiez les erreurs ci-dessus');
  }
}

cleanAndReimport().catch(console.error);