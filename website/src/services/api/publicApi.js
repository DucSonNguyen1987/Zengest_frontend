import axios from 'axios'

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_PUBLIC_API_TOKEN || 'PUBLIC_RESERVATIONS_TOKEN_2025'}`
  },
})


// Intercepteur simple
publicApi.interceptors.response.use(
  (response) => {
    console.log('✅ Réponse API publique:', response.data);
    return response;
  },
  (error) => {
    console.warn('❌ Erreur API publique:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default publicApi