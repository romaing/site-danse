# 🚀 Plan de Développement - Collecte Automatique d'Événements de Danse

## 🎯 Objectif
Créer un système automatique de collecte d'événements de danse en Normandie et départements limitrophes, ciblant les danses enseignées (Rock, Salsa, Tango, Valse, Cha-cha-cha, Rumba).

## 📍 Zone Géographique
- **Normandie** : Calvados (14), Eure (27), Manche (50), Orne (61), Seine-Maritime (76)
- **Départements limitrophes** : Aisne (02), Aube (10), Eure-et-Loir (28), Loiret (45), Marne (51), Haute-Marne (52), Mayenne (53), Sarthe (72), Yvelines (78), Essonne (91), Val-d'Oise (95)

---

## 🔍 Analyse des Sources de Données

### ❌ Facebook Graph API (NON RECOMMANDÉ)
**Contraintes majeures :**
- Rate limits très stricts (quelques centaines d'appels/heure)
- Nécessite token utilisateur (pas scalable)
- Approuvé Facebook requis
- Accès limité aux événements publics
- Dépendance forte à Facebook

### ✅ Alternatives Viables

#### 1. **Eventbrite API** ⭐⭐⭐
- **Avantages** : 2000 requêtes/heure, freemium, bonne couverture danse
- **API** : REST, recherche par lieu/catégorie
- **Limites** : Gratuit limité, payant pour usage intensif
- **Couverture** : Excellente pour événements payants

#### 2. **Meetup API** ⭐⭐⭐
- **Avantages** : GraphQL moderne, communautés locales actives
- **API** : GraphQL, recherche géographique précise
- **Limites** : Moins d'événements payants
- **Couverture** : Bonne pour événements gratuits/communautaires

#### 3. **Scraping Éthique** ⭐⭐
- **Avantages** : Accès à toutes les sources, pas de limites API
- **Légalité** : Autorisé par CNIL avec conditions strictes
- **Sources** : Facebook (public), sites mairies, salles de danse
- **Outils** : Puppeteer, Playwright avec respect des CGU

#### 4. **Sources Spécialisées Danse**
- **Sites de fédérations** : FFD (Fédération Française de Danse)
- **Sites de salles** : Studios de danse, MJC
- **Calendriers culturels** : Sites départementaux
- **Groupes Facebook publics** : Scraping éthique uniquement

---

## 🏗️ Architecture Proposée

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Sources       │    │   Collecteurs   │    │   Stockage      │
│   Externes      │───▶│   Spécialisés  │───▶│   Base de        │
│                 │    │                 │    │   données       │
│ • Eventbrite    │    │ • Eventbrite    │    │                 │
│ • Meetup        │    │ • Scraping      │    │ • PostgreSQL    │
│ • Facebook      │    │ • APIs locales  │    │ • MongoDB       │
│ • Sites locaux  │    │ • APIs locales  │    │ • Redis cache   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              ▲                        │
                              │                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Planificateur │    │   API REST      │
                       │   (Cron/Scheduler)│    │   Frontend     │
                       │                 │    │                 │
                       │ • Quotidien     │    │ • Events par    │
                       │ • Hebdomadaire  │    │   région/danse  │
                       │ • Temps réel    │    │ • Filtres        │
                       └─────────────────┘    └─────────────────┘
```

### Composants Détaillés

#### 1. **Collecteurs Spécialisés**
```typescript
interface EventCollector {
  name: string;
  source: 'eventbrite' | 'meetup' | 'scraping' | 'api';
  collect(region: Region, dances: Dance[]): Promise<Event[]>;
  validate(event: Event): boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: {
    address: string;
    city: string;
    department: string;
    coordinates?: { lat: number; lng: number };
  };
  organizer: string;
  dances: Dance[];
  price?: number;
  url: string;
  source: string;
  collectedAt: Date;
}
```

#### 2. **Planificateur Intelligent**
```typescript
interface Scheduler {
  // Collecte quotidienne (nuit)
  scheduleDailyCollection();
  
  // Collecte temps réel pour nouveaux événements
  scheduleRealTimeUpdates();
  
  // Nettoyage des événements passés
  scheduleCleanup();
  
  // Mise à jour des événements existants
  scheduleUpdates();
}
```

#### 3. **API de Service**
```typescript
// Routes principales
GET /api/events?region=14&dance=rock&limit=50
GET /api/events/:id
GET /api/regions
GET /api/dances
POST /api/events/manual (ajout manuel)
PUT /api/events/:id/validate (validation manuelle)
```

---

## 📋 Plan de Développement (8 semaines)

### **Semaine 1-2 : Infrastructure de Base**
- [ ] Configuration base de données (PostgreSQL + Redis)
- [ ] Modèle de données Event
- [ ] API REST de base
- [ ] Tests unitaires setup

### **Semaine 3-4 : Collecteurs Eventbrite & Meetup**
- [ ] Intégration Eventbrite API
- [ ] Intégration Meetup API
- [ ] Géolocalisation Normandie
- [ ] Filtrage par danses
- [ ] Tests d'intégration

### **Semaine 5-6 : Scraping Éthique**
- [ ] Configuration Puppeteer/Playwright
- [ ] Scraping Facebook (respectueux)
- [ ] Scraping sites mairies/départements
- [ ] Scraping salles de danse
- [ ] Gestion anti-détection

### **Semaine 7-8 : Orchestration & Optimisation**
- [ ] Planificateur automatique (cron)
- [ ] Cache Redis optimisé
- [ ] Logs et monitoring
- [ ] Interface d'administration
- [ ] Tests end-to-end

---

## 🎨 Interface Utilisateur Proposée

### Page d'accueil événements
```
┌─────────────────────────────────────────────────────────┐
│ 🎭 Événements de Danse - Normandie & Régions Limitrophes │
├─────────────────────────────────────────────────────────┤
│ Filtres: [Région ▼] [Danse ▼] [Date ▼] [Prix ▼]         │
├─────────────────────────────────────────────────────────┤
│ 🕺 Soirée Rock - Rouen (76)                             │
│ 📅 Samedi 15 mars 2025 - 21h                           │
│ 📍 Salle des fêtes - 10€                               │
│ 👥 Organisé par Association Rock'n'Roll               │
├─────────────────────────────────────────────────────────┤
│ 💃 Atelier Salsa - Caen (14)                           │
│ 📅 Dimanche 16 mars 2025 - 14h                        │
│ 📍 Studio Danse Passion - Gratuit                      │
│ 👥 Professeur Maria Lopez                              │
└─────────────────────────────────────────────────────────┘
```

### Fonctionnalités Frontend
- **Carte interactive** avec événements géolocalisés
- **Filtres avancés** : région, danse, date, prix
- **Notifications** pour nouveaux événements
- **Partage** sur réseaux sociaux
- **Calendrier intégré** (Google Calendar, etc.)

---

## 🔧 Technologies Recommandées

### Backend
- **Node.js** avec **NestJS** ou **Express**
- **PostgreSQL** pour données structurées
- **Redis** pour cache haute performance
- **Bull** pour file d'attente des collectes

### Collecte de Données
- **Axios** pour APIs REST
- **GraphQL-Request** pour Meetup
- **Puppeteer** pour scraping éthique
- **Cheerio** pour parsing HTML

### DevOps
- **Docker** pour containerisation
- **GitHub Actions** pour CI/CD
- **PM2** pour gestion processus
- **Sentry** pour monitoring

---

## ⚖️ Aspects Légaux & Éthiques

### Respect de la CNIL (France)
- **Légitimité** : Intérêt légitime pour information culturelle
- **Proportionnalité** : Collecte ciblée uniquement événements danse
- **Transparence** : Mention des sources de données
- **Droit d'opposition** : Possibilité de suppression

### Bonnes Pratiques Scraping
- **Rate limiting** respectueux
- **User-Agent** identifiable
- **Respect robots.txt**
- **Pas de données personnelles** sensibles
- **Cache intelligent** pour éviter sur-sollicitation

---

## 📊 Métriques de Succès

### Quantitatives
- **Événements collectés** : 500+ événements/mois
- **Couverture régionale** : 80% départements couverts
- **Temps de réponse** : <2s pour recherches
- **Taux d'actualisation** : <24h pour nouveaux événements

### Qualitatives
- **Pertinence** : 90% événements réellement liés à la danse
- **Exactitude** : 95% informations correctes
- **Satisfaction utilisateurs** : Sondages réguliers

---

## 🚀 Déploiement & Maintenance

### Infrastructure
- **Serveur** : VPS ou cloud (Heroku, Railway, DigitalOcean)
- **Base de données** : PostgreSQL managé
- **Cache** : Redis managé ou intégré
- **Monitoring** : UptimeRobot + logs personnalisés

### Maintenance
- **Mises à jour hebdomadaires** des collecteurs
- **Monitoring quotidien** des sources
- **Nettoyage mensuel** des événements passés
- **Sauvegarde automatique** base de données

---

## 💰 Budget Estimé

### Développement (8 semaines)
- **Développeur fullstack** : 15 000€
- **Licences APIs** : 500€/an (Eventbrite premium)
- **Infrastructure** : 200€/mois (serveur + DB)

### Maintenance annuelle
- **Hébergement** : 2 400€
- **APIs premium** : 600€
- **Maintenance** : 3 000€

**Total première année** : ~21 000€

---

## 🎯 Prochaines Étapes

1. **Validation technique** : Tests APIs Eventbrite/Meetup
2. **Recherche groupes** : Identification sources Facebook fiables
3. **POC scraping** : Test respectueux sur quelques sources
4. **Architecture finale** : Choix technologiques définitifs
5. **Planning détaillé** : Jalons et livrables précis

**Prêt à commencer le développement ?** 🚀
