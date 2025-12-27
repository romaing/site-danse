#!/bin/bash

echo "🔧 CONFIGURATION DES PERMISSIONS ADMIN"
echo ""

# Se connecter à Strapi
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "password": "Admin123!"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | sed 's/"token":"//' | sed 's/"$//')

if [ -z "$TOKEN" ]; then
  echo "❌ Impossible de se connecter à Strapi"
  echo "Vérifiez que Strapi fonctionne sur http://localhost:1337"
  exit 1
fi

echo "✅ Connexion réussie"

# Configurer les permissions pour le rôle Public (nécessaire pour l'API)
echo "🔓 Configuration permissions publiques..."
PERMS='{
  "permissions": {
    "api::professeur.professeur": {
      "controllers": {
        "professeur": {
          "find": {"enabled": true},
          "findOne": {"enabled": true}
        }
      }
    },
    "api::stage.stage": {
      "controllers": {
        "stage": {
          "find": {"enabled": true},
          "findOne": {"enabled": true}
        }
      }
    },
    "api::seance.seance": {
      "controllers": {
        "seance": {
          "find": {"enabled": true},
          "findOne": {"enabled": true}
        }
      }
    }
  }
}'

curl -s -X PUT "http://localhost:1337/admin/users-permissions/roles/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "$PERMS" > /dev/null

echo "✅ Permissions publiques configurées"

# Créer un token API
echo "🎫 Création token API..."
TOKEN_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/api-tokens" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "API Token",
      "description": "Token pour accéder à l'\''API",
      "type": "full-access"
    }
  }')

API_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"accessKey":"[^"]*"' | sed 's/"accessKey":"//' | sed 's/"$//')

if [ -n "$API_TOKEN" ]; then
  echo "✅ Token API créé: ${API_TOKEN:0:30}..."
  
  # Mettre à jour les fichiers .env
  echo "$API_TOKEN" > ../site/.env.local
  echo "$API_TOKEN" > ../site/.env
  echo "✅ .env mis à jour"
fi

echo ""
echo "🧪 TEST FINAL..."

# Tester l'accès aux données
STAGES=$(curl -s "http://localhost:1337/api/stages" | grep -o '"id":[0-9]*' | wc -l)
PROFS=$(curl -s "http://localhost:1337/api/professeurs" | grep -o '"id":[0-9]*' | wc -l)
SEANCES=$(curl -s "http://localhost:1337/api/seances" | grep -o '"id":[0-9]*' | wc -l)

echo "📊 Résultats:"
echo "   Stages: $STAGES"
echo "   Professeurs: $PROFS"
echo "   Séances: $SEANCES"

if [ "$STAGES" -gt 0 ] && [ "$PROFS" -gt 0 ]; then
  echo ""
  echo "🎉 SUCCÈS ! Les données sont maintenant visibles dans Strapi !"
  echo ""
  echo "🔗 Accès:"
  echo "   Admin: http://localhost:1337/admin"
  echo "   Site: http://localhost:3001"
else
  echo ""
  echo "⚠️ Problème détecté - vérifiez les permissions"
fi