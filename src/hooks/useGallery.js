// hooks/useGallery.js
import { useState, useEffect } from 'react'
import { galleryService } from '../services/galleryService'

/**
 * Hook pour gérer la galerie d'images
 * @param {Object} options - Options du hook
 * @returns {Object} Images et fonctions de la galerie
 */
export const useGallery = (options = {}) => {
  const { autoFetch = true, category = null } = options

  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchImages = async (cat = category) => {
    setIsLoading(true)
    setError(null)

    try {
      const imageData = await galleryService.getGalleryImages(cat)
      setImages(imageData)
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement de la galerie')
      setImages([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const categoryData = await galleryService.getImageCategories()
      setCategories(categoryData)
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchImages()
      fetchCategories()
    }
  }, [autoFetch, category])

  return {
    images,
    categories,
    isLoading,
    error,
    fetchImages,
    fetchCategories,
    hasImages: images.length > 0
  }
}

export default useGallery;