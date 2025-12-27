const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '.tmp/data.db');
const db = new sqlite3.Database(DB_PATH);

// Données complètes des stages depuis le JSON
const stagesData = [
  {
    titre: "Stage Danse & Ski à Pralognan",
    prix: 490,
    date_debut: "2025-03-16",
    date_fin: "2025-03-22",
    lieu: "Pralognan-la-Vanoise (73)"
  },
  {
    titre: "Stage de Danse de Salon à Royan", 
    prix: 480,
    date_debut: "2025-05-25",
    date_fin: "2025-05-29",
    lieu: "Royan (17)"
  },
  {
    titre: "Stage Multi-danses à Laguiole",
    prix: 520,
    date_debut: "2025-08-10",
    date_fin: "2025-08-16", 
    lieu: "Laguiole (12)"
  },
  {
    titre: "Stage de Pâques - Vallée de l'Yonne",
    prix: 460,
    date_debut: "2025-04-18",
    date_fin: "2025-04-21",
    lieu: "Auxerre (89) et environs"
  }
];

async function updateStageInformations() {
  console.log('🎭 Mise à jour des informations complètes des stages...');
  
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let updatedCount = 0;
      
      stagesData.forEach((stageInfo, index) => {
        db.run(
          `UPDATE stages SET prix = ?, date_debut = ?, date_fin = ?, lieu = ? WHERE titre = ?`,
          [stageInfo.prix, stageInfo.date_debut, stageInfo.date_fin, stageInfo.lieu, stageInfo.titre],
          function(err) {
            if (err) {
              console.error(`❌ Erreur mise à jour ${stageInfo.titre}:`, err.message);
            } else {
              console.log(`✅ ${stageInfo.titre} mis à jour`);
              updatedCount++;
              
              if (updatedCount === stagesData.length) {
                console.log(`🎉 ${updatedCount} stages mis à jour avec succès !`);
                resolve(updatedCount);
              }
            }
          }
        );
      });
    });
  });
}

// Exécuter la mise à jour
updateStageInformations()
  .then((count) => {
    console.log(`✨ Mise à jour terminée: ${count} stages`);
    db.close();
  })
  .catch((error) => {
    console.error('❌ Erreur:', error);
    db.close();
  });