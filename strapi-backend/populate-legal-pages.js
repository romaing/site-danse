#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'c1222b6fd8ba9b1c32843e0e07da519438e2fd243d997f1882bf1cd02aa2bc0048362b1a23764dcbc53b4fc81f6a3f5edbc6329863affb44c62082b2060624daf313ac2912080021c7b915b7e2171472849983113d8741acdcbfaa7eccd4f4c7ba657f386191c0b1d4d477dac09c5e00b58eda2d0b4cb6f4d1cef20f74ffbeb5';

if (!STRAPI_TOKEN) {
  console.error('❌ Erreur: Variable STRAPI_TOKEN requise');
  process.exit(1);
}

const legalPages = [
  {
    titre: "Mentions Légales",
    slug: "mentions-legales",
    categorie: "legales",
    contenu: `# Mentions Légales

## 1. Informations légales

**École de Danse Danse La Vie**  
Association loi 1901  
Siège social : 123 rue de la Danse, 75000 Paris, France  
SIRET : 123 456 789 00012  
Téléphone : 06 12 34 56 78  
Email : contact@danse-normandie.fr  

**Responsable de la publication**  
Jonathan Schlienger  
Directeur de l'école de danse  

## 2. Hébergement

Le site est hébergé par :  
Vercel Inc.  
340 S Lemon Ave #4133  
Walnut, CA 91789  
États-Unis  

## 3. Propriété intellectuelle

L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.

## 4. Données personnelles

Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à l'adresse ci-dessus.

## 5. Cookies

Ce site utilise des cookies nécessaires au fonctionnement du site. Aucun cookie de tracking n'est utilisé sans votre consentement.

## 6. Responsabilité

L'école de danse Danse La Vie décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations figurant sur ce site.

Dernière mise à jour : Décembre 2025`
  },
  {
    titre: "Politique de Confidentialité",
    slug: "politique-confidentialite",
    categorie: "legales",
    contenu: `# Politique de Confidentialité

## 1. Collecte des données

Nous collectons uniquement les données nécessaires à votre inscription et participation à nos cours et stages :

- Nom et prénom
- Adresse email
- Numéro de téléphone
- Informations de paiement (traitées par notre partenaire Stripe)

## 2. Utilisation des données

Vos données sont utilisées uniquement pour :

- Gérer votre inscription aux cours et stages
- Vous contacter concernant vos réservations
- Vous envoyer des informations sur nos activités (avec votre consentement)
- Traiter vos paiements de manière sécurisée

## 3. Protection des données

Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'altération, la divulgation ou l'accès non autorisé.

## 4. Durée de conservation

Vos données sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, plus la durée de prescription légale applicable.

## 5. Vos droits

Conformément au RGPD, vous disposez des droits suivants :

- **Droit d'accès** : connaître les données vous concernant
- **Droit de rectification** : faire corriger des données inexactes
- **Droit à l'effacement** : faire supprimer vos données
- **Droit à la limitation** : limiter le traitement de vos données
- **Droit à la portabilité** : récupérer vos données dans un format structuré

Pour exercer ces droits, contactez-nous à privacy@danse-normandie.fr

## 6. Cookies

Nous n'utilisons que des cookies strictement nécessaires au fonctionnement du site. Aucun cookie de tracking publicitaire n'est déposé sans votre consentement préalable.

## 7. Contact

Pour toute question concernant cette politique de confidentialité :  
**Délégué à la protection des données**  
Email : privacy@danse-normandie.fr  
Téléphone : 06 12 34 56 78

Dernière mise à jour : Décembre 2025`
  },
  {
    titre: "Conditions Générales de Vente",
    slug: "cgv",
    categorie: "legales",
    contenu: `# Conditions Générales de Vente

## Article 1 - Objet

Les présentes conditions générales de vente régissent les relations contractuelles entre l'École de Danse Danse La Vie et ses clients pour toute inscription à des cours ou stages de danse.

## Article 2 - Inscription

### 2.1 Modalités d'inscription
L'inscription peut se faire :
- En ligne via le site internet
- Par téléphone au 06 12 34 56 78
- Directement à l'école

### 2.2 Acceptation des CGV
Toute inscription implique l'acceptation pleine et entière des présentes conditions générales de vente.

## Article 3 - Tarifs et paiement

### 3.1 Tarifs
Les tarifs sont indiqués en euros TTC et sont valables pour l'année en cours. Ils sont susceptibles d'être modifiés sans préavis.

### 3.2 Modalités de paiement
- Abonnements mensuels : paiement en début de mois
- Abonnements trimestriels : paiement en une fois
- Abonnements annuels : paiement possible en 3 fois
- Stages : acompte de 30% à l'inscription, solde 15 jours avant le stage

### 3.3 Moyens de paiement acceptés
- Chèque bancaire
- Virement bancaire
- Carte bancaire (sur place)
- Espèces (sur place)

## Article 4 - Conditions d'annulation

### 4.1 Stages
- Plus de 30 jours : remboursement à 100%
- 15 à 30 jours : remboursement à 80%
- 7 à 14 jours : remboursement à 50%
- Moins de 7 jours : non remboursable

### 4.2 Abonnements
- Résiliation possible avec 15 jours de préavis
- Aucun remboursement en cours de mois
- Crédit possible pour absence justifiée (sur présentation d'un certificat médical)

## Article 5 - Assurance

Chaque participant doit être titulaire d'une assurance responsabilité civile. L'école décline toute responsabilité en cas d'accident survenu en dehors des heures de cours.

## Article 6 - Santé et condition physique

Le participant atteste être en bonne santé et apte à pratiquer la danse. En cas de doute, un certificat médical pourra être demandé.

## Article 7 - Propriété intellectuelle

Les chorégraphies et méthodes pédagogiques enseignées sont la propriété exclusive de l'École de Danse Danse La Vie.

## Article 8 - Juridiction

Tout litige relatif à l'interprétation ou à l'exécution des présentes conditions sera de la compétence exclusive des tribunaux français.

## Article 9 - Modification des CGV

L'École de Danse Danse La Vie se réserve le droit de modifier les présentes conditions générales de vente à tout moment. Les modifications seront applicables aux nouvelles inscriptions.

Pour toute question concernant ces conditions générales de vente, contactez-nous au 06 12 34 56 78.

Dernière mise à jour : Décembre 2025`
  }
];

async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json'
  };

  const config = {
    method,
    headers
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.error?.message || 'Erreur inconnue'}`);
    }

    return result;
  } catch (error) {
    console.error(`❌ Erreur API ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

async function populateLegalPages() {
  console.log('📄 Population des pages légales...');

  for (const page of legalPages) {
    try {
      console.log(`  📝 Création page: ${page.titre}`);
      const result = await apiRequest('/pages', 'POST', { data: page });
      console.log(`  ✅ Créé: ${result.data.titre} (Slug: ${result.data.slug})`);
    } catch (error) {
      console.error(`  ❌ Échec création ${page.titre}:`, error.message);
    }
  }

  console.log('🎉 Population des pages légales terminée !');
}

async function main() {
  try {
    await populateLegalPages();
  } catch (error) {
    console.error('💥 Erreur lors de la population:', error.message);
  }
}

main();