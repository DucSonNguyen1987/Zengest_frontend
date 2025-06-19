// web-admin/src/pages/Dashboard/Dashboard.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '@/store/slices/authSlice';

// ========================================
// 📊 PAGE DASHBOARD (VERSION TEST)
// ========================================

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    console.log('📊 Dashboard monté pour:', currentUser?.email);
  }, [currentUser]);

  if (!isAuthenticated) {
    return (
      <div className="notification is-warning">
        <h4 className="title is-4">⚠️ Non authentifié</h4>
        <p>Vous n'êtes pas connecté.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* En-tête de bienvenue */}
      <div className="hero is-success is-small">
        <div className="hero-body">
          <h1 className="title">
            🎉 Bienvenue, {currentUser?.firstName}!
          </h1>
          <p className="subtitle">
            Interface d'administration Zengest
          </p>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="columns mt-5">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <span className="icon is-large">
                    <i className="fas fa-users fa-2x"></i>
                  </span>
                </div>
                <div className="media-content">
                  <p className="title is-4">25</p>
                  <p className="subtitle is-6">Utilisateurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <span className="icon is-large">
                    <i className="fas fa-shopping-cart fa-2x"></i>
                  </span>
                </div>
                <div className="media-content">
                  <p className="title is-4">142</p>
                  <p className="subtitle is-6">Commandes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <span className="icon is-large">
                    <i className="fas fa-utensils fa-2x"></i>
                  </span>
                </div>
                <div className="media-content">
                  <p className="title is-4">38</p>
                  <p className="subtitle is-6">Plats du menu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <span className="icon is-large">
                    <i className="fas fa-calendar fa-2x"></i>
                  </span>
                </div>
                <div className="media-content">
                  <p className="title is-4">12</p>
                  <p className="subtitle is-6">Réservations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section activité récente */}
      <div className="columns">
        <div className="column is-half">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                📈 Activité récente
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker is-success"></div>
                    <div className="timeline-content">
                      <p className="heading">Il y a 5 minutes</p>
                      <p>Nouvelle commande #1234 reçue</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker is-info"></div>
                    <div className="timeline-content">
                      <p className="heading">Il y a 15 minutes</p>
                      <p>Utilisateur Sophie Bernard connecté</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker is-warning"></div>
                    <div className="timeline-content">
                      <p className="heading">Il y a 1 heure</p>
                      <p>Menu mis à jour: nouveau plat ajouté</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                🎯 Actions rapides
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                <div className="buttons">
                  <button className="button is-primary is-fullwidth mb-3">
                    <span className="icon">
                      <i className="fas fa-plus"></i>
                    </span>
                    <span>Nouvelle commande</span>
                  </button>
                  <button className="button is-info is-fullwidth mb-3">
                    <span className="icon">
                      <i className="fas fa-utensils"></i>
                    </span>
                    <span>Ajouter un plat</span>
                  </button>
                  <button className="button is-success is-fullwidth mb-3">
                    <span className="icon">
                      <i className="fas fa-user-plus"></i>
                    </span>
                    <span>Nouvel utilisateur</span>
                  </button>
                  <button className="button is-warning is-fullwidth">
                    <span className="icon">
                      <i className="fas fa-calendar-plus"></i>
                    </span>
                    <span>Nouvelle réservation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations de debug */}
      <div className="notification is-light mt-5">
        <h5 className="title is-5">🔧 Informations de debug</h5>
        <div className="content">
          <ul>
            <li><strong>Authentification:</strong> ✅ Fonctionnelle</li>
            <li><strong>Interface:</strong> ✅ Affichée</li>
            <li><strong>Redux:</strong> ✅ Connecté</li>
            <li><strong>Routing:</strong> ✅ Opérationnel</li>
          </ul>
          <p>
            <em>Si vous voyez cette page, l'authentification et le routing fonctionnent correctement!</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;