#!/bin/bash

STRAPI_URL="http://localhost:1337"
TOKEN="fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f"

echo "🎭 ASSOCIATION DES PHOTOS AUX STAGES"
echo ""

# Récupérer les IDs des stages
STAGE_IDS=$(curl -s "$STRAPI_URL/api/stages" | grep -o '"id":[0-9]*' | sed 's/"id"://' | head -4)

# Convertir en array
IFS=$'\n' read -rd '' -a STAGE_ARRAY <<<"$STAGE_IDS"

# Images de stages disponibles
IMAGE_IDS=("26" "11" "31" "14")  # pralognan, royan, laguiole, yonne

# Associer les images
for i in "${!STAGE_ARRAY[@]}"; do
    STAGE_ID="${STAGE_ARRAY[$i]}"
    IMAGE_ID="${IMAGE_IDS[$i]}"

    echo "Associer Stage ID $STAGE_ID avec Image ID $IMAGE_ID..."

    curl -s -X PUT "$STRAPI_URL/api/stages/$STAGE_ID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"data\": {\"image\": $IMAGE_ID}}" && echo " ✅ Stage $STAGE_ID OK" || echo " ❌ Stage $STAGE_ID échoué"
done

echo ""
echo "🎉 ASSOCIATION TERMINÉE !"
echo "Vérifiez les résultats dans Strapi: $STRAPI_URL/admin"
echo "Ou sur votre site: http://localhost:3001/stages"