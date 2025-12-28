'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { strapiClient, Stage } from '../../../lib/strapi';
import { getImageUrl, getImageAlt, FALLBACK_IMAGES } from '../../../lib/image-utils';

async function getStage(documentId: string): Promise<Stage | null> {
  try {
    const response = await strapiClient.getStages();
    const stage = response.data.find(s => s.documentId === documentId);
    return stage || null;
  } catch (error) {
    console.error('Failed to fetch stage:', error);
    return null;
  }
}

export default function StageDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [stage, setStage] = useState<Stage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getStage(id).then((data) => {
        setStage(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="container py-12"><div className="text-center">Chargement du stage...</div></div>;
  }

  if (!stage) {
    return <div className="container py-12"><div className="text-center">Stage non trouvé</div></div>;
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center mb-8">{stage.title || 'Stage de danse'}</h1>

        {getImageUrl(stage.image) ? (
          <div className="mb-8" style={{ height: '400px', position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
            <Image
              src={getImageUrl(stage.image)!}
              alt={getImageAlt(stage.image, `Image du stage ${stage.title}`)}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={FALLBACK_IMAGES.stage.url}
            />
          </div>
        ) : (
          <div className="mb-8" style={{ height: '400px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '5rem', opacity: '0.8' }}>🎭</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="mb-4">{stage.description || 'Description du stage'}</p>

            <h2 className="text-xl font-bold mb-4">Programme</h2>
            {stage.program && stage.program.length > 0 ? (
              <ul className="list-disc list-inside">
                {stage.program.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Programme détaillé à venir</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Informations pratiques</h2>
            <div className="space-y-2">
              <p><strong>📅 Dates:</strong> {stage.dateStart ? new Date(stage.dateStart).toLocaleDateString('fr-FR') : 'Date à confirmer'} - {stage.dateEnd ? new Date(stage.dateEnd).toLocaleDateString('fr-FR') : 'Date à confirmer'}</p>
              <p><strong>📍 Lieu:</strong> {stage.location || 'Lieu à confirmer'}</p>
              <p><strong>💰 Tarif:</strong> {stage.price || 'Prix sur demande'}€</p>
              <p><strong>👥 Niveau:</strong> {stage.level || 'Tous niveaux'}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href={`/inscription?stage=${stage.id}`} className="btn btn-primary">
            S'inscrire à ce stage
          </a>
        </div>
      </div>
    </div>
  );
}