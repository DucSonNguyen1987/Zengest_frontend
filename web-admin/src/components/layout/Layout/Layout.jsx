// web-admin/src/components/layout/Layout/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '@/store/slices/authSlice';

// ========================================
// 🏗️ LAYOUT PRINCIPAL (VERSION DEBUG)
// ========================================

const Layout = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  console.log('🏗️ Layout rendu pour:', {
    path: location.pathname,
    user: currentUser?.email,
    authenticated: isAuthenticated
  });

  return (
    <div className="layout-container">
      {/* Header simple */}
      <header className="hero is-primary is-small">
        <div className="hero-body">
          <div className="container">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title is-4">
                    🍽️ Zengest Admin
                  </h1>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                      <button className="button is-primary is-inverted">
                        <span>👤 {currentUser?.firstName || 'Utilisateur'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation simple */}
      <nav className="navbar is-light">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <a href="/dashboard" className="navbar-item">
                📊 Dashboard
              </a>
              <a href="/menu" className="navbar-item">
                🍽️ Menu
              </a>
              <a href="/orders" className="navbar-item">
                📋 Commandes
              </a>
              <a href="/users" className="navbar-item">
                👥 Utilisateurs
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              {/* Debug info */}
              <div className="notification is-info is-light mb-4">
                <h5 className="title is-6">🔍 Debug Info</h5>
                <p><strong>Utilisateur:</strong> {currentUser?.email}</p>
                <p><strong>Rôle:</strong> {currentUser?.role}</p>
                <p><strong>Page:</strong> {location.pathname}</p>
                <p><strong>Authentifié:</strong> {isAuthenticated ? '✅' : '❌'}</p>
              </div>
              
              {/* Contenu de la page */}
              <div className="box">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Zengest Admin</strong> - Interface d'administration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;