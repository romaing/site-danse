'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { strapiClient } from '../../../lib/strapi';
import { getImageUrl } from '../../../lib/image-utils';

interface Danse {
  id: number;
  name: string;
  description: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export default function PresentationPage() {
  const params = useParams();
  const type = params.type as string;
  const [danse, setDanse] = useState<Danse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDanse = async () => {
      try {
        // Map type to danse name
        const nameMap: Record<string, string> = {
          rock: 'Rock',
          salsa: 'Salsa',
          tango: 'Tango',
          valse: 'Valse',
          chachacha: 'Cha-cha-cha',
          rumba: 'Rumba'
        };
        const danseName = nameMap[type.toLowerCase()];
        if (!danseName) {
          setLoading(false);
          return;
        }

        // Récupérer toutes les danses et filtrer côté client
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/danses?populate=*`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const foundDanse = data.data.find((d: Danse) => d.name.toLowerCase() === danseName.toLowerCase());
          if (foundDanse) {
            setDanse(foundDanse);
          }
        }
      } catch (error) {
        console.error('Error fetching danse:', error);
      }
      setLoading(false);
    };

    fetchDanse();
  }, [type]);

  if (loading) {
    return (
      <div className="container py-12">
        <div>Chargement...</div>
      </div>
    );
  }

  if (!danse) {
    return (
      <div className="container py-12">
        <h1>Danse non trouvée</h1>
        <p>La présentation pour cette danse n'est pas disponible.</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-center mb-8">Présentation - {danse.name}</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2>Description</h2>
            <p className="mb-4">{danse.description}</p>
            <p className="text-sm text-gray-600 mb-6">
              Disponible en cours hebdomadaires et stages intensifs.
            </p>

            <h2>Niveaux proposés</h2>
            <ul className="list-disc list-inside mb-6">
              <li>Débutant</li>
              <li>Intermédiaire</li>
              <li>Avancé</li>
              <li>Tous niveaux</li>
            </ul>

            <h2>Horaires</h2>
            <p>Consultez la page <a href="/cours" className="text-blue-600 hover:underline">Cours</a> pour les horaires disponibles.</p>
          </div>

          <div>
             {danse.image && (
               <div className="w-80 h-80 md:w-[40rem] md:h-[40rem] mx-auto rounded-lg shadow-md overflow-hidden">
                 <img
                   src={getImageUrl(danse.image)}
                   alt={`Image de ${danse.name}`}
                   className="w-full h-full object-cover"
                   style={{ maxWidth: '100%', maxHeight: '100%' }}
                 />
               </div>
             )}
          </div>
        </div>

        <div className="text-center">
          <a href="/cours" className="btn btn-primary mr-4">
            Voir les cours
          </a>
          <a href="/contact" className="btn btn-secondary">
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}