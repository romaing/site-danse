#!/bin/bash

# Script de restauration du backup le plus récent
BACKUP_DIR="backups"
DB_PATH="../.tmp/data.db"

echo "🔄 Recherche du backup le plus récent..."

# Trouver le backup le plus récent
LATEST_BACKUP=$(ls -t $BACKUP_DIR/strapi-backup-*.tar.gz 2>/dev/null | head -1 | cut -d' ' ' -f1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "❌ Aucun backup trouvé dans $BACKUP_DIR"
    exit 1
fi

echo "📦 Backup trouvé: $LATEST_BACKUP"
echo "🗑️  Restauration en cours..."

# Restaurer le backup
cd $BACKUP_DIR
tar -xzf "$LATEST_BACKUP"

# Copier la base restaurée
cp strapi-backup-*.db "$DB_PATH"

echo "✅ Restauration terminée !"
echo "📊 Base de données restaurée depuis: $LATEST_BACKUP"
echo "🔄 Redémarrage de Strapi recommandé"
echo "💡 Commande: cd strapi-backend && npm run dev"