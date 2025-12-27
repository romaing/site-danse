#!/bin/bash

echo "🔧 Configuration des permissions Strapi..."

# Créer un token API public pour le frontend
echo "📝 Configuration du rôle Public..."

# Script pour configurer les permissions via l'API Strapi
# Note: Ceci doit être exécuté manuellement depuis l'interface admin
# car l'API de configuration des permissions n'est pas directement accessible

cat << 'EOF'
=== ÉTAPES À SUIVRE MANUELLEMENT ===

1. Accéder à l'admin Strapi:
   http://localhost:1337/admin

2. Créer un compte administrateur si ce n'est pas fait

3. Aller dans "Settings" > "USERS & PERMISSIONS PLUGIN" > "Roles"

4. Configurer le rôle "Public":
   - Sections à activer:
     ✓ Professeurs (find, findOne)
     ✓ Stages (find, findOne) 
     ✓ Seances (find, findOne)
     ✓ Pages (find, findOne)
     ✓ Articles (find, findOne)

5. Générer un token API:
   - Aller dans "Settings" > "API TOKENS"
   - Créer un nouveau token
   - Nom: "Frontend Token"
   - Description: "Token pour le frontend Next.js"
   - Durée: Unlimited ou selon besoin
   - Permissions: Read-only pour tous les content types

6. Copier le token généré dans .env.local:
   NEXT_PUBLIC_STRAPI_TOKEN=votre_token_ici

7. Créer quelques entrées de test dans chaque section:
   - Pages: Accueil, Stages, Contact, etc.
   - Quelques stages
   - Quelques professeurs
   - Quelques articles

EOF

echo "⏳ Attente du redémarrage de Strapi..."
sleep 5

# Test de connexion sans token (public)
echo "🔍 Test API publique..."
curl -s http://localhost:1337/api/pages | head -20

echo ""
echo "✅ Configuration des terminée!"
echo ""
echo "📋 RAPPEL: Complétez manuellement la configuration des permissions dans l'admin Strapi"