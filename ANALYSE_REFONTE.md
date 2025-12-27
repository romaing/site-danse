# Refonte Site "Danser la Vie" - Analyse et Plan

## 📊 **Analyse du site actuel (danser-la-vie.eu)**

### **Contenu récupéré :**

#### **Informations générales :**
- **Moniteur** : Jonathan Schlienger (diplômé de Danse de Salon)
- **Adresse** : Les Délats 1, 18260 - BARLIEU
- **Contact** :
  - Tél fixe : 02 48 58 83 40
  - Mobile : 06 50 54 17 45
  - Email : danser-la-vie@orange.fr

#### **Activités principales :**
- **Stages de danse de salon** dans des villages de vacances
- **Cours réguliers** (présentation des danses)
- **Lieux des stages** : Pyrénées, Vallée de la Maurienne, Aveyron (Laguiole), Île d'Oléron, Vallée de l'Yonne, Jura, etc.

#### **Danses enseignées :**
- Rock, Salsa, Cha cha cha, Lindy Hop, Rumba, Tango
- Paso Doble, Valse lente, Valse viennoise, Samba
- Quick step, Slow fox trot, Charleston, Country

#### **Caractéristiques des stages :**
- **Tout inclus** : Hébergement, pension complète, cours de danse
- **2 niveaux** : Débutants (3h/jour), Avancés (3h/jour)
- **Durée** : Généralement samedi → samedi (7 jours)
- **Animations** : Soirées dansantes, randonnées, piscine, tennis
- **Suppléments** : Chambre individuelle, assurance annulation

#### **FAQ principales :**
- Lieux des stages (villages de vacances)
- Transports et accès
- Tarifs tout inclus
- Heures d'arrivée/départ
- Chambres individuelles
- Suppléments et options
- Assurance annulation

---

## 🎨 **Inspiration : xev.agency**

### **Style moderne observé :**
- **Design épuré** : Blanc, gris, touches de couleur
- **Navigation claire** : Menu fixe, sections bien définies
- **Hero section** : Message principal + CTA
- **Cards produits** : Présentation des services
- **Témoignages/équipe** : Photos et descriptions
- **FAQ structurée** : Questions organisées
- **Footer complet** : Liens, contact, réseaux sociaux

### **Éléments à adopter :**
- **Typographie moderne** : Titres impactants, texte lisible
- **Images haute qualité** : Photos des stages et danses
- **Call-to-actions** : Boutons "S'inscrire", "En savoir plus"
- **Responsive design** : Mobile-first
- **Animations subtiles** : Transitions fluides
- **Section équipe** : Présentation du moniteur
- **Galerie photos** : Stages, lieux, danseurs

---

## 🏗️ **Plan de refonte moderne**

### **Structure proposée :**

#### **1. Page d'accueil**
```
Hero : "Découvrez la danse de salon dans des lieux d'exception"
  - Image de danseurs/stage
  - CTA : "Voir les stages" / "S'inscrire"

Stages à venir (3-4 cards)
  - Image, titre, dates, lieu, prix
  - Bouton "En savoir plus"

Présentation brève
  - Qui est Jonathan Schlienger
  - Approche pédagogique

Témoignages/photos
  - Galerie des stages précédents

CTA final : "Contactez-nous"
```

#### **2. Page Stages**
```
Filtres : Par date, lieu, type de danse

Liste des stages (cards)
  - Image du lieu
  - Titre + dates
  - Lieu + description
  - Prix + niveau
  - Bouton "S'inscrire"

Calendrier visuel (optionnel)
  - Vue mensuelle des stages
```

#### **3. Page "Cours et Professeur"**
```
Présentation Jonathan Schlienger
  - Photo professionnelle
  - Biographie
  - Diplômes et expérience
  - Spécialités

Danses enseignées (grid)
  - Icône + nom + description courte
  - Niveaux : Débutant, Intermédiaire, Avancé

Planning des cours (si applicable)
  - Horaires, lieux, tarifs
```

#### **4. Page Tarifs**
```
Tableau comparatif des stages
  - Par durée, par saison
  - Options d'hébergement

Détail des inclusions
  - Cours, repas, animations
  - Suppléments (chambre seule, etc.)

Conditions de paiement
  - Acompte, modalités
  - Remboursements
```

#### **5. Page Inscription**
```
Formulaire multi-étapes :
1. Sélection du stage
2. Informations personnelles
3. Options (hébergement, assurance)
4. Paiement (Stripe)

Confirmation par email
Espace client (futur)
```

#### **6. Page Contact**
```
Informations de contact
  - Adresse, téléphones, email
  - Horaires de disponibilité

Formulaire de contact
  - Nom, email, message
  - Sélection du sujet

Carte interactive (optionnel)
```

#### **7. FAQ**
```
Questions organisées par catégories :
- Stages et réservations
- Tarifs et paiements
- Hébergement et transport
- Cours et niveaux

Réponses détaillées
```

---

## 🎨 **Design system proposé**

### **Couleurs :**
- **Primaire** : Bleu marine (#1e40af) ou violet danse (#7c3aed)
- **Secondaire** : Orange/rouge danse (#dc2626)
- **Neutres** : Blanc, gris clair (#f8fafc)

### **Typographie :**
- **Titres** : Montserrat ou Playfair Display (élégant)
- **Corps** : Inter ou Open Sans
- **Tailles** : Responsive, lisible sur mobile

### **Images :**
- **Photos professionnelles** des stages
- **Icônes** pour les types de danse
- **Galerie** des lieux et participants
- **Logo** personnalisé (optionnel)

### **Composants :**
- **Hero** : Image + overlay + CTA
- **Cards** : Image + contenu + bouton
- **Formulaires** : Steps avec validation
- **Navigation** : Fixed header + mobile menu
- **Footer** : 3 colonnes (contact, navigation, liens)

---

## 🚀 **Prochaines étapes**

1. **Création du design** basé sur ce plan
2. **Import du contenu** dans Strapi
3. **Développement des pages** avec Next.js
4. **Intégration Stripe** pour paiements
5. **Tests et optimisation** mobile/desktop
6. **Déploiement** et formation

Le site actuel a un excellent contenu et une belle activité - il mérite une présentation moderne qui valorise le travail de Jonathan et attire plus de danseurs passionnés ! 💃🕺