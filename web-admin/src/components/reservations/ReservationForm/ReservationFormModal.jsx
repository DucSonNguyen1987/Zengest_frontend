// web-admin/src/components/reservations/ReservationFormModal/ReservationFormModal.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  TableCellsIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Composants
import { Input, Button } from '@/components/common';

// Utilitaires
import { 
  formatDateForInput, 
  isValidEmail, 
  isValidPhone,
  generateId 
} from '@/utils';
import { RESERVATION_STATUS } from '@/utils';

// Styles
//import '@styles/components/ReservationFormModal.scss';

// ========================================
// 📋 MODAL FORMULAIRE RÉSERVATION
// ========================================

const ReservationFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  reservation = null,
  loading = false
}) => {
  // ========================================
  // 🔄 ÉTAT LOCAL
  // ========================================

  const [formData, setFormData] = useState({
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    dateTime: '',
    guestsCount: 2,
    specialRequests: '',
    internalNotes: '',
    table: null,
    status: RESERVATION_STATUS.PENDING
  });

  const [errors, setErrors] = useState({});
  const [availableTables, setAvailableTables] = useState([
    { id: '1', number: 1, capacity: 2 },
    { id: '2', number: 2, capacity: 4 },
    { id: '3', number: 3, capacity: 6 },
    { id: '4', number: 4, capacity: 2 },
    { id: '5', number: 5, capacity: 8 }
  ]);

  // ========================================
  // 🔄 EFFETS
  // ========================================

  // Initialiser le formulaire quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      if (reservation) {
        // Mode édition
        setFormData({
          customer: {
            firstName: reservation.customer.firstName || '',
            lastName: reservation.customer.lastName || '',
            email: reservation.customer.email || '',
            phone: reservation.customer.phone || ''
          },
          dateTime: formatDateForInput(reservation.dateTime) || '',
          guestsCount: reservation.guestsCount || 2,
          specialRequests: reservation.specialRequests || '',
          internalNotes: reservation.internalNotes || '',
          table: reservation.table || null,
          status: reservation.status || RESERVATION_STATUS.PENDING
        });
      } else {
        // Mode création - initialiser avec valeurs par défaut
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(19, 0, 0, 0); // 19h par défaut
        
        setFormData({
          customer: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          },
          dateTime: formatDateForInput(tomorrow),
          guestsCount: 2,
          specialRequests: '',
          internalNotes: '',
          table: null,
          status: RESERVATION_STATUS.PENDING
        });
      }
      setErrors({});
    }
  }, [isOpen, reservation]);

  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? parseInt(value, 10) : value;
    
    if (name.startsWith('customer.')) {
      const customerField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          [customerField]: finalValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: finalValue
      }));
    }

    // Nettoyer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleTableSelect = (e) => {
    const tableId = e.target.value;
    const selectedTable = availableTables.find(t => t.id === tableId);
    
    setFormData(prev => ({
      ...prev,
      table: selectedTable || null
    }));
  };

  // ========================================
  // ✅ VALIDATION
  // ========================================

  const validateForm = () => {
    const newErrors = {};

    // Validation client
    if (!formData.customer.firstName.trim()) {
      newErrors['customer.firstName'] = 'Le prénom est requis';
    }

    if (!formData.customer.lastName.trim()) {
      newErrors['customer.lastName'] = 'Le nom est requis';
    }

    if (!formData.customer.phone.trim()) {
      newErrors['customer.phone'] = 'Le téléphone est requis';
    } else if (!isValidPhone(formData.customer.phone)) {
      newErrors['customer.phone'] = 'Numéro de téléphone invalide';
    }

    if (formData.customer.email && !isValidEmail(formData.customer.email)) {
      newErrors['customer.email'] = 'Adresse email invalide';
    }

    // Validation date/heure
    if (!formData.dateTime) {
      newErrors.dateTime = 'La date et l\'heure sont requises';
    } else {
      const selectedDate = new Date(formData.dateTime);
      const now = new Date();
      
      if (selectedDate <= now) {
        newErrors.dateTime = 'La réservation doit être dans le futur';
      }
    }

    // Validation nombre de personnes
    if (!formData.guestsCount || formData.guestsCount < 1) {
      newErrors.guestsCount = 'Le nombre de personnes doit être supérieur à 0';
    } else if (formData.guestsCount > 20) {
      newErrors.guestsCount = 'Contactez-nous pour les groupes de plus de 20 personnes';
    }

    // Validation table (si sélectionnée)
    if (formData.table && formData.guestsCount > formData.table.capacity) {
      newErrors.table = `Cette table ne peut accueillir que ${formData.table.capacity} personne(s)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // 📤 SOUMISSION
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Préparer les données à envoyer
    const submitData = {
      ...formData,
      customer: {
        ...formData.customer,
        firstName: formData.customer.firstName.trim(),
        lastName: formData.customer.lastName.trim(),
        email: formData.customer.email.trim(),
        phone: formData.customer.phone.trim()
      },
      specialRequests: formData.specialRequests.trim(),
      internalNotes: formData.internalNotes.trim(),
      reservationNumber: reservation?.reservationNumber || `RES-${new Date().getFullYear()}-${generateId().slice(-3).toUpperCase()}`
    };

    onSubmit(submitData);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  // ========================================
  // 📊 DONNÉES CALCULÉES
  // ========================================

  // Filtrer les tables par capacité
  const suitableTables = availableTables.filter(table => 
    table.capacity >= formData.guestsCount
  );

  // ========================================
  // 🎨 RENDU
  // ========================================

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="reservation-form-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="modal-header">
          <h2 className="modal-title">
            <CalendarDaysIcon className="h-6 w-6 mr-2" />
            {reservation ? 'Modifier la réservation' : 'Nouvelle réservation'}
          </h2>
          
          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            disabled={loading}
            aria-label="Fermer"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-sections">
            
            {/* Section Client */}
            <div className="form-section">
              <h3 className="section-title">
                <UserIcon className="h-5 w-5" />
                Informations client
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <Input
                    label="Prénom"
                    name="customer.firstName"
                    value={formData.customer.firstName}
                    onChange={handleInputChange}
                    error={errors['customer.firstName']}
                    placeholder="Marie"
                    leftIcon={UserIcon}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    label="Nom"
                    name="customer.lastName"
                    value={formData.customer.lastName}
                    onChange={handleInputChange}
                    error={errors['customer.lastName']}
                    placeholder="Dubois"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="tel"
                    label="Téléphone"
                    name="customer.phone"
                    value={formData.customer.phone}
                    onChange={handleInputChange}
                    error={errors['customer.phone']}
                    placeholder="06 12 34 56 78"
                    leftIcon={PhoneIcon}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="email"
                    label="Email (optionnel)"
                    name="customer.email"
                    value={formData.customer.email}
                    onChange={handleInputChange}
                    error={errors['customer.email']}
                    placeholder="marie.dubois@email.com"
                    leftIcon={EnvelopeIcon}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Section Réservation */}
            <div className="form-section">
              <h3 className="section-title">
                <CalendarDaysIcon className="h-5 w-5" />
                Détails de la réservation
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <Input
                    type="datetime-local"
                    label="Date et heure"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleInputChange}
                    error={errors.dateTime}
                    leftIcon={ClockIcon}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="number"
                    label="Nombre de personnes"
                    name="guestsCount"
                    value={formData.guestsCount}
                    onChange={handleInputChange}
                    error={errors.guestsCount}
                    min="1"
                    max="20"
                    leftIcon={UserGroupIcon}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="form-label">
                    <TableCellsIcon className="h-5 w-5" />
                    Table assignée (optionnel)
                  </label>
                  
                  <div className="select-wrapper">
                    <select
                      value={formData.table?.id || ''}
                      onChange={handleTableSelect}
                      className="table-select"
                      disabled={loading}
                    >
                      <option value="">Assignation automatique</option>
                      {suitableTables.map((table) => (
                        <option key={table.id} value={table.id}>
                          Table {table.number} (jusqu'à {table.capacity} personnes)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {errors.table && (
                    <p className="error-message">{errors.table}</p>
                  )}
                  
                  {formData.guestsCount > 0 && suitableTables.length === 0 && (
                    <p className="help-message">
                      Aucune table disponible pour {formData.guestsCount} personne(s). 
                      L'assignation se fera automatiquement.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section Notes */}
            <div className="form-section">
              <h3 className="section-title">
                <ChatBubbleLeftIcon className="h-5 w-5" />
                Notes et demandes
              </h3>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <Input
                    type="textarea"
                    label="Demandes spéciales"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Allergie, préférence de table, occasion spéciale..."
                    rows={3}
                    maxLength={500}
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group full-width">
                  <Input
                    type="textarea"
                    label="Notes internes"
                    name="internalNotes"
                    value={formData.internalNotes}
                    onChange={handleInputChange}
                    placeholder="Notes pour l'équipe (non visibles par le client)"
                    rows={2}
                    maxLength={300}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Section Statut (mode édition uniquement) */}
            {reservation && (
              <div className="form-section">
                <h3 className="section-title">Statut</h3>
                
                <div className="status-selector">
                  <div className="radio-group">
                    {Object.values(RESERVATION_STATUS).map((status) => (
                      <label key={status} className="radio-option">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={handleInputChange}
                          disabled={loading}
                        />
                        <span className="radio-label">
                          {status === RESERVATION_STATUS.PENDING && 'En attente'}
                          {status === RESERVATION_STATUS.CONFIRMED && 'Confirmée'}
                          {status === RESERVATION_STATUS.SEATED && 'Installée'}
                          {status === RESERVATION_STATUS.COMPLETED && 'Terminée'}
                          {status === RESERVATION_STATUS.CANCELLED && 'Annulée'}
                          {status === RESERVATION_STATUS.NO_SHOW && 'No-show'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="modal-footer">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {reservation ? 'Mettre à jour' : 'Créer la réservation'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ========================================
// 📋 PROPTYPES
// ========================================

ReservationFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    _id: PropTypes.string,
    reservationNumber: PropTypes.string,
    customer: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    }),
    dateTime: PropTypes.string,
    guestsCount: PropTypes.number,
    specialRequests: PropTypes.string,
    internalNotes: PropTypes.string,
    table: PropTypes.shape({
      id: PropTypes.string,
      number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      capacity: PropTypes.number
    }),
    status: PropTypes.string
  }),
  loading: PropTypes.bool
};

export default ReservationFormModal;