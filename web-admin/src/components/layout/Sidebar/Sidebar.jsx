// Sidebar de navigation
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
  selectHasPermission,
  selectUserRole
} from '@/store/slices/authSlice';

// Composants
import SidebarSection from './SidebarSection';
import SidebarItem from './SidebarItem';

// Styles
import './Sidebar.scss';

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
            id: 'daily-specials',
            label: 'Plats du jour',
            path: '/menu/daily-specials'
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
        description: 'Suivi des commandes en temps réel',
        badge: 'live'
      },
      {
        id: 'reservations',
        label: 'Réservations',
        icon: CalendarDaysIcon,
        path: '/reservations',
        permissions: ['manage_reservations'],
        description: 'Gestion des réservations'
      },
      {
        id: 'tables',
        label: 'Tables',
        icon: TableCellsIcon,
        path: '/tables',
        permissions: ['manage_tables'],
        description: 'Plan de salle et gestion des tables'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    type: 'section',
    items: [
      {
        id: 'analytics-dashboard',
        label: 'Vue d\'ensemble',
        icon: ChartBarIcon,
        path: '/analytics',
        permissions: ['view_analytics'],
        description: 'Tableaux de bord et métriques'
      },
      {
        id: 'reports',
        label: 'Rapports',
        icon: ClipboardDocumentListIcon,
        path: '/analytics/reports',
        permissions: ['view_analytics'],
        description: 'Rapports détaillés'
      }
    ]
  },
  {
    id: 'configuration',
    label: 'Configuration',
    type: 'section',
    items: [
      {
        id: 'settings',
        label: 'Paramètres',
        icon: Cog6ToothIcon,
        path: '/settings',
        permissions: ['manage_settings'],
        description: 'Configuration générale',
        subItems: [
          {
            id: 'general-settings',
            label: 'Général',
            path: '/settings/general'
          },
          {
            id: 'site-vitrine',
            label: 'Site vitrine',
            path: '/settings/site-vitrine'
          },
          {
            id: 'mobile-app',
            label: 'App mobile',
            path: '/settings/mobile-app'
          }
        ]
      }
    ]
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
  
  // État local pour les sous-menus ouverts
  const [expandedItems, setExpandedItems] = useState(new Set());
  
  // ========================================
  // 🔄 LOGIQUE DE FILTRAGE
  // ========================================
  
  // Filtrer les éléments selon les permissions
  const filteredNavigation = useMemo(() => {
    const hasPermission = (permissions) => {
      if (!permissions || permissions.length === 0) return true;
      if (userRole === 'admin') return true;
      
      const userPermissions = currentUser?.permissions || [];
      return permissions.some(permission => userPermissions.includes(permission));
    };
    
    const filterItems = (items) => {
      return items.filter(item => {
        if (item.type === 'section') {
          const filteredSubItems = filterItems(item.items);
          return filteredSubItems.length > 0;
        }
        return hasPermission(item.permissions);
      }).map(item => {
        if (item.type === 'section') {
          return {
            ...item,
            items: filterItems(item.items)
          };
        }
        return item;
      });
    };
    
    return filterItems(NAVIGATION_CONFIG);
  }, [currentUser, userRole]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleCollapseSidebar = () => {
    dispatch(collapseSidebar());
  };
  
  const handleItemClick = (itemId, hasSubItems = false) => {
    dispatch(setActiveSection(itemId));
    
    if (hasSubItems) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    }
    
    // Fermer la sidebar sur mobile après clic
    if (responsive.isMobile) {
      dispatch({ type: 'ui/closeSidebar' });
    }
  };
  
  const isItemActive = (item) => {
    if (item.path === '/' && location.pathname === '/') {
      return true;
    }
    if (item.path !== '/' && location.pathname.startsWith(item.path)) {
      return true;
    }
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname.startsWith(subItem.path));
    }
    return false;
  };
  
  const isItemExpanded = (itemId) => {
    return expandedItems.has(itemId);
  };
  
  // ========================================
  // 🎨 CLASSES CSS DYNAMIQUES
  // ========================================
  
  const getSidebarClasses = () => {
    const classes = ['admin-sidebar'];
    
    if (sidebar.isOpen) classes.push('sidebar-open');
    if (sidebar.isCollapsed) classes.push('sidebar-collapsed');
    if (responsive.isMobile) classes.push('sidebar-mobile');
    
    return classes.join(' ');
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: responsive.isMobile ? '-100%' : -240,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };
  
  // ========================================
  // 🎯 RENDU DES ÉLÉMENTS
  // ========================================
  
  const renderNavigationItem = (item, index) => {
    if (item.type === 'section') {
      return (
        <SidebarSection
          key={item.id}
          title={item.label}
          collapsed={sidebar.isCollapsed}
        >
          {item.items.map((subItem, subIndex) => 
            renderNavigationItem(subItem, subIndex)
          )}
        </SidebarSection>
      );
    }
    
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = isItemActive(item);
    const isExpanded = isItemExpanded(item.id);
    
    return (
      <motion.div
        key={item.id}
        custom={index}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="sidebar-item-container"
      >
        <SidebarItem
          item={item}
          isActive={isActive}
          isExpanded={isExpanded}
          collapsed={sidebar.isCollapsed}
          onClick={() => handleItemClick(item.id, hasSubItems)}
        />
        
        {/* Sous-éléments */}
        <AnimatePresence>
          {hasSubItems && isExpanded && !sidebar.isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sidebar-subitems"
            >
              {item.subItems.map(subItem => (
                <NavLink
                  key={subItem.id}
                  to={subItem.path}
                  className={({ isActive }) => 
                    `sidebar-subitem ${isActive ? 'active' : ''}`
                  }
                  onClick={() => handleItemClick(subItem.id)}
                >
                  <span className="subitem-label">{subItem.label}</span>
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
  // ========================================
  // 🎯 RENDU PRINCIPAL
  // ========================================
  
  return (
    <motion.aside
      className={getSidebarClasses()}
      variants={sidebarVariants}
      animate={sidebar.isOpen ? 'open' : 'closed'}
    >
      <div className="sidebar-content">
        {/* Header de la sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img 
              src="/assets/logos/zengest-mini.svg" 
              alt="Zengest" 
              className="sidebar-logo"
            />
            {!sidebar.isCollapsed && (
              <motion.div
                className="sidebar-brand-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2>Zengest</h2>
                <span>Admin</span>
              </motion.div>
            )}
          </div>
          
          {/* Bouton collapse (desktop seulement) */}
          {!responsive.isMobile && (
            <motion.button
              className="sidebar-collapse-button"
              onClick={handleCollapseSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={sidebar.isCollapsed ? 'Développer' : 'Réduire'}
            >
              {sidebar.isCollapsed ? (
                <ChevronRightIcon className="icon" />
              ) : (
                <ChevronLeftIcon className="icon" />
              )}
            </motion.button>
          )}
        </div>
        
        {/* Navigation principale */}
        <nav className="sidebar-navigation">
          <div className="sidebar-nav-content">
            {filteredNavigation.map((item, index) => 
              renderNavigationItem(item, index)
            )}
          </div>
        </nav>
        
        {/* Footer de la sidebar */}
        {!sidebar.isCollapsed && (
          <motion.div
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="sidebar-user-info">
              <div className="user-avatar-small">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.firstName} />
                ) : (
                  <span className="user-initials">
                    {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                  </span>
                )}
              </div>
              <div className="user-details">
                <span className="user-name">
                  {currentUser?.firstName} {currentUser?.lastName}
                </span>
                <span className="user-role">{currentUser?.role}</span>
              </div>
            </div>
            
            <div className="sidebar-version">
              <span>v{import.meta.env.VITE_APP_VERSION || '1.0.0'}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;