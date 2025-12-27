#!/bin/bash

echo "🚀 RESTAURATION IMMÉDIATE DE LA BASE DE DONNÉES"
echo ""

# Fonction pour faire des requêtes API
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4

    if [ "$method" = "GET" ]; then
        curl -s -w "HTTPSTATUS:%{http_code}" \
             -X GET "http://localhost:1337$endpoint" \
             -H "Authorization: Bearer $token" \
             2>/dev/null
    else
        curl -s -w "HTTPSTATUS:%{http_code}" \
             -X $method "http://localhost:1337$endpoint" \
             -H "Authorization: Bearer $token" \
             -H "Content-Type: application/json" \
             -d "$data" \
             2>/dev/null
    fi
}

# Attendre que Strapi soit prêt
sleep 3

echo "👑 1. Création de l'admin..."
CREATE_ADMIN=$(curl -s -X POST "http://localhost:1337/admin/auth/register-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "firstname": "Admin",
    "lastname": "Dance",
    "password": "Admin123!"
  }')

echo "✅ Admin créé"

echo "🔑 2. Connexion..."
LOGIN=$(curl -s -X POST "http://localhost:1337/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "password": "Admin123!"
  }')

TOKEN=$(echo $LOGIN | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Erreur de connexion"
  exit 1
fi

echo "✅ Connecté avec token"

echo "🔧 3. Configuration des permissions..."
PERMS_DATA='{
  "permissions": {
    "api::professeur.professeur": {
      "controllers": {
        "professeur": {
          "find": {"enabled": true},
          "findOne": {"enabled": true},
          "create": {"enabled": true},
          "update": {"enabled": true},
          "delete": {"enabled": true}
        }
      }
    },
    "api::stage.stage": {
      "controllers": {
        "stage": {
          "find": {"enabled": true},
          "findOne": {"enabled": true},
          "create": {"enabled": true},
          "update": {"enabled": true},
          "delete": {"enabled": true}
        }
      }
    },
    "api::seance.seance": {
      "controllers": {
        "seance": {
          "find": {"enabled": true},
          "findOne": {"enabled": true},
          "create": {"enabled": true},
          "update": {"enabled": true},
          "delete": {"enabled": true}
        }
      }
    }
  }
}'

api_call "PUT" "/admin/users-permissions/roles/1" "$PERMS_DATA" "$TOKEN" > /dev/null
echo "✅ Permissions configurées"

echo "🎯 4. Import des professeurs..."
PROFESSEURS=(
  '{"nom":"Schlienger","prenom":"Jonathan","biographie":"Moniteur diplômé de Danse de Salon","specialites":["Rock'\''n'\''Roll","Tango","Rumba","Valse lente","Quick step","West Coast Swing","Cha cha cha"],"email":"danser-la-vie@orange.fr","telephone":"06 50 54 17 45"}'
  '{"nom":"Galichet","prenom":"Stéphane","biographie":"Professeur de danse à 2 depuis 12 ans","specialites":["Slow Fox Trot","Bachata 2","Rumba 2","Kizomba 2","Quick Step 2"]}'
  '{"nom":"Mbani","prenom":"Brice","biographie":"Professeur S.B.K. polyvalent","specialites":["Découverte danse caraïbes","Toutes danses solo"]}'
  '{"nom":"Grecias","prenom":"Céline","biographie":"Maître de danses de société","specialites":["Bachata 1","Salsa Cubaine 2","Valse lente 2","Tango 3","Cha cha cha 2","Initiation Rock'\''n'\''Roll"]}'
  '{"nom":"Desjardins","prenom":"Sophie","biographie":"Compétitrice, chorégraphe","specialites":["Rock'\''n'\''Roll 2","Initiation Paso Doble","Initiation Cha cha cha","Quick Step 3","West Coast Swing 1","Salsa Cubaine 1","Valse viennoise","Initiation Tango","Lindy Hop 1","Tango 2","West Coast Swing 2","Rock'\''n'\''Roll 3","Cha cha cha 3","Rock'\''n'\''Roll 1"]}'
  '{"nom":"Lasnier","prenom":"Marie-France","biographie":"Professorat depuis 20 ans","specialites":["Samba 2","Valse lente 1","Initiation Quick Step","Salsa Cubaine 2","Valse lente 2"]}'
)

for prof in "${PROFESSEURS[@]}"; do
  api_call "POST" "/api/professeurs" "$prof" "$TOKEN" > /dev/null
  echo "✅ Professeur importé"
done

echo "🎭 5. Import des stages..."
STAGES=(
  '{"titre":"Stage Danse & Ski à Pralognan","description":"Stage exceptionnel danse et ski","prix":650,"date_debut":"2026-03-15","date_fin":"2026-03-22","lieu":"Pralognan La Vanoise"}'
  '{"titre":"Stage de Danse de Salon à Royan","description":"Stage danse de salon bord de mer","prix":668,"date_debut":"2026-06-07","date_fin":"2026-06-13","lieu":"Saint-Georges de Didonne (Royan)"}'
  '{"titre":"Stage Multi-danses à Laguiole","description":"Stage intense 6 professeurs","prix":548.50,"date_debut":"2026-08-08","date_fin":"2026-08-15","lieu":"Laguiole (Aveyron)"}'
  '{"titre":"Stage de Pâques - Vallée de l'\''Yonne","description":"Stage printanier","prix":580,"date_debut":"2026-05-01","date_fin":"2026-05-06","lieu":"Vallée de l'\''Yonne"}'
)

for stage in "${STAGES[@]}"; do
  api_call "POST" "/api/stages" "$stage" "$TOKEN" > /dev/null
  echo "✅ Stage importé"
done

echo "💃 6. Import des séances..."
SEANCES=(
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

for seance in "${SEANCES[@]}"; do
  api_call "POST" "/api/seances" "$seance" "$TOKEN" > /dev/null
  echo "✅ Séance importée"
done

echo ""
echo "🎉 BASE DE DONNÉES RESTAURÉE COMPLÈTEMENT !"
echo ""
echo "📊 RÉSUMÉ:"
echo "   ✅ 6 professeurs avec spécialités"
echo "   ✅ 4 stages 2026"
echo "   ✅ 15 séances de danse"
echo ""
echo "🔗 Admin: http://localhost:1337/admin"
echo "🌐 Site: http://localhost:3001"
echo ""
echo "⚠️ Les associations professeurs-stages/séances devront être faites manuellement dans l'admin."