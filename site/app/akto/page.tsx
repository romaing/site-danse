import React from 'react';

export default function AktoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Les Akto</h1>
          <p className="text-lg text-gray-600">
            Décrez notre projet unique Les Akto
          </p>
        </header>

        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎭</div>
              <h2 className="text-2xl font-semibold mb-4">Qu'est-ce que Les Akto ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Les Akto représentent notre approche unique de la danse, mêlant tradition et modernité, 
                émotion et technique, partage et évolution personnelle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Notre Philosophie</h3>
                <p className="text-gray-600 mb-4">
                  Les Akto sont bien plus que de simples cours de danse. C'est une approche globale 
                  où chaque mouvement devient une expression de soi, chaque pas une découverte, 
                  chaque danse une histoire partagée.
                </p>
                <p className="text-gray-600">
                  Nous croyons que la danse est un langage universel qui dépasse les barrières 
                  culturelles et sociales, permettant à chacun de trouver sa place et sa voix.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">L'Origine du Nom</h3>
                <p className="text-gray-600 mb-4">
                  "Akto" vient du grec ancien "ἄκτος" signifiant "rayon" ou "lueur". 
                  Ce nom symbolise la lumière intérieure que chaque élève découvre à travers 
                  la danse.
                </p>
                <p className="text-gray-600">
                  Comme un rayon qui traverse les nuages, la danse permet à chacun de 
                  briller de sa propre lumière, de trouver sa singularité tout en s'intégrant 
                  dans une harmonie collective.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Les Valeurs des Akto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Partage</h3>
              <p className="text-gray-600">
                La danse comme vecteur de connexion humaine et de partage intergénérationnel
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold mb-2">Croissance</h3>
              <p className="text-gray-600">
                L'évolution personnelle à travers l'apprentissage et le dépassement de soi
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Créativité</h3>
              <p className="text-gray-600">
                L'expression personnelle et la création de son propre style de danse
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-lg font-semibold mb-2">Élégance</h3>
              <p className="text-gray-600">
                La recherche de la beauté du geste et de l'harmonie du mouvement
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">Ouverture</h3>
              <p className="text-gray-600">
                L'accueil de la diversité des cultures et des styles de danse
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                L'amour de la danse comme moteur de notre enseignement et pratique
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nos Projets Akto</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Akto Stage - Formations Immersives</h3>
                  <p className="text-gray-600 mb-4">
                    Des stages intensifs où l'approche Akto est explorée en profondeur. 
                    Chaque stage est construit autour d'un thème spécifique permettant 
                    aux participants de développer non seulement leur technique mais aussi 
                    leur expression personnelle.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Immersion totale</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Approfondissement</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Créativité</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Akto Compagnie - Créations Collectives</h3>
                  <p className="text-gray-600 mb-4">
                    Une compagnie de danse amateur professionnelle où les élèves motivés 
                    peuvent s'investir dans des créations chorégraphiques originales. 
                    La compagnie représente l'école lors d'événements et spectacles.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Création</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Spectacle</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Compagnie</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Akto Social - Danse Solidaire</h3>
                  <p className="text-gray-600 mb-4">
                    Des actions sociales et humanitaires utilisant la danse comme outil 
                    d'inclusion et de bien-être. Ateliers dans les écoles, maisons de retraite, 
                    centres sociaux, et projets internationaux.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Social</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Solidarité</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Inclusion</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Akto Formation - Pédagogie d'Excellence</h3>
                  <p className="text-gray-600 mb-4">
                    Formation de professeurs de danse basée sur la pédagogie Akto. 
                    Une approche unique qui allie technique, pédagogie, psychologie 
                    et développement personnel pour former les enseignants de demain.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Formation</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Pédagogie</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Témoignages Akto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  SC
                </div>
                <div>
                  <h4 className="font-semibold">Sophie C.</h4>
                  <p className="text-sm text-gray-600">Élève depuis 2 ans</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "L'approche Akto a transformé ma manière de voir la danse. Ce n'est plus 
                seulement une question de technique, mais une véritable expression de moi-même. 
                Chaque cours est une découverte."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  MR
                </div>
                <div>
                  <h4 className="font-semibold">Marc R.</h4>
                  <p className="text-sm text-gray-600">Membre de la compagnie</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "La compagnie Akto m'a permis de dépasser mes limites et de participer 
                à des créations magnifiques. L'esprit de partage et de créativité est 
                incroyable. C'est bien plus qu'un cours de danse."
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Rejoignez l'Aventure Akto</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Que vous soyez débutant ou danseur expérimenté, les Akto vous ouvrent 
              les portes d'une approche unique de la danse. Décrez comment la danse 
              peut transformer votre vie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Découvrir les stages Akto
              </button>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                Rejoindre la compagnie
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                S'inscrire aux cours
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}