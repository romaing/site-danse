const fs = require('fs');
const path = require('path');

// Fonction pour convertir JSON en CSV
function jsonToCsv(jsonData, fields) {
  const csvRows = [];

  // En-têtes
  csvRows.push(fields.join(','));

  // Données
  jsonData.forEach(row => {
    const csvRow = fields.map(field => {
      let value = row[field];

      // Gérer les arrays (comme specialites)
      if (Array.isArray(value)) {
        value = value.join(';');
      }

      // Gérer les valeurs null/undefined
      if (value == null) {
        value = '';
      }

      // Échapper les virgules et guillemets
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        value = `"${value.replace(/"/g, '""')}"`;
      }

      return value;
    });

    csvRows.push(csvRow.join(','));
  });

  return csvRows.join('\n');
}

// Chemins
const dataPath = path.join(__dirname, '..', 'data');
const csvPath = __dirname;

// Configuration des champs pour chaque type
const configs = [
  {
    file: 'professeurs.json',
    key: 'professeurs',
    csvFile: 'professeurs.csv',
    fields: ['nom', 'prenom', 'bio', 'specialites', 'email', 'telephone']
  },
  {
    file: 'stages.json',
    key: 'stages',
    csvFile: 'stages.csv',
    fields: ['titre', 'description', 'date_debut', 'date_fin', 'lieu', 'prix', 'niveau']
  },
  {
    file: 'cours.json',
    key: 'danses',
    csvFile: 'seances.csv',
    fields: ['name', 'description', 'level', 'duration']
  }
];

console.log('🔄 Conversion JSON vers CSV...\n');

configs.forEach(config => {
  try {
    const filePath = path.join(dataPath, config.file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier ${config.file} non trouvé, ignoré`);
      return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const jsonData = data[config.key] || data;

    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.log(`⚠️  Aucune donnée dans ${config.file}, ignoré`);
      return;
    }

    const csvContent = jsonToCsv(jsonData, config.fields);
    const csvFilePath = path.join(csvPath, config.csvFile);

    fs.writeFileSync(csvFilePath, csvContent, 'utf8');

    console.log(`✅ ${config.csvFile} créé (${jsonData.length} entrées)`);

  } catch (error) {
    console.error(`❌ Erreur avec ${config.file}:`, error.message);
  }
});

console.log('\n✨ Conversion terminée!');
console.log('📁 Fichiers CSV créés dans le dossier csv-import/');
console.log('\n📋 Prochaines étapes:');
console.log('1. Ouvrir Strapi admin: http://localhost:1337/admin');
console.log('2. Aller dans Content Manager > [Collection]');
console.log('3. Cliquer sur "Import" (plugin CSV)');
console.log('4. Sélectionner le fichier CSV correspondant');
console.log('5. Mapper les colonnes et importer');