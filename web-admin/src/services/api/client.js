import axios from 'axios';

// Configuration de base - IMPORTANT: pointer vers le port 3000 (backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                    import.meta.env.VITE_API_BASE_URL || 
                    'http://localhost:3000/api';

console.log('🌐 Configuration API URL:', API_BASE_URL);

// Créer l'instance Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes - ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage ou sessionStorage
    const token = localStorage.getItem('zengest_admin_token') || 
                 sessionStorage.getItem('zengest_admin_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log des requêtes en développement
    if (import.meta.env.MODE === 'development') {
      console.log(`🌐 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data || config.params);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Erreur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses - gestion des erreurs
apiClient.interceptors.response.use(
  (response) => {
    // Log des réponses en développement
    if (import.meta.env.MODE === 'development') {
      console.log(`✅ ${response.status} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    // Gestion centralisée des erreurs
    if (error.response) {
      const { status, data } = error.response;
      
      // Log de l'erreur
      console.error(`❌ ${status} ${error.config?.url}:`, data?.message || error.message);
      
      // Gestion des erreurs spécifiques
      switch (status) {
        case 401:
          console.warn('🔒 Token expiré ou invalide - nettoyage...');
          // Token expiré ou invalide - redirection vers login
          localStorage.removeItem('zengest_admin_token');
          localStorage.removeItem('zengest_admin_user');
          sessionStorage.removeItem('zengest_admin_token');
          sessionStorage.removeItem('zengest_admin_user');
          
          // Éviter la redirection infinie sur la page de login
          if (!window.location.pathname.includes('/login')) {
            console.log('🔄 Redirection vers login...');
            window.location.href = '/login';
          }
          break;
          
        case 403:
          console.error('🚫 Accès refusé - permissions insuffisantes');
          break;
          
        case 404:
          console.error('🔍 Ressource non trouvée');
          break;
          
        case 422:
          console.error('📝 Erreur de validation:', data?.errors || data?.message);
          break;
          
        case 500:
          console.error('⚠️ Erreur serveur interne');
          break;
          
        default:
          console.error(`❌ Erreur ${status}:`, data?.message || error.message);
      }
      
      // Retourner une erreur formatée
      const formattedError = new Error(data?.message || `Erreur ${status}`);
      formattedError.status = status;
      formattedError.data = data;
      throw formattedError;
    } else if (error.request) {
      // Erreur réseau - serveur non disponible
      console.error('🌐 Erreur réseau - Serveur indisponible à:', API_BASE_URL);
      console.error('💡 Vérifiez que le backend tourne sur le port 3000');
      throw new Error('Impossible de contacter le serveur. Vérifiez que le backend est démarré sur le port 3000.');
    } else {
      // Autre erreur
      console.error('❌ Erreur inattendue:', error.message);
      throw error;
    }
  }
);

export default apiClient;