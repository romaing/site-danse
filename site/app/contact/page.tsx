'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container py-12">
      <h1 className="text-center mb-8">Contactez-nous</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <div className="card">
          <div className="card-body">
            <h2 className="mb-6">Envoyez-nous un message</h2>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: '#059669', marginBottom: '1rem' }}>Message envoyé !</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nom *</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email *</label>
                <input
                  type="email"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Téléphone</label>
                <input
                  type="tel"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Sujet *</label>
                <select required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}>
                  <option value="">Sélectionnez un sujet</option>
                  <option value="information">Information sur les cours</option>
                  <option value="stage">Information sur les stages</option>
                  <option value="inscription">Inscription</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message *</label>
                <textarea
                  required
                  rows={4}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                />
              </div>

               <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                 {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
               </button>
             </form>
            )}
          </div>
        </div>

        {/* Informations de contact */}
        <div>
          <div className="card mb-6">
            <div className="card-body">
              <h2 className="mb-4">Nos coordonnées</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📧</span>
                  <div>
                    <div style={{ fontWeight: '500' }}>Email</div>
                     <div className="text-gray-600">contact@danse-normandie.fr</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📞</span>
                  <div>
                    <div style={{ fontWeight: '500' }}>Téléphone</div>
                    <div className="text-gray-600">06 12 34 56 78</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📍</span>
                  <div>
                    <div style={{ fontWeight: '500' }}>Adresse</div>
                     <div className="text-gray-600">Vallée de la Maurienne</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Horaires d'ouverture</h2>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                 <div>Lundi - Vendredi:</div>
                 <div className="text-gray-600">9h-19h</div>
                 <div>Samedi:</div>
                 <div className="text-gray-600">10h-18h</div>
                 <div>Dimanche:</div>
                 <div className="text-gray-600">Fermé</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}