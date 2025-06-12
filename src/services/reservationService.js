import api from './api'

export const reservationService = {
  /**
   * Créer une nouvelle réservation
   * @param {Object} reservationData - Données de réservation
   * @returns {Promise<Object>} Confirmation de réservation
   */
  async createReservation(reservationData) {
    try {
      const response = await api.post('/reservations', reservationData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error)
      throw error
    }
  },

  /**
   * Vérifier la disponibilité pour une date/heure
   * @param {string} date - Date au format YYYY-MM-DD
   * @param {string} time - Heure au format HH:mm
   * @param {number} guests - Nombre de convives
   * @returns {Promise<Object>} Disponibilité et créneaux alternatifs
   */
  async checkAvailability(date, time, guests) {
    try {
      const params = { date, time, guests }
      const response = await api.get('/reservations/availability', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error)
      throw error
    }
  },

  /**
   * Obtenir les créneaux disponibles pour une date
   * @param {string} date - Date au format YYYY-MM-DD
   * @param {number} guests - Nombre de convives
   * @returns {Promise<Array>} Liste des créneaux disponibles
   */
  async getAvailableSlots(date, guests) {
    try {
      const params = { date, guests }
      const response = await api.get('/reservations/slots', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux:', error)
      throw error
    }
  },

  /**
   * Confirmer une réservation avec un code
   * @param {string} confirmationCode - Code de confirmation
   * @returns {Promise<Object>} Statut de confirmation
   */
  async confirmReservation(confirmationCode) {
    try {
      const response = await api.post(`/reservations/confirm/${confirmationCode}`)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error)
      throw error
    }
  },

  /**
   * Annuler une réservation
   * @param {string} reservationId - ID de la réservation
   * @param {string} reason - Raison de l'annulation
   * @returns {Promise<Object>} Confirmation d'annulation
   */
  async cancelReservation(reservationId, reason = '') {
    try {
      const response = await api.delete(`/reservations/${reservationId}`, {
        data: { reason }
      })
      return response.data
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error)
      throw error
    }
  }
}