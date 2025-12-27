'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { strapiClient, Professeur } from '../../lib/strapi';
import { getImageUrl, getImageAlt, FALLBACK_IMAGES } from '../../lib/image-utils';

async function getProfesseurs() {
  try {
    const response = await strapiClient.getProfesseurs();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch professeurs:', error);
    return [];
  }
}

import { DANCE_IMAGES } from '../../lib/image-utils';

async function getSeances() {
  try {
    // Charger les séances simplement (sans populate complexe)
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/seances`);

    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Enrichir les séances avec les images et noms de danse
    const enrichedSeances = data.data.map((seance: any) => {
      let imageUrl = null;
      let danceName = seance.danse?.name || seance.titre; // Fallback au titre

      // Trouver l'image basée sur le titre du cours
      const title = seance.titre?.toLowerCase() || '';

      for (const [availableDanceName, url] of Object.entries(DANCE_IMAGES)) {
        const danceKey = availableDanceName.toLowerCase();
        const titleFirstWord = title.split(' ')[0];

        if (title.includes(danceKey) || danceKey.includes(titleFirstWord) || danceKey.includes(title)) {
          imageUrl = url;
          danceName = availableDanceName; // Utiliser le nom exact de la danse disponible
          break;
        }
      }

      return {
        ...seance,
        imageUrl,
        danse: {
          ...seance.danse,
          name: danceName // S'assurer que le nom est défini pour le lien
        },
        // Ajouter des informations fictives pour les professeurs si nécessaire
        professeur: seance.professeur || null
      };
    });

    return enrichedSeances;
  } catch (error) {
    console.error('Failed to fetch seances:', error);
    return [];
  }
}

async function getDanses() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/danses`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch danses:', error);
    return [];
  }
}

const Page = () => {
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [seances, setSeances] = useState<any[]>([]);
  const [danses, setDanses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDance, setSelectedDance] = useState('');

  useEffect(() => {
    Promise.all([getProfesseurs(), getSeances(), getDanses()]).then(([profData, seanceData, danseData]) => {
      setProfesseurs(profData || []);
      setSeances(seanceData || []);
      setDanses(danseData || []);
      setLoading(false);
    }).catch(error => {
      console.error('Error loading data:', error);
      setLoading(false);
    });
  }, []);

  const filteredSeances = selectedDance
    ? seances.filter(seance => {
        const danseName = seance.danse?.name;
        if (!danseName) return false;
        return danseName.toLowerCase() === selectedDance.toLowerCase();
      })
    : seances;

  return (
    <div className="container py-12">
      <h1 className="text-center mb-8">Nos Cours de Danse</h1>
      <div>
        <h2>Types de Danses Enseignées</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => setSelectedDance('')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
              backgroundColor: selectedDance === '' ? '#3b82f6' : '#e5e7eb',
              color: selectedDance === '' ? 'white' : '#374151',
              boxShadow: selectedDance === '' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            Tous
          </button>
          {danses.map(danse => (
            <button
              key={danse.id}
              onClick={() => setSelectedDance(danse.name)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: 'none',
                backgroundColor: selectedDance === danse.name ? '#3b82f6' : '#e5e7eb',
                color: selectedDance === danse.name ? 'white' : '#374151',
                boxShadow: selectedDance === danse.name ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              {danse.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2>Planning des Cours</h2>
        {loading ? (
          <div>Chargement des cours...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSeances.length > 0 ? (
              filteredSeances.map((seance) => (
                <div key={seance.id} className="card">
                  {seance.imageUrl ? (
                    <div style={{ height: '150px', position: 'relative', overflow: 'hidden', background: '#f3f4f6' }}>
                      <img
                        src={seance.imageUrl}
                        alt={`Photo de ${seance.danse?.name || seance.titre || 'danse'}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div style={{ height: '150px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '3rem', opacity: '0.8' }}>💃</span>
                    </div>
                  )}
                   <div className="card-body">
                     <h4 className="card-title">{seance.titre || 'Cours de danse'}</h4>
                     <p className="text-sm text-gray-600 mb-2">
                       {seance.horaire || 'Horaire à définir'} - {seance.lieu || 'Lieu à définir'}
                     </p>
                     <p>
                       <strong>{seance.danse?.name || seance.danse?.data?.name || seance.titre}</strong> - Niveau {seance.niveau || 'à définir'}
                     </p>
                     {(seance.professeur?.prenom || seance.professeur?.data?.prenom) && (
                       <p className="text-sm text-blue-600 mt-2 font-medium">
                         👨‍🏫 {(seance.professeur.prenom || seance.professeur.data?.prenom)} {(seance.professeur.nom || seance.professeur.data?.nom)}
                       </p>
                     )}
                     <p className="text-sm text-gray-500 mt-1">
                       {seance.prix_mensuel ? `${seance.prix_mensuel}€/mois` : 'Prix sur demande'}
                     </p>
                     <div className="mt-4">
                        <a
                          href={`/presentation/${seance.danse?.name ? seance.danse.name.toLowerCase().replace(/-/g, '').replace(/ /g, '') : 'danse'}`}
                          className="btn btn-secondary"
                          style={{ width: '100%', textAlign: 'center' }}
                        >
                          En savoir plus sur {seance.danse?.name || 'la danse'}
                        </a>
                     </div>
                   </div>
                </div>
              ))
            ) : selectedDance ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Aucun cours trouvé pour "{selectedDance}".</p>
                <p className="text-sm text-gray-500 mt-2">Essayez un autre type de danse ou cliquez sur "Tous".</p>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Cours de danse</h4>
                  <p>Type - Niveau</p>
                  <p className="text-gray-600">Horaire à définir</p>
                  <p className="text-gray-600">Lieu à définir</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <h2>Nos Professeurs</h2>
        {loading ? (
          <div>Chargement des professeurs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professeurs.length > 0 ? (
              professeurs.map((prof) => (
                <div key={prof.id} className="card">
                  <div className="card-header flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    height: '80px',
                    position: 'relative'
                  }}>
                    {getImageUrl((prof.photo as any)?.[0]) ? (
                      <Image
                        src={getImageUrl((prof.photo as any)[0])}
                        alt={`Photo de ${prof.prenom} ${prof.nom}`}
                        width={80}
                        height={80}
                        style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #667eea',
                          position: 'absolute',
                          top: '20px'
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-xl text-white" style={{
                        position: 'absolute',
                        top: '20px'
                      }}>
                        {(prof.prenom && prof.prenom[0]) || '?'}{(prof.nom && prof.nom[0]) || '?'}
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title text-center">{prof.prenom || 'Prénom'} {prof.nom || 'Nom'}</h3>
                    <p className="card-text">{prof.biographie || 'Professeur passionné de danse'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="card">
                <div className="card-header flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  height: '80px',
                  position: 'relative'
                }}>
                  <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-xl text-white" style={{
                    position: 'absolute',
                    top: '20px'
                  }}>
                    ?
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title text-center">Professeur</h3>
                  <p className="card-text">Description</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page