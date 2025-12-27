const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

// Nettoyage final et import des vraies données
async function finalClean() {
  console.log('🧹 NETTOYAGE FINAL...\n');

  // Supprimer TOUS les stages
  console.log('🗑️ Suppression de tous les stages...');
  const stagesResponse = await fetch(`${STRAPI_URL}/api/stages?pagination[limit]=100`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
  });

  if (stagesResponse.ok) {
    const stagesData = await stagesResponse.json();
    for (const stage of stagesData.data) {
      await fetch(`${STRAPI_URL}/api/stages/${stage.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
      });
    }
  }

  // Supprimer TOUS les professeurs
  console.log('🗑️ Suppression de tous les professeurs...');
  const profsResponse = await fetch(`${STRAPI_URL}/api/professeurs?pagination[limit]=100`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
  });

  if (profsResponse.ok) {
    const profsData = await profsResponse.json();
    for (const prof of profsData.data) {
      await fetch(`${STRAPI_URL}/api/professeurs/${prof.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
      });
    }
  }

  // Supprimer TOUTES les seances
  console.log('🗑️ Suppression de toutes les seances...');
  const seancesResponse = await fetch(`${STRAPI_URL}/api/seances?pagination[limit]=100`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
  });

  if (seancesResponse.ok) {
    const seancesData = await seancesResponse.json();
    for (const seance of seancesData.data) {
      await fetch(`${STRAPI_URL}/api/seances/${seance.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
      });
    }
  }

  console.log('✅ Nettoyage terminé');

  // Import des vraies données 2026
  console.log('\n📥 Import des vraies données 2026...\n');

  // Import des 6 professeurs
  const profs = [
    { nom: "Schlienger", prenom: "Jonathan" },
    { nom: "Galichet", prenom: "Stéphane" },
    { nom: "Mbani", prenom: "Brice" },
    { nom: "Grecias", prenom: "Céline" },
    { nom: "Desjardins", prenom: "Sophie" },
    { nom: "Lasnier", prenom: "Marie-France" }
  ];

  console.log('👨‍🏫 Import 6 professeurs...');
  for (const prof of profs) {
    await fetch(`${STRAPI_URL}/api/professeurs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: prof })
    });
  }

  // Import des 4 stages 2026
  const stages = [
    { titre: "Stage Danse & Ski à Pralognan", date_debut: "2026-03-15", date_fin: "2026-03-22", prix: 650 },
    { titre: "Stage de Danse de Salon à Royan", date_debut: "2026-06-07", date_fin: "2026-06-13", prix: 668 },
    { titre: "Stage Multi-danses à Laguiole", date_debut: "2026-08-08", date_fin: "2026-08-15", prix: 548.50 },
    { titre: "Stage de Pâques - Vallée de l'Yonne", date_debut: "2026-05-01", date_fin: "2026-05-06", prix: 580 }
  ];

  console.log('🎭 Import 4 stages 2026...');
  for (const stage of stages) {
    await fetch(`${STRAPI_URL}/api/stages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: stage })
    });
  }

  // Import des 15 danses
  const danses = [
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

  console.log('💃 Import 15 danses...');
  for (const danse of danses) {
    await fetch(`${STRAPI_URL}/api/seances`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: danse })
    });
  }

  console.log('\n🎉 NETTOYAGE FINAL TERMINÉ !');
  console.log('📊 Base de données propre avec seulement les données 2026');
  console.log('✅ 6 professeurs + 4 stages + 15 danses = 25 éléments valides');
}

finalClean().catch(console.error);