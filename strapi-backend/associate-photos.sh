#!/bin/bash

STRAPI_URL="http://localhost:1337"
TOKEN="fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f"

echo "🎨 ASSOCIATION AUTOMATIQUE DES PHOTOS AUX PROFESSEURS"
echo ""

# Associer Jonathan Schlienger (ID 166) avec image ID 19
echo "Associer Jonathan Schlienger..."
curl -s -X PUT "$STRAPI_URL/api/professeurs/166" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"photo": 19}}' && echo " ✅ Jonathan OK" || echo " ❌ Jonathan échoué"

# Associer Stéphane Galichet (ID 168) avec image ID 20
echo "Associer Stéphane Galichet..."
curl -s -X PUT "$STRAPI_URL/api/professeurs/168" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"photo": 20}}' && echo " ✅ Stéphane OK" || echo " ❌ Stéphane échoué"

# Associer Brice Mbani (ID 170) avec image ID 21
echo "Associer Brice Mbani..."
curl -s -X PUT "$STRAPI_URL/api/professeurs/170" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"photo": 21}}' && echo " ✅ Brice OK" || echo " ❌ Brice échoué"

# Associer Céline Grecias (ID 172) avec image ID 23
echo "Associer Céline Grecias..."
curl -s -X PUT "$STRAPI_URL/api/professeurs/172" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"photo": 23}}' && echo " ✅ Céline OK" || echo " ❌ Céline échoué"

# Associer Sophie Desjardins (ID 174) avec image ID 8
echo "Associer Sophie Desjardins..."
curl -s -X PUT "$STRAPI_URL/api/professeurs/174" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"photo": 8}}' && echo " ✅ Sophie OK" || echo " ❌ Sophie échoué"

# Associer Marie-France Lasnier (ID 176) avec image ID 25
echo "Associer Marie-France Lasnier..."
curl -s -X PUT "$STRAPI_URL/api/professeurs/176" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"photo": 25}}' && echo " ✅ Marie-France OK" || echo " ❌ Marie-France échoué"

echo ""
echo "🎉 ASSOCIATION TERMINÉE !"
echo "Vérifiez les résultats dans Strapi: $STRAPI_URL/admin"
echo "Ou sur votre site: http://localhost:3001/cours"