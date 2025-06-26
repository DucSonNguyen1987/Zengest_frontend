import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    XMarkIcon,
    CalendarDaysIcon,
    ClockIcon,
    UserGroupIcon,
    PhoneIcon,
    EnvelopeIcon,
    ChatBubbleLeftEllipsisIcon,
    CheckCircleIcon,
    XCircleIcon,
    PencilIcon,
    TableCellsIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Composants
import Button from '../../common/Button/Button.jsx';
import ConfirmModal from '../../common/Modal/ConfirmModal.jsx';


// Utilitaires
import { formatDate, formatTime, formatDateTime } from '@utils/formatters/formatters.js';
import { RESERVATION_STATUS } from '@shared/constants/constants.js';

// Styles 
import '../../../styles/components/ReservationDetailsModal.scss';
import { set } from 'mongoose';


// MODAL DETAILS RESERVATIONS

const ReservationDetailsModal = ({
    isOpen,
    onClose,
    reservation,
    onConfirm,
    onCancel,
    onEdit,
    loading = false
}) => {
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    // Gestionnaires d'événements

    const handleConfirm = () => {
        onConfirm?.(reservation);
    };

    const handleCancel = () => {
        if (cancelReason.trim()) {
            onCancel?.(reservation, cancelReason);
            setShowCancelConfirm(false);
            setCancelReason('');
            onClose();
        }
    };

    const handleCancelClick = () => {
        setShowCancelConfirm(true);
    };
// ========================================
  // 🎨 FONCTIONS UTILITAIRES
  // ========================================

  const getStatusColor = (status) => {
    const colors = {
      [RESERVATION_STATUS.PENDING]: 'warning',
      [RESERVATION_STATUS.CONFIRMED]: 'success',
      [RESERVATION_STATUS.SEATED]: 'info',
      [RESERVATION_STATUS.COMPLETED]: 'success',
      [RESERVATION_STATUS.CANCELLED]: 'danger',
      [RESERVATION_STATUS.NO_SHOW]: 'danger'
    };
    return colors[status] || 'secondary';
  };

  const getStatusLabel = (status) => {
    const labels = {
      [RESERVATION_STATUS.PENDING]: 'En attente',
      [RESERVATION_STATUS.CONFIRMED]: 'Confirmée',
      [RESERVATION_STATUS.SEATED]: 'Installée',
      [RESERVATION_STATUS.COMPLETED]: 'Terminée',
      [RESERVATION_STATUS.CANCELLED]: 'Annulée',
      [RESERVATION_STATUS.NO_SHOW]: 'No-show'
    };
    return labels[status] || status;
  };

  const canConfirm = reservation?.status === RESERVATION_STATUS.PENDING;
  const canCancel = [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED].includes(reservation?.status);
  const canEdit = [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED].includes(reservation?.status);

  // ========================================
  // 🎨 RENDU
  // ========================================

  if (!isOpen || !reservation) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="reservation-details-modal" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* En-tête */}
          <div className="modal-header">
            <div className="modal-title">
              <h2>Détails de la réservation</h2>
              <span className={`status-badge status-badge--${getStatusColor(reservation.status)}`}>
                {getStatusLabel(reservation.status)}
              </span>
            </div>
            
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Fermer"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Contenu */}
          <div className="modal-content">
            {/* Informations principales */}
            <div className="reservation-info">
              {/* Date et heure */}
              <div className="info-section">
                <h3 className="section-title">
                  <CalendarDaysIcon className="h-5 w-5" />
                  Date et heure
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>{formatDate(reservation.date)}</span>
                  </div>
                  <div className="info-item">
                    <ClockIcon className="h-4 w-4" />
                    <span>{formatTime(reservation.time)}</span>
                  </div>
                  <div className="info-item">
                    <UserGroupIcon className="h-4 w-4" />
                    <span>{reservation.guestsCount} personne{reservation.guestsCount > 1 ? 's' : ''}</span>
                  </div>
                  {reservation.table && (
                    <div className="info-item">
                      <TableCellsIcon className="h-4 w-4" />
                      <span>Table {reservation.table.number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations client */}
              <div className="info-section">
                <h3 className="section-title">
                  <UserGroupIcon className="h-5 w-5" />
                  Informations client
                </h3>
                <div className="customer-info">
                  <div className="customer-name">
                    {reservation.customer.firstName} {reservation.customer.lastName}
                  </div>
                  <div className="customer-contacts">
                    {reservation.customer.email && (
                      <div className="contact-item">
                        <EnvelopeIcon className="h-4 w-4" />
                        <a href={`mailto:${reservation.customer.email}`}>
                          {reservation.customer.email}
                        </a>
                      </div>
                    )}
                    {reservation.customer.phone && (
                      <div className="contact-item">
                        <PhoneIcon className="h-4 w-4" />
                        <a href={`tel:${reservation.customer.phone}`}>
                          {reservation.customer.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Demandes spéciales */}
              {reservation.specialRequests && (
                <div className="info-section">
                  <h3 className="section-title">
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                    Demandes spéciales
                  </h3>
                  <div className="special-requests">
                    {reservation.specialRequests}
                  </div>
                </div>
              )}

              {/* Notes internes */}
              {reservation.internalNotes && (
                <div className="info-section">
                  <h3 className="section-title">
                    <ExclamationTriangleIcon className="h-5 w-5" />
                    Notes internes
                  </h3>
                  <div className="internal-notes">
                    {reservation.internalNotes}
                  </div>
                </div>
              )}

              {/* Historique */}
              <div className="info-section">
                <h3 className="section-title">Historique</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-title">Réservation créée</div>
                      <div className="timeline-date">
                        {formatDateTime(reservation.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  {reservation.confirmedAt && (
                    <div className="timeline-item">
                      <div className="timeline-marker timeline-marker--success"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">Réservation confirmée</div>
                        <div className="timeline-date">
                          {formatDateTime(reservation.confirmedAt)}
                        </div>
                      </div>
                    </div>
                  )}

                  {reservation.cancelledAt && (
                    <div className="timeline-item">
                      <div className="timeline-marker timeline-marker--danger"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">Réservation annulée</div>
                        <div className="timeline-date">
                          {formatDateTime(reservation.cancelledAt)}
                        </div>
                        {reservation.cancellationReason && (
                          <div className="timeline-reason">
                            Raison: {reservation.cancellationReason}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-footer">
            <div className="action-buttons">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Fermer
              </Button>

              {canEdit && (
                <Button
                  variant="outline"
                  leftIcon={PencilIcon}
                  onClick={handleEdit}
                  disabled={loading}
                >
                  Modifier
                </Button>
              )}

              {canConfirm && (
                <Button
                  variant="success"
                  leftIcon={CheckCircleIcon}
                  onClick={handleConfirm}
                  loading={loading}
                >
                  Confirmer
                </Button>
              )}

              {canCancel && (
                <Button
                  variant="danger"
                  leftIcon={XCircleIcon}
                  onClick={handleCancelClick}
                  disabled={loading}
                >
                  Annuler
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation d'annulation */}
      <ConfirmModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleCancel}
        title="Annuler la réservation"
        type="danger"
        confirmText="Annuler la réservation"
        loading={loading}
      >
        <div className="cancel-form">
          <p>Êtes-vous sûr de vouloir annuler cette réservation ?</p>
          
          <div className="form-group">
            <label htmlFor="cancel-reason">
              Raison de l'annulation <span className="required">*</span>
            </label>
            <textarea
              id="cancel-reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Expliquez la raison de l'annulation..."
              rows={3}
              required
            />
          </div>
        </div>
      </ConfirmModal>
    </>
  );
};

// ========================================
// 📋 PROPTYPES
// ========================================

ReservationDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    guestsCount: PropTypes.number.isRequired,
    customer: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string
    }).isRequired,
    table: PropTypes.shape({
      number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    specialRequests: PropTypes.string,
    internalNotes: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    confirmedAt: PropTypes.string,
    cancelledAt: PropTypes.string,
    cancellationReason: PropTypes.string
  }),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onEdit: PropTypes.func,
  loading: PropTypes.bool
};

export default ReservationDetailsModal;