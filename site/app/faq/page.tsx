import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment s'inscrire à un cours ou un stage ?",
      answer: "Vous pouvez vous inscrire directement via notre site web dans la section 'Inscription', par téléphone au 06 12 34 56 78, ou en nous rendant directement à l'école. Un acompte de 30% est requis pour les stages."
    },
    {
      question: "Y a-t-il un cours d'essai gratuit ?",
      answer: "Oui ! Nous offrons un cours d'essai entièrement gratuit pour tous les nouveaux élèves. C'est l'occasion parfaite de découvrir notre approche et de vous assurer que le cours vous correspond avant de vous engager."
    },
    {
      question: "Quel niveau est requis pour commencer ?",
      answer: "Nous accueillons tous les niveaux, du débutant complet au danseur avancé. Chaque cours est adapté au niveau spécifique indiqué. N'hésitez pas à nous contacter pour évaluer quel niveau vous conviendrait le mieux."
    },
    {
      question: "Quelles danses sont enseignées ?",
      answer: "Nous enseignons un large éventail de danses de salon : Rock, Salsa, Tango, Valse, Chachacha, Rumba, Boléro, Quickstep, et bien d'autres. Chaque danse a ses propres cours spécifiques."
    },
    {
      question: "Comment fonctionnent les abonnements ?",
      answer: "Nous proposons plusieurs formules : mensuel (60€ pour 1 cours/semaine, 100€ pour 2 cours/semaine), trimestriel (165€) et annuel (590€). L'abonnement inclut un cours par semaine, avec possibilité d'ajouter des cours supplémentaires."
    },
    {
      question: "Y a-t-il des réductions disponibles ?",
      answer: "Oui, nous proposons plusieurs réductions : -20% pour les étudiants, -15% pour les couples, et des offres spéciales régulières. Le système de parrainage vous offre également 50€ de réduction par parrainage."
    },
    {
      question: "Que dois-je porter pour les cours ?",
      answer: "Portez des vêtements confortables qui n'entravent pas vos mouvements. Pour les chaussures, privilégiez des chaussures de danse ou des chaussures à semelles lisses qui facilitent les glissements. Évitez les baskets à semelles crantées."
    },
    {
      question: "Puis-je venir seul(e) ou en couple ?",
      answer: "Les deux ! Beaucoup de nos élèves viennent seuls et nous changeons régulièrement de partenaires pendant les cours. Les couples sont bien sûr les bienvenus et peuvent choisir de rester ensemble ou de participer aux changements de partenaires."
    },
    {
      question: "Comment se déroulent les stages ?",
      answer: "Nos stages durent généralement 2 à 3 jours, avec 6-8 heures de cours par jour. Ils combinent technique, chorégraphie et pratique. L'hébergement et les repas sont disponibles en option. Une ambiance conviviale et studieuse est garantie."
    },
    {
      question: "Quelles sont les modalités de paiement ?",
      answer: "Nous acceptons les chèques, virements bancaires, paiements par carte et espèces. Pour les abonnements annuels, un paiement en 3 fois sans frais est possible. Pour les stages, un acompte de 30% est requis à l'inscription."
    },
    {
      question: "Puis-je annuler ma réservation ?",
      answer: "Oui, avec des conditions différentes selon le type de réservation. Pour les stages : plus de 30 jours (100% remboursé), 15-30 jours (80%), 7-14 jours (50%), moins de 7 jours (non remboursable). Pour les abonnements : résiliation 15 jours avant fin de mois."
    },
    {
      question: "Y a-t-il un âge minimum ou maximum ?",
      answer: "Nous accueillons les adultes de 18 ans et plus. Il n'y a pas d'âge maximum ! La danse est accessible à tous les âges et nous adaptons notre enseignement en fonction des capacités de chacun."
    },
    {
      question: "Comment fonctionne le système de parrainage ?",
      answer: "En parrainant un nouvel élève, vous bénéficiez de 50€ de réduction sur votre prochain abonnement, et votre filleul obtient 25€ de réduction sur son premier abonnement. Le parrainage est cumulable sans limite."
    },
    {
      question: "Les cours sont-ils adaptés aux personnes à mobilité réduite ?",
      answer: "Nous faisons notre maximum pour adapter nos cours aux capacités de chacun. Nos locaux sont accessibles aux personnes à mobilité réduite. N'hésitez pas à nous contacter pour discuter de vos besoins spécifiques."
    },
    {
      question: "Y a-t-il des spectacles ou des galas ?",
      answer: "Oui ! Nous organisons régulièrement des galas internes où les élèves peuvent présenter ce qu'ils ont appris dans une ambiance conviviale. Notre compagnie Akto se produit également lors d'événements publics."
    },
    {
      question: "Comment devenir professeur avec votre méthode ?",
      answer: "Nous proposons une formation professionnelle 'Akto Formation' pour devenir professeur de danse avec notre pédagogie unique. Cette formation allie technique, pédagogie, psychologie et développement personnel. Contactez-nous pour plus d'informations."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Foire Aux Questions</h1>
          <p className="text-lg text-gray-600">
            Retrouvez les réponses aux questions les plus fréquentes
          </p>
        </header>

        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Questions les plus fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600 focus:outline-none focus:text-blue-600 pb-2">
                    {faq.question}
                  </summary>
                  <div className="mt-3 text-gray-600 pl-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-gray-700 mb-4">
              N'hésitez pas à nous contacter directement. Notre équipe sera ravie de répondre 
              à toutes vos questions personnelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-center inline-block"
              >
                Contacter l'équipe
              </a>
              <a 
                href="tel:0612345678" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-center inline-block"
              >
                Appeler: 06 12 34 56 78
              </a>
              <a 
                href="mailto:contact@danser-la-vie.eu" 
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 text-center inline-block"
              >
                Envoyer un email
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/inscription" className="text-blue-600 hover:text-blue-800">
                    → S'inscrire aux cours
                  </a>
                </li>
                <li>
                  <a href="/stages" className="text-blue-600 hover:text-blue-800">
                    → Voir les stages disponibles
                  </a>
                </li>
                <li>
                  <a href="/tarifs" className="text-blue-600 hover:text-blue-800">
                    → Consulter les tarifs
                  </a>
                </li>
                <li>
                  <a href="/cours" className="text-blue-600 hover:text-blue-800">
                    → Découvrir les professeurs
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Informations pratiques</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Horaires:</strong> Lundi-Vendredi 9h-18h
                </li>
                <li>
                  <strong>Téléphone:</strong> 06 12 34 56 78
                </li>
                <li>
                  <strong>Email:</strong> contact@danser-la-vie.eu
                </li>
                <li>
                  <strong>Adresse:</strong> 123 rue de la Danse, 75000 Paris
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}