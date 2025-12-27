const STRAPI_URL = 'http://localhost:1337';

// Fonction pour créer un admin et configurer tout automatiquement
async function createAdminAndSetup() {
  console.log('👑 CRÉATION ADMIN + CONFIGURATION COMPLÈTE\n');

  try {
    // Étape 1: Créer un compte admin
    console.log('1️⃣ Création du compte administrateur...');

    const adminData = {
      email: 'admin@dance.com',
      firstname: 'Admin',
      lastname: 'Dance',
      password: 'Admin123!'
    };

    // Utiliser l'endpoint d'enregistrement admin
    const registerResponse = await fetch(`${STRAPI_URL}/admin/auth/register-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData)
    });

    if (registerResponse.ok) {
      console.log('✅ Compte admin créé avec succès');
    } else {
      const error = await registerResponse.text();
      console.log('⚠️ Compte admin peut-être déjà créé:', error);
    }

    // Étape 2: Se connecter pour obtenir un token
    console.log('\n2️⃣ Connexion admin...');

    const loginResponse = await fetch(`${STRAPI_URL}/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: adminData.email,
        password: adminData.password
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Impossible de se connecter');
    }

    const loginData = await loginResponse.json();
    const token = loginData.data.token;

    console.log('✅ Connecté, token obtenu');

    // Étape 3: Configurer les permissions du rôle Public
    console.log('\n3️⃣ Configuration des permissions API...');

    const permissionsData = {
      "permissions": {
        "api::professeur.professeur": {
          "controllers": {
            "professeur": {
              "find": { "enabled": true },
              "findOne": { "enabled": true },
              "create": { "enabled": true },
              "update": { "enabled": true },
              "delete": { "enabled": true }
            }
          }
        },
        "api::stage.stage": {
          "controllers": {
            "stage": {
              "find": { "enabled": true },
              "findOne": { "enabled": true },
              "create": { "enabled": true },
              "update": { "enabled": true },
              "delete": { "enabled": true }
            }
          }
        },
        "api::seance.seance": {
          "controllers": {
            "seance": {
              "find": { "enabled": true },
              "findOne": { "enabled": true },
              "create": { "enabled": true },
              "update": { "enabled": true },
              "delete": { "enabled": true }
            }
          }
        },
        "plugin::upload.upload": {
          "controllers": {
            "upload": {
              "find": { "enabled": true },
              "findOne": { "enabled": true },
              "create": { "enabled": true },
              "update": { "enabled": true },
              "delete": { "enabled": true }
            }
          }
        }
      }
    };

    const permissionsResponse = await fetch(`${STRAPI_URL}/admin/users-permissions/roles/1`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(permissionsData)
    });

    if (permissionsResponse.ok) {
      console.log('✅ Permissions configurées');
    } else {
      console.log('⚠️ Erreur permissions:', await permissionsResponse.text());
    }

    // Étape 4: Générer un token API
    console.log('\n4️⃣ Génération du token API...');

    const tokenData = {
      name: 'Full Access Token',
      description: 'Token complet pour l\'import automatique',
      type: 'full-access'
    };

    const tokenResponse = await fetch(`${STRAPI_URL}/admin/api-tokens`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: tokenData })
    });

    if (tokenResponse.ok) {
      const tokenResult = await tokenResponse.json();
      const apiToken = tokenResult.data.accessKey;
      console.log('✅ Token API généré');

      // Sauvegarder le token pour les prochains scripts
      console.log('\n🔑 TOKEN API:', apiToken);
      console.log('📝 Copiez ce token dans vos scripts !');

    } else {
      console.log('⚠️ Erreur génération token:', await tokenResponse.text());
    }

    console.log('\n🎉 ADMIN ET PERMISSIONS CONFIGURÉS !');
    console.log('🔗 Accès admin: http://localhost:1337/admin');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createAdminAndSetup();