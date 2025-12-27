#!/bin/bash

echo "🔧 Configuration complète de Strapi..."

# 1. Créer un compte administrateur
echo "📝 1. Accéder à l'admin Strapi: http://localhost:1337/admin"
echo "   - Créer un compte administrateur avec email et mot de passe"
echo "   - Remplir les informations demandées"

# 2. Configuration des permissions du rôle Public
echo ""
echo "👥 2. Configuration du rôle Public:"
echo "   - Aller dans Settings > USERS & PERMISSIONS PLUGIN > Roles"
echo "   - Cliquer sur 'Public'"
echo "   - Activer les permissions suivantes:"
echo "     ✓ Professeurs (find, findOne)"
echo "     ✓ Stages (find, findOne)"
echo "     ✓ Seances (find, findOne)"
echo "     ✓ Pages (find, findOne)"
echo "     ✓ Articles (find, findOne)"
echo "     ✓ Upload (find, findOne, create, update, delete)"

# 3. Générer un token API
echo ""
echo "🔑 3. Génération du token API:"
echo "   - Aller dans Settings > API TOKENS"
echo "   - Cliquer sur 'Create new API Token'"
echo "   - Nom: Frontend Token"
echo "   - Description: Token pour le frontend Next.js"
echo "   - Duration: Unlimited"
echo "   - Token Type: Full access"
echo "   - Copier le token généré"

# 4. Configuration du frontend
echo ""
echo "⚙️ 4. Configuration du frontend:"
TOKEN_EXAMPLE="votre_token_ici"
echo "   - Ajouter au fichier .env.local:"
echo "     NEXT_PUBLIC_STRAPI_URL=http://localhost:1337"
echo "     NEXT_PUBLIC_STRAPI_TOKEN=$TOKEN_EXAMPLE"

# 5. Vérification
echo ""
echo "🔍 5. Vérification de la configuration:"
echo "   - Redémarrer Strapi: npm run develop"
echo "   - Redémarrer Next.js: npm run dev"
echo "   - Tester: curl http://localhost:1337/api/stages"

echo ""
echo "✅ Configuration terminée !"
echo ""
echo "📋 Étapes suivantes:"
echo "   1. Créer des entrées de test dans l'admin Strapi"
echo "   2. Importer les données JSON existantes"
echo "   3. Tester le frontend avec les vraies données"