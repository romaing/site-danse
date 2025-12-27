'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { strapiClient, Stage } from '../../lib/strapi';
import { getImageUrl, getImageAlt, FALLBACK_IMAGES } from '../../lib/image-utils';

async function getStages(): Promise<Stage[]> {
  try {
    const response = await strapiClient.getStages();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stages:', error);
    return [];
  }
}

function getNiveauLabel(niveau: string): string {
  switch (niveau) {
    case 'debutant': return 'Débutant';
    case 'intermediaire': return 'Intermédiaire';
    case 'avance': return 'Avancé';
    case 'tous_niveaux': return 'Tous niveaux';
    default: return 'Tous niveaux';
  }
}

export default function StagesPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [filteredStages, setFilteredStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    niveau: '',
    search: '',
  });

  useEffect(() => {
    getStages().then((data) => {
      setStages(data);
      setFilteredStages(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = stages;

    if (filters.niveau) {
      filtered = filtered.filter(stage => stage.niveau === filters.niveau);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(stage =>
        stage.titre.toLowerCase().includes(searchTerm) ||
        stage.description.toLowerCase().includes(searchTerm) ||
        stage.lieu.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredStages(filtered);
  }, [stages, filters]);

  return (
    <div className="container py-12">
      <h1 className="text-center mb-8">Nos Stages de Danse</h1>

      {/* Filters */}
      {!loading && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Rechercher un stage..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <select
                value={filters.niveau}
                onChange={(e) => setFilters(prev => ({ ...prev, niveau: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                <option value="">Tous niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
                <option value="tous_niveaux">Tous niveaux</option>
              </select>
            </div>
            {(filters.search || filters.niveau) && (
              <button
                onClick={() => setFilters({ niveau: '', search: '' })}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center">Chargement des stages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           {filteredStages.length > 0 ? (
             filteredStages.map((stage) => (
            <div key={stage.id} className="card">
              {getImageUrl(stage.image) ? (
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={getImageUrl(stage.image)!}
                    alt={getImageAlt(stage.image, `Stage ${stage.titre}`)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={FALLBACK_IMAGES.stage.url}
                  />
                </div>
              ) : (
                <div className="card-header" style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '3rem', opacity: '0.8' }}>🎭</span>
                </div>
              )}
               <div className="card-body">
                   <h3 className="card-title">{stage.titre || 'Stage de danse'}</h3>
                   {stage.niveau && (
                     <span style={{
                       display: 'inline-block',
                       background: '#e5e7eb',
                       color: '#374151',
                       padding: '0.25rem 0.75rem',
                       borderRadius: '0.5rem',
                       fontSize: '0.875rem',
                       fontWeight: '500',
                       marginBottom: '0.5rem'
                     }}>
                       {getNiveauLabel(stage.niveau)}
                     </span>
                   )}
                   <p className="card-text">{stage.description || 'Description du stage'}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span>📅 {stage.date_debut ? new Date(stage.date_debut).toLocaleDateString('fr-FR') : 'Date à confirmer'} - {stage.date_fin ? new Date(stage.date_fin).toLocaleDateString('fr-FR') : 'Date à confirmer'}</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{stage.prix || 'Prix sur demande'}€</span>
                  </div>
                   <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                     <a href={`/stages/${stage.documentId}`} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
                       Détails
                     </a>
                     <a href={`/inscription?stage=${stage.id || ''}`} className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>
                       S'inscrire
                     </a>
                   </div>
                </div>
              </div>
            ))
           ) : (
             <>
               <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                 <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                   {stages.length === 0 ? 'Aucun stage disponible pour le moment.' : 'Aucun stage ne correspond à vos critères.'}
                 </p>
               </div>
             </>
           )}
         </div>
       )}

        <div className="text-center">
          <a href="/contact" className="btn btn-secondary">
            Contactez-nous pour plus d'informations
          </a>
        </div>
      </div>
    );
  }