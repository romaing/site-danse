const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'fa5c704e2610bf86a25f0807eb84ac3eecd1bf6ca22141d5f169adcdf209622817051ab8076ea1f0511e6e0c35d70f4d93d54e48d43a38c8b723d80bc35b7d29515ec7f0ae8a1c4cc51761631ab98fe85c6464b1a30520b4cf8bd43a41a2fbfadda7b87a9e9902dffec8f0064fdd650aa1b824bf0b084e8b0bfbf450425b671f';

const professeurs = [
  {
    nom: "Schlienger",
    prenom: "Jonathan",
    biographie: "Moniteur diplômé de Danse de Salon avec plus de 15 ans d'expérience. Animateur de stages depuis 15 ans, professeur de danse de salon.",
    specialites: ["Rock'n'Roll", "Tango", "Rumba", "Valse lente", "Quick step", "West Coast Swing", "Cha cha cha"],
    email: "danser-la-vie@orange.fr",
    telephone: "06 50 54 17 45",
    photo: 19
  },
  {
    nom: "Galichet",
    prenom: "Stéphane",
    biographie: "Professeur de danse à 2 depuis 12 ans, ancien compétiteur dans différents styles de danse, ancien gymnaste, cours de Fitness.",
    specialites: ["Slow Fox Trot", "Bachata 2", "Rumba 2", "Kizomba 2", "Quick Step 2"],
    photo: 20
  },
  {
    nom: "Mbani",
    prenom: "Brice",
    biographie: "Professeur S.B.K. mais 'polyvalent', danses caraïbes, solo.",
    specialites: ["Découverte danse caraïbes", "Toutes danses solo"],
    photo: 21
  },
  {
    nom: "Grecias",
    prenom: "Céline",
    biographie: "Professorat de danse de couple, 'maître de danses de société'.",
    specialites: ["Bachata 1", "Salsa Cubaine 2", "Valse lente 2", "Tango 3", "Cha cha cha 2", "Initiation Rock'n'Roll"],
    photo: 23
  },
  {
    nom: "Desjardins",
    prenom: "Sophie",
    biographie: "Professeur de danse, compétitrice (2 fois finaliste aux championnats de France 10 danses - Latines et standards), chorégraphe.",
    specialites: ["Rock'n'Roll 2", "Initiation Paso Doble", "Initiation Cha cha cha", "Quick Step 3", "West Coast Swing 1", "Salsa Cubaine 1", "Valse viennoise", "Initiation Tango", "Lindy Hop 1", "Tango 2", "West Coast Swing 2", "Rock'n'Roll 3", "Cha cha cha 3", "Rock'n'Roll 1"],
    photo: 8
  },
  {
    nom: "Lasnier",
    prenom: "Marie-France",
    biographie: "Professorat de danses de Société depuis 20 ans et animatrice de Pilates et de Stretching depuis 18 ans.",
    specialites: ["Samba 2", "Valse lente 1", "Initiation Quick Step", "Salsa Cubaine 2", "Valse lente 2"],
    photo: 25
  }
];

async function recreateProfesseursWithPhotos() {
  console.log('🔄 RECRÉATION DES PROFESSEURS AVEC PHOTOS\n');

  for (const prof of professeurs) {
    try {
      console.log(`Créer ${prof.prenom} ${prof.nom} avec photo...`);

      const response = await fetch(`${STRAPI_URL}/api/professeurs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: prof })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ ${prof.prenom} ${prof.nom} créé avec ID ${result.data.id}`);
      } else {
        const error = await response.text();
        console.log(`❌ Échec création ${prof.prenom} ${prof.nom}: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.log(`❌ Erreur réseau pour ${prof.prenom} ${prof.nom}:`, error.message);
    }

    // Pause entre les créations
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n🎉 RECRÉATION TERMINÉE !');
  console.log('Vérifiez les résultats dans Strapi: http://localhost:1337/admin');
  console.log('Ou sur votre site: http://localhost:3001/cours');
}

recreateProfesseursWithPhotos();