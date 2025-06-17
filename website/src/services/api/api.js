import axios from 'axios'
import toast from 'react-hot-toast'
import publicApi from './publicApi' // ← Changer l'import


// Configuration de base Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ne pas ajouter de token pour les réservations publiques
    if (!config.url.includes('/reservations')) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Gestion centralisée des erreurs
    const message = error.response?.data?.message || 'Une erreur est survenue'
    
    if (error.response?.status === 401) {
      // Non autorisé - rediriger vers login si nécessaire
      localStorage.removeItem('token')
    } else if (error.response?.status === 404) {
      // Ressource non trouvée
      console.warn('Ressource non trouvée:', error.config.url)
    } else if (error.response?.status >= 500) {
      // Erreur serveur
      toast.error('Erreur serveur. Veuillez réessayer plus tard.')
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      toast.error('La requête a pris trop de temps. Vérifiez votre connexion.')
    } else if (!error.response) {
      // Pas de réponse (serveur offline)
      console.warn('API Backend non disponible')
    }
    
    return Promise.reject(error)
  }
)

export default api