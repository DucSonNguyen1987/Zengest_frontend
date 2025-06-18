// web-admin/src/components/layout/Footer/Footer.jsx
import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';

// ========================================
// 🦶 COMPOSANT FOOTER
// ========================================

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer py-4 mt-6">
      <div className="content has-text-centered">
        <div className="columns is-vcentered">
          <div className="column">
            <p className="is-size-7 has-text-grey">
              © {currentYear} <strong>Zengest</strong> - Système de gestion de restaurant
            </p>
          </div>
          
          <div className="column is-narrow">
            <div className="is-flex is-align-items-center is-justify-content-center">
              <span className="is-size-7 has-text-grey mr-2">
                Développé avec
              </span>
              <HeartIcon className="h-4 w-4 has-text-danger" />
              <span className="is-size-7 has-text-grey ml-2">
                pour les restaurateurs
              </span>
            </div>
          </div>
          
          <div className="column is-narrow">
            <div className="buttons is-small">
              <a 
                href="https://docs.zengest.com" 
                className="button is-ghost is-small"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
              <a 
                href="mailto:support@zengest.com" 
                className="button is-ghost is-small"
              >
                Support
              </a>
            </div>
          </div>
        </div>
        
        {/* Version et statut système (en mode développement) */}
        {import.meta.env.MODE === 'development' && (
          <div className="mt-2">
            <span className="tag is-light is-small">
              v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
            </span>
            <span className="tag is-success is-small ml-2">
              Mode développement
            </span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;