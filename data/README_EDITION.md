# Guide d'édition du contenu

Ce guide explique comment modifier le contenu des pages de votre site web de danse.

## 📁 Structure des fichiers

Le contenu éditable est organisé dans des fichiers JSON situés dans le dossier `data/` :

- `homepage-content.json` - Contenu de la page d'accueil
- `tarifs-content.json` - Contenu de la page tarifs
- `stages.json` - Liste des stages
- `professeurs.json` - Liste des professeurs

## 🏠 Modification de la page d'accueil

Le fichier `homepage-content.json` contient toutes les sections modifiables de la page d'accueil.

### Structure :

```json
{
  "hero": {
    "title": "Titre principal",
    "subtitle": "Sous-titre",
    "image": "/uploads/nom-image.jpg",
    "primaryButton": { "text": "Texte", "link": "/lien" },
    "secondaryButton": { "text": "Texte", "link": "/lien" }
  },
  "features": [
    {
      "icon": "calendar|users|music|award",
      "title": "Titre de la fonctionnalité",
      "description": "Description"
    }
  ],
  "upcomingStages": {
    "title": "Titre de la section",
    "subtitle": "Sous-titre",
    "button": { "text": "Texte du bouton", "link": "/lien" }
  },
  "cta": {
    "title": "Titre de l'appel à l'action",
    "subtitle": "Sous-titre",
    "primaryButton": { "text": "Texte", "link": "/lien" },
    "secondaryButton": { "text": "Texte", "link": "/lien" }
  }
}
```

### Icônes disponibles :
- `calendar` - Calendrier
- `users` - Utilisateurs
- `music` - Musique
- `award` - Récompense

## 💰 Modification de la page tarifs

Le fichier `tarifs-content.json` contient tous les tarifs et conditions.

### Structure :

```json
{
  "tarifsStages": [
    {
      "nom": "Nom du stage",
      "prix": 650,
      "duree": "7 jours",
      "includes": ["Service 1", "Service 2"]
    }
  ],
  "tarifsCours": [
    {
      "nom": "Nom du cours",
      "prix": 50,
      "duree": "1 mois",
      "includes": ["Service 1"],
      "economie": "20€", // Optionnel
      "populaire": true // Optionnel - affiche un badge "Populaire"
    }
  ],
  "conditions": {
    "titre": "Titre de la section",
    "conditions": [
      {
        "titre": "Titre de la condition",
        "description": "Description détaillée"
      }
    ]
  }
}
```

## 🖼️ Modification des images

### Depuis la médiathèque Strapi :
1. Allez sur http://localhost:1337/admin
2. Menu **Content Manager** → **Media Library**
3. Upload de nouvelles images
4. Copiez le chemin de l'image (ex: `/uploads/nom-image.jpg`)

### Remplacement dans les fichiers :
- Modifiez l'URL dans le fichier JSON approprié
- Les images doivent être placées dans `strapi-backend/public/uploads/`

## 📝 Instructions d'édition

### 1. Sauvegardez toujours une copie
Avant de modifier un fichier, créez une sauvegarde :
```bash
cp data/homepage-content.json data/homepage-content.json.backup
```

### 2. Validation JSON
Assurez-vous que votre JSON est valide en utilisant un validateur en ligne ou un éditeur avec validation JSON.

### 3. Redémarrage du serveur
Après modification, le serveur de développement recharge automatiquement les changements.

### 4. Test des modifications
Vérifiez que vos modifications s'affichent correctement sur le site :
- Page d'accueil : http://localhost:3000
- Page tarifs : http://localhost:3000/tarifs

## 🚀 Déploiement en production

### Pour Vercel/Netlify :
1. Les fichiers JSON sont déployés automatiquement
2. Les images dans `strapi-backend/public/uploads/` doivent être synchronisées

### Variables d'environnement :
Si vous utilisez Strapi en production, configurez :
```
NEXT_PUBLIC_STRAPI_URL=https://votre-strapi-prod.com
STRAPI_API_TOKEN=votre_token_prod
```

## 🆘 Dépannage

### Le site ne se met pas à jour :
- Vérifiez la syntaxe JSON
- Redémarrez le serveur de développement
- Videz le cache du navigateur

### Images qui ne s'affichent pas :
- Vérifiez que l'image existe dans `strapi-backend/public/uploads/`
- Vérifiez que l'URL dans le JSON est correcte
- Vérifiez les permissions des fichiers

### Erreur de syntaxe JSON :
Utilisez un validateur JSON en ligne ou un éditeur avec coloration syntaxique.