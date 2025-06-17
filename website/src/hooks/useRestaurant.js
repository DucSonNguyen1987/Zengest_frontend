import { useState, useEffect } from 'react'
import { restaurantService } from '../services/api/restaurantService'

/**
 * Hook pour gérer les informations du restaurant
 * @param {Object} options - Options du hook
 * @returns {Object} Informations et fonctions du restaurant
 */
export const useRestaurant = (options = {}) => {
  const { autoFetch = true } = options

  const [restaurantInfo, setRestaurantInfo] = useState(null)
  const [openingHours, setOpeningHours] = useState(null)
  const [isOpen, setIsOpen] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRestaurantInfo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const info = await restaurantService.getRestaurantInfo()
      setRestaurantInfo(info)
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des informations')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOpeningHours = async () => {
    try {
      const hours = await restaurantService.getOpeningHours()
      setOpeningHours(hours)
    } catch (err) {
      console.error('Erreur lors du chargement des horaires:', err)
    }
  }

  const checkIsOpen = async (datetime = new Date()) => {
    try {
      const open = await restaurantService.isOpen(datetime)
      setIsOpen(open)
      return open
    } catch (err) {
      console.error('Erreur lors de la vérification d\'ouverture:', err)
      return false
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchRestaurantInfo()
      fetchOpeningHours()
      checkIsOpen()
    }
  }, [autoFetch])

  return {
    restaurantInfo,
    openingHours,
    isOpen,
    isLoading,
    error,
    fetchRestaurantInfo,
    fetchOpeningHours,
    checkIsOpen
  }
};

export default useRestaurant;