import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">404</h1>
            <h2 className="subtitle is-3">Page non trouvée</h2>
            <p className="mb-5">La page que vous recherchez n'existe pas.</p>
            <Link to="/dashboard" className="button is-primary">
              <span className="icon">
                <HomeIcon className="h-5 w-5" />
              </span>
              <span>Retour au Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;