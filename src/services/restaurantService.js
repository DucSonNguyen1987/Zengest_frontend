// services/restaurantService.js
import api from './api'

export const restaurantService = {
  /**
   * Obtenir les informations du restaurant
   * @returns {Promise<Object>} Informations complètes du restaurant
   */
  async getRestaurantInfo() {
    try {
      const response = await api.get('/restaurant/info')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des infos restaurant:', error)
      throw error
    }
  },

  /**
   * Obtenir les horaires d'ouverture
   * @returns {Promise<Object>} Horaires par jour de la semaine
   */
  async getOpeningHours() {
    try {
      const response = await api.get('/restaurant/hours')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires:', error)
      throw error
    }
  },

  /**
   * Vérifier si le restaurant est ouvert
   * @param {Date} datetime - Date et heure à vérifier
   * @returns {Promise<Boolean>} True si ouvert
   */
  async isOpen(datetime = new Date()) {
    try {
      const params = { datetime: datetime.toISOString() }
      const response = await api.get('/restaurant/is-open', { params })
      return response.data.isOpen
    } catch (error) {
      console.error('Erreur lors de la vérification d\'ouverture:', error)
      return false
    }
  }
}

export default restaurantService