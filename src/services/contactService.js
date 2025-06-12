import api from './api'

export const contactService = {
  /**
   * Envoyer un message de contact
   * @param {Object} messageData - Données du message
   * @returns {Promise<Object>} Réponse du serveur
   */
  async sendMessage(messageData) {
    try {
      const response = await api.post('/contact/send-message', messageData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      throw error
    }
  },

  /**
   * Obtenir les informations de contact du restaurant
   * @returns {Promise<Object>} Informations de contact
   */
  async getContactInfo() {
    try {
      const response = await api.get('/contact/info')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des infos contact:', error)
      throw error
    }
  }
}

export default contactService