#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'c1222b6fd8ba9b1c32843e0e07da519438e2fd243d997f1882bf1cd02aa2bc0048362b1a23764dcbc53b4fc81f6a3f5edbc6329863affb44c62082b2060624daf313ac2912080021c7b915b7e2171472849983113d8741acdcbfaa7eccd4f4c7ba657f386191c0b1d4d477dac09c5e00b58eda2d0b4cb6f4d1cef20f74ffbeb5';

if (!STRAPI_TOKEN) {
  console.error('❌ Erreur: Variable STRAPI_TOKEN requise');
  process.exit(1);
}

const data = {
  danses: [
    {
      name: "Rock",
      description: "Le Rock'n'Roll est une danse énergique et festive originaire des années 50. Elle combine des mouvements dynamiques avec une grande liberté d'expression. Idéale pour ceux qui aiment le rythme et l'amplitude des mouvements."
    },
    {
      name: "Salsa",
      description: "La Salsa cubaine est une danse sensuelle et rythmée originaire de Cuba. Elle met l'accent sur les hanches et les connexions entre partenaires, créant une danse pleine de passion et de complicité."
    },
    {
      name: "Tango",
      description: "Le Tango argentin est une danse élégante et dramatique née dans les rues de Buenos Aires. Il combine passion, technique et connexion profonde entre les danseurs, racontant une histoire à chaque pas."
    },
    {
      name: "Valse",
      description: "La Valse viennoise est une danse gracieuse et tournoyante. Elle demande élégance et précision, créant une atmosphère romantique et légère qui fait tourner les têtes."
    },
    {
      name: "Cha-cha-cha",
      description: "Le Cha-cha-cha est une danse joyeuse et rythmée originaire de Cuba. Ses pas syncopés et ses mouvements de hanches en font une danse festive et communicative."
    },
    {
      name: "Rumba",
      description: "La Rumba est une danse sensuelle et expressive originaire de Cuba. Elle met l'accent sur les mouvements fluides du corps et les connexions émotionnelles entre partenaires."
    }
  ]
};

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

async function populateDanses() {
  console.log('🎭 Population de la collection danses...');

  for (const danse of data.danses) {
    try {
      console.log(`  📝 Création danse: ${danse.name}`);
      const result = await apiRequest('/danses', 'POST', { data: danse });
      console.log(`  ✅ Créé: ${result.data.name} (ID: ${result.data.id})`);
    } catch (error) {
      console.error(`  ❌ Échec création ${danse.name}:`, error.message);
    }
  }

  console.log('🎉 Population des danses terminée !');
}

async function main() {
  try {
    await populateDanses();
  } catch (error) {
    console.error('💥 Erreur lors de la population:', error.message);
  }
}

main();