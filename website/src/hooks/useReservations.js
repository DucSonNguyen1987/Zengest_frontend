import { useState } from 'react'
import { reservationService } from '../services/api/reservationService'
import toast from 'react-hot-toast'

/**
 * Hook pour gérer les réservations
 * @returns {Object} Fonctions et état pour les réservations
 */
export const useReservations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)

  const checkAvailability = async (date, time, guests) => {
    setIsLoading(true)

    try {
      const result = await reservationService.checkAvailability(date, time, guests)
      return result
    } catch (error) {
      toast.error('Erreur lors de la vérification de disponibilité')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getAvailableSlots = async (date, guests) => {
    setIsLoading(true)

    try {
      const slots = await reservationService.getAvailableSlots(date, guests)
      setAvailableSlots(slots)
      return slots
    } catch (error) {
      toast.error('Erreur lors de la récupération des créneaux')
      setAvailableSlots([])
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const createReservation = async (reservationData) => {
    setIsLoading(true)

    try {
      const result = await reservationService.createReservation(reservationData)
      toast.success('Réservation confirmée ! Un email de confirmation vous a été envoyé.')
      return result
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la réservation'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const confirmReservation = async (confirmationCode) => {
    setIsLoading(true)

    try {
      const result = await reservationService.confirmReservation(confirmationCode)
      toast.success('Réservation confirmée avec succès !')
      return result
    } catch (error) {
      toast.error('Code de confirmation invalide')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const cancelReservation = async (reservationId, reason = '') => {
    setIsLoading(true)

    try {
      const result = await reservationService.cancelReservation(reservationId, reason)
      toast.success('Réservation annulée avec succès')
      return result
    } catch (error) {
      toast.error('Erreur lors de l\'annulation')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    availableSlots,
    selectedSlot,
    setSelectedSlot,
    checkAvailability,
    getAvailableSlots,
    createReservation,
    confirmReservation,
    cancelReservation
  }
};

export default useReservations;