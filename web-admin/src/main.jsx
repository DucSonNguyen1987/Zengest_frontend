// web-admin/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import App from './App.jsx';

// Styles
import 'bulma/css/bulma.min.css';
import './index.css';

// ========================================
// 🚀 INITIALISATION DE L'APPLICATION
// ========================================

console.log('🚀 Initialisation de l\'application Zengest Admin');
console.log('📦 Store Redux:', store ? '✅' : '❌');
console.log('💾 Persistor:', persistor ? '✅' : '❌');

// ========================================
// 🔧 CONFIGURATION DÉVELOPPEMENT
// ========================================

if (process.env.NODE_ENV === 'development') {
  // Exposer le store pour debug en développement
  window.__ZENGEST_STORE__ = store;
  
  // Logs de debug
  console.log('🔧 Mode développement activé');
  console.log('🌍 API URL:', import.meta.env.VITE_API_URL || 'http://localhost:3000/api');
  
  // Test de connectivité API
  const testApi = async () => {
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + '/health');
      if (response.ok) {
        console.log('✅ API accessible');
      } else {
        console.warn('⚠️ API non accessible:', response.status);
      }
    } catch (error) {
      console.warn('⚠️ Erreur connexion API:', error.message);
    }
  };
  
  testApi();
}

// ========================================
// 🎯 RENDU DE L'APPLICATION
// ========================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="hero is-fullheight">
            <div className="hero-body">
              <div className="container has-text-centered">
                <div className="loading-container">
                  <div className="spinner">
                    <div className="spinner__circle"></div>
                  </div>
                  <p className="mt-4">Chargement de l'application...</p>
                </div>
              </div>
            </div>
          </div>
        } 
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);