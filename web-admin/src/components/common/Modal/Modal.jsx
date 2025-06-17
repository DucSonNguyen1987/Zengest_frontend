// Composant modal réutilisable
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

// Composants
import Button from '../Button/Button';

// Hooks
import { useClickOutside } from '@/hooks/ui/useClickOutside';

// Styles
import './Modal.scss';

// ========================================
// 🎯 COMPOSANT MODAL PRINCIPAL
// ========================================

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'medium',
  closable = true,
  closeOnEscape = true,
  closeOnOverlay = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer = null,
  confirmButton = null,
  cancelButton = null,
  loading = false,
  centered = true,
  scrollable = false,
  maxHeight = null,
  zIndex = 1000,
  preventBodyScroll = true,
  animate = true,
  onConfirm = null,
  onCancel = null,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'default' // default, danger, warning, info
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Gestion du focus et scroll
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément actif
      previousActiveElement.current = document.activeElement;
      
      // Empêcher le scroll du body
      if (preventBodyScroll) {
        document.body.style.overflow = 'hidden';
      }
      
      // Focus sur la modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restaurer le scroll du body
      if (preventBodyScroll) {
        document.body.style.overflow = '';
      }
      
      // Restaurer le focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    
    return () => {
      if (preventBodyScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, preventBodyScroll]);
  
  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && closable && !loading) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, closable, loading, onClose]);
  
  // Hook pour clic à l'extérieur
  useClickOutside(modalRef, () => {
    if (closeOnOverlay && closable && !loading) {
      onClose();
    }
  }, isOpen);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleClose = () => {
    if (closable && !loading) {
      onClose();
    }
  };
  
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      handleClose();
    }
  };
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay && closable && !loading) {
      onClose();
    }
  };
  
  // ========================================
  // 🎨 CLASSES CSS
  // ========================================
  
  const getModalClasses = () => {
    const classes = ['modal'];
    
    classes.push(`modal--${size}`);
    classes.push(`modal--${variant}`);
    
    if (centered) classes.push('modal--centered');
    if (scrollable) classes.push('modal--scrollable');
    if (loading) classes.push('modal--loading');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  const getOverlayClasses = () => {
    const classes = ['modal__overlay'];
    if (overlayClassName) classes.push(overlayClassName);
    return classes.join(' ');
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -50,
      transition: { 
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };
  
  // ========================================
  // 🎯 RENDU DU HEADER
  // ========================================
  
  const renderHeader = () => {
    if (!title && !showCloseButton) return null;
    
    return (
      <div className={`modal__header ${headerClassName}`}>
        {title && (
          <div className="modal__title">
            {variant === 'danger' && <ExclamationTriangleIcon className="modal__title-icon modal__title-icon--danger" />}
            {variant === 'warning' && <ExclamationTriangleIcon className="modal__title-icon modal__title-icon--warning" />}
            <h3>{title}</h3>
          </div>
        )}
        
        {showCloseButton && closable && (
          <button
            className="modal__close-button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Fermer la modal"
          >
            <XMarkIcon className="modal__close-icon" />
          </button>
        )}
      </div>
    );
  };
  
  // ========================================
  // 🎯 RENDU DU FOOTER
  // ========================================
  
  const renderFooter = () => {
    // Footer personnalisé
    if (footer) {
      return (
        <div className={`modal__footer ${footerClassName}`}>
          {footer}
        </div>
      );
    }
    
    // Boutons de confirmation/annulation
    if (confirmButton || cancelButton || onConfirm || onCancel) {
      return (
        <div className={`modal__footer ${footerClassName}`}>
          <div className="modal__actions">
            {(cancelButton || onCancel) && (
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                {cancelButton || cancelText}
              </Button>
            )}
            
            {(confirmButton || onConfirm) && (
              <Button
                variant={variant === 'danger' ? 'danger' : 'primary'}
                onClick={handleConfirm}
                loading={loading}
              >
                {confirmButton || confirmText}
              </Button>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  // ========================================
  // 🎯 RENDU PRINCIPAL
  // ========================================
  
  if (!isOpen) return null;
  
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={getOverlayClasses()}
          style={{ zIndex }}
          variants={animate ? overlayVariants : {}}
          initial={animate ? "hidden" : false}
          animate={animate ? "visible" : false}
          exit={animate ? "exit" : false}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            className={getModalClasses()}
            style={{ maxHeight }}
            variants={animate ? modalVariants : {}}
            initial={animate ? "hidden" : false}
            animate={animate ? "visible" : false}
            exit={animate ? "exit" : false}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            tabIndex={-1}
          >
            {renderHeader()}
            
            <div className={`modal__body ${bodyClassName}`}>
              {children}
            </div>
            
            {renderFooter()}
            
            {loading && (
              <div className="modal__loading-overlay">
                <div className="modal__spinner">
                  <div className="spinner"></div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  // Utiliser un portail pour rendre la modal dans le body
  return createPortal(modalContent, document.body);
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'fullscreen']),
  closable: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnOverlay: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  footer: PropTypes.node,
  confirmButton: PropTypes.node,
  cancelButton: PropTypes.node,
  loading: PropTypes.bool,
  centered: PropTypes.bool,
  scrollable: PropTypes.bool,
  maxHeight: PropTypes.string,
  zIndex: PropTypes.number,
  preventBodyScroll: PropTypes.bool,
  animate: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'danger', 'warning', 'info'])
};

// ========================================
// 🎯 VARIANTES DE MODALES
// ========================================

// Modal de confirmation
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'default',
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    onCancel={onClose}
    title={title}
    confirmText={confirmText}
    cancelText={cancelText}
    variant={variant}
    size="small"
    {...props}
  >
    <p className="modal__message">{message}</p>
  </Modal>
);

// Modal de suppression
export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = 'élément',
  ...props
}) => (
  <ConfirmModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Confirmer la suppression"
    message={`Êtes-vous sûr de vouloir supprimer ${itemName ? `"${itemName}"` : `cet ${itemType}`} ? Cette action est irréversible.`}
    confirmText="Supprimer"
    cancelText="Annuler"
    variant="danger"
    {...props}
  />
);

// Modal d'information
export const InfoModal = ({
  isOpen,
  onClose,
  title = 'Information',
  message,
  confirmText = 'OK',
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onClose}
    title={title}
    confirmText={confirmText}
    variant="info"
    size="small"
    {...props}
  >
    <p className="modal__message">{message}</p>
  </Modal>
);

export default Modal;