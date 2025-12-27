const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKUP_DIR = path.join(__dirname, 'backups');
const DB_PATH = path.join(__dirname, '.tmp/data.db');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');

function createBackup() {
  console.log('💾 Création d\'une sauvegarde automatique...');
  
  // Créer le dossier backups s'il n'existe pas
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  // Nom du fichier de backup avec timestamp
  const backupFileName = `strapi-backup-${TIMESTAMP}.db`;
  const backupFilePath = path.join(BACKUP_DIR, backupFileName);
  
  // Copier la base de données
  try {
    fs.copyFileSync(DB_PATH, backupFilePath);
    
    // Compresser le backup
    execSync(`cd ${BACKUP_DIR} && tar -czf ${backupFileName}.tar.gz ${backupFileName}`, { stdio: 'inherit' });
    
    // Supprimer le fichier .db non compressé
    fs.unlinkSync(backupFilePath);
    
    console.log(`✅ Backup créé: ${backupFileName}.tar.gz`);
    console.log(`📁 Emplacement: ${backupFilePath}.tar.gz`);
    console.log(`📊 Taille: ${(fs.statSync(backupFilePath + '.tar.gz').size / 1024 / 1024).toFixed(2)} MB`);
    
    return backupFileName + '.tar.gz';
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error.message);
    throw error;
  }
}

// Créer un fichier de log pour suivre les modifications
function logChange(action, details = '') {
  const logFile = path.join(__dirname, 'change-log.txt');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${action.toUpperCase()}: ${details}\n`;
  
  fs.appendFileSync(logFile, logEntry);
  console.log(`📝 Log: ${logEntry}`);
}

// Fonction principale
function main() {
  console.log('🔧 Configuration du système de sauvegarde automatique...');
  
  // Vérifier si la base de données existe
  if (!fs.existsSync(DB_PATH)) {
    console.log('⚠️ Base de données introuvable. Démarrer Strapi d\'abord.');
    console.log('💡 Commande: cd strapi-backend && npm run dev');
    return;
  }
  
  try {
    // Créer un backup avant toute modification
    const backupFile = createBackup();
    
    // Loguer la sauvegarde
    logChange('BACKUP', `Fichier créé: ${backupFile}`);
    
    console.log('\n🎯 Système de sauvegarde configuré !');
    console.log('\n📋 Instructions pour modifier la base de données:');
    console.log('1. Toujours faire une sauvegarde automatique avant modifications');
    console.log('2. Les backups sont stockés dans: strapi-backend/backups/');
    console.log('3. Un journal des modifications est conservé dans: change-log.txt');
    console.log('4. En cas de problème, restaurer avec le backup le plus récent');
    console.log('\n⚠️ RAPPEL: Ne jamais supprimer ou modifier directement la base de données');
    console.log('   sans créer de backup au préalable !');
    
    // Créer un fichier README pour les instructions de backup
    const readmeContent = `# Sauvegardes Automatiques Strapi

## Emplacement
\`\`\`
strapi-backend/backups/
\`\`\`

## Format de nommage
\`strapi-backup-YYYY-MM-JJ-HHMMSS.tar.gz\`\`

## Restoration

Pour restaurer un backup:
\`\`\`bash
cd strapi-backend/backups
tar -xzf strapi-backup-[DATE-HEURE].tar.gz
cp strapi-backup-[DATE-HEURE].db ../.tmp/data.db
\`\`\`

## Logs
Toutes les modifications sont loguées dans \`change-log.txt\`.

## Commandes utiles

### Voir les backups disponibles
\`\`\`bash
ls -la strapi-backend/backups/
\`\`\`

### Restaurer le backup le plus récent
\`\`\`bash
cd strapi-backend && ./restore-latest.sh
\`\`\`
`;
    
    fs.writeFileSync(path.join(__dirname, 'README_BACKUP.md'), readmeContent);
    
    console.log('📄 Documentation créée: README_BACKUP.md');
    
  } catch (error) {
    console.error('❌ Erreur configuration:', error.message);
  }
}

// Exécuter la configuration
main();