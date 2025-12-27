const fs = require('fs');
const path = require('path');

// Chemin vers la base de données SQLite
const DB_PATH = path.join(__dirname, '.tmp/data.db');

// Charger les données JSON
const dataPath = path.join(__dirname, '..', 'data');

function loadJsonData(filename) {
  try {
    const filePath = path.join(dataPath, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return [];
  } catch (error) {
    console.warn(`⚠️  Erreur en chargeant ${filename}:`, error.message);
    return [];
  }
}

// Fonction pour générer un ID unique
function generateId() {
  return Math.floor(Math.random() * 1000000) + Date.now();
}

// Importer les professeurs
async function importProfesseurs(db) {
  console.log('👨‍🏫 Import des professeurs...');
  const professeurs = loadJsonData('professeurs.json');
  
  let successCount = 0;
  for (const prof of professeurs) {
    try {
      const id = generateId();
      const documentId = `professeur_${id}`;
      
      // Insérer dans la table professeurs
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO professeurs_components (
            id, document_id, nom, prenom, biographie, specialites, email, telephone,
            created_at, updated_at, published_at, created_by_id, updated_by_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'), 1, 1)`,
          [
            id, documentId, prof.nom, prof.prenom, prof.biographie || '',
            JSON.stringify(prof.specialites || []), prof.email || '', prof.telephone || ''
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
      
      successCount++;
      console.log(`✅ Professeur importé: ${prof.prenom} ${prof.nom}`);
    } catch (error) {
      console.error(`❌ Erreur import professeur ${prof.nom}:`, error.message);
    }
  }
  
  console.log(`✅ ${successCount} professeurs importés`);
  return successCount;
}

// Importer les stages
async function importStages(db) {
  console.log('🎭 Import des stages...');
  const stages = loadJsonData('stages.json');
  
  let successCount = 0;
  for (const stage of stages) {
    try {
      const id = generateId();
      const documentId = `stage_${id}`;
      
      // Convertir les dates si nécessaire
      let dateDebut = null;
      let dateFin = null;
      
      if (stage.dateStart) {
        dateDebut = new Date(stage.dateStart).toISOString().split('T')[0];
      }
      if (stage.dateEnd) {
        dateFin = new Date(stage.dateEnd).toISOString().split('T')[0];
      }
      
      // Insérer dans la table stages
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO stages_components (
            id, document_id, titre, description, prix, date_debut, date_fin, lieu,
            created_at, updated_at, published_at, created_by_id, updated_by_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'), 1, 1)`,
          [
            id, documentId, stage.title || stage.name, stage.description || '',
            stage.price || 0, dateDebut, dateFin, stage.location || stage.lieu || ''
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
      
      successCount++;
      console.log(`✅ Stage importé: ${stage.title || stage.name}`);
    } catch (error) {
      console.error(`❌ Erreur import stage ${stage.title}:`, error.message);
    }
  }
  
  console.log(`✅ ${successCount} stages importés`);
  return successCount;
}

// Importer les séances (cours)
async function importSeances(db) {
  console.log('💃 Import des séances...');
  const cours = loadJsonData('cours.json');
  
  let successCount = 0;
  for (const cour of cours) {
    try {
      const id = generateId();
      const documentId = `seance_${id}`;
      
      // Définir le niveau par défaut
      let niveau = 'debutant';
      if (cour.level && cour.level.toLowerCase().includes('interm')) {
        niveau = 'intermediaire';
      } else if (cour.level && cour.level.toLowerCase().includes('avanc')) {
        niveau = 'avance';
      }
      
      // Insérer dans la table seances
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO seances_components (
            id, document_id, titre, description, type_danse, niveau, horaire, lieu, prix_mensuel,
            created_at, updated_at, published_at, created_by_id, updated_by_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'), 1, 1)`,
          [
            id, documentId, cour.name, cour.description || '', cour.name, niveau,
            cour.duration || '1 heure', 'Salle de danse', 50 // Prix par défaut
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
      
      successCount++;
      console.log(`✅ Séance importée: ${cour.name}`);
    } catch (error) {
      console.error(`❌ Erreur import séance ${cour.name}:`, error.message);
    }
  }
  
  console.log(`✅ ${successCount} séances importées`);
  return successCount;
}

// Fonction principale
async function importDirectData() {
  console.log('🚀 Import direct des données dans Strapi SQLite...\n');
  
  // Vérifier que la base de données existe
  if (!fs.existsSync(DB_PATH)) {
    console.error('❌ Base de données SQLite introuvable:', DB_PATH);
    console.log('Assurez-vous que Strapi est démarré: cd strapi-backend && npm run dev');
    return;
  }
  
  const db = new Database(DB_PATH);
  
  try {
    console.log('📊 Base de données connectée');
    
    // Démarrer une transaction
    await new Promise((resolve, reject) => {
      db.run('BEGIN TRANSACTION', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Importer les données
    const profCount = await importProfesseurs(db);
    const stageCount = await importStages(db);
    const seanceCount = await importSeances(db);
    
    // Valider la transaction
    await new Promise((resolve, reject) => {
      db.run('COMMIT', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    const totalSuccess = profCount + stageCount + seanceCount;
    console.log('\n🎉 Import terminé avec succès !');
    console.log(`📈 Résumé: ${totalSuccess} entrées importées`);
    console.log(`  - Professeurs: ${profCount}`);
    console.log(`  - Stages: ${stageCount}`);
    console.log(`  - Séances: ${seanceCount}`);
    
    console.log('\n✅ Les données sont maintenant disponibles dans Strapi !');
    console.log('🔗 Vérifiez dans le Content Manager: http://localhost:1337/admin');
    
  } catch (error) {
    // Annuler la transaction en cas d'erreur
    await new Promise((resolve) => {
      db.run('ROLLBACK', () => resolve());
    });
    console.error('❌ Erreur lors de l\'import:', error.message);
  } finally {
    db.close();
  }
}

// Exécuter l'import
importDirectData().catch(console.error);