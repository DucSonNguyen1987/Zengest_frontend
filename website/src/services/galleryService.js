import api from './api'

export const galleryService = {
  /**
   * Récupérer toutes les images de la galerie
   * @param {string} category - Catégorie d'images (optionnel)
   * @returns {Promise<Array>} Liste des images
   */
  async getGalleryImages(category = null) {
    try {
      const params = category ? { category } : {}
      const response = await api.get('/gallery/images', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération de la galerie:', error)
      throw error
    }
  },

  /**
   * Récupérer les catégories d'images disponibles
   * @returns {Promise<Array>} Liste des catégories
   */
  async getImageCategories() {
    try {
      const response = await api.get('/gallery/categories')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error)
      throw error
    }
  }
}

export default galleryService