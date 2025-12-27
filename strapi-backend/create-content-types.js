const fs = require('fs');
const path = require('path');

// Chemins des fichiers de données
const dataPath = path.join(__dirname, '..', 'data');

// Schemas de base pour les content types
const professeurSchema = {
  kind: 'collectionType',
  collectionName: 'professeurs',
  info: {
    singularName: 'professeur',
    pluralName: 'professeurs',
    displayName: 'Professeur',
    description: '',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    nom: {
      type: 'string',
      required: true,
    },
    prenom: {
      type: 'string',
      required: true,
    },
    biographie: {
      type: 'text',
    },
    specialites: {
      type: 'json',
    },
    photo: {
      type: 'media',
      multiple: false,
      required: false,
    },
    email: {
      type: 'email',
    },
    telephone: {
      type: 'string',
    },
  },
};

const stageSchema = {
  kind: 'collectionType',
  collectionName: 'stages',
  info: {
    singularName: 'stage',
    pluralName: 'stages',
    displayName: 'Stage',
    description: '',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    titre: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'text',
      required: true,
    },
    date_debut: {
      type: 'date',
      required: true,
    },
    date_fin: {
      type: 'date',
      required: true,
    },
    lieu: {
      type: 'string',
      required: true,
    },
    prix: {
      type: 'decimal',
      required: true,
    },
    professeurs: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::professeur.professeur',
    },
    image: {
      type: 'media',
      multiple: false,
      required: false,
    },
    programme: {
      type: 'richtext',
    },
    niveau: {
      type: 'enumeration',
      enum: ['debutant', 'intermediaire', 'avance', 'tous_niveaux'],
      default: 'tous_niveaux',
    },
  },
};

const courSchema = {
  kind: 'collectionType',
  collectionName: 'seances',
  info: {
    singularName: 'seance',
    pluralName: 'seances',
    displayName: 'Séance de cours',
    description: '',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    titre: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'text',
      required: true,
    },
    type_danse: {
      type: 'string',
      required: true,
    },
    niveau: {
      type: 'enumeration',
      enum: ['debutant', 'intermediaire', 'avance'],
      default: 'debutant',
    },
    horaire: {
      type: 'string',
      required: true,
    },
    lieu: {
      type: 'string',
      required: true,
    },
    prix_mensuel: {
      type: 'decimal',
      required: true,
    },
    professeur: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::professeur.professeur',
    },
    description_longue: {
      type: 'richtext',
    },
  },
};

// Fonction pour créer les dossiers et fichiers schema
function createContentType(schema) {
  const { collectionName, info } = schema;
  const contentTypeDir = path.join(__dirname, 'src', 'api', info.singularName, 'content-types', info.singularName);
  
  // Créer le dossier
  fs.mkdirSync(contentTypeDir, { recursive: true });
  
  // Créer le fichier schema.json
  fs.writeFileSync(
    path.join(contentTypeDir, 'schema.json'),
    JSON.stringify(schema, null, 2)
  );
  
  console.log(`✅ Content type créé: ${info.displayName}`);
}

// Content type pour les pages éditables
const pageSchema = {
  kind: 'collectionType',
  collectionName: 'pages',
  info: {
    singularName: 'page',
    pluralName: 'pages',
    displayName: 'Page',
    description: 'Pages du site éditables',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    titre: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'uid',
      targetField: 'titre',
      required: true,
    },
    contenu: {
      type: 'richtext',
    },
    meta_description: {
      type: 'string',
    },
    meta_title: {
      type: 'string',
    },
    image_hero: {
      type: 'media',
      multiple: false,
      required: false,
    },
    type_page: {
      type: 'enumeration',
      enum: ['accueil', 'stages', 'cours', 'contact', 'inscription', 'tarifs', 'faq', 'akto'],
      default: 'accueil',
    },
  },
};

// Content type pour les articles de blog/actualités
const articleSchema = {
  kind: 'collectionType',
  collectionName: 'articles',
  info: {
    singularName: 'article',
    pluralName: 'articles',
    displayName: 'Article',
    description: 'Articles et actualités',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    titre: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'uid',
      targetField: 'titre',
      required: true,
    },
    contenu: {
      type: 'richtext',
      required: true,
    },
    resume: {
      type: 'text',
    },
    image: {
      type: 'media',
      multiple: false,
      required: false,
    },
    date_publication: {
      type: 'datetime',
      required: true,
    },
    a_la_une: {
      type: 'boolean',
      default: false,
    },
  },
};

// Créer tous les content types
console.log('🏗️  Création des content types Strapi...');

try {
  createContentType(professeurSchema);
  createContentType(stageSchema);
  createContentType(courSchema);
  createContentType(pageSchema);
  createContentType(articleSchema);
  
  console.log('\n✨ Tous les content types ont été créés avec succès!');
  console.log('\n📝 Étapes suivantes:');
  console.log('1. Redémarrez Strapi pour charger les nouveaux content types');
  console.log('2. Allez dans l\'admin Strapi pour configurer les permissions');
  console.log('3. Importez les données avec le script d\'import');
  
} catch (error) {
  console.error('❌ Erreur lors de la création des content types:', error);
  process.exit(1);
}