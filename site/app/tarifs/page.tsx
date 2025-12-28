import React from 'react';

export default function TarifsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-center mb-8">Tarifs</h1>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontSize: '1.25rem',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Découvrez nos tarifs pour les stages et les cours réguliers
        </p>
      </div>

      {/* Tarifs des stages */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#1f2937'
        }}>
          Tarifs des Stages
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="card" style={{
            borderTop: '4px solid #3b82f6'
          }}>
            <div className="card-body">
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Stage Découverte
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2563eb'
                }}>
                  120€
                </span>
                <span style={{ color: '#6b7280' }}> / week-end</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  2 jours (samedi-dimanche)
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  8 heures de cours
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  Niveau débutant
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  10 participants maximum
                </li>
              </ul>
              <a href="/inscription" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                S'inscrire
              </a>
            </div>
          </div>

          <div className="card" style={{
            borderTop: '4px solid #10b981'
          }}>
            <div className="card-body">
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Stage Intensif
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#059669'
                }}>
                  180€
                </span>
                <span style={{ color: '#6b7280' }}> / week-end</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  2 jours (samedi-dimanche)
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  12 heures de cours
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  Tous niveaux
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  8 participants maximum
                </li>
              </ul>
              <a href="/inscription" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                S'inscrire
              </a>
            </div>
          </div>

          <div className="card" style={{
            borderTop: '4px solid #8b5cf6'
          }}>
            <div className="card-body">
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Stage Premium
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#7c3aed'
                }}>
                  250€
                </span>
                <span style={{ color: '#6b7280' }}> / 3 jours</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#8b5cf6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  3 jours (vendredi-dimanche)
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#8b5cf6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  18 heures de cours
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#8b5cf6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  Niveau intermédiaire/avancé
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#8b5cf6',
                    borderRadius: '50%',
                    marginRight: '0.75rem'
                  }}></span>
                  6 participants maximum
                </li>
              </ul>
              <a href="/inscription" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                S'inscrire
              </a>
            </div>
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
        </div>

      {/* Tarifs des cours */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#1f2937'
        }}>
          Tarifs des Cours Réguliers
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="card">
            <div className="card-body">
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Abonnement Mensuel
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2563eb'
                }}>
                  60€
                </span>
                <span style={{ color: '#6b7280' }}> / mois</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: '#6b7280',
                fontSize: '0.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <li>• 1 cours par semaine</li>
                <li>• 4 cours par mois</li>
                <li>• Engagement 1 mois</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Abonnement Mensuel+
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#059669'
                }}>
                  100€
                </span>
                <span style={{ color: '#6b7280' }}> / mois</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: '#6b7280',
                fontSize: '0.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <li>• 2 cours par semaine</li>
                <li>• 8 cours par mois</li>
                <li>• Engagement 1 mois</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Abonnement Trimestriel
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#7c3aed'
                }}>
                  165€
                </span>
                <span style={{ color: '#6b7280' }}> / trimestre</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: '#6b7280',
                fontSize: '0.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <li>• 1 cours par semaine</li>
                <li>• 12 cours par trimestre</li>
                <li>• Économie de 15€</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Abonnement Annuel
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#dc2626'
                }}>
                  590€
                </span>
                <span style={{ color: '#6b7280' }}> / an</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: '#6b7280',
                fontSize: '0.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <li>• 1 cours par semaine</li>
                <li>• 48 cours par an</li>
                <li>• Économie de 130€</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Offres spéciales */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#1f2937'
        }}>
          Offres Spéciales
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
            border: '1px solid #d8b4fe',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#7c3aed'
            }}>
              Cours d'essai
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#7c3aed'
              }}>
                GRATUIT
              </span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '1rem',
              color: '#374151',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <li>• Premier cours gratuit</li>
              <li>• Sans engagement</li>
              <li>• Valable pour tous les cours</li>
              <li>• Réservation obligatoire</li>
            </ul>
            <a href="/contact" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Réserver mon essai
            </a>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '1px solid #93c5fd',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#2563eb'
            }}>
              Couples -15%
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2563eb'
              }}>
                OFFRE COUPLE
              </span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '1rem',
              color: '#374151',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <li>• -15% pour les couples</li>
              <li>• Valable sur tous les abonnements</li>
              <li>• Même niveau ou différents</li>
              <li>• Aucune condition</li>
            </ul>
            <a href="/contact" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              En savoir plus
            </a>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1px solid #fcd34d',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#d97706'
            }}>
              Étudiants -20%
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#d97706'
              }}>
                -20%
              </span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '1rem',
              color: '#374151',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <li>• Pour tous les étudiants</li>
              <li>• Valable sur présentation de carte</li>
              <li>• Sauf offres spéciales</li>
              <li>• Cumulable avec offre couple</li>
            </ul>
            <a href="/contact" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              En savoir plus
            </a>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1px solid #86efac',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#16a34a'
            }}>
              Parrainage
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#16a34a'
              }}>
                50€
              </span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '1rem',
              color: '#374151',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <li>• Parrainez un nouvel élève</li>
              <li>• 50€ de réduction pour vous</li>
              <li>• 25€ de réduction pour le filleul</li>
              <li>• Cumulable sans limite</li>
            </ul>
            <a href="/contact" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Parrainer
            </a>
          </div>
        </div>
      </div>

      {/* Conditions de paiement */}
      <div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#1f2937'
        }}>
          Conditions de Paiement
        </h2>
        <div className="card">
          <div className="card-body">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  Moyens de paiement
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Chèque bancaire
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Virement bancaire
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Carte bancaire (sur place)
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Espèces (sur place)
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  Modalités de règlement
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#10b981',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Paiement en 1 fois pour les abonnements mensuels
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#10b981',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Paiement en 3 fois possible pour l'abonnement annuel
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#10b981',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Acompte de 30% requis pour les stages
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#10b981',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Solde à régler avant le début du stage
                  </li>
                </ul>
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Conditions d'annulation
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
              }}>
                <div>
                  <h4 style={{
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#1f2937'
                  }}>
                    Stages
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <li>• Plus de 30 jours: remboursement à 100%</li>
                    <li>• 15 à 30 jours: remboursement à 80%</li>
                    <li>• 7 à 14 jours: remboursement à 50%</li>
                    <li>• Moins de 7 jours: non remboursable</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#1f2937'
                  }}>
                    Abonnements
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <li>• Résiliation 15 jours avant fin de mois</li>
                    <li>• Aucun remboursement en cours de mois</li>
                    <li>• Crédit possible pour absence justifiée</li>
                    <li>• Transfert d'abonnement possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}