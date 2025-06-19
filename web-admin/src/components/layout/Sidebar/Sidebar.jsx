// web-admin/src/components/layout/Sidebar/Sidebar.jsx
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  TableCellsIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  BellIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import { collapseSidebar, setActiveSection } from '@/store/slices/uiSlice';

// Sélecteurs
import {
  selectSidebar,
  selectResponsive,
  selectTheme
} from '@/store/slices/uiSlice';
import {
  selectCurrentUser,
  selectUserRole // Remplacer selectHasPermission par selectUserRole
} from '@/store/slices/authSlice';

// Hooks
import { usePermissions } from '@/hooks/auth/usePermissions';

// Composants
import SidebarSection from './SidebarSection';

// Styles
//import './Sidebar.scss';

// ========================================
// 📋 CONFIGURATION DE LA NAVIGATION
// ========================================

const NAVIGATION_CONFIG = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    path: '/',
    permissions: [],
    badge: null
  },
  {
    id: 'management',
    label: 'Gestion',
    type: 'section',
    items: [
      {
        id: 'users',
        label: 'Utilisateurs',
        icon: UsersIcon,
        path: '/users',
        permissions: ['manage_users', 'view_users'],
        description: 'Gestion des utilisateurs et rôles'
      },
      {
        id: 'restaurants',
        label: 'Restaurants',
        icon: BuildingStorefrontIcon,
        path: '/restaurants',
        permissions: ['manage_restaurant'],
        description: 'Configuration des restaurants'
      },
      {
        id: 'menu',
        label: 'Menu',
        icon: Squares2X2Icon,
        path: '/menu',
        permissions: ['manage_menu'],
        description: 'Gestion du menu et des plats',
        subItems: [
          {
            id: 'menu-items',
            label: 'Articles',
            path: '/menu/items'
          },
          {
            id: 'menu-categories',
            label: 'Catégories',
            path: '/menu/categories'
          },
          {
            id: 'menu-specials',
            label: 'Plats du jour',
            path: '/menu/specials'
          }
        ]
      }
    ]
  },
  {
    id: 'operations',
    label: 'Opérations',
    type: 'section',
    items: [
      {
        id: 'orders',
        label: 'Commandes',
        icon: ShoppingBagIcon,
        path: '/orders',
        permissions: ['manage_orders', 'view_orders'],
        description: 'Gestion des commandes',
        badge: 'live'
      },
      {
        id: 'tables',
        label: 'Tables',
        icon: TableCellsIcon,
        path: '/tables',
        permissions: ['manage_tables'],
        description: 'Plan de salle et gestion des tables'
      },
      {
        id: 'reservations',
        label: 'Réservations',
        icon: CalendarDaysIcon,
        path: '/reservations',
        permissions: ['manage_reservations'],
        description: 'Gestion des réservations',
        badge: 'new'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    type: 'section',
    items: [
      {
        id: 'reports',
        label: 'Rapports',
        icon: PresentationChartLineIcon,
        path: '/reports',
        permissions: ['view_analytics'],
        description: 'Rapports et statistiques'
      },
      {
        id: 'analytics',
        label: 'Analytiques',
        icon: ChartBarIcon,
        path: '/analytics',
        permissions: ['view_analytics'],
        description: 'Analyses avancées'
      }
    ]
  },
  {
    id: 'staff',
    label: 'Personnel',
    type: 'section',
    items: [
      {
        id: 'teams',
        label: 'Équipes',
        icon: UserGroupIcon,
        path: '/teams',
        permissions: ['manage_staff'],
        description: 'Gestion des équipes'
      },
      {
        id: 'tasks',
        label: 'Tâches',
        icon: ClipboardDocumentListIcon,
        path: '/tasks',
        permissions: ['manage_tasks'],
        description: 'Gestion des tâches'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: Cog6ToothIcon,
    path: '/settings',
    permissions: ['manage_settings'],
    description: 'Configuration du système'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    path: '/notifications',
    permissions: [],
    description: 'Centre de notifications'
  },
  {
    id: 'help',
    label: 'Aide',
    icon: QuestionMarkCircleIcon,
    path: '/help',
    permissions: [],
    description: 'Documentation et support'
  }
];

// ========================================
// 🏗️ COMPOSANT SIDEBAR
// ========================================

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // États Redux
  const sidebar = useSelector(selectSidebar);
  const responsive = useSelector(selectResponsive);
  const theme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const userRole = useSelector(selectUserRole);
  
  // Hook pour les permissions
  const { checkPermission, checkAnyPermission } = usePermissions();
  
  // État local
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // ========================================
  // 🔄 LOGIQUE DE PERMISSIONS
  // ========================================
  
  // Fonction utilitaire pour vérifier les permissions
  const hasPermissionForItem = (permissions = []) => {
    if (!permissions || permissions.length === 0) return true;
    if (!currentUser) return false;
    
    // Admin a toutes les permissions
    if (userRole === 'admin') return true;
    
    // Vérifier si l'utilisateur a au moins une des permissions requises
    return checkAnyPermission(permissions);
  };
  
  // ========================================
  // 🎯 FILTRAGE DE LA NAVIGATION
  // ========================================
  
  const filteredNavigation = useMemo(() => {
    return NAVIGATION_CONFIG.filter(section => {
      // Si c'est une section avec des items
      if (section.items) {
        // Filtrer les items visibles de la section
        const visibleItems = section.items.filter(item => 
          hasPermissionForItem(item.permissions)
        );
        
        // Garder la section seulement si elle a des items visibles
        return visibleItems.length > 0;
      }
      
      // Pour les items individuels, vérifier leurs permissions
      return hasPermissionForItem(section.permissions);
    }).map(section => {
      // Si c'est une section avec des items, filtrer les items
      if (section.items) {
        return {
          ...section,
          items: section.items.filter(item => 
            hasPermissionForItem(item.permissions)
          )
        };
      }
      
      return section;
    });
  }, [currentUser, userRole, checkAnyPermission]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleToggleCollapse = () => {
    dispatch(collapseSidebar());
  };
  
  const handleItemClick = (item) => {
    // Fermer la sidebar sur mobile après clic
    if (responsive.isMobile && sidebar.isVisible) {
      dispatch(collapseSidebar());
    }
    
    // Marquer la section comme active
    dispatch(setActiveSection(item.id));
  };
  
  const handleItemHover = (itemId) => {
    if (sidebar.isCollapsed) {
      setHoveredItem(itemId);
    }
  };
  
  const handleItemLeave = () => {
    setHoveredItem(null);
  };
  
  // ========================================
  // 🎨 CLASSES CSS
  // ========================================
  
  const sidebarClasses = [
    'sidebar',
    sidebar.isCollapsed ? 'is-collapsed' : '',
    sidebar.isVisible ? 'is-visible' : 'is-hidden',
    responsive.isMobile ? 'is-mobile' : '',
    theme.current === 'dark' ? 'is-dark' : ''
  ].filter(Boolean).join(' ');
  
  // ========================================
  // 🎨 RENDU DU COMPOSANT
  // ========================================
  
  return (
    <>
      {/* Overlay mobile */}
      {responsive.isMobile && sidebar.isVisible && (
        <motion.div
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleToggleCollapse}
        />
      )}
      
      {/* Sidebar principale */}
      <motion.aside
        className={sidebarClasses}
        initial={false}
        animate={{
          width: sidebar.isCollapsed ? '60px' : '280px',
          x: sidebar.isVisible ? 0 : (responsive.isMobile ? -280 : 0)
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* En-tête */}
        <div className="sidebar-header">
          <motion.div
            className="sidebar-brand"
            animate={{ opacity: sidebar.isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {!sidebar.isCollapsed && (
              <>
                <img src="/logo.svg" alt="Zengest" className="sidebar-logo" />
                <span className="sidebar-brand-text">Zengest Admin</span>
              </>
            )}
          </motion.div>
          
          <button
            className="sidebar-toggle"
            onClick={handleToggleCollapse}
            title={sidebar.isCollapsed ? 'Développer' : 'Réduire'}
          >
            {sidebar.isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-nav-content">
            {filteredNavigation.map((section, index) => (
              <SidebarSection
                key={section.id}
                section={section}
                isCollapsed={sidebar.isCollapsed}
                currentUser={currentUser}
                onItemClick={handleItemClick}
                onItemHover={handleItemHover}
                onItemLeave={handleItemLeave}
                hoveredItem={hoveredItem}
              />
            ))}
          </div>
        </nav>
        
        {/* Pied de page */}
        {!sidebar.isCollapsed && (
          <motion.div
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <div className="sidebar-user-avatar-placeholder">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">
                  {currentUser?.name || 'Utilisateur'}
                </div>
                <div className="sidebar-user-role">
                  {currentUser?.role || 'Employé'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;