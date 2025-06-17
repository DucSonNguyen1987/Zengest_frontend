import publicApi from './publicApi.js'

export const reservationService = {
  /**
   * Créer une nouvelle réservation
   * @param {Object} reservationData - Données de réservation
   * @returns {Promise<Object>} Confirmation de réservation
   */
  async createReservation(reservationData) {
    try {
      const payload = {
        restaurantId: import.meta.env.VITE_RESTAURANT_ID || "673966b5a8c2f64b1cbeca5b",
        customer: {
          firstName: reservationData.firstName,
          lastName: reservationData.lastName,
          phone: reservationData.phone,
          email: reservationData.email,
          notes: reservationData.specialRequests
        },
        dateTime: new Date(`${reservationData.date}T${reservationData.time}`).toISOString(),
        partySize: parseInt(reservationData.guests),
        specialRequests: reservationData.specialRequests ? [reservationData.specialRequests] : [],
        source: 'online'
      };

      console.log('Envoi réservation:', payload);
      
      // ✅ SOLUTION 1 : Endpoint direct (le plus probable)
      const response = await publicApi.post('/reservations', payload)
      
      return response.data
    } catch (error) {
      console.error('Erreur création réservation:', error.response?.data || error)
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
      const response = await publicApi.get('/reservations/slots', { params })
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