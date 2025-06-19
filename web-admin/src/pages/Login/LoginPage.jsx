import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Seulement les imports essentiels pour éviter les erreurs
import { 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectAuthError 
} from '../../store/slices/authSlice'; // Sélecteurs Redux pour l'authentification

import '../../styles/pages/LoginPage.scss'; // Importer le CSS pour la page de connexion  

// ========================================
// 🔐 LOGIN PAGE SIMPLIFIÉE (DEBUG)
// ========================================

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // États locaux simples
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // États Redux avec protection d'erreurs
  let isAuthenticated = false;
  let authLoading = false;
  let authError = null;
  
  try {
    isAuthenticated = useSelector(selectIsAuthenticated) || false;
    authLoading = useSelector(selectAuthLoading) || false;
    authError = useSelector(selectAuthError) || null;
  } catch (selectorError) {
    console.error('🚨 Erreur dans les sélecteurs Redux:', selectorError);
    // Utiliser les valeurs par défaut en cas d'erreur
  }
  
  // ========================================
  // 🔄 EFFETS AVEC PROTECTION
  // ========================================
  
  useEffect(() => {
    console.log('🔍 LoginPage montée - État auth:', { isAuthenticated, authLoading, authError });
    
    // Redirection si déjà connecté
    if (isAuthenticated) {
      console.log('✅ Utilisateur déjà connecté, redirection...');
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email et mot de passe requis');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('🔐 Tentative de connexion directe avec fetch...');
      
      // Connexion directe sans Redux pour éviter les erreurs
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('📡 Réponse API:', data);

      if (response.ok && data.success) {
        // Sauvegarder le token
        localStorage.setItem('zengest_admin_token', data.data.token);
        localStorage.setItem('zengest_admin_user', JSON.stringify(data.data.user));
        
        console.log('✅ Connexion réussie, redirection...');
        navigate('/', { replace: true });
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch (fetchError) {
      console.error('❌ Erreur de connexion:', fetchError);
      setError('Impossible de se connecter au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // ========================================
  // 🎨 RENDU SIMPLIFIÉ
  // ========================================
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '24px'
        }}>
          🔐 Zengest Admin
        </h1>
        
        <p style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#666',
          fontSize: '14px'
        }}>
          Mode Debug - Connexion simplifiée
        </p>
        
        {/* Affichage des états Redux pour debug */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <div>🔍 Debug Redux:</div>
          <div>• Authentifié: {isAuthenticated ? '✅' : '❌'}</div>
          <div>• Chargement: {authLoading ? '⏳' : '✅'}</div>
          <div>• Erreur: {authError || 'Aucune'}</div>
        </div>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Affichage des erreurs */}
          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #fcc'
            }}>
              ❌ {error}
            </div>
          )}
          
          {/* Champ Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@zengest.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          
          {/* Champ Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin123!"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          
          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isSubmitting ? '#ccc' : '#eb2f06',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {isSubmitting ? '⏳ Connexion...' : '🔐 Se connecter'}
          </button>
        </form>
        
        {/* Aide */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            💡 Identifiants de test :
          </div>
          <div>📧 Email: admin@zengest.com</div>
          <div>🔑 Mot de passe: Admin123!</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;