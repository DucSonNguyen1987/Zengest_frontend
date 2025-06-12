// hooks/index.js - Export centralisé de tous les hooks

import { useMenu } from './useMenu'
import { useContact } from './useContact'
import { useReservations } from './useReservations'
import { useRestaurant } from './useRestaurant'
import { useGallery } from './useGallery'
import useDailySpecials from './useDailySpecials'

// Export individuel pour imports spécifiques
export { useMenu } from './useMenu'
export { useContact } from './useContact'
export { useReservations } from './useReservations'
export { useRestaurant } from './useRestaurant'
export { useGallery } from './useGallery'
export { default as useDailySpecials } from './useDailySpecials'

// Export par défaut groupé pour import global
export default {
  useMenu,
  useContact,
  useReservations,
  useRestaurant,
  useGallery,
  useDailySpecials
}