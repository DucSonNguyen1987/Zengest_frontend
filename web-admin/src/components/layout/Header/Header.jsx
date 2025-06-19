// web-admin/src/components/layout/Header/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import {
  toggleSidebar,
  toggleTheme,
  setSearchQuery,
  setSearchActive,
  markAllNotificationsAsRead,
  openModal
} from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice'; // ✅ Corriger l'import

// Sélecteurs
import {
  selectCurrentUser,
  selectIsAuthenticated
} from '@/store/slices/authSlice';
import {
  selectSidebar,
  selectTheme,
  selectNotifications,
  selectSearch,
  selectResponsive
} from '@/store/slices/uiSlice';

// Hooks
import { useClickOutside } from '@/hooks/ui/useClickOutside';
import { useDebounce } from '@/hooks/ui/useDebounce';

// Composants
import SearchResults from './SearchResults';
//import NotificationDropdown from './NotificationDropdown';
//import UserDropdown from './UserDropdown';

// Styles
//import './Header.scss';

// ========================================
// 🏗️ COMPOSANT HEADER
// ========================================

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // États Redux
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const sidebar = useSelector(selectSidebar);
  const theme = useSelector(selectTheme);
  const notifications = useSelector(selectNotifications);
  const search = useSelector(selectSearch);
  const responsive = useSelector(selectResponsive);
  
  // États locaux
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  
  // Refs
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);
  
  // Hooks personnalisés
  const debouncedSearchQuery = useDebounce(search.query, 300);
  
  // Fermeture des menus au clic extérieur
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));
  useClickOutside(notificationMenuRef, () => setIsNotificationMenuOpen(false));
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Recherche avec debounce
  useEffect(() => {
    if (debouncedSearchQuery) {
      // Effectuer la recherche
      console.log('Recherche:', debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
    setIsSearchActive(query.length > 0);
  };
  
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    dispatch(setSearchActive(true));
  };
  
  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setTimeout(() => {
      if (!search.query) {
        setIsSearchActive(false);
        dispatch(setSearchActive(false));
      }
    }, 200);
  };
  
  const handleNotificationToggle = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
    if (!isNotificationMenuOpen) {
      dispatch(markAllNotificationsAsRead());
    }
  };
  
  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // ✅ Utiliser logout au lieu de logoutUser
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate('/profile');
  };
  
  const handleSettingsClick = () => {
    setIsUserMenuOpen(false);
    navigate('/settings');
  };
  
  // ========================================
  // 🎨 CLASSES CSS DYNAMIQUES
  // ========================================
  
  const getHeaderClasses = () => {
    const classes = ['admin-header'];
    
    if (sidebar.isVisible && !responsive.isMobile) {
      classes.push('sidebar-open');
    }
    
    if (isSearchFocused) {
      classes.push('search-focused');
    }
    
    return classes.join(' ');
  };
  
  // ========================================
  // 🏷️ HELPERS
  // ========================================
  
  const getPageTitle = () => {
    const pathMap = {
      '/': 'Dashboard',
      '/users': 'Gestion des utilisateurs',
      '/restaurants': 'Gestion des restaurants',
      '/menu': 'Gestion du menu',
      '/orders': 'Commandes',
      '/reservations': 'Réservations',
      '/tables': 'Gestion des tables',
      '/analytics': 'Analytics',
      '/settings': 'Paramètres'
    };
    
    return pathMap[location.pathname] || 'Zengest Admin';
  };
  
  const getUserInitials = () => {
    if (!currentUser?.name) return 'ZA';
    const nameParts = currentUser.name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('').toUpperCase().slice(0, 2) || 'ZA';
  };
  
  const getUnreadNotificationsCount = () => {
    return notifications.filter(n => !n.read).length;
  };
  
  // ========================================
  // 🎯 RENDU
  // ========================================
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <header className={getHeaderClasses()}>
      <div className="header-content">
        {/* Section gauche */}
        <div className="header-left">
          {/* Bouton menu mobile/sidebar */}
          <motion.button
            className="header-menu-button"
            onClick={handleSidebarToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle sidebar"
          >
            {responsive.isMobile ? (
              sidebar.isVisible ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
          
          {/* Titre de la page */}
          <div className="header-title">
            <h1>{getPageTitle()}</h1>
          </div>
        </div>
        
        {/* Section centrale - Recherche */}
        <div className="header-center">
          <div className={`header-search ${isSearchActive ? 'is-active' : ''}`} ref={searchRef}>
            <MagnifyingGlassIcon className="header-search-icon" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search.query || ''}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="header-search-input"
            />
            
            {/* Résultats de recherche */}
            <AnimatePresence>
              {isSearchActive && search.query && (
                <motion.div
                  className="header-search-results"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SearchResults query={search.query} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Section droite */}
        <div className="header-right">
          {/* Bouton thème */}
          <motion.button
            className="header-action-button"
            onClick={handleThemeToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={theme.current === 'light' ? 'Mode sombre' : 'Mode clair'}
          >
            {theme.current === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </motion.button>
          
          {/* Notifications */}
          <div className="header-notifications" ref={notificationMenuRef}>
            <motion.button
              className="header-action-button"
              onClick={handleNotificationToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              {getUnreadNotificationsCount() > 0 && (
                <span className="notification-badge">
                  {getUnreadNotificationsCount()}
                </span>
              )}
            </motion.button>
            
            {/* Menu des notifications */}
            <AnimatePresence>
              {isNotificationMenuOpen && (
                <motion.div
                  className="header-dropdown notification-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                  </div>
                  <div className="dropdown-content">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        >
                          <div className="notification-content">
                            <p className="notification-title">{notification.title}</p>
                            <p className="notification-message">{notification.message}</p>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">
                        <p>Aucune notification</p>
                      </div>
                    )}
                  </div>
                  <div className="dropdown-footer">
                    <button className="view-all-button">
                      Voir toutes les notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Menu utilisateur */}
          <div className="header-user" ref={userMenuRef}>
            <motion.button
              className="header-user-button"
              onClick={handleUserMenuToggle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="user-avatar">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <span className="user-initials">{getUserInitials()}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser?.name || 'Utilisateur'}</span>
                <span className="user-role">{currentUser?.role || 'Employé'}</span>
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </motion.button>
            
            {/* Menu déroulant utilisateur */}
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  className="header-dropdown user-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="dropdown-content">
                    <button onClick={handleProfileClick} className="dropdown-item">
                      <UserIcon className="h-4 w-4" />
                      <span>Mon profil</span>
                    </button>
                    <button onClick={handleSettingsClick} className="dropdown-item">
                      <Cog6ToothIcon className="h-4 w-4" />
                      <span>Paramètres</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item danger">
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;