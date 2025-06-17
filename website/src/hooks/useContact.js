import { useState } from 'react'
import { contactService } from '../services/api/contactService'
import toast from 'react-hot-toast'

/**
 * Hook pour gérer les fonctionnalités de contact
 * @returns {Object} Fonctions et état pour le contact
 */
export const useContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactInfo, setContactInfo] = useState(null)

  const sendMessage = async (messageData) => {
    setIsSubmitting(true)

    try {
      const result = await contactService.sendMessage(messageData)
      toast.success('Message envoyé avec succès ! Nous vous répondrons rapidement.')
      return result
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de l\'envoi du message'
      toast.error(message)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const getContactInfo = async () => {
    try {
      const info = await contactService.getContactInfo()
      setContactInfo(info)
      return info
    } catch (error) {
      console.error('Erreur lors de la récupération des infos contact:', error)
      return null
    }
  }

  return {
    sendMessage,
    getContactInfo,
    isSubmitting,
    contactInfo
  }
};

export default useContact;