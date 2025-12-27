#!/bin/bash

echo "🚀 RESTAURATION RAPIDE DE LA BASE DE DONNÉES"
echo ""

# Attendre que Strapi soit prêt
sleep 3

# Créer l'admin automatiquement
echo "👑 Création admin..."
curl -s -X POST "http://localhost:1337/admin/auth/register-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "firstname": "Admin",
    "lastname": "Dance",
    "password": "Admin123!"
  }' > /dev/null

echo "✅ Admin créé"

# Se connecter pour obtenir le token
echo "🔑 Connexion..."
TOKEN_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "password": "Admin123!"
  }')

TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Erreur token"
  exit 1
fi

echo "✅ Token obtenu"

# Configurer les permissions
echo "🔧 Configuration permissions..."
curl -s -X PUT "http://localhost:1337/admin/users-permissions/roles/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "permissions": {
      "api::professeur.professeur": {
        "controllers": {
          "professeur": {
            "find": {"enabled": true},
            "findOne": {"enabled": true},
            "create": {"enabled": true},
            "update": {"enabled": true}
          }
        }
      },
      "api::stage.stage": {
        "controllers": {
          "stage": {
            "find": {"enabled": true},
            "findOne": {"enabled": true},
            "create": {"enabled": true},
            "update": {"enabled": true}
          }
        }
      },
      "api::seance.seance": {
        "controllers": {
          "seance": {
            "find": {"enabled": true},
            "findOne": {"enabled": true},
            "create": {"enabled": true},
            "update": {"enabled": true}
          }
        }
      }
    }
  }' > /dev/null

echo "✅ Permissions configurées"

# Générer token API
echo "🎫 Génération token API..."
API_TOKEN_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/api-tokens" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Full Access",
      "description": "Token complet",
      "type": "full-access"
    }
  }')

API_TOKEN=$(echo $API_TOKEN_RESPONSE | grep -o '"accessKey":"[^"]*"' | cut -d'"' -f4)

echo "🎯 IMPORT DES DONNÉES VIA API ADMIN..."

# Import professeurs via API admin
echo "👨‍🏫 Import professeurs..."

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::professeur.professeur" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Schlienger",
    "prenom": "Jonathan",
    "biographie": "Moniteur diplômé de Danse de Salon avec plus de 15 ans d'\''expérience. Animateur de stages depuis 15 ans, professeur de danse de salon.",
    "specialites": ["Rock'\''n'\''Roll", "Tango", "Rumba", "Valse lente", "Quick step", "West Coast Swing", "Cha cha cha"],
    "email": "danser-la-vie@orange.fr",
    "telephone": "06 50 54 17 45"
  }' > /dev/null && echo "✅ Jonathan"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::professeur.professeur" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Galichet",
    "prenom": "Stéphane",
    "biographie": "Professeur de danse à 2 depuis 12 ans, ancien compétiteur dans différents styles de danse, ancien gymnaste, cours de Fitness.",
    "specialites": ["Slow Fox Trot", "Bachata 2", "Rumba 2", "Kizomba 2", "Quick Step 2"]
  }' > /dev/null && echo "✅ Stéphane"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::professeur.professeur" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Mbani",
    "prenom": "Brice",
    "biographie": "Professeur S.B.K. mais '\''polyvalent'\'', danses caraïbes, solo.",
    "specialites": ["Découverte danse caraïbes", "Toutes danses solo"]
  }' > /dev/null && echo "✅ Brice"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::professeur.professeur" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Grecias",
    "prenom": "Céline",
    "biographie": "Professorat de danse de couple, '\''maître de danses de société'\''.",
    "specialites": ["Bachata 1", "Salsa Cubaine 2", "Valse lente 2", "Tango 3", "Cha cha cha 2", "Initiation Rock'\''n'\''Roll"]
  }' > /dev/null && echo "✅ Céline"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::professeur.professeur" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Desjardins",
    "prenom": "Sophie",
    "biographie": "Professeur de danse, compétitrice (2 fois finaliste aux championnats de France 10 danses - Latines et standards), chorégraphe.",
    "specialites": ["Rock'\''n'\''Roll 2", "Initiation Paso Doble", "Initiation Cha cha cha", "Quick Step 3", "West Coast Swing 1", "Salsa Cubaine 1", "Valse viennoise", "Initiation Tango", "Lindy Hop 1", "Tango 2", "West Coast Swing 2", "Rock'\''n'\''Roll 3", "Cha cha cha 3", "Rock'\''n'\''Roll 1"]
  }' > /dev/null && echo "✅ Sophie"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::professeur.professeur" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Lasnier",
    "prenom": "Marie-France",
    "biographie": "Professorat de danses de Société depuis 20 ans et animatrice de Pilates et de Stretching depuis 18 ans.",
    "specialites": ["Samba 2", "Valse lente 1", "Initiation Quick Step", "Salsa Cubaine 2", "Valse lente 2"]
  }' > /dev/null && echo "✅ Marie-France"

echo ""
echo "🎭 Import stages..."

# Import stages
curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::stage.stage" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Stage Danse & Ski à Pralognan",
    "description": "Un stage exceptionnel alliant danse et ski dans un cadre magnifique. Minimum 2 heures de cours par jour, soirées dansantes, accès piscine, jacuzzi et sauna.",
    "prix": 650,
    "date_debut": "2026-03-15",
    "date_fin": "2026-03-22",
    "lieu": "Pralognan La Vanoise"
  }' > /dev/null && echo "✅ Pralognan"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::stage.stage" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Stage de Danse de Salon à Royan",
    "description": "Stage de danse de salon en bord de mer. 15 heures de cours minimum, 2 niveaux (débutants/avancés), soirées dansantes, accès plage.",
    "prix": 668,
    "date_debut": "2026-06-07",
    "date_fin": "2026-06-13",
    "lieu": "Saint-Georges de Didonne (Royan)"
  }' > /dev/null && echo "✅ Royan"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::stage.stage" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Stage Multi-danses à Laguiole",
    "description": "Stage intense avec 6 professeurs professionnels. Choix de 3 à 6 danses parmi 15 proposées. Soirées dansantes tous les soirs.",
    "prix": 548.50,
    "date_debut": "2026-08-08",
    "date_fin": "2026-08-15",
    "lieu": "Laguiole (Aveyron)"
  }' > /dev/null && echo "✅ Laguiole"

curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::stage.stage" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Stage de Pâques - Vallée de l'Yonne",
    "description": "Stage de danse printanier dans la belle Vallée de l'Yonne. Cours quotidiens, animations, soirées dansantes.",
    "prix": 580,
    "date_debut": "2026-05-01",
    "date_fin": "2026-05-06",
    "lieu": "Vallée de l'Yonne"
  }' > /dev/null && echo "✅ Yonne"

echo ""
echo "💃 Import séances..."

# Import des 15 séances
DANCES=("Rock 'n' Roll" "Tango" "Cha Cha Cha" "Rumba" "Valse lente" "Quick Step" "West Coast Swing" "Valse viennoise" "Slow Fox Trot" "Bachata" "Salsa Cubaine" "Kizomba" "Paso Doble" "Samba" "Découverte danse caraïbes")

for dance in "${DANCES[@]}"; do
  curl -s -X POST "http://localhost:1337/admin/content-manager/collection-types/api::seance.seance" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"titre\": \"$dance\",
      \"type_danse\": \"$dance\",
      \"horaire\": \"20h00\",
      \"lieu\": \"Salle de danse\",
      \"prix_mensuel\": 50
    }" > /dev/null && echo "✅ $dance"
done

echo ""
echo "🎉 BASE DE DONNÉES RESTAURÉE !"
echo ""
echo "📊 RÉSUMÉ:"
echo "   ✅ 6 professeurs avec spécialités"
echo "   ✅ 4 stages 2026"
echo "   ✅ 15 séances de danse"
echo ""
echo "🔗 Admin: http://localhost:1337/admin"
echo "🌐 Site: http://localhost:3001"
echo ""
echo "⚠️ Il reste à faire les associations professeurs-stages et professeurs-séances manuellement dans l'admin."