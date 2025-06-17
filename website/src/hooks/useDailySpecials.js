import { useState, useEffect } from 'react'
import dailySpecialsService from '../services/api/dailySpecialsService'

/**
 * Hook personnalisé pour gérer les plats du jour
 * @param {Object} options - Options du hook
 * @param {string} options.restaurantId - ID du restaurant
 * @param {boolean} options.autoFetch - Charger automatiquement au mount
 * @param {number} options.refreshInterval - Intervalle de rafraîchissement en ms
 * @returns {Object} État et fonctions pour les plats du jour
 */
export const useDailySpecials = (options = {}) => {
  const {
    restaurantId = null,
    autoFetch = true,
    refreshInterval = null
  } = options

  const [dailySpecials, setDailySpecials] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetch, setLastFetch] = useState(null)

  /**
   * Récupérer les plats du jour
   */
  const fetchDailySpecials = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await dailySpecialsService.getDailySpecials(restaurantId)
      setDailySpecials(data.dailySpecials || [])
      setLastFetch(new Date())
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des plats du jour')
      setDailySpecials([])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Récupérer les plats pour une date spécifique
   */
  const fetchByDate = async (date) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await dailySpecialsService.getDailySpecialsByDate(date, restaurantId)
      setDailySpecials(data.dailySpecials || [])
      setLastFetch(new Date())
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des plats du jour')
      setDailySpecials([])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Rafraîchir les données
   */
  const refresh = () => {
    fetchDailySpecials()
  }

  // Chargement automatique au mount
  useEffect(() => {
    if (autoFetch) {
      fetchDailySpecials()
    }
  }, [restaurantId, autoFetch])

  // Rafraîchissement automatique
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        fetchDailySpecials()
      }, refreshInterval)

      return () => clearInterval(interval)
    }
  }, [refreshInterval, restaurantId])

  return {
    dailySpecials,
    isLoading,
    error,
    lastFetch,
    fetchDailySpecials,
    fetchByDate,
    refresh,
    // Données calculées
    hasSpecials: dailySpecials.length > 0,
    todaySpecials: dailySpecials.filter(special => {
      const today = new Date().toISOString().split('T')[0]
      return special.date === today
    })
  }
}

export default useDailySpecials