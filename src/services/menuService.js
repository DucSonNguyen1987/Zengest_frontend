import api from './api'

export const menuService = {
  /**
   * Récupérer le menu complet
   * @param {string} restaurantId - ID du restaurant
   * @returns {Promise<Object>} Menu complet avec catégories
   */
  async getFullMenu(restaurantId = null) {
    try {
      const endpoint = restaurantId 
        ? `/menu/restaurant/${restaurantId}`
        : '/menu/public'
      
      const response = await api.get(endpoint)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération du menu:', error)
      throw error
    }
  },

  /**
   * Récupérer une catégorie spécifique du menu
   * @param {string} categoryId - ID de la catégorie
   * @returns {Promise<Object>} Catégorie avec ses plats
   */
  async getMenuCategory(categoryId) {
    try {
      const response = await api.get(`/menu/category/${categoryId}`)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error)
      throw error
    }
  },

  /**
   * Rechercher des plats dans le menu
   * @param {string} query - Terme de recherche
   * @param {Object} filters - Filtres (allergènes, prix, etc.)
   * @returns {Promise<Array>} Plats correspondants
   */
  async searchMenu(query, filters = {}) {
    try {
      const params = { query, ...filters }
      const response = await api.get('/menu/search', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la recherche dans le menu:', error)
      throw error
    }
  }
}