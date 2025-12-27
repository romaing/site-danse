const puppeteer = require('puppeteer');

async function restoreDatabase() {
  console.log('🚀 RESTAURATION AUTOMATIQUE VIA NAVIGATEUR\n');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Étape 1: Accéder à l'admin et créer un compte
    console.log('1️⃣ Création du compte admin...');
    await page.goto('http://localhost:1337/admin');

    // Attendre que la page charge
    await page.waitForSelector('input[name="email"]', { timeout: 10000 });

    // Remplir le formulaire d'inscription
    await page.type('input[name="email"]', 'admin@dance.com');
    await page.type('input[name="firstname"]', 'Admin');
    await page.type('input[name="lastname"]', 'Dance');
    await page.type('input[name="password"]', 'Admin123!');

    // Trouver et cliquer sur le bouton submit
    const submitButton = await page.$('button[type="submit"]');
    if (submitButton) {
      await submitButton.click();
    } else {
      // Essayer de trouver par texte
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const submitBtn = buttons.find(btn => btn.textContent.includes('Submit') || btn.textContent.includes('Créer'));
        if (submitBtn) submitBtn.click();
      });
    }

    // Attendre la redirection
    await page.waitForNavigation({ timeout: 10000 });

    console.log('✅ Admin créé, connexion réussie');

    // Étape 2: Configurer les permissions
    console.log('\n2️⃣ Configuration des permissions...');
    await page.goto('http://localhost:1337/admin/settings/users-permissions/roles');

    // Attendre que la page charge
    await page.waitForSelector('.role-card', { timeout: 5000 });

    // Cliquer sur le rôle Public
    await page.evaluate(() => {
      const publicRole = Array.from(document.querySelectorAll('.role-card')).find(card =>
        card.textContent.includes('Public')
      );
      if (publicRole) publicRole.click();
    });

    // Attendre la page des permissions
    await page.waitForSelector('input[type="checkbox"]', { timeout: 5000 });

    // Activer toutes les permissions pour professeurs, stages, seances
    await page.evaluate(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          checkbox.click();
        }
      });
    });

    // Sauvegarder
    await page.evaluate(() => {
      const saveButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent.includes('Save')
      );
      if (saveButton) saveButton.click();
    });

    await page.waitForTimeout(2000);
    console.log('✅ Permissions configurées');

    // Étape 3: Générer un token API
    console.log('\n3️⃣ Génération token API...');
    await page.goto('http://localhost:1337/admin/settings/api-tokens');

    await page.waitForSelector('button', { timeout: 5000 });

    // Cliquer sur "Create new API Token"
    await page.evaluate(() => {
      const createButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent.includes('Create') || btn.textContent.includes('Nouveau')
      );
      if (createButton) createButton.click();
    });

    // Remplir le formulaire
    await page.waitForSelector('input[name="name"]', { timeout: 5000 });
    await page.type('input[name="name"]', 'Full Access Token');
    await page.type('textarea[name="description"]', 'Token complet pour l\'import');

    // Sélectionner "Full access"
    await page.evaluate(() => {
      const select = document.querySelector('select[name="type"]');
      if (select) {
        select.value = 'full-access';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // Soumettre
    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent.includes('Generate') || btn.textContent.includes('Créer')
      );
      if (submitBtn) submitBtn.click();
    });

    await page.waitForTimeout(2000);

    // Récupérer le token généré
    const tokenElement = await page.$('[data-testid="api-token"]');
    let apiToken = '';
    if (tokenElement) {
      apiToken = await page.evaluate(el => el.textContent, tokenElement);
    }

    console.log('✅ Token API généré:', apiToken);

    console.log('\n🎉 CONFIGURATION TERMINÉE !');
    console.log('🔗 Vous pouvez maintenant utiliser le token API pour importer les données');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    // Ne pas fermer le navigateur pour que l'utilisateur puisse continuer
    console.log('\n⚠️ Le navigateur reste ouvert pour que vous puissiez continuer l\'import manuel');
  }
}

restoreDatabase();