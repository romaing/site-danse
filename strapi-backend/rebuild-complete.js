const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

async function apiRequest(endpoint, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
  };

  const config = { method, headers };
  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${STRAPI_URL}${endpoint}`, config);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function rebuildData() {
  console.log('🔄 RECONSTRUCTION COMPLÈTE DE STRAPI...\n');

  // Import des professeurs
  console.log('📥 Étape 1: Import des professeurs...');

  const professeurs = [
    {
      nom: "Schlienger",
      prenom: "Jonathan",
      biographie: "Moniteur diplômé de Danse de Salon avec plus de 15 ans d'expérience. Animateur de stages depuis 15 ans, professeur de danse de salon.",
      specialites: ["Rock'n'Roll", "Tango", "Rumba", "Valse lente", "Quick step", "West Coast Swing", "Cha cha cha"],
      email: "danser-la-vie@orange.fr",
      telephone: "06 50 54 17 45"
    },
    {
      nom: "Galichet",
      prenom: "Stéphane",
      biographie: "Professeur de danse à 2 depuis 12 ans, ancien compétiteur dans différents styles de danse, ancien gymnaste, cours de Fitness.",
      specialites: ["Slow Fox Trot", "Bachata 2", "Rumba 2", "Kizomba 2", "Quick Step 2"],
      email: "",
      telephone: ""
    },
    {
      nom: "Mbani",
      prenom: "Brice",
      biographie: "Professeur S.B.K. mais 'polyvalent', danses caraïbes, solo.",
      specialites: ["Découverte danse caraïbes", "Toutes danses solo"],
      email: "",
      telephone: ""
    },
    {
      nom: "Grecias",
      prenom: "Céline",
      biographie: "Professorat de danse de couple, 'maître de danses de société'.",
      specialites: ["Bachata 1", "Salsa Cubaine 2", "Valse lente 2", "Tango 3", "Cha cha cha 2", "Initiation Rock'n'Roll"],
      email: "",
      telephone: ""
    },
    {
      nom: "Desjardins",
      prenom: "Sophie",
      biographie: "Professeur de danse, compétitrice (2 fois finaliste aux championnats de France 10 danses - Latines et standards), chorégraphe.",
      specialites: ["Rock'n'Roll 2", "Initiation Paso Doble", "Initiation Cha cha cha", "Quick Step 3", "West Coast Swing 1", "Salsa Cubaine 1", "Valse viennoise", "Initiation Tango", "Lindy Hop 1", "Tango 2", "West Coast Swing 2", "Rock'n'Roll 3", "Cha cha cha 3", "Rock'n'Roll 1"],
      email: "",
      telephone: ""
    },
    {
      nom: "Lasnier",
      prenom: "Marie-France",
      biographie: "Professorat de danses de Société depuis 20 ans et animatrice de Pilates et de Stretching depuis 18 ans.",
      specialites: ["Samba 2", "Valse lente 1", "Initiation Quick Step", "Salsa Cubaine 2", "Valse lente 2"],
      email: "",
      telephone: ""
    }
  ];

  for (const prof of professeurs) {
    try {
      await apiRequest('/api/professeurs', 'POST', { data: prof });
      console.log(`✅ ${prof.prenom} ${prof.nom} importé`);
    } catch (error) {
      console.log(`❌ Erreur ${prof.prenom} ${prof.nom}:`, error.message);
    }
  }

  // Import des stages
  console.log('\n📅 Étape 2: Import des stages...');

  const stages = [
    {
      titre: "Stage Danse & Ski à Pralognan",
      description: "Un stage exceptionnel alliant danse et ski dans un cadre magnifique. Minimum 2 heures de cours par jour, soirées dansantes, accès piscine, jacuzzi et sauna.",
      prix: 650,
      date_debut: "2026-03-15",
      date_fin: "2026-03-22",
      lieu: "Pralognan La Vanoise"
    },
    {
      titre: "Stage de Danse de Salon à Royan",
      description: "Stage de danse de salon en bord de mer. 15 heures de cours minimum, 2 niveaux (débutants/avancés), soirées dansantes, accès plage.",
      prix: 668,
      date_debut: "2026-06-07",
      date_fin: "2026-06-13",
      lieu: "Saint-Georges de Didonne (Royan)"
    },
    {
      titre: "Stage Multi-danses à Laguiole",
      description: "Stage intense avec 6 professeurs professionnels. Choix de 3 à 6 danses parmi 15 proposées. Soirées dansantes tous les soirs.",
      prix: 548.50,
      date_debut: "2026-08-08",
      date_fin: "2026-08-15",
      lieu: "Laguiole (Aveyron)"
    },
    {
      titre: "Stage de Pâques - Vallée de l'Yonne",
      description: "Stage de danse printanier dans la belle Vallée de l'Yonne. Cours quotidiens, animations, soirées dansantes.",
      prix: 580,
      date_debut: "2026-05-01",
      date_fin: "2026-05-06",
      lieu: "Vallée de l'Yonne"
    }
  ];

  for (const stage of stages) {
    try {
      await apiRequest('/api/stages', 'POST', { data: stage });
      console.log(`✅ ${stage.titre} importé`);
    } catch (error) {
      console.log(`❌ Erreur ${stage.titre}:`, error.message);
    }
  }

  // Import des séances
  console.log('\n💃 Étape 3: Import des séances...');

  const seances = [
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

  for (const seance of seances) {
    try {
      await apiRequest('/api/seances', 'POST', { data: seance });
      console.log(`✅ ${seance.titre} importé`);
    } catch (error) {
      console.log(`❌ Erreur ${seance.titre}:`, error.message);
    }
  }

  console.log('\n🎉 RECONSTRUCTION TERMINÉE !');
  console.log('📊 Données créées:');
  console.log('   - 6 professeurs avec spécialités');
  console.log('   - 4 stages 2026');
  console.log('   - 15 séances de danse');
  console.log('\n🔗 Admin: http://localhost:1337/admin');
  console.log('🌐 Site: http://localhost:3001');
}

rebuildData().catch(console.error);