// web-admin/src/components/layout/Sidebar/SidebarSection.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon, 
  ChevronRightIcon,
  MinusIcon // Remplace CircleIcon par MinusIcon ou utilise un élément CSS
} from '@heroicons/react/24/outline';

// Alternative 1: Utiliser MinusIcon
// Alternative 2: Créer un composant bullet personnalisé
const BulletIcon = ({ className }) => (
  <span className={`inline-block rounded-full bg-current ${className}`} />
);

// ========================================
// 📂 COMPOSANT SECTION SIDEBAR
// ========================================

const SidebarSection = ({ 
  section, 
  isCollapsed = false, 
  currentUser = null,
  onItemClick = () => {} 
}) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(
    section.items?.some(item => location.pathname.startsWith(item.path)) || false
  );
  
  // ========================================
  // 🔄 VÉRIFICATIONS
  // ========================================
  
  // Vérifier les permissions pour un item
  const hasPermission = (permissions = []) => {
    if (!permissions || permissions.length === 0) return true;
    if (!currentUser) return false;
    
    // Admin a toutes les permissions
    if (currentUser.role === 'admin') return true;
    
    // Vérifier les permissions utilisateur
    const userPermissions = currentUser.permissions || [];
    return permissions.some(permission => userPermissions.includes(permission));
  };
  
  // Filtrer les items visibles selon les permissions
  const visibleItems = section.items?.filter(item => hasPermission(item.permissions)) || [];
  
  // Si aucun item visible, ne pas afficher la section
  if (visibleItems.length === 0) return null;
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const toggleExpanded = () => {
    if (!isCollapsed && section.type === 'section') {
      setIsExpanded(!isExpanded);
    }
  };
  
  const handleItemClick = (item) => {
    onItemClick(item);
  };
  
  // ========================================
  // 🎨 UTILITAIRES DE RENDU
  // ========================================
  
  const isItemActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname.startsWith(subItem.path));
    }
    return location.pathname.startsWith(item.path) && item.path !== '/';
  };
  
  const getItemClasses = (item) => {
    const baseClasses = "sidebar-item";
    const activeClass = isItemActive(item) ? "is-active" : "";
    const disabledClass = item.disabled ? "is-disabled" : "";
    
    return `${baseClasses} ${activeClass} ${disabledClass}`.trim();
  };
  
  const renderIcon = (item) => {
    if (!item.icon) return null;
    
    const Icon = item.icon;
    return (
      <span className="sidebar-item__icon">
        <Icon className="h-5 w-5" />
      </span>
    );
  };
  
  const renderBadge = (item) => {
    if (!item.badge) return null;
    
    const badgeClasses = {
      'new': 'tag is-success is-small',
      'live': 'tag is-warning is-small',
      'beta': 'tag is-info is-small',
      'number': 'tag is-primary is-small'
    };
    
    const badgeClass = badgeClasses[item.badge] || 'tag is-light is-small';
    
    return (
      <span className={badgeClass}>
        {typeof item.badge === 'number' ? item.badge : item.badge}
      </span>
    );
  };
  
  // ========================================
  // 🎨 RENDU ITEMS SIMPLES
  // ========================================
  
  const renderSimpleItem = (item, index) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={item.path}
        className={getItemClasses(item)}
        onClick={() => handleItemClick(item)}
        title={isCollapsed ? item.label : item.description}
      >
        {renderIcon(item)}
        
        {!isCollapsed && (
          <>
            <span className="sidebar-item__label">{item.label}</span>
            {renderBadge(item)}
            
            {item.subItems && (
              <span className="sidebar-item__arrow">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            )}
          </>
        )}
      </Link>
      
      {/* Sous-items */}
      {!isCollapsed && item.subItems && isItemActive(item) && (
        <AnimatePresence>
          <motion.ul
            className="sidebar-subitems"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.subItems.map((subItem, subIndex) => (
              <li key={subItem.id}>
                <Link
                  to={subItem.path}
                  className={`sidebar-subitem ${location.pathname === subItem.path ? 
                    'is-active' : ''}`}
                  onClick={() => handleItemClick(subItem)}
                >
                  {/* Option 1: Utiliser BulletIcon personnalisé */}
                  <BulletIcon className="h-2 w-2 sidebar-subitem__bullet" />
                  
                  {/* Option 2: Utiliser MinusIcon (décommentez cette ligne et commentez la précédente)
                  <MinusIcon className="h-2 w-2 sidebar-subitem__bullet" />
                  */}
                  
                  <span>{subItem.label}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </motion.li>
  );
  
  // ========================================
  // 🎨 RENDU SECTION
  // ========================================
  
  if (section.type === 'single') {
    // Item unique (pas de section)
    const item = section.items[0];
    return (
      <ul className="menu-list">
        {renderSimpleItem(item, 0)}
      </ul>
    );
  }
  
  // Section avec titre et items
  return (
    <div className="sidebar-section">
      {!isCollapsed && (
        <motion.div
          className={`sidebar-section__header ${section.items?.length > 0 ? 'is-clickable' : ''}`}
          onClick={toggleExpanded}
          whileHover={section.items?.length > 0 ? { backgroundColor: '#f5f5f5' } : {}}
        >
          <p className="menu-label sidebar-section__title">
            {section.label}
          </p>
          
          {section.items?.length > 0 && (
            <motion.span
              className="sidebar-section__toggle"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </motion.span>
          )}
        </motion.div>
      )}
      
      <AnimatePresence>
        {(isCollapsed || isExpanded) && visibleItems.length > 0 && (
          <motion.ul
            className="menu-list sidebar-section__items"
            initial={!isCollapsed ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {visibleItems.map((item, index) => renderSimpleItem(item, index))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarSection;