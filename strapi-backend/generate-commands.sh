#!/bin/bash

echo "🔧 COMMANDES CURL PRÊTES À EXÉCUTER"
echo "==================================="
echo ""
echo "Copiez-collez ces commandes une par une dans votre terminal :"
echo ""

# Récupération des vrais IDs
STAGES_DATA=$(curl -s "http://localhost:1337/api/stages" 2>/dev/null)

# Extraction des IDs et titres avec jq si disponible
if command -v jq &> /dev/null; then
    echo "# Commandes générées automatiquement :"
    echo "$STAGES_DATA" | jq -r '.data[] | select(.attributes.titre | contains("Pralognan") or contains("Royan") or contains("Laguiole") or contains("Yonne")) | "curl -X PUT \"http://localhost:1337/api/stages/\(.id)\" -H \"Authorization: Bearer fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f\" -H \"Content-Type: application/json\" -d '\''{""data"": {""image"": '\$(case \"\(.attributes.titre)\" in *\"Pralognan\"*) echo 26 ;; *\"Royan\"*) echo 11 ;; *\"Laguiole\"*) echo 31 ;; *\"Yonne\"*) echo 14 ;; esac)}}'\''"'
else
    echo "# IDs à utiliser manuellement :"
    echo "# Pralognan: image 26"
    echo "# Royan: image 11"
    echo "# Laguiole: image 31"
    echo "# Yonne: image 14"
    echo ""
    echo "# Exemple de commande :"
    echo "curl -X PUT \"http://localhost:1337/api/stages/ID_STAGE\" -H \"Authorization: Bearer fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f\" -H \"Content-Type: application/json\" -d '{\"data\": {\"image\": ID_IMAGE}}'"
fi

echo ""
echo "🎯 REMPLACEZ ID_STAGE et ID_IMAGE par les bonnes valeurs !"