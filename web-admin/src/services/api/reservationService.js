// ========================================
// 📅 RESERVATION-SERVICE.JS - SERVICE API POUR LES RÉSERVATIONS
// ========================================
// Fichier: web-admin/src/services/api/reservationService.js
//
// Service API centralisé pour toutes les opérations liées aux réservations
// avec gestion des erreurs et authentification.

import apiClient  from './client.js';

// ========================================
// 🔧 CONFIGURATION
// ========================================

const ENDPOINTS = {
  BASE: '/reservations',
  TODAY: '/reservations/today',
  UPCOMING: '/reservations/upcoming',
  AVAILABILITY: '/reservations/availability',
  ASSIGN_TABLE: (id) => `/reservations/${id}/assign-table`,
  STATUS: (id) => `/reservations/${id}/status`,
  SINGLE: (id) => `/reservations/${id}`
};

// ========================================
// 📅 SERVICE PRINCIPAL
// ========================================

export const reservationService = {
  
  // ========================================
  // 📋 RÉCUPÉRATION DES RÉSERVATIONS
  // ========================================
  
  /**
   * Récupérer toutes les réservations avec filtres et pagination
   */
  async getAllReservations(params = {}) {
    try {
      const defaultParams = {
        page: 1,
        limit: 20,
        sortBy: 'date',
        sortOrder: 'desc'
      };
      
      const queryParams = { ...defaultParams, ...params };
      
      const response = await apiClient.get(ENDPOINTS.BASE, { params: queryParams });
      
      console.log('✅ Réservations récupérées:', response.data?.reservations?.length || 0);
      
      return {
        reservations: response.data.reservations || [],
        pagination: response.data.pagination || {},
        stats: response.data.stats || {}
      };
    } catch (error) {
      console.error('❌ Erreur getAllReservations:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des réservations');
    }
  },
  
  /**
   * Récupérer une réservation par ID
   */
  async getReservationById(id) {
    try {
      if (!id) {
        throw new Error('ID de réservation requis');
      }
      
      const response = await apiClient.get(ENDPOINTS.SINGLE(id));
      
      console.log('✅ Réservation récupérée:', response.data.reservation._id);
      
      return response.data.reservation;
    } catch (error) {
      console.error('❌ Erreur getReservationById:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de la réservation');
    }
  },
  
  /**
   * Récupérer les réservations du jour
   */
  async getTodayReservations(date = null) {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      
      const response = await apiClient.get(ENDPOINTS.TODAY, { 
        params: { date: targetDate } 
      });
      
      console.log('✅ Réservations du jour récupérées:', response.data?.reservations?.length || 0);
      
      return response.data.reservations || [];
    } catch (error) {
      console.error('❌ Erreur getTodayReservations:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des réservations du jour');
    }
  },
  
  /**
   * Récupérer les prochaines réservations
   */
  async getUpcomingReservations(limit = 10) {
    try {
      const response = await apiClient.get(ENDPOINTS.UPCOMING, { 
        params: { limit } 
      });
      
      console.log('✅ Prochaines réservations récupérées:', response.data?.reservations?.length || 0);
      
      return response.data.reservations || [];
    } catch (error) {
      console.error('❌ Erreur getUpcomingReservations:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des prochaines réservations');
    }
  },
  
  // ========================================
  // ➕ CRÉATION ET MISE À JOUR
  // ========================================
  
  /**
   * Créer une nouvelle réservation
   */
  async createReservation(reservationData) {
    try {
      // Validation des données requises
      const required = ['customer', 'date', 'time', 'guests'];
      const missing = required.filter(field => !reservationData[field]);
      
      if (missing.length > 0) {
        throw new Error(`Champs requis manquants: ${missing.join(', ')}`);
      }
      
      // Normaliser les données client
      if (reservationData.customer) {
        reservationData.customer = this.normalizeCustomerData(reservationData.customer);
      }
      
      const response = await apiClient.post(ENDPOINTS.BASE, reservationData);
      
      console.log('✅ Réservation créée:', response.data.reservation._id);
      
      return response.data.reservation;
    } catch (error) {
      console.error('❌ Erreur createReservation:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la création de la réservation');
    }
  },
  
  /**
   * Mettre à jour une réservation
   */
  async updateReservation(id, updateData) {
    try {
      if (!id) {
        throw new Error('ID de réservation requis');
      }
      
      // Normaliser les données client si présentes
      if (updateData.customer) {
        updateData.customer = this.normalizeCustomerData(updateData.customer);
      }
      
      const response = await apiClient.put(ENDPOINTS.SINGLE(id), updateData);
      
      console.log('✅ Réservation mise à jour:', response.data.reservation._id);
      
      return response.data.reservation;
    } catch (error) {
      console.error('❌ Erreur updateReservation:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de la réservation');
    }
  },
  
  /**
   * Mettre à jour le statut d'une réservation
   */
  async updateReservationStatus(id, status, notes = '') {
    try {
      if (!id || !status) {
        throw new Error('ID et statut requis');
      }
      
      const response = await apiClient.patch(ENDPOINTS.STATUS(id), { 
        status, 
        notes 
      });
      
      console.log('✅ Statut réservation mis à jour:', id, '→', status);
      
      return response.data.reservation;
    } catch (error) {
      console.error('❌ Erreur updateReservationStatus:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du statut');
    }
  },
  
  // ========================================
  // 🗑️ SUPPRESSION
  // ========================================
  
  /**
   * Supprimer une réservation
   */
  async deleteReservation(id) {
    try {
      if (!id) {
        throw new Error('ID de réservation requis');
      }
      
      await apiClient.delete(ENDPOINTS.SINGLE(id));
      
      console.log('✅ Réservation supprimée:', id);
      
      return true;
    } catch (error) {
      console.error('❌ Erreur deleteReservation:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de la réservation');
    }
  },
  
  // ========================================
  // 🪑 GESTION DES TABLES
  // ========================================
  
  /**
   * Assigner une table à une réservation
   */
  async assignTableToReservation(reservationId, tableData) {
    try {
      if (!reservationId) {
        throw new Error('ID de réservation requis');
      }
      
      const { tableId, floorPlanId, tableNumber } = tableData;
      
      if (!tableId && !tableNumber) {
        throw new Error('ID de table ou numéro de table requis');
      }
      
      const response = await apiClient.patch(ENDPOINTS.ASSIGN_TABLE(reservationId), {
        tableId,
        floorPlanId,
        tableNumber
      });
      
      console.log('✅ Table assignée à la réservation:', reservationId, '→', tableId || tableNumber);
      
      return response.data.reservation;
    } catch (error) {
      console.error('❌ Erreur assignTableToReservation:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'assignation de la table');
    }
  },
  
  /**
   * Retirer l'assignation de table
   */
  async unassignTableFromReservation(reservationId) {
    try {
      if (!reservationId) {
        throw new Error('ID de réservation requis');
      }
      
      const response = await apiClient.patch(ENDPOINTS.ASSIGN_TABLE(reservationId), {
        tableId: null,
        floorPlanId: null,
        tableNumber: null
      });
      
      console.log('✅ Table désassignée de la réservation:', reservationId);
      
      return response.data.reservation;
    } catch (error) {
      console.error('❌ Erreur unassignTableFromReservation:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la désassignation de la table');
    }
  },
  
  // ========================================
  // 🕐 DISPONIBILITÉ
  // ========================================
  
  /**
   * Rechercher des créneaux disponibles
   */
  async searchAvailableSlots(searchParams) {
    try {
      const { date, guests, duration = 120, preferredTime } = searchParams;
      
      if (!date || !guests) {
        throw new Error('Date et nombre de convives requis');
      }
      
      const params = {
        date,
        guests: guests.toString(),
        duration: duration.toString()
      };
      
      if (preferredTime) {
        params.preferredTime = preferredTime;
      }
      
      const response = await apiClient.get(ENDPOINTS.AVAILABILITY, { params });
      
      console.log('✅ Créneaux disponibles trouvés:', response.data?.slots?.length || 0);
      
      return response.data.slots || [];
    } catch (error) {
      console.error('❌ Erreur searchAvailableSlots:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la recherche de créneaux');
    }
  },
  
  /**
   * Vérifier la disponibilité pour une date/heure précise
   */
  async checkAvailability(date, time, guests, duration = 120) {
    try {
      const response = await apiClient.get(`${ENDPOINTS.AVAILABILITY}/check`, {
        params: { date, time, guests, duration }
      });
      
      console.log('✅ Disponibilité vérifiée:', response.data.available ? 'Disponible' : 'Non disponible');
      
      return {
        available: response.data.available,
        reason: response.data.reason || null,
        alternatives: response.data.alternatives || []
      };
    } catch (error) {
      console.error('❌ Erreur checkAvailability:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la vérification de disponibilité');
    }
  },
  
  // ========================================
  // 📊 STATISTIQUES ET RAPPORTS
  // ========================================
  
  /**
   * Récupérer les statistiques des réservations
   */
  async getReservationStats(period = 'month') {
    try {
      const response = await apiClient.get(`${ENDPOINTS.BASE}/stats`, {
        params: { period }
      });
      
      console.log('✅ Statistiques réservations récupérées');
      
      return response.data.stats;
    } catch (error) {
      console.error('❌ Erreur getReservationStats:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des statistiques');
    }
  },
  
  /**
   * Exporter les réservations
   */
  async exportReservations(format = 'csv', filters = {}) {
    try {
      const response = await apiClient.get(`${ENDPOINTS.BASE}/export`, {
        params: { format, ...filters },
        responseType: 'blob'
      });
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reservations_${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Export réservations réussi');
      
      return true;
    } catch (error) {
      console.error('❌ Erreur exportReservations:', error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'export des réservations');
    }
  },
  
  // ========================================
  // 🔧 UTILITAIRES
  // ========================================
  
  /**
   * Normaliser les données client
   */
  normalizeCustomerData(customer) {
    if (!customer) return null;
    
    // Si on a firstName et lastName, les conserver
    if (customer.firstName && customer.lastName) {
      return {
        firstName: customer.firstName.trim(),
        lastName: customer.lastName.trim(),
        name: `${customer.firstName.trim()} ${customer.lastName.trim()}`,
        email: customer.email?.trim().toLowerCase(),
        phone: customer.phone?.trim(),
        ...customer
      };
    }
    
    // Si on a seulement name, le séparer
    if (customer.name) {
      const nameParts = customer.name.trim().split(' ');
      return {
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        name: customer.name.trim(),
        email: customer.email?.trim().toLowerCase(),
        phone: customer.phone?.trim(),
        ...customer
      };
    }
    
    throw new Error('Nom du client requis (name ou firstName/lastName)');
  },
  
  /**
   * Valider les données de réservation
   */
  validateReservationData(data) {
    const errors = [];
    
    // Validation des champs requis
    if (!data.customer) errors.push('Informations client requises');
    if (!data.date) errors.push('Date requise');
    if (!data.time) errors.push('Heure requise');
    if (!data.guests || data.guests < 1) errors.push('Nombre de convives invalide');
    
    // Validation du format de date
    if (data.date && !data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      errors.push('Format de date invalide (YYYY-MM-DD attendu)');
    }
    
    // Validation du format d'heure
    if (data.time && !data.time.match(/^\d{2}:\d{2}$/)) {
      errors.push('Format d\'heure invalide (HH:MM attendu)');
    }
    
    // Validation des données client
    if (data.customer) {
      if (!data.customer.name && (!data.customer.firstName || !data.customer.lastName)) {
        errors.push('Nom du client requis');
      }
      
      if (data.customer.email && !data.customer.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Format d\'email invalide');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  /**
   * Formater une réservation pour l'affichage
   */
  formatReservationForDisplay(reservation) {
    if (!reservation) return null;
    
    return {
      ...reservation,
      displayName: reservation.customer?.name || 
        `${reservation.customer?.firstName || ''} ${reservation.customer?.lastName || ''}`.trim(),
      displayDate: new Date(reservation.date).toLocaleDateString('fr-FR'),
      displayTime: reservation.time,
      displayGuests: `${reservation.guests} personne${reservation.guests > 1 ? 's' : ''}`,
      displayStatus: this.getStatusLabel(reservation.status)
    };
  },
  
  /**
   * Obtenir le label d'un statut
   */
  getStatusLabel(status) {
    const labels = {
      'pending': 'En attente',
      'confirmed': 'Confirmée',
      'seated': 'Installée',
      'completed': 'Terminée',
      'cancelled': 'Annulée',
      'no_show': 'Absence'
    };
    
    return labels[status] || status;
  },
  
  /**
   * Obtenir la couleur d'un statut
   */
  getStatusColor(status) {
    const colors = {
      'pending': 'warning',
      'confirmed': 'info',
      'seated': 'primary',
      'completed': 'success',
      'cancelled': 'danger',
      'no_show': 'dark'
    };
    
    return colors[status] || 'secondary';
  }
};

export default reservationService;