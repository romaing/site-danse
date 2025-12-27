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

async function updateProfesseursSpecialites() {
  console.log('🔄 MISE À JOUR DES SPÉCIALITÉS DES PROFESSEURS...\n');

  const specialitesData = {
    188: ["Rock'n'Roll", "Tango", "Rumba", "Valse lente", "Quick step", "West Coast Swing", "Cha cha cha"], // Jonathan
    190: ["Slow Fox Trot", "Bachata 2", "Rumba 2", "Kizomba 2", "Quick Step 2"], // Stéphane
    182: ["Découverte danse caraïbes", "Toutes danses solo"], // Brice
    184: ["Bachata 1", "Salsa Cubaine 2", "Valse lente 2", "Tango 3", "Cha cha cha 2", "Initiation Rock'n'Roll"], // Céline
    194: ["Rock'n'Roll 2", "Initiation Paso Doble", "Initiation Cha cha cha", "Quick Step 3", "West Coast Swing 1", "Salsa Cubaine 1", "Valse viennoise", "Initiation Tango", "Lindy Hop 1", "Tango 2", "West Coast Swing 2", "Rock'n'Roll 3", "Cha cha cha 3", "Rock'n'Roll 1"], // Sophie
    186: ["Samba 2", "Valse lente 1", "Initiation Quick Step", "Salsa Cubaine 2", "Valse lente 2"] // Marie-France
  };

  for (const [profId, specialites] of Object.entries(specialitesData)) {
    try {
      await apiRequest(`/api/professeurs/${profId}`, 'PUT', {
        data: { specialites }
      });
      console.log(`✅ Spécialités mises à jour pour professeur ID ${profId}`);
    } catch (error) {
      console.log(`❌ Erreur mise à jour professeur ${profId}:`, error.message);
    }
  }
}

async function associateProfesseursToSeances() {
  console.log('\n💃 ASSOCIATION PROFESSEURS → SÉANCES...\n');

  // Récupérer tous les professeurs et séances
  const [professeursRes, seancesRes] = await Promise.all([
    apiRequest('/api/professeurs?populate=*'),
    apiRequest('/api/seances?populate=*')
  ]);

  const professeurs = professeursRes.data;
  const seances = seancesRes.data;

  // Fonction pour trouver les professeurs par spécialité
  function findProfesseursBySpecialite(specialite) {
    return professeurs.filter(prof => {
      if (!prof.specialites) return false;
      return prof.specialites.some(spec =>
        spec.toLowerCase().includes(specialite.toLowerCase()) ||
        specialite.toLowerCase().includes(spec.toLowerCase())
      );
    });
  }

  // Associer les professeurs aux séances
  for (const seance of seances) {
    try {
      const professeursAssocies = findProfesseursBySpecialite(seance.titre || seance.type_danse);

      if (professeursAssocies.length > 0) {
        const profIds = professeursAssocies.map(p => p.id);

        await apiRequest(`/api/seances/${seance.id}`, 'PUT', {
          data: { professeurs: profIds }
        });

        console.log(`✅ Séance "${seance.titre}" associée à ${professeursAssocies.length} professeur(s)`);
      }
    } catch (error) {
      console.log(`❌ Erreur association séance ${seance.id}:`, error.message);
    }
  }
}

async function associateProfesseursToStages() {
  console.log('\n🎭 ASSOCIATION PROFESSEURS → STAGES...\n');

  // Récupérer les stages
  const stagesRes = await apiRequest('/api/stages?populate=*');
  const stages = stagesRes.data;

  // Associations prédéfinies basées sur les spécialités et lieux
  const associations = {
    "Stage Danse & Ski à Pralognan": [188, 190], // Jonathan + Stéphane (montagne, danse & ski)
    "Stage de Danse de Salon à Royan": [184, 194], // Céline + Sophie (bord de mer, société)
    "Stage Multi-danses à Laguiole": [182, 184, 186, 188, 190, 194], // Tous les professeurs
    "Stage de Pâques - Vallée de l'Yonne": [194, 186] // Sophie + Marie-France (printanier)
  };

  for (const stage of stages) {
    try {
      const profIds = associations[stage.titre];

      if (profIds) {
        await apiRequest(`/api/stages/${stage.id}`, 'PUT', {
          data: { professeurs: profIds }
        });

        console.log(`✅ Stage "${stage.titre}" associé à ${profIds.length} professeur(s)`);
      }
    } catch (error) {
      console.log(`❌ Erreur association stage ${stage.id}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 MISE À JOUR COMPLÈTE DES ASSOCIATIONS\n');

  try {
    await updateProfesseursSpecialites();
    await associateProfesseursToSeances();
    await associateProfesseursToStages();

    console.log('\n🎉 ASSOCIATIONS TERMINÉES AVEC SUCCÈS !');
    console.log('📊 Vérifiez dans Strapi: http://localhost:1337/admin');
    console.log('🌐 Testez sur le site: http://localhost:3001');

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

main();