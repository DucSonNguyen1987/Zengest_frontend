import apiClient from './client';

/**
 * Service API pour l'authentification
 */
export const authService = {
  /**
   * Connexion utilisateur
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { data } = response.data;
      
      // Stocker le token
      if (data.token) {
        const storage = credentials.remember ? localStorage : sessionStorage;
        storage.setItem('zengest_admin_token', data.token);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur de connexion');
    }
  },
  
  /**
   * Déconnexion utilisateur
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.warn('Erreur lors de la déconnexion côté serveur:', error);
    } finally {
      // Nettoyer le token local dans tous les cas
      localStorage.removeItem('zengest_admin_token');
      sessionStorage.removeItem('zengest_admin_token');
    }
  },
  
  /**
   * Vérifier le token actuel
   */
  async verifyToken() {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Token invalide');
    }
  },
  
  /**
   * Rafraîchir le token
   */
  async refreshToken() {
    try {
      const response = await apiClient.post('/auth/refresh');
      const { data } = response.data;
      
      if (data.token) {
        // Déterminer le storage à utiliser
        const hasLocalToken = localStorage.getItem('zengest_admin_token');
        const storage = hasLocalToken ? localStorage : sessionStorage;
        storage.setItem('zengest_admin_token', data.token);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors du rafraîchissement du token');
    }
  },
  
  /**
   * Récupérer les informations du profil utilisateur
   */
  async getProfile() {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération du profil');
    }
  },
  
  /**
   * Mettre à jour le profil utilisateur
   */
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la mise à jour du profil');
    }
  },
  
  /**
   * Changer le mot de passe
   */
  async changePassword(passwordData) {
    try {
      const response = await apiClient.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors du changement de mot de passe');
    }
  }
};