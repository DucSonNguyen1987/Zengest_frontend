import apiClient from './client';

/**
 * Service API pour la gestion du menu
 */
export const menuService = {
  // ========================================
  // 📋 ITEMS DE MENU
  // ========================================
  
  /**
   * Récupérer tous les items du menu avec pagination et filtres
   */
  async getMenuItems(params = {}) {
    try {
      const response = await apiClient.get('/menu', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération des articles du menu');
    }
  },
  
  /**
   * Récupérer un item de menu par ID
   */
  async getMenuItemById(id) {
    try {
      const response = await apiClient.get(`/menu/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération de l\'article');
    }
  },
  
  /**
   * Créer un nouvel item de menu
   */
  async createMenuItem(itemData) {
    try {
      const response = await apiClient.post('/menu', itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la création de l\'article');
    }
  },
  
  /**
   * Mettre à jour un item de menu
   */
  async updateMenuItem(id, itemData) {
    try {
      const response = await apiClient.put(`/menu/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la modification de l\'article');
    }
  },
  
  /**
   * Supprimer un item de menu
   */
  async deleteMenuItem(id) {
    try {
      const response = await apiClient.delete(`/menu/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la suppression de l\'article');
    }
  },
  
  /**
   * Modifier la disponibilité d'un item
   */
  async toggleMenuItemAvailability(id, isAvailable) {
    try {
      const response = await apiClient.patch(`/menu/${id}/availability`, { 
        isAvailable 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors du changement de disponibilité');
    }
  },
  
  // ========================================
  // 🗂️ CATÉGORIES
  // ========================================
  
  /**
   * Récupérer toutes les catégories
   */
  async getCategories() {
    try {
      const response = await apiClient.get('/menu/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération des catégories');
    }
  },
  
  /**
   * Créer une nouvelle catégorie
   */
  async createCategory(categoryData) {
    try {
      const response = await apiClient.post('/menu/categories', categoryData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la création de la catégorie');
    }
  },
  
  /**
   * Mettre à jour une catégorie
   */
  async updateCategory(id, categoryData) {
    try {
      const response = await apiClient.put(`/menu/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la modification de la catégorie');
    }
  },
  
  /**
   * Supprimer une catégorie
   */
  async deleteCategory(id) {
    try {
      const response = await apiClient.delete(`/menu/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la suppression de la catégorie');
    }
  },
  
  // ========================================
  // 🔥 PLATS DU JOUR
  // ========================================
  
  /**
   * Récupérer les plats du jour avec filtres
   */
  async getDailySpecials(params = {}) {
    try {
      const response = await apiClient.get('/menu/daily-specials', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération des plats du jour');
    }
  },
  
  /**
   * Créer un nouveau plat du jour
   */
  async createDailySpecial(specialData) {
    try {
      const response = await apiClient.post('/menu/daily-specials', specialData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la création du plat du jour');
    }
  },
  
  /**
   * Approuver un plat du jour
   */
  async approveDailySpecial(id) {
    try {
      const response = await apiClient.patch(`/menu/daily-specials/${id}/approve`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de l\'approbation du plat du jour');
    }
  },
  
  /**
   * Rejeter un plat du jour
   */
  async rejectDailySpecial(id, reason = '') {
    try {
      const response = await apiClient.patch(`/menu/daily-specials/${id}/reject`, { 
        reason 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors du rejet du plat du jour');
    }
  },
  
  // ========================================
  // 📊 ANALYTICS MENU
  // ========================================
  
  /**
   * Récupérer les statistiques du menu
   */
  async getMenuAnalytics(params = {}) {
    try {
      const response = await apiClient.get('/menu/analytics', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération des analytics');
    }
  },
  
  /**
   * Récupérer les articles les plus populaires
   */
  async getPopularItems(limit = 10) {
    try {
      const response = await apiClient.get(`/menu/analytics/popular?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération des articles populaires');
    }
  },
  
  // ========================================
  // 🖼️ UPLOAD D'IMAGES
  // ========================================
  
  /**
   * Upload d'image pour un item de menu
   */
  async uploadMenuItemImage(file, itemId = null) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      if (itemId) {
        formData.append('itemId', itemId);
      }
      
      const response = await apiClient.post('/menu/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de l\'upload de l\'image');
    }
  }
};