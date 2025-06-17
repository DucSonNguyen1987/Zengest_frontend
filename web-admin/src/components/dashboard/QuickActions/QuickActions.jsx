import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  UserPlusIcon, 
  DocumentPlusIcon,
  CalendarPlusIcon,
  Cog6ToothIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

import Button from '../../common/Button/Button';
import { usePermissions } from '@/hooks/usePermissions';

import './QuickActions.scss';

const QuickActions = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  
  // ========================================
  // 🎯 CONFIGURATION DES ACTIONS
  // ========================================
  
  const actions = [
    {
      id: 'new-order',
      label: 'Nouvelle commande',
      icon: PlusIcon,
      color: 'primary',
      path: '/orders/new',
      permission: 'manage_orders',
      description: 'Créer une nouvelle commande'
    },
    {
      id: 'new-reservation',
      label: 'Nouvelle réservation',
      icon: CalendarPlusIcon,
      color: 'success',
      path: '/reservations/new',
      permission: 'manage_reservations',
      description: 'Ajouter une réservation'
    },
    {
      id: 'new-user',
      label: 'Nouvel utilisateur',
      icon: UserPlusIcon,
      color: 'info',
      path: '/users/new',
      permission: 'manage_users',
      description: 'Créer un compte utilisateur'
    },
    {
      id: 'new-menu-item',
      label: 'Nouveau plat',
      icon: DocumentPlusIcon,
      color: 'warning',
      path: '/menu/items/new',
      permission: 'manage_menu',
      description: 'Ajouter un plat au menu'
    },
    {
      id: 'view-analytics',
      label: 'Analytics',
      icon: ChartBarIcon,
      color: 'secondary',
      path: '/analytics',
      permission: 'view_analytics',
      description: 'Voir les statistiques'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Cog6ToothIcon,
      color: 'dark',
      path: '/settings',
      permission: 'manage_settings',
      description: 'Configuration système'
    }
  ];
  
  // Filtrer les actions selon les permissions
  const availableActions = actions.filter(action => 
    !action.permission || hasPermission(action.permission)
  );
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleActionClick = (action) => {
    if (action.path) {
      navigate(action.path);
    }
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // ========================================
  // 🎯 RENDU
  // ========================================
  
  return (
    <div className="quick-actions">
      <div className="quick-actions__header">
        <h3 className="quick-actions__title">Actions rapides</h3>
        <p className="quick-actions__subtitle">
          Accès direct aux fonctionnalités principales
        </p>
      </div>
      
      <motion.div 
        className="quick-actions__grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {availableActions.map((action) => (
          <motion.div
            key={action.id}
            className="quick-actions__item"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={action.color}
              icon={action.icon}
              onClick={() => handleActionClick(action)}
              fullWidth
              className="quick-action-button"
            >
              {action.label}
            </Button>
            
            <p className="quick-actions__description">
              {action.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
      
      {availableActions.length === 0 && (
        <div className="quick-actions__empty">
          <p>Aucune action disponible avec vos permissions actuelles</p>
        </div>
      )}
    </div>
  );
};

export default QuickActions;