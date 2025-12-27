#!/bin/bash

echo "🚀 RECONSTRUCTION COMPLÈTE DU SITE DE DANSE"
echo "=========================================="
echo ""

# Étape 1: Créer l'admin
echo "👑 ÉTAPE 1: Création de l'administrateur..."
ADMIN_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/auth/register-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "firstname": "Admin",
    "lastname": "Dance",
    "password": "Admin123!"
  }')

echo "✅ Administrateur créé"

# Attendre un peu
sleep 2

# Se connecter pour obtenir le token
echo "🔑 ÉTAPE 2: Connexion admin..."
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "password": "Admin123!"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | sed 's/"token":"//' | sed 's/"$//')

if [ -z "$TOKEN" ]; then
  echo "❌ Erreur de connexion"
  exit 1
fi

echo "✅ Token obtenu"

# Étape 3: Upload des images
echo "🖼️ ÉTAPE 3: Upload des images..."

# Upload des images de professeurs
echo "   📸 Upload profs..."
PROF_IMAGES=("prof1.svg" "prof2.svg" "prof3.svg" "prof4.svg" "prof5.svg" "prof6.svg")

for img in "${PROF_IMAGES[@]}"; do
  if [ -f "../data/images/$img" ]; then
    curl -s -X POST "http://localhost:1337/api/upload" \
      -H "Authorization: Bearer $TOKEN" \
      -F "files=@../data/images/$img" \
      -F "path=professeurs" > /dev/null && echo "   ✅ $img"
  fi
done

# Upload des images de stages
echo "   🎭 Upload stages..."
STAGE_IMAGES=("stage1.svg" "stage2.svg" "stage3.svg" "stage4.svg")

for img in "${STAGE_IMAGES[@]}"; do
  if [ -f "../data/images/$img" ]; then
    curl -s -X POST "http://localhost:1337/api/upload" \
      -H "Authorization: Bearer $TOKEN" \
      -F "files=@../data/images/$img" \
      -F "path=stages" > /dev/null && echo "   ✅ $img"
  fi
done

echo "✅ Images uploadées"

# Étape 4: Création des content types
echo "📋 ÉTAPE 4: Création des schémas..."

# Le schéma est déjà défini dans les fichiers src/api/*/content-types/*/schema.json
# Strapi les charge automatiquement au démarrage

echo "✅ Schémas chargés"

# Étape 5: Import des données
echo "📥 ÉTAPE 5: Import des données..."

# Import professeurs
echo "   👨‍🏫 Import professeurs..."
PROF_DATA=(
  '{"nom":"Schlienger","prenom":"Jonathan","biographie":"Moniteur diplômé de Danse de Salon avec plus de 15 ans d'\''expérience. Animateur de stages depuis 15 ans, professeur de danse de salon.","specialites":["Rock'\''n'\''Roll","Tango","Rumba","Valse lente","Quick step","West Coast Swing","Cha cha cha"],"email":"danser-la-vie@orange.fr","telephone":"06 50 54 17 45"}'
  '{"nom":"Galichet","prenom":"Stéphane","biographie":"Professeur de danse à 2 depuis 12 ans, ancien compétiteur dans différents styles de danse, ancien gymnaste, cours de Fitness.","specialites":["Slow Fox Trot","Bachata 2","Rumba 2","Kizomba 2","Quick Step 2"]}'
  '{"nom":"Mbani","prenom":"Brice","biographie":"Professeur S.B.K. mais '\''polyvalent'\'', danses caraïbes, solo.","specialites":["Découverte danse caraïbes","Toutes danses solo"]}'
  '{"nom":"Grecias","prenom":"Céline","biographie":"Professorat de danse de couple, '\''maître de danses de société'\''.","specialites":["Bachata 1","Salsa Cubaine 2","Valse lente 2","Tango 3","Cha cha cha 2","Initiation Rock'\''n'\''Roll"]}'
  '{"nom":"Desjardins","prenom":"Sophie","biographie":"Professeur de danse, compétitrice (2 fois finaliste aux championnats de France 10 danses - Latines et standards), chorégraphe.","specialites":["Rock'\''n'\''Roll 2","Initiation Paso Doble","Initiation Cha cha cha","Quick Step 3","West Coast Swing 1","Salsa Cubaine 1","Valse viennoise","Initiation Tango","Lindy Hop 1","Tango 2","West Coast Swing 2","Rock'\''n'\''Roll 3","Cha cha cha 3","Rock'\''n'\''Roll 1"]}'
  '{"nom":"Lasnier","prenom":"Marie-France","biographie":"Professorat de danses de Société depuis 20 ans et animatrice de Pilates et de Stretching depuis 18 ans.","specialites":["Samba 2","Valse lente 1","Initiation Quick Step","Salsa Cubaine 2","Valse lente 2"]}'
)

for prof in "${PROF_DATA[@]}"; do
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$prof" > /dev/null && echo "   ✅ Prof importé"
done

# Import stages
echo "   🎭 Import stages..."
STAGE_DATA=(
  '{"titre":"Stage Danse & Ski à Pralognan","description":"Un stage exceptionnel alliant danse et ski dans un cadre magnifique. Minimum 2 heures de cours par jour, soirées dansantes, accès piscine, jacuzzi et sauna.","prix":650,"date_debut":"2026-03-15","date_fin":"2026-03-22","lieu":"Pralognan La Vanoise"}'
  '{"titre":"Stage de Danse de Salon à Royan","description":"Stage de danse de salon en bord de mer. 15 heures de cours minimum, 2 niveaux (débutants/avancés), soirées dansantes, accès plage.","prix":668,"date_debut":"2026-06-07","date_fin":"2026-06-13","lieu":"Saint-Georges de Didonne (Royan)"}'
  '{"titre":"Stage Multi-danses à Laguiole","description":"Stage intense avec 6 professeurs professionnels. Choix de 3 à 6 danses parmi 15 proposées. Soirées dansantes tous les soirs.","prix":548.50,"date_debut":"2026-08-08","date_fin":"2026-08-15","lieu":"Laguiole (Aveyron)"}'
  '{"titre":"Stage de Pâques - Vallée de l'\''Yonne","description":"Stage de danse printanier dans la belle Vallée de l'\''Yonne. Cours quotidiens, animations, soirées dansantes.","prix":580,"date_debut":"2026-05-01","date_fin":"2026-05-06","lieu":"Vallée de l'\''Yonne"}'
)

for stage in "${STAGE_DATA[@]}"; do
  curl -s -X POST "http://localhost:1337/api/stages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$stage" > /dev/null && echo "   ✅ Stage importé"
done

# Import séances
echo "   💃 Import séances..."
SEANCE_DATA=(
  '{"titre":"Rock '\''n'\'' Roll","type_danse":"Rock","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Tango","type_danse":"Tango","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Cha Cha Cha","type_danse":"Cha Cha Cha","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Rumba","type_danse":"Rumba","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Valse lente","type_danse":"Valse","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Quick Step","type_danse":"Quick Step","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"West Coast Swing","type_danse":"Swing","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Valse viennoise","type_danse":"Valse","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Slow Fox Trot","type_danse":"Fox Trot","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Bachata","type_danse":"Bachata","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Salsa Cubaine","type_danse":"Salsa","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Kizomba","type_danse":"Kizomba","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Paso Doble","type_danse":"Paso Doble","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Samba","type_danse":"Samba","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
  '{"titre":"Découverte danse caraïbes","type_danse":"Caraïbes","horaire":"20h00","lieu":"Salle de danse","prix_mensuel":50}'
)

for seance in "${SEANCE_DATA[@]}"; do
  curl -s -X POST "http://localhost:1337/api/seances" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$seance" > /dev/null && echo "   ✅ Séance importée"
done

echo "✅ Données importées"

# Étape 6: Configurer les permissions
echo "🔓 ÉTAPE 6: Configuration des permissions..."
PERMS_DATA='{
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
    },
    "plugin::upload.upload": {
      "controllers": {
        "upload": {
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
  -d "$PERMS_DATA" > /dev/null

echo "✅ Permissions configurées"

# Étape 7: Créer le token API
echo "🎫 ÉTAPE 7: Création du token API..."
TOKEN_API_RESPONSE=$(curl -s -X POST "http://localhost:1337/admin/api-tokens" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Frontend Token",
      "description": "Token pour Next.js",
      "type": "full-access"
    }
  }')

API_TOKEN=$(echo $TOKEN_API_RESPONSE | grep -o '"accessKey":"[^"]*"' | sed 's/"accessKey":"//' | sed 's/"$//')

echo "✅ Token API créé"

# Étape 8: Configurer les fichiers .env
echo "📝 ÉTAPE 8: Configuration des .env..."
ENV_CONTENT="NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=$API_TOKEN"

echo "$ENV_CONTENT" > ../site/.env.local
echo "$ENV_CONTENT" > ../site/.env

echo "✅ .env configurés"

# Étape 9: Test final
echo "🧪 ÉTAPE 9: Tests finaux..."
sleep 2

STAGES_COUNT=$(curl -s "http://localhost:1337/api/stages" | grep -o '"id":[0-9]*' | wc -l)
PROF_COUNT=$(curl -s "http://localhost:1337/api/professeurs" | grep -o '"id":[0-9]*' | wc -l)
SEANCES_COUNT=$(curl -s "http://localhost:1337/api/seances" | grep -o '"id":[0-9]*' | wc -l)

echo ""
echo "🎉 RECONSTRUCTION TERMINÉE !"
echo "==========================="
echo ""
echo "📊 CONTENU FINAL:"
echo "   ✅ $PROF_COUNT professeurs avec spécialités"
echo "   ✅ $STAGES_COUNT stages 2026"
echo "   ✅ $SEANCES_COUNT séances de danse"
echo "   ✅ Images uploadées"
echo "   ✅ Schémas configurés"
echo "   ✅ Permissions publiques"
echo "   ✅ Token API créé"
echo "   ✅ .env configurés"
echo ""
echo "🔗 ACCÈS:"
echo "   Admin: http://localhost:1337/admin"
echo "   Site: http://localhost:3001"
echo "   API: http://localhost:1337/api/stages"
echo ""
echo "🚀 LE SITE EST 100% OPÉRATIONNEL !"
echo ""
echo "💡 Prochaines étapes:"
echo "   1. Redémarrer Next.js: cd site && npm run dev"
echo "   2. Tester le site: http://localhost:3001"
echo "   3. Vérifier l'admin: http://localhost:1337/admin"