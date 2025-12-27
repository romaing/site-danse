# 📁 Dossier de Données

Ce dossier contient tous les fichiers de données du site au format JSON. Vous pouvez les modifier facilement pour mettre à jour le contenu sans toucher au code.

## 📝 Fichiers disponibles

### `cours.json`
Contient la liste des danses enseignées et le planning des cours.

**Pour modifier :**
- Ouvrez `data/cours.json`
- Modifiez les informations (nom, description, niveau, durée)
- Ajoutez ou supprimez des cours
- Modifiez le planning (jours, horaires, lieux)

### `stages.json`
Contient tous les stages de danse proposés.

**Pour modifier :**
- Ouvrez `data/stages.json`
- Modifiez les informations d'un stage existant
- Ajoutez un nouveau stage (copiez un stage existant et modifiez)
- Changez le statut : `"available"`, `"full"`, ou `"cancelled"`

### `professeurs.json`
Contient les informations sur les professeurs.

**Pour modifier :**
- Ouvrez `data/professeurs.json`
- Modifiez les informations d'un professeur
- Ajoutez un nouveau professeur (copiez un professeur existant)
- Changez la photo (URL Unsplash ou chemin local)

### `faq.json`
Contient les questions fréquentes.

**Pour modifier :**
- Ouvrez `data/faq.json`
- Ajoutez de nouvelles questions/réponses
- Modifiez les catégories : `"Stages"`, `"Cours"`, `"Paiement"`

## 🔄 Après modification

1. Sauvegardez le fichier JSON
2. Le serveur Next.js rechargera automatiquement
3. Rafraîchissez votre navigateur (Ctrl+R ou Cmd+R)

## ⚠️ Format JSON

Assurez-vous de respecter le format JSON :
- Utilisez des guillemets doubles `"` pour les chaînes
- Séparez les éléments par des virgules `,`
- Fermez toutes les accolades `{}` et crochets `[]`

## 💡 Exemple : Ajouter un nouveau stage

```json
{
  "id": 5,
  "title": "Mon nouveau stage",
  "dateStart": "1 janvier 2027",
  "dateEnd": "7 janvier 2027",
  "date": "1-7 janvier 2027",
  "location": "Lieu du stage",
  "address": "Adresse complète",
  "price": 600,
  "image": "https://images.unsplash.com/...",
  "status": "available",
  "capacity": 25,
  "available": 25,
  "level": "Tous niveaux",
  "description": "Description du stage",
  "program": ["Point 1", "Point 2"],
  "includes": ["Inclus 1", "Inclus 2"]
}
```

## 🖼️ Images

Pour les images, vous pouvez utiliser :
- URLs Unsplash (ex: `https://images.unsplash.com/photo-...`)
- Chemins locaux (ex: `/images/mon-image.jpg`)

Si vous utilisez des images locales, placez-les dans le dossier `public/images/`.
