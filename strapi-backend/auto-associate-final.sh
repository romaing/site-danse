#!/bin/bash

STRAPI_URL="http://localhost:1337"
TOKEN="fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f"

echo "🚀 ASSOCIATION FINALE AUTOMATIQUE DES IMAGES"
echo ""

# Test de connexion
echo "Test de connexion à Strapi..."
if curl -s "$STRAPI_URL/api/stages" > /dev/null; then
    echo "✅ Strapi accessible"
else
    echo "❌ Strapi non accessible"
    exit 1
fi

# Récupération des stages
echo "Récupération des stages..."
STAGES_JSON=$(curl -s "$STRAPI_URL/api/stages" 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "❌ Impossible de récupérer les stages"
    exit 1
fi

echo "Analyse des stages..."
# Extraire les IDs et titres
STAGE_INFO=$(echo "$STAGES_JSON" | grep -o '"id":[0-9]*\|"titre":"[^"]*"' | paste - - | sed 's/"id"://g' | sed 's/"titre":"//g' | sed 's/"//g')

echo "$STAGE_INFO" | while IFS=$'\t' read -r id titre; do
    echo "Stage trouvé: ID=$id, Titre='$titre'"

    # Associer l'image selon le titre
    case "$titre" in
        "Stage Danse & Ski à Pralognan")
            IMAGE_ID=26
            ;;
        "Stage de Danse de Salon à Royan")
            IMAGE_ID=11
            ;;
        "Stage Multi-danses à Laguiole")
            IMAGE_ID=31
            ;;
        "Stage de Pâques - Vallée de l'Yonne")
            IMAGE_ID=14
            ;;
        *)
            echo "⏭️ Pas d'image pour '$titre'"
            continue
            ;;
    esac

    echo "Association: $titre (ID $id) → Image $IMAGE_ID"

    # Faire l'association
    RESPONSE=$(curl -s -w "HTTPSTATUS:%{http_code}" \
        -X PUT "$STRAPI_URL/api/stages/$id" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"data\": {\"image\": $IMAGE_ID}}" 2>/dev/null)

    HTTP_CODE=$(echo "$RESPONSE" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ SUCCÈS: $titre associé avec image $IMAGE_ID"
    else
        echo "❌ ÉCHEC: $titre (HTTP $HTTP_CODE)"
        echo "Réponse: $RESPONSE" | head -1
    fi

    sleep 1
done

echo ""
echo "🎉 TRAITEMENT TERMINÉ !"
echo "Vérifiez dans Strapi: $STRAPI_URL/admin"
echo "Ou sur le site: http://localhost:3001/stages"