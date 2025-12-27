#!/bin/bash

echo "🔗 ASSOCIATION AUTOMATIQUE VIA API ADMIN"

# Token d'autorisation
TOKEN="fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f"

# Associations
associations=(
  "118:26:Pralognan"
  "120:11:Royan"
  "122:31:Laguiole"
  "124:14:Yonne"
)

echo "Début des associations..."

for assoc in "${associations[@]}"; do
  IFS=':' read -r stage_id image_id name <<< "$assoc"

  echo "Association $name (Stage $stage_id ← Image $image_id)..."

  # Essayer l'API standard
  response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
    -X PUT "http://localhost:1337/api/stages/$stage_id" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"data\": {\"image\": $image_id}}" 2>/dev/null)

  http_code=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

  if [ "$http_code" = "200" ]; then
    echo "✅ SUCCÈS: $name associée"
  else
    echo "❌ ÉCHEC API standard pour $name (HTTP $http_code)"

    # Essayer l'API admin
    echo "Tentative API admin pour $name..."
    admin_response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
      -X PUT "http://localhost:1337/admin/content-manager/collection-types/api::stage.stage/$stage_id" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"image\": $image_id}" 2>/dev/null)

    admin_code=$(echo "$admin_response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

    if [ "$admin_code" = "200" ]; then
      echo "✅ SUCCÈS API admin: $name associée"
    else
      echo "❌ ÉCHEC API admin pour $name (HTTP $admin_code)"
    fi
  fi

  sleep 1
done

echo ""
echo "🎉 TRAITEMENT TERMINÉ"
echo "Vérifiez dans Strapi: http://localhost:1337/admin"
echo "Ou sur le site: http://localhost:3001/stages"