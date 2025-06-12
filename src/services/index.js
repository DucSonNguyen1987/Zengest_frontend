// Export centralisé de tous les services

import { contactService } from './contactService'
import { menuService } from './menuService'
import { reservationService } from './reservationService'
import { restaurantService } from './restaurantService'
import { galleryService } from './galleryService'
import dailySpecialsService from './dailySpecialsService'

// Export individuel pour imports spécifiques
export { contactService } from './contactService'
export { menuService } from './menuService'
export { reservationService } from './reservationService'
export { restaurantService } from './restaurantService'
export { galleryService } from './galleryService'
export { default as dailySpecialsService } from './dailySpecialsService'

// Export par défaut groupé pour import global
export default {
  contactService,
  menuService,
  reservationService,
  restaurantService,
  galleryService,
  dailySpecialsService
}