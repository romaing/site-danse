import StripeProvider from '../components/StripeProvider';

import ClientLayout from '../components/ClientLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Danse normandie - École de Danse de Salon</title>
        <meta name="description" content="École de danse de salon pour tous niveaux. Découvrez nos stages et cours dans une ambiance conviviale." />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Reset CSS */
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            body { line-height: 1.6; color: #333; }

            /* Layout */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .nav { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 50; }
            .nav-content { display: flex; align-items: center; justify-content: space-between; padding: 1rem; }
            .logo { display: flex; align-items: center; gap: 0.5rem; }
            .logo-circle { width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.25rem; }
            .brand { font-size: 1.25rem; font-weight: bold; color: #111827; }
            main { padding-top: 80px; }
            footer { background: #111827; color: #9ca3af; padding: 3rem 0; margin-top: 4rem; }

            /* Typography */
            h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
            h2 { font-size: 2rem; font-weight: 600; margin-bottom: 1rem; }
            h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; }
            p { margin-bottom: 1rem; }

            /* Buttons */
            .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.2s; cursor: pointer; border: none; }
            .btn-primary { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; }
            .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3); }
            .btn-secondary { background: transparent; color: #2563eb; border: 2px solid #2563eb; }
            .btn-secondary:hover { background: #2563eb; color: white; }

            /* Cards */
            .card { background: white; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 2rem; }
            .card-header { height: 200px; background: linear-gradient(135deg, #2563eb, #7c3aed); }
            .card-body { padding: 1.5rem; }
            .card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #111827; }
            .card-text { color: #6b7280; margin-bottom: 1rem; }

            /* Layout utilities */
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .gap-4 { gap: 1rem; }
            .gap-6 { gap: 1.5rem; }
            .text-center { text-align: center; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .py-12 { padding: 3rem 0; }
            .py-16 { padding: 4rem 0; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }

            /* Grid */
            .grid { display: grid; gap: 2rem; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

            /* Colors */
            .text-white { color: white; }
            .text-gray-600 { color: #6b7280; }
            .text-gray-900 { color: #111827; }
            .bg-white { background: white; }
            .bg-gray-50 { background: #f9fafb; }

            /* Footer button hover effect */
            .footer-contact-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6) !important;
            }

            /* Responsive */
            @media (min-width: 768px) {
              .md\\:text-4xl { font-size: 2.25rem; }
              .md\\:text-6xl { font-size: 3.75rem; }
              .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
          `
        }} />
      </head>
      <body>
        <ClientLayout>
          <nav className="nav">
            <div className="container nav-content">
              <div className="logo">
                <div className="logo-circle">DN</div>
                <span className="brand">Danse normandie</span>
              </div>
              <div className="flex gap-4">
                <a href="/" className="btn btn-secondary">Accueil</a>
                <a href="/stages" className="btn btn-secondary">Stages</a>
                <a href="/cours" className="btn btn-secondary">Cours</a>
                <a href="/contact" className="btn btn-secondary">Contact</a>
                <a href="/inscription" className="btn btn-primary">S'inscrire</a>
              </div>
            </div>
          </nav>
          <main>
            {children}
          </main>
        </ClientLayout>
        <footer>
          <div className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem', alignItems: 'start' }}>
              
              {/* Colonne 1 - À propos */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Danse normandie</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  École de danse de salon pour tous niveaux. Découvrez la joie de danser dans une ambiance conviviale et bienveillante.
                </p>

                {/* Contact & Infos */}
                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: '600' }}>Contact & Infos</h4>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#667eea' }}>📧</span>
                    <span style={{ color: '#9ca3af' }}>contact@danse-normandie.fr</span>
                  </div>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#667eea' }}>📱</span>
                    <span style={{ color: '#9ca3af' }}>06 12 34 56 78</span>
                  </div>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#667eea' }}>📍</span>
                    <span style={{ color: '#9ca3af' }}>Vallée de la Maurienne</span>
                  </div>
                </div>
              </div>

              {/* Colonne 2 - Liens rapides */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Liens rapides</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <a href="/" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      Accueil
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <a href="/stages" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      Stages de danse
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <a href="/cours" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      Cours hebdomadaires
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <a href="/inscription" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      S'inscrire
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <a href="/contact" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

               {/* Colonne 3 - Bouton contact */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Horaires</h3>
                     <ul style={{ listStyle: 'none', padding: 0 }}>
                       <li style={{ marginBottom: '0.75rem' }}>
                         <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Lundi - Vendredi: 9h-19h</span>
                       </li>
                       <li style={{ marginBottom: '0.75rem' }}>
                         <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Samedi: 10h-18h</span>
                       </li>
                       <li style={{ marginBottom: '0.75rem' }}>
                         <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Dimanche: Fermé</span>
                       </li>
                     </ul>

                   <div style={{ marginTop: 'auto' }}>
                     <a
                       href="/contact"
                       className="footer-contact-btn"
                       style={{
                         display: 'inline-block',
                         padding: '0.75rem 1.5rem',
                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                         color: 'white',
                         textDecoration: 'none',
                         borderRadius: '0.5rem',
                         fontSize: '0.9rem',
                         fontWeight: '600',
                         transition: 'all 0.3s ease',
                         boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                         textAlign: 'center'
                       }}
                     >
                       Nous contacter
                     </a>
                   </div>
                 </div>
                
            </div>

            {/* Ligne de séparation */}
            <div style={{ 
              height: '1px', 
              background: 'rgba(255,255,255,0.1)', 
              margin: '2rem 0' 
            }}></div>

            {/* Copyright */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <p style={{ color: '#9ca3af', margin: 0 }}>
                © 2025 Danse normandie. Tous droits réservés.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="/pages/mentions-legales" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                  Mentions légales
                </a>
                <a href="/pages/politique-confidentialite" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                  Politique de confidentialité
                </a>
                <a href="/pages/cgv" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                  CGV
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}