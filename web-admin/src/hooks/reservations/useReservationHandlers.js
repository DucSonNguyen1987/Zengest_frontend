// web-admin/src/hooks/reservations/useReservationHandlers.js
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// === ACTIONS REDUX ===
import {
  updateReservationStatus,
  cancelReservation,
  confirmReservation,
  addReservation,
  bulkUpdateReservations
} from '@store/slices/reservationSlice';

// === SERVICES API ===
import * as reservationsAPI from '@services/api/reservationsAPI';

// === CONSTANTES PARTAGÉES ===
import { RESERVATION_STATUS } from '@shared/constants';

// ========================================
// 🎯 HOOK GESTIONNAIRES RÉSERVATIONS
// ========================================

const useReservationHandlers = () => {
  const dispatch = useDispatch();
  
  // ========================================
  // 🔄 ÉTATS LOCAUX
  // ========================================
  
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ========================================
  // 📋 AFFICHAGE DES DÉTAILS
  // ========================================

  const handleViewReservation = useCallback((reservation) => {
    console.log('Voir réservation:', reservation);
    setSelectedReservation(reservation);
    setIsDetailsModalOpen(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedReservation(null);
  }, []);

  // ========================================
  // ✏️ ÉDITION D'UNE RÉSERVATION
  // ========================================

  const handleEditReservation = useCallback((reservation) => {
    console.log('Modifier réservation:', reservation);
    setSelectedReservation(reservation);
    setIsEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedReservation(null);
  }, []);

  const handleUpdateReservation = useCallback(async (reservationId, updatedData) => {
    try {
      setLoading(true);
      
      // Appel API pour mettre à jour la réservation
      const response = await reservationsAPI.updateReservation(reservationId, updatedData);
      
      // Mettre à jour le store Redux
      dispatch(updateReservationStatus({
        id: reservationId,
        data: response.data
      }));

      // Fermer le modal et afficher un message de succès
      closeEditModal();
      toast.success('Réservation mise à jour avec succès');
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch, closeEditModal]);

  // ========================================
  // ✅ CONFIRMATION D'UNE RÉSERVATION
  // ========================================

  const handleConfirmReservation = useCallback(async (reservation) => {
    try {
      setLoading(true);
      console.log('Confirmer réservation:', reservation);
      
      // Appel API pour confirmer la réservation
      const response = await reservationsAPI.confirmReservation(reservation._id);
      
      // Mettre à jour le store Redux
      dispatch(confirmReservation({
        id: reservation._id,
        data: response.data
      }));

      // Fermer le modal de détails si ouvert
      if (isDetailsModalOpen) {
        closeDetailsModal();
      }

      // Message de succès
      toast.success(`Réservation de ${reservation.customer.firstName} ${reservation.customer.lastName} confirmée`);
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la confirmation');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch, isDetailsModalOpen, closeDetailsModal]);

  // ========================================
  // ❌ ANNULATION D'UNE RÉSERVATION
  // ========================================

  const handleCancelReservation = useCallback(async (reservation, reason = '') => {
    try {
      setLoading(true);
      console.log('Annuler réservation:', reservation, 'Raison:', reason);
      
      // Données d'annulation
      const cancellationData = {
        status: RESERVATION_STATUS.CANCELLED,
        cancellationReason: reason,
        cancelledAt: new Date().toISOString(),
        cancelledBy: 'admin' // À adapter selon l'utilisateur connecté
      };
      
      // Appel API pour annuler la réservation
      const response = await reservationsAPI.cancelReservation(reservation._id, cancellationData);
      
      // Mettre à jour le store Redux
      dispatch(cancelReservation({
        id: reservation._id,
        data: response.data
      }));

      // Fermer le modal de détails si ouvert
      if (isDetailsModalOpen) {
        closeDetailsModal();
      }

      // Message de succès
      toast.success(`Réservation de ${reservation.customer.firstName} ${reservation.customer.lastName} annulée`);
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'annulation');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch, isDetailsModalOpen, closeDetailsModal]);

  // ========================================
  // ➕ CRÉATION D'UNE NOUVELLE RÉSERVATION
  // ========================================

  const handleAddReservation = useCallback(() => {
    console.log('Ajouter une nouvelle réservation');
    setSelectedReservation(null);
    setIsFormModalOpen(true);
  }, []);

  const closeFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setSelectedReservation(null);
  }, []);

  const handleCreateReservation = useCallback(async (reservationData) => {
    try {
      setLoading(true);

      // Appel API pour créer la réservation
      const response = await reservationsAPI.createReservation(reservationData);

      // Ajouter au store Redux
      dispatch(addReservation(response.data));

      // Fermer le modal et afficher un message de succès
      closeFormModal();
      toast.success('Réservation créée avec succès');

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch, closeFormModal]);

  // ========================================
  // 🔄 CHANGEMENT DE STATUT RAPIDE
  // ========================================

  const handleStatusChange = useCallback(async (reservation, newStatus) => {
    try {
      setLoading(true);

      // Appel API pour changer le statut de la réservation
      const response = await reservationsAPI.updateReservationStatus(reservation._id, { status: newStatus });

      // MAJ du store Redux
      dispatch(updateReservationStatus({
        id: reservation._id,
        data: response.data
      }));

      // Message de succès
      const statusLabels = {
        [RESERVATION_STATUS.CONFIRMED]: 'confirmée',
        [RESERVATION_STATUS.SEATED]: 'installée',
        [RESERVATION_STATUS.COMPLETED]: 'terminée',
        [RESERVATION_STATUS.NO_SHOW]: 'marquée comme no-show'
      };

      toast.success(`Réservation ${statusLabels[newStatus] || newStatus}`);

      return response.data;
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast.error(error.response?.data?.message || 'Erreur lors du changement de statut');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // ========================================
  // 🔄 ACTIONS MULTIPLES
  // ========================================

  const handleBulkAction = useCallback(async (reservationIds, action, data = {}) => {
    try {
      setLoading(true);

      // Appel API pour l'action groupée
      const response = await reservationsAPI.bulkAction(reservationIds, action, data);

      // MAJ du store Redux
      dispatch(bulkUpdateReservations({
        ids: reservationIds,
        action,
        data: response.data
      }));

      // Message de succès
      toast.success(`${reservationIds.length} réservation(s) mise(s) à jour`);

      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'action groupée:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'action groupée');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // ========================================
  // 📧 ENVOI D'EMAIL DE CONFIRMATION
  // ========================================

  const handleSendEmail = useCallback(async (reservationId, emailType) => {
    try {
      setLoading(true);

      // Appel API pour envoyer l'email
      await reservationsAPI.sendEmail(reservationId, emailType);

      // Message de succès
      const emailLabels = {
        confirmation: 'Email de confirmation envoyé',
        reminder: 'Email de rappel envoyé',
        cancellation: 'Email d\'annulation envoyé'
      };

      toast.success(emailLabels[emailType] || 'Email envoyé avec succès');
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi de l\'email');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // 📤 RETOUR DU HOOK
  // ========================================

  return {
    // États
    selectedReservation,
    isDetailsModalOpen,
    isEditModalOpen,
    isFormModalOpen,
    loading,
    
    // Gestionnaires principaux
    handleViewReservation,
    handleEditReservation,
    handleConfirmReservation,
    handleCancelReservation,
    handleAddReservation,
    
    // Gestionnaires de modals
    closeDetailsModal,
    closeEditModal,
    closeFormModal,
    
    // Actions CRUD
    handleCreateReservation,
    handleUpdateReservation,
    handleStatusChange,
    
    // Actions avancées
    handleBulkAction,
    handleSendEmail,
    
    // Setters pour états
    setSelectedReservation,
    setIsDetailsModalOpen,
    setIsEditModalOpen,
    setIsFormModalOpen
  };
};

export default useReservationHandlers;