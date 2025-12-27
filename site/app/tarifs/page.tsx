import React from 'react';

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tarifs</h1>
          <p className="text-lg text-gray-600">
            Découvrez nos tarifs pour les stages et les cours réguliers
          </p>
        </header>

        {/* Tarifs des stages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tarifs des Stages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-4">Stage Découverte</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">120€</span>
                <span className="text-gray-600">/ week-end</span>
              </div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  2 jours (samedi-dimanche)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  8 heures de cours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Niveau débutant
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  10 participants maximum
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                S'inscrire
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <h3 className="text-xl font-semibold mb-4">Stage Intensif</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-green-600">180€</span>
                <span className="text-gray-600">/ week-end</span>
              </div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  2 jours (samedi-dimanche)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  12 heures de cours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Tous niveaux
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  8 participants maximum
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                S'inscrire
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-4">Stage Premium</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-purple-600">250€</span>
                <span className="text-gray-600">/ 3 jours</span>
              </div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  3 jours (vendredi-dimanche)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  18 heures de cours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Niveau intermédiaire/avancé
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  6 participants maximum
                </li>
              </ul>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                S'inscrire
              </button>
            </div>
          </div>

          {/* Options supplémentaires */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Options supplémentaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Hébergement nuit</span>
                <span className="font-semibold">45€</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Petit-déjeuner</span>
                <span className="font-semibold">8€</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Repas midi</span>
                <span className="font-semibold">15€</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Repas soir</span>
                <span className="font-semibold">20€</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tarifs des cours */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tarifs des Cours Réguliers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Abonnement Mensuel</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">60€</span>
                <span className="text-gray-600">/ mois</span>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 1 cours par semaine</li>
                <li>• 4 cours par mois</li>
                <li>• Engagement 1 mois</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Abonnement Mensuel+</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-green-600">100€</span>
                <span className="text-gray-600">/ mois</span>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 2 cours par semaine</li>
                <li>• 8 cours par mois</li>
                <li>• Engagement 1 mois</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Abonnement Trimestriel</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-purple-600">165€</span>
                <span className="text-gray-600">/ trimestre</span>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 1 cours par semaine</li>
                <li>• 12 cours par trimestre</li>
                <li>• Économie de 15€</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Abonnement Annuel</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-red-600">590€</span>
                <span className="text-gray-600">/ an</span>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 1 cours par semaine</li>
                <li>• 48 cours par an</li>
                <li>• Économie de 130€</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Offres spéciales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Offres Spéciales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Cours d'essai</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-purple-600">GRATUIT</span>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Premier cours gratuit</li>
                <li>• Sans engagement</li>
                <li>• Valable pour tous les cours</li>
                <li>• Réservation obligatoire</li>
              </ul>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                Réserver mon essai
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Couples -15%</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">OFFRE COUPLE</span>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• -15% pour les couples</li>
                <li>• Valable sur tous les abonnements</li>
                <li>• Même niveau ou différents</li>
                <li>• Aucune condition</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                En savoir plus
              </button>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Étudiants -20%</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-orange-600">-20%</span>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Pour tous les étudiants</li>
                <li>• Valable sur présentation de carte</li>
                <li>• Sauf offres spéciales</li>
                <li>• Cumulable avec offre couple</li>
              </ul>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                En savoir plus
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Parrainage</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-green-600">50€</span>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Parrainez un nouvel élève</li>
                <li>• 50€ de réduction pour vous</li>
                <li>• 25€ de réduction pour le filleul</li>
                <li>• Cumulable sans limite</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Parrainer
              </button>
            </div>
          </div>
        </section>

        {/* Conditions de paiement */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Conditions de Paiement</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Moyens de paiement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Chèque bancaire
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Virement bancaire
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Carte bancaire (sur place)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Espèces (sur place)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Modalités de règlement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Paiement en 1 fois pour les abonnements mensuels
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Paiement en 3 fois possible pour l'abonnement annuel
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Acompte de 30% requis pour les stages
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Solde à régler avant le début du stage
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Conditions d'annulation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Stages</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Plus de 30 jours: remboursement à 100%</li>
                    <li>• 15 à 30 jours: remboursement à 80%</li>
                    <li>• 7 à 14 jours: remboursement à 50%</li>
                    <li>• Moins de 7 jours: non remboursable</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Abonnements</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Résiliation 15 jours avant fin de mois</li>
                    <li>• Aucun remboursement en cours de mois</li>
                    <li>• Crédit possible pour absence justifiée</li>
                    <li>• Transfert d'abonnement possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}