'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { strapiClient, Stage } from '../../lib/strapi';

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function InscriptionPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if Stripe is configured
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Inscription</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Configuration manquante</h2>
            <p className="text-red-700 mb-4">
              Le système de paiement n'est pas configuré. Veuillez contacter l'administrateur.
            </p>
            <p className="text-sm text-red-600">
              Erreur: Clé publique Stripe non trouvée dans les variables d'environnement.
            </p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await strapiClient.getStages();
        setStages(response.data);
      } catch (error) {
        console.error('Failed to fetch stages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const selectedStageId = formData.get('stage') as string;
    const selectedStage = stages.find(s => s.documentId === selectedStageId);

    if (!selectedStage) {
      alert('Veuillez sélectionner un stage valide.');
      setIsSubmitting(false);
      return;
    }

    // Check if Stripe is configured
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      alert('Le système de paiement n\'est pas configuré. Veuillez contacter l\'administrateur.');
      setIsSubmitting(false);
      return;
    }

    const data = {
      stageId: selectedStage.id,
      stageName: selectedStage.titre,
      price: selectedStage.prix || 180,
      customerEmail: formData.get('email'),
      customerName: `${formData.get('prenom')} ${formData.get('nom')}`,
    };

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Erreur lors de la création du paiement:', error);
        alert('Erreur lors du paiement. Veuillez réessayer.');
        setIsSubmitting(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-center mb-8">Inscription / Souscription</h1>

      <div className="max-w-2xl mx-auto">
        <div className="card mb-6">
          <div className="card-body">
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ color: '#059669', marginBottom: '1rem' }}>Inscription réussie !</h2>
                <p>Nous vous contacterons bientôt pour finaliser votre inscription.</p>
              </div>
            ) : (
              <>
                <h2 className="mb-6">Informations personnelles</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label htmlFor="prenom" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="nom" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="telephone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                   <div style={{ marginBottom: '1rem' }}>
                     <label htmlFor="stage" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                       Stage souhaité
                     </label>
                     <select
                       id="stage"
                       name="stage"
                       required
                       disabled={loading}
                       style={{
                         width: '100%',
                         padding: '0.75rem',
                         border: '1px solid #d1d5db',
                         borderRadius: '0.5rem',
                         fontSize: '1rem'
                       }}
                     >
                       <option value="">
                         {loading ? 'Chargement des stages...' : 'Sélectionnez un stage'}
                       </option>
                       {stages.map((stage) => (
                         <option key={stage.documentId} value={stage.documentId}>
                           {stage.titre} - {stage.prix || 'Prix sur demande'}€
                         </option>
                       ))}
                     </select>
                   </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="niveau" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Niveau de danse
                    </label>
                    <select
                      id="niveau"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="debutant">Débutant</option>
                      <option value="intermediaire">Intermédiaire</option>
                      <option value="avance">Avancé</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Message (optionnel)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                      placeholder="Vos questions ou commentaires..."
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <input type="checkbox" id="conditions" required />
                      <label htmlFor="conditions" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        J'accepte les conditions générales d'inscription et de paiement *
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isSubmitting ? 'Inscription en cours...' : 'Finaliser mon inscription'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Pour toute question, contactez-nous au 06 50 54 17 45</p>
        </div>
      </div>
    </div>
  );
}