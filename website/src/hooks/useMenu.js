import { useState, useEffect } from 'react'
import { menuService } from '../services/api/menuService'

/**
 * Hook pour gérer le menu du restaurant
 * @param {Object} options - Options du hook
 * @returns {Object} État et fonctions pour le menu
 */
export const useMenu = (options = {}) => {
  const { autoFetch = true, restaurantId = null } = options

  const [menu, setMenu] = useState(null)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMenu = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await menuService.getFullMenu(restaurantId)
      setMenu(data.menu)
      setCategories(data.categories || [])
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement du menu')
      setMenu(null)
      setCategories([])
    } finally {
      setIsLoading(false)
    }
  }

  const searchMenu = async (query, filters = {}) => {
    setIsLoading(true)
    setError(null)

    try {
      const results = await menuService.searchMenu(query, filters)
      return results
    } catch (err) {
      setError(err.message || 'Erreur lors de la recherche')
      return []
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchMenu()
    }
  }, [autoFetch, restaurantId])

  return {
    menu,
    categories,
    isLoading,
    error,
    fetchMenu,
    searchMenu,
    hasMenu: menu !== null
  }
};

export default useMenu;