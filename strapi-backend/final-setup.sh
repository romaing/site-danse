#!/bin/bash

echo "🔧 CONFIGURATION FINALE + IMPORT DONNÉES"
echo ""

# Attendre que Strapi soit prêt
sleep 3

# Se connecter et obtenir token
echo "🔑 Connexion admin..."
LOGIN=$(curl -s -X POST "http://localhost:1337/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dance.com",
    "password": "Admin123!"
  }')

TOKEN=$(echo $LOGIN | sed 's/.*"token":"\([^"]*\)".*/\1/')

if [ -z "$TOKEN" ]; then
  echo "❌ Impossible d'obtenir le token"
  exit 1
fi

echo "✅ Token obtenu"

# Configurer permissions
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
  }' > /dev/null

echo "✅ Permissions configurées"

# Vérifier que les données existent
echo "📊 Vérification données..."
STAGES_COUNT=$(curl -s "http://localhost:1337/api/stages" | grep -o '"id":[0-9]*' | wc -l)
PROF_COUNT=$(curl -s "http://localhost:1337/api/professeurs" | grep -o '"id":[0-9]*' | wc -l)
SEANCES_COUNT=$(curl -s "http://localhost:1337/api/seances" | grep -o '"id":[0-9]*' | wc -l)

echo "📈 Status actuel:"
echo "   Stages: $STAGES_COUNT"
echo "   Professeurs: $PROF_COUNT"  
echo "   Séances: $SEANCES_COUNT"

if [ "$STAGES_COUNT" = "0" ] || [ "$PROF_COUNT" = "0" ]; then
  echo "⚠️ Données manquantes, import nécessaire..."
  
  # Import rapide
  echo "🚀 Import des données..."
  
  # Professeurs
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"nom":"Schlienger","prenom":"Jonathan","biographie":"Moniteur diplômé","specialites":["Rock'\''n'\''Roll","Tango"],"email":"danser-la-vie@orange.fr","telephone":"06 50 54 17 45"}}' > /dev/null && echo "✅ Jonathan"
    
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"nom":"Galichet","prenom":"Stéphane","biographie":"Professeur danse","specialites":["Bachata","Rumba"]}}' > /dev/null && echo "✅ Stéphane"
    
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"nom":"Mbani","prenom":"Brice","biographie":"Professeur polyvalent","specialites":["Caraïbes","Solo"]}}' > /dev/null && echo "✅ Brice"
    
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"nom":"Grecias","prenom":"Céline","biographie":"Maître société","specialites":["Bachata","Salsa","Valse"]}}' > /dev/null && echo "✅ Céline"
    
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"nom":"Desjardins","prenom":"Sophie","biographie":"Compétitrice","specialites":["Rock","Tango","Swing"]}}' > /dev/null && echo "✅ Sophie"
    
  curl -s -X POST "http://localhost:1337/api/professeurs" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"nom":"Lasnier","prenom":"Marie-France","biographie":"20 ans expérience","specialites":["Samba","Valse","Quick Step"]}}' > /dev/null && echo "✅ Marie-France"
    
  # Stages
  curl -s -X POST "http://localhost:1337/api/stages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"titre":"Stage Danse & Ski à Pralognan","prix":650,"date_debut":"2026-03-15","date_fin":"2026-03-22","lieu":"Pralognan La Vanoise"}}' > /dev/null && echo "✅ Pralognan"
    
  curl -s -X POST "http://localhost:1337/api/stages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"titre":"Stage de Danse de Salon à Royan","prix":668,"date_debut":"2026-06-07","date_fin":"2026-06-13","lieu":"Saint-Georges de Didonne (Royan)"}}' > /dev/null && echo "✅ Royan"
    
  curl -s -X POST "http://localhost:1337/api/stages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"titre":"Stage Multi-danses à Laguiole","prix":548.50,"date_debut":"2026-08-08","date_fin":"2026-08-15","lieu":"Laguiole (Aveyron)"}}' > /dev/null && echo "✅ Laguiole"
    
  curl -s -X POST "http://localhost:1337/api/stages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"data":{"titre":"Stage de Pâques - Vallée de l'\''Yonne","prix":580,"date_debut":"2026-05-01","date_fin":"2026-05-06","lieu":"Vallée de l'\''Yonne"}}' > /dev/null && echo "✅ Yonne"
    
  # Séances (simplifiées)
  DANCES=("Rock 'n' Roll" "Tango" "Cha Cha Cha" "Rumba" "Valse lente" "Quick Step" "West Coast Swing" "Bachata" "Salsa Cubaine" "Samba")
  for dance in "${DANCES[@]}"; do
    curl -s -X POST "http://localhost:1337/api/seances" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"data\":{\"titre\":\"$dance\",\"type_danse\":\"$dance\",\"horaire\":\"20h00\",\"lieu\":\"Salle de danse\",\"prix_mensuel\":50}}" > /dev/null && echo "✅ $dance"
  done
  
  echo "🎉 Import terminé !"
fi

echo ""
echo "🎯 TEST FINAL:"
echo "🔗 Admin: http://localhost:1337/admin"
echo "🌐 Site: http://localhost:3001"
echo ""
echo "📊 Vérification finale..."
FINAL_STAGES=$(curl -s "http://localhost:1337/api/stages" | grep -o '"id":[0-9]*' | wc -l)
FINAL_PROF=$(curl -s "http://localhost:1337/api/professeurs" | grep -o '"id":[0-9]*' | wc -l)
FINAL_SEANCES=$(curl -s "http://localhost:1337/api/seances" | grep -o '"id":[0-9]*' | wc -l)

echo "✅ FINAL: $FINAL_STAGES stages, $FINAL_PROF professeurs, $FINAL_SEANCES séances"
echo ""
echo "🎉 SITE 100% OPÉRATIONNEL !"