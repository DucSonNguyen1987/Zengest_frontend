// web-admin/src/hooks/reservations/useReservationHandlers.js - VERSION CORRIGÉE COMPLÈTE

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// === ACTIONS REDUX CORRIGÉES ===
import {
  createReservation,        // ✅ Au lieu de addReservation
  updateReservation,        // ✅ Existe
  updateReservationStatus,  // ✅ Existe  
  deleteReservation,        // ✅ Au lieu de cancelReservation
  setCurrentReservation,    // ✅ Action synchrone
  clearCurrentReservation   // ✅ Action synchrone
} from '../../store/slices/reservationSlice';

// === SERVICES API CORRIGÉS ===
import { reservationService } from '../../services/api/reservationService';

// === CONSTANTES CORRIGÉES ===
import { RESERVATION_STATUS } from '@shared/constants/constants';

// ========================================
// 🎯 HOOK GESTIONNAIRES RÉSERVATIONS CORRIGÉ
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
    
    // Optionnel : mettre à jour le store
    dispatch(setCurrentReservation(reservation));
  }, [dispatch]);

  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedReservation(null);
    dispatch(clearCurrentReservation());
  }, [dispatch]);

  // ========================================
  // ✏️ ÉDITION D'UNE RÉSERVATION
  // ========================================

  const handleEditReservation = useCallback((reservation) => {
    console.log('Modifier réservation:', reservation);
    setSelectedReservation(reservation);
    setIsEditModalOpen(true);
    dispatch(setCurrentReservation(reservation));
  }, [dispatch]);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedReservation(null);
    dispatch(clearCurrentReservation());
  }, [dispatch]);

  const handleUpdateReservation = useCallback(async (reservationData) => {
    try {
      setLoading(true);

      // ✅ Utiliser l'action Redux correcte
      const resultAction = await dispatch(updateReservation({
        id: selectedReservation._id,
        data: reservationData
      }));

      if (updateReservation.fulfilled.match(resultAction)) {
        closeEditModal();
        toast.success('Réservation mise à jour avec succès');
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedReservation, closeEditModal]);

  // ========================================
  // ✅ CONFIRMATION D'UNE RÉSERVATION
  // ========================================

  const handleConfirmReservation = useCallback(async (reservation) => {
    try {
      setLoading(true);
      console.log('Confirmer réservation:', reservation);

      // ✅ Utiliser updateReservationStatus
      const resultAction = await dispatch(updateReservationStatus({
        id: reservation._id,
        status: RESERVATION_STATUS.CONFIRMED
      }));

      if (updateReservationStatus.fulfilled.match(resultAction)) {
        toast.success(`Réservation de ${reservation.customer?.firstName || ''} ${reservation.customer?.lastName || ''} confirmée`);
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Erreur lors de la confirmation');
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
      toast.error(error.message || 'Erreur lors de la confirmation');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // ========================================
  // ❌ ANNULATION D'UNE RÉSERVATION
  // ========================================

  const handleCancelReservation = useCallback(async (reservation, reason = '') => {
    try {
      setLoading(true);
      console.log('Annuler réservation:', reservation, 'Raison:', reason);

      // ✅ Utiliser deleteReservation au lieu de cancelReservation
      const resultAction = await dispatch(deleteReservation(reservation._id));

      if (deleteReservation.fulfilled.match(resultAction)) {
        // Fermer le modal si ouvert
        if (isDetailsModalOpen) {
          closeDetailsModal();
        }

        toast.success(`Réservation de ${reservation.customer?.firstName || ''} ${reservation.customer?.lastName || ''} annulée`);
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Erreur lors de l\'annulation');
      }
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast.error(error.message || 'Erreur lors de l\'annulation');
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
    dispatch(clearCurrentReservation());
  }, [dispatch]);

  const closeFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setSelectedReservation(null);
    dispatch(clearCurrentReservation());
  }, [dispatch]);

  const handleCreateReservation = useCallback(async (reservationData) => {
    try {
      setLoading(true);

      // ✅ Utiliser createReservation au lieu de addReservation
      const resultAction = await dispatch(createReservation(reservationData));

      if (createReservation.fulfilled.match(resultAction)) {
        closeFormModal();
        toast.success('Réservation créée avec succès');
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error(error.message || 'Erreur lors de la création');
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

      // ✅ Utiliser l'action Redux correcte
      const resultAction = await dispatch(updateReservationStatus({
        id: reservation._id,
        status: newStatus
      }));

      if (updateReservationStatus.fulfilled.match(resultAction)) {
        // Messages de succès selon le statut
        const statusLabels = {
          [RESERVATION_STATUS.CONFIRMED]: 'confirmée',
          [RESERVATION_STATUS.SEATED]: 'installée',
          [RESERVATION_STATUS.COMPLETED]: 'terminée',
          [RESERVATION_STATUS.NO_SHOW]: 'marquée comme no-show'
        };

        toast.success(`Réservation ${statusLabels[newStatus] || newStatus}`);
        return resultAction.payload;
      } else {
        throw new Error(resultAction.payload || 'Erreur lors du changement de statut');
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast.error(error.message || 'Erreur lors du changement de statut');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

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
    
    // Setters pour états
    setSelectedReservation,
    setIsDetailsModalOpen,
    setIsEditModalOpen,
    setIsFormModalOpen
  };
};

export default useReservationHandlers;