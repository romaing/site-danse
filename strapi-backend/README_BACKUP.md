# Sauvegardes Automatiques Strapi

## Emplacement
```
strapi-backend/backups/
```

## Format de nommage
`strapi-backup-YYYY-MM-JJ-HHMMSS.tar.gz``

## Restoration

Pour restaurer un backup:
```bash
cd strapi-backend/backups
tar -xzf strapi-backup-[DATE-HEURE].tar.gz
cp strapi-backup-[DATE-HEURE].db ../.tmp/data.db
```

## Logs
Toutes les modifications sont loguées dans `change-log.txt`.

## Commandes utiles

### Voir les backups disponibles
```bash
ls -la strapi-backend/backups/
```

### Restaurer le backup le plus récent
```bash
cd strapi-backend && ./restore-latest.sh
```
