# Danse normandie - École de Danse de Salon

Site web moderne pour l'école de danse "Danse normandie" - anciennement "Danser la Vie".

## 🚀 Technologies utilisées

- **Frontend :** Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend :** Strapi 5 (CMS headless)
- **Paiement :** Stripe
- **Déploiement :** Vercel + serveur Strapi

## 📋 Prérequis

- Node.js 18+ et npm
- Git

## 🛠️ Installation et configuration

### 1. Clonage du repository

```bash
git clone <url-du-repo>
cd site-danse
```

### 2. Installation des dépendances

```bash
# Installation des dépendances du site Next.js
npm install

# Installation des dépendances du backend Strapi
cd strapi-backend
npm install
cd ..
```

### Après clonage
npm install
cd strapi-backend && npm install
cp site/.env.example site/.env.local
cp strapi-backend/.env.example strapi-backend/.env

# Éditer les .env avec vos vraies valeurs
npm run develop  # Backend
cd site && npm run dev  # Frontend


```

### 3. Configuration des variables d'environnement

#### Frontend (.env.local)
```env
# Copiez le fichier d'exemple et ajustez les valeurs
cp site/.env.example site/.env.local

# Variables nécessaires :
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

#### Backend Strapi
```bash
cd strapi-backend
cp .env.example .env

# Variables nécessaires :
DATABASE_URL=sqlite://./database/database.db
JWT_SECRET=votre-jwt-secret
API_TOKEN_SALT=votre-api-token-salt
```

### 4. Configuration de la base de données Strapi

```bash
cd strapi-backend

# Démarrage de Strapi (va créer la base si elle n'existe pas)
npm run develop

# Lors du premier lancement, créez un compte admin
# Puis allez dans Content-Types Builder pour créer les types de contenu
```

## 🚀 Démarrage du projet

### Développement

```bash
# Terminal 1 : Backend Strapi
cd strapi-backend
npm run develop

# Terminal 2 : Frontend Next.js
cd site
npm run dev
```

Le site sera accessible sur :
- **Frontend :** http://localhost:3000
- **Backend Strapi :** http://localhost:1337
- **Admin Strapi :** http://localhost:1337/admin

### Production

```bash
# Build du frontend
cd site
npm run build
npm run start

# Build du backend (si déployé séparément)
cd strapi-backend
npm run build
npm run start
```

## 📁 Structure du projet

```
site-danse/
├── site/                          # Application Next.js
│   ├── app/                       # App Router Next.js 13+
│   │   ├── (pages)/               # Pages principales
│   │   ├── api/                   # API Routes
│   │   └── globals.css            # Styles globaux
│   ├── components/                # Composants React
│   ├── lib/                       # Utilitaires et configurations
│   └── public/                    # Assets statiques
├── strapi-backend/               # Backend Strapi CMS
│   ├── src/
│   │   ├── api/                   # API personnalisées
│   │   └── admin/                 # Configuration admin
│   ├── config/                    # Configuration Strapi
│   └── database/                  # Base de données
├── data/                          # Données statiques (JSON)
├── dance-images/                  # Images des danses
├── csv-import/                    # Fichiers CSV d'import
└── docs/                          # Documentation
```

## 🎯 Fonctionnalités

### Site web
- **Pages responsive** : Accueil, Cours, Stages, Contact, Inscription
- **Gestion des cours** : Affichage dynamique depuis Strapi
- **Système d'inscription** : Intégré avec Stripe
- **Pages légales** : CGV, Mentions légales, Politique de confidentialité

### CMS Strapi
- **Gestion des professeurs** : Profils avec photos
- **Gestion des stages** : Lieux, dates, descriptions
- **Gestion des cours** : Planning hebdomadaire
- **Contenu dynamique** : Pages modifiables

## 📜 Scripts disponibles

### Frontend (site/)
```bash
npm run dev          # Démarrage en développement
npm run build        # Build de production
npm run start        # Démarrage en production
npm run lint         # Vérification du code
```

### Backend (strapi-backend/)
```bash
npm run develop      # Démarrage en développement
npm run build        # Build de production
npm run start        # Démarrage en production
```

## 🔧 Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API (Publishable Key et Secret Key)
3. Configurez les variables d'environnement
4. Testez avec les clés de test (\`pk_test_\`, \`sk_test_\`)

## 🚀 Déploiement

### Frontend (Vercel recommandé)
```bash
# Déploiement automatique via GitHub/Vercel
# Variables d'environnement à configurer dans Vercel
```

### Backend (Railway, Heroku, ou VPS)
```bash
# Build et déploiement du backend Strapi
npm run build
npm run start
```

## 📞 Support

Pour toute question ou problème :
- Vérifiez les logs des deux services
- Assurez-vous que les variables d'environnement sont correctes
- Testez les connexions API entre frontend et backend

## 📄 Licence

Ce projet est privé et propriété de l'école "Danse normandie".

---

**Version :** 1.0.1
**Dernière mise à jour :** Décembre 2025
