import api from './api'

/**
 * Service pour gérer les plats du jour
 */
export const dailySpecialsService = {
  /**
   * Récupérer les plats du jour du restaurant
   * @param {string} restaurantId - ID du restaurant (optionnel pour site vitrine)
   * @returns {Promise<Array>} Liste des plats du jour
   */
  async getDailySpecials(restaurantId = null) {
    try {
      const endpoint = restaurantId 
        ? `/daily-specials/restaurant/${restaurantId}`
        : '/daily-specials/public'
      
      const response = await api.get(endpoint)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des plats du jour:', error)
      throw error
    }
  },

  /**
   * Récupérer les plats du jour pour une date spécifique
   * @param {string} date - Date au format YYYY-MM-DD
   * @param {string} restaurantId - ID du restaurant
   * @returns {Promise<Array>} Plats du jour pour la date
   */
  async getDailySpecialsByDate(date, restaurantId = null) {
    try {
      const params = { date }
      if (restaurantId) params.restaurantId = restaurantId
      
      const response = await api.get('/daily-specials', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des plats du jour par date:', error)
      throw error
    }
  },

  /**
   * Récupérer les plats du jour de la semaine
   * @param {string} restaurantId - ID du restaurant
   * @returns {Promise<Array>} Plats du jour de la semaine
   */
  async getWeeklySpecials(restaurantId = null) {
    try {
      const endpoint = restaurantId
        ? `/daily-specials/restaurant/${restaurantId}`
        : '/public/daily-specials' 
      
      const response = await api.get(endpoint)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des plats de la semaine:', error)
      throw error
    }
  },

   async getDailySpecialsByDate(date, restaurantId = null) {
    try {
      const params = { date }
      if (restaurantId) params.restaurantId = restaurantId
      
      // ✅ Correct endpoint
      const response = await api.get('/public/daily-specials', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des plats du jour par date:', error)
      throw error
    }
  },

  async getWeeklySpecials(restaurantId = null) {
    try {
      // ✅ Correct endpoint
      const endpoint = restaurantId
        ? `/daily-specials/week/restaurant/${restaurantId}`
        : '/public/daily-specials/weekly'  
      
      const response = await api.get(endpoint)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des plats de la semaine:', error)
      throw error
    }
  }
};

export default dailySpecialsService