'use client';

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { strapiClient, Stage } from '../lib/strapi';
import { getImageUrl, getImageAlt, getImageDimensions, FALLBACK_IMAGES } from '../lib/image-utils';

async function getStages(): Promise<Stage[]> {
  try {
    const response = await strapiClient.getStages();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stages:', error);
    return [];
  }
}

export default function HomePage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getStages().then((data) => {
      setStages(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4); // 4 slides fixes
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previewStages = stages.slice(0, 3);

  const heroSlides = [
    {
      id: 1,
      title: "Rock",
      subtitle: "Découvrez l'énergie du rock'n'roll",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0icm9ja0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmY2YjZiO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VlNTY0ZjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSJ1cmwoI3JvY2tHcmFkaWVudCkiLz48ZyBvcGFjaXR5PSIwLjEiPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIwMCIgcj0iNjAiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iODAwIiBjeT0iNDAwIiByPSI4MCIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSIxMjAwIiBjeT0iMzAwIiByPSI1MCIgZmlsbD0id2hpdGUiLz48L2c+PHRleHQgeD0iMTAwIiB5PSI4MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Sb2NrPC90ZXh0Pjwvc3ZnPg==",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee564f 100%)"
    },
    {
      id: 2,
      title: "Salsa",
      subtitle: "Laissez-vous emporter par la salsa",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ic2Fsc2FHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2Y0NTUzZjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkMzM1MWY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCNzYWxzYUdyYWRpZW50KSIvPjxnIG9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMjUwIiByPSI3MCIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI3MDAiIGN5PSI0NTAiIHI9IjkwIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjExMDAiIGN5PSIzMDAiIHI9IjYwIiBmaWxsPSJ3aGl0ZSIvPjwvZz48dGV4dCB4PSIxMDAiIHk9IjgwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPVTGFsc2E8L3RleHQ+PC9zdmc+",
      gradient: "linear-gradient(135deg, #f4553f 0%, #d3351f 100%)"
    },
    {
      id: 3,
      title: "Tango",
      subtitle: "La passion du tango argentin",
      image: "data:image+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0idGFuZ29HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzMzMzZztzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCN0YW5nb0dyYWRpZW50KSIvPjxnIG9wYWNpdHk9IjAuMTUiPjxjaXJjbGUgY3g9IjM1MCIgY3k9IjMwMCIgcj0iNTAiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iOTYwIiBjeT0iNTAwIiByPSIxMDAiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iMTUwMCIgY3k9IjM1MCIgcj0iNjAiIGZpbGw9IndoaXRlIi8+PC9nPjx0ZXh0IHg9IjEwMDAiIHk9IjgwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRhbmdvPC90ZXh0Pjwvc3ZnPg==",
      gradient: "linear-gradient(135deg, #333333 0%, #000000 100%)"
    },
    {
      id: 4,
      title: "Valse",
      subtitle: "L'élégance de la valse viennoise",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0idmFsc2VHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2N2VlYTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCN2YWxzZUdyYWRpZW50KSIvPjxnIG9wYWNpdHk9IjAuMTIiPjxjaXJjbGUgY3g9IjQ1MCIgY3k9IjI1MCIgcj0iNjAiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iOTYwIiBjeT0iNDUwIiByPSI4MCIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSIxNDUwIiBjeT0iMjgwIiByPSI3MCIgZmlsbD0id2hpdGUiLz48L2c+PHRleHQgeD0iMTAwIiB5PSI4MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WYWxzZTwvdGV4dD48L3N2Zz4=",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const testimonials = [
    {
      text: "Jonathan est un professeur exceptionnel ! Sa pédagogie m'a permis de progresser rapidement. Je recommande vivement ses cours à tous ceux qui veulent découvrir la danse de salon.",
      author: "Marie-Pierre L., élève depuis 2 ans"
    },
    {
      text: "Les stages sont une véritable opportunité de progrès. L'ambiance y est fantastique et l'enseignement est de qualité.",
      author: "Thomas R., stage intensive"
    },
    {
      text: "Grâce à Jonathan, j'ai enfin pu dépasser ma timidité et maintenant je danse avec confiance !",
      author: "Claudine M., cours particuliers"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      {/* Hero Slider Section */}
      <div style={{
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}>
        <div style={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Image de fond du slider */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("${heroSlides[currentSlide].image}") center/cover`,
            zIndex: 1
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: heroSlides[currentSlide].gradient,
              opacity: 0.7
            }}></div>
          </div>
          
          {/* Contenu du slider */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '800px',
            padding: '2rem',
            color: 'white'
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.1'
            }}>
              {heroSlides[currentSlide].title}<br />
              <span style={{ color: '#fbbf24', fontWeight: '300' }}>{heroSlides[currentSlide].subtitle}</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              marginBottom: '2.5rem',
              lineHeight: '1.6',
              opacity: '0.95'
            }}>
              Stages intensifs et cours hebdomadaires avec Jonathan Schlienger,<br />
              moniteur diplômé dans les plus beaux villages de vacances de France.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="/stages" style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                background: 'white',
                color: '#667eea'
              }}>
                Voir les stages
              </a>
              <a href="/contact" style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                color: 'white'
              }}>
                Nous contacter
              </a>
            </div>
          </div>
          
          {/* Flèches de navigation */}
          <button 
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 3,
              fontSize: '1.5rem',
              color: 'white'
            }}
          >
            ‹
          </button>
          <button 
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 3,
              fontSize: '1.5rem',
              color: 'white'
            }}
          >
            ›
          </button>
          
          {/* Navigation dots du slider */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.75rem',
            zIndex: 3
          }}>
            {heroSlides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: index === currentSlide ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Stages Preview Moderne */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1f2937',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Stages à venir
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Découvrez nos prochains stages de danse de salon dans les plus beaux villages de vacances de France
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {!loading && previewStages.length > 0 ? (
               previewStages.map((stage) => (
                <div key={stage.id} style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }}>
                   <div style={{
                     height: '200px',
                     position: 'relative',
                     overflow: 'hidden'
                   }}>
                     {getImageUrl(stage.image) ? (
                        <Image
                          src={getImageUrl(stage.image)!}
                          alt={getImageAlt(stage.image, `Stage ${stage.title}`)}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={FALLBACK_IMAGES.stage.url}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            fontSize: '4rem',
                            opacity: '0.8'
                          }}>
                            {stage.level === 'debutant' ? '🌟' :
                             stage.level === 'intermediaire' ? '⭐' :
                             stage.level === 'avance' ? '💫' : '🎭'}
                          </div>
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        right: '1rem',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#667eea'
                      }}>
                        {stage.level === 'debutant' ? 'Débutant' :
                         stage.level === 'intermediaire' ? 'Intermédiaire' :
                         stage.level === 'avance' ? 'Avancé' : 'Tous niveaux'}
                      </div>
                   </div>
                  <div style={{ padding: '2rem' }}>
                     <h3 style={{
                       fontSize: '1.25rem',
                       fontWeight: '600',
                       marginBottom: '0.5rem',
                       color: '#1f2937'
                     }}>
                         {stage.title || 'Stage de danse'}
                     </h3>
                     <p style={{
                       color: '#6b7280',
                       marginBottom: '1rem',
                       lineHeight: '1.5',
                       fontSize: '0.9rem'
                     }}>
                         {stage.description?.substring(0, 100) || 'Stage de danse de salon dans un village de vacances'}...
                     </p>
                     <div style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       alignItems: 'center',
                       marginBottom: '1.5rem'
                     }}>
                       <div style={{
                         fontSize: '0.9rem',
                         color: '#6b7280'
                       }}>
                           📅 {stage.dateStart ? new Date(stage.dateStart).toLocaleDateString('fr-FR') : 'Date à confirmer'}
                       </div>
                       <div style={{
                         fontSize: '1.5rem',
                         fontWeight: '700',
                         color: '#059669'
                       }}>
                           {stage.price || 'Prix sur demande'}€
                       </div>
                     </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <a href="/stages" style={{
                        flex: 1,
                        padding: '0.75rem',
                        textAlign: 'center',
                        background: '#f3f4f6',
                        color: '#374151',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}>
                        Détails
                      </a>
                       <a href={`/inscription?stage=${stage.id || ''}`} style={{
                        flex: 1,
                        padding: '0.75rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}>
                        S'inscrire
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Données mockées avec design moderne */}
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}>
                    <div style={{
                      height: '200px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '3rem',
                        opacity: '0.8'
                      }}>
                        💃
                      </div>
                    </div>
                    <div style={{ padding: '2rem' }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: '#1f2937'
                      }}>
                        Stage en Vallée de Maurienne
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '1rem',
                        lineHeight: '1.5',
                        fontSize: '0.9rem'
                      }}>
                        Découvrez la danse de salon dans un cadre exceptionnel avec Jonathan Schlienger...
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#6b7280'
                        }}>
                          📅 Mars 2024
                        </div>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#059669'
                        }}>
                          580€
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <a href="/stages" style={{
                          flex: 1,
                          padding: '0.75rem',
                          textAlign: 'center',
                          background: '#f3f4f6',
                          color: '#374151',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontWeight: '500',
                          fontSize: '0.9rem'
                        }}>
                          Détails
                        </a>
                        <a href="/contact" style={{
                          flex: 1,
                          padding: '0.75rem',
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/stages" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1.1rem',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}>
              Voir tous les stages
            </a>
          </div>
        </div>
      </div>

       {/* Slider Témoignages Jonathan */}
       <div className="py-20 bg-white">
         <div className="container">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 style={{
                 fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                 fontWeight: '700',
                 marginBottom: '1.5rem',
                 color: '#1f2937',
                 fontFamily: 'system-ui, -apple-system, sans-serif'
               }}>
                 Ce que disent nos danseurs
               </h2>
               
               {/* Slider de témoignages */}
               <div style={{
                 position: 'relative',
                 borderRadius: '16px',
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 padding: '2rem',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
               }}>
                 {/* Navigation dots */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: index === currentTestimonial 
                            ? 'rgba(255,255,255,0.9)' 
                            : `rgba(255,255,255,${0.7 - index * 0.2})`,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => setCurrentTestimonial(index)}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Témoignage principal */}
                  <div style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    color: 'white',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    padding: '0 2rem',
                    transition: 'opacity 0.3s ease'
                  }}>
                    "{testimonials[currentTestimonial].text}"
                    <div style={{
                      marginTop: '1rem',
                      fontWeight: '600',
                      fontStyle: 'normal'
                    }}>
                      — {testimonials[currentTestimonial].author}
                    </div>
                  </div>
                  
                  {/* Flèches de navigation */}
                  <button 
                    onClick={prevTestimonial}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>‹</span>
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>›</span>
                  </button>
                </div>
             </div>
             
           </div>
        </div>
       </div>

       {/* Espace entre sections */}
       <div style={{ height: '4rem' }}></div>

       {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Prêt(e) à danser ?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Rejoignez-nous pour découvrir la joie de la danse. Des stages et cours qui vous transformeront.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/inscription" style={{
              padding: '1rem 2rem',
              background: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              S'inscrire à un stage
            </a>
            <a href="/contact" style={{
              padding: '1rem 2rem',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}