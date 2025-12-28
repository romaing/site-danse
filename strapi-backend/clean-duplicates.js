#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'c1222b6fd8ba9b1c32843e0e07da519438e2fd243d997f1882bf1cd02aa2bc0048362b1a23764dcbc53b4fc81f6a3f5edbc6329863affb44c62082b2060624daf313ac2912080021c7b915b7e2171472849983113d8741acdcbfaa7eccd4f4c7ba657f386191c0b1d4d477dac09c5e00b58eda2d0b4cb6f4d1cef20f74ffbeb5';

if (!STRAPI_TOKEN) {
  console.error('❌ Erreur: Variable STRAPI_TOKEN requise');
  process.exit(1);
}

const duplicateIds = [13, 14, 15, 16, 17, 18]; // The older entries to delete

async function deleteEntry(id) {
  const response = await fetch(`${STRAPI_URL}/api/danses/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to delete entry ${id}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  console.log('🗑️ Suppression des entrées dupliquées dans la collection danses...');

  for (const id of duplicateIds) {
    try {
      console.log(`  🗑️ Suppression de l'entrée ID: ${id}`);
      const result = await deleteEntry(id);
      console.log(`  ✅ Supprimé: ID ${id}`);
    } catch (error) {
      console.error(`  ❌ Échec suppression ID ${id}:`, error.message);
    }
  }

  console.log('🎉 Nettoyage terminé !');
}

main();