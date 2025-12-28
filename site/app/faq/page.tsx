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
    <div className="container py-12">
      <h1 className="text-center mb-8">Foire Aux Questions</h1>

      <div className="max-w-4xl mx-auto">
        <div className="card mb-6">
          <div className="card-body">
            <h2 className="mb-6">Questions les plus fréquentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, index) => (
                <details key={index} style={{
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '1rem'
                }}>
                  <summary style={{
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: '#111827',
                    paddingBottom: '0.5rem',
                    listStyle: 'none'
                  }}>
                    {faq.question}
                  </summary>
                  <div style={{
                    marginTop: '0.75rem',
                    color: '#6b7280',
                    paddingLeft: '1rem',
                    lineHeight: '1.6'
                  }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          border: '1px solid #93c5fd',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: '#1e40af'
          }}>
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p style={{
            color: '#1e40af',
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            N'hésitez pas à nous contacter directement. Notre équipe sera ravie de répondre
            à toutes vos questions personnelles.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center'
          }}>
            <a
              href="/contact"
              className="btn btn-primary"
            >
              Contacter l'équipe
            </a>
            <a
              href="tel:0612345678"
              className="btn btn-secondary"
            >
              Appeler: 06 12 34 56 78
            </a>
            <a
              href="mailto:contact@danser-la-vie.eu"
              className="btn btn-secondary"
            >
              Envoyer un email
            </a>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Liens utiles</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li>
                  <a href="/inscription" style={{
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}>
                    → S'inscrire aux cours
                  </a>
                </li>
                <li>
                  <a href="/stages" style={{
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}>
                    → Voir les stages disponibles
                  </a>
                </li>
                <li>
                  <a href="/tarifs" style={{
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}>
                    → Consulter les tarifs
                  </a>
                </li>
                <li>
                  <a href="/cours" style={{
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}>
                    → Découvrir les professeurs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Informations pratiques</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                color: '#6b7280'
              }}>
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
                  <strong>Adresse:</strong> Vallée de la Maurienne
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}