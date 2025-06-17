import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClockIcon, 
  UserIcon, 
  ShoppingBagIcon, 
  CalendarDaysIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import './RecentActivity.scss';

const RecentActivity = ({
  activities = [],
  loading = false,
  maxItems = 10,
  showTimestamp = true,
  onActivityClick = null
}) => {
  
  // ========================================
  // 🎯 ICÔNES PAR TYPE D'ACTIVITÉ
  // ========================================
  
  const getActivityIcon = (type) => {
    const iconMap = {
      'order': ShoppingBagIcon,
      'reservation': CalendarDaysIcon,
      'user': UserIcon,
      'system': ExclamationCircleIcon,
      'default': ClockIcon
    };
    
    return iconMap[type] || iconMap.default;
  };
  
  const getActivityColor = (type) => {
    const colorMap = {
      'order': 'blue',
      'reservation': 'green',
      'user': 'purple',
      'system': 'orange',
      'default': 'gray'
    };
    
    return colorMap[type] || colorMap.default;
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };
  
  // ========================================
  // 🎯 RENDU
  // ========================================
  
  if (loading) {
    return (
      <div className="recent-activity">
        <div className="recent-activity__header">
          <h3 className="recent-activity__title">Activité récente</h3>
        </div>
        <div className="recent-activity__list">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="activity-item activity-item--loading">
              <div className="activity-item__icon skeleton"></div>
              <div className="activity-item__content">
                <div className="skeleton skeleton--text"></div>
                <div className="skeleton skeleton--small"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const displayedActivities = activities.slice(0, maxItems);
  
  return (
    <div className="recent-activity">
      <div className="recent-activity__header">
        <h3 className="recent-activity__title">Activité récente</h3>
        {activities.length > maxItems && (
          <span className="recent-activity__count">
            {maxItems} sur {activities.length}
          </span>
        )}
      </div>
      
      {displayedActivities.length === 0 ? (
        <div className="recent-activity__empty">
          <ClockIcon className="empty-icon" />
          <p>Aucune activité récente</p>
        </div>
      ) : (
        <motion.div 
          className="recent-activity__list"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {displayedActivities.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              const color = getActivityColor(activity.type);
              
              return (
                <motion.div
                  key={activity.id || index}
                  className={`activity-item activity-item--${color} ${onActivityClick ? 'activity-item--clickable' : ''}`}
                  variants={itemVariants}
                  onClick={() => onActivityClick?.(activity)}
                  layout
                >
                  <div className="activity-item__icon">
                    <IconComponent className="icon" />
                  </div>
                  
                  <div className="activity-item__content">
                    <div className="activity-item__message">
                      {activity.message || activity.description}
                    </div>
                    
                    {showTimestamp && activity.timestamp && (
                      <div className="activity-item__timestamp">
                        {formatDistanceToNow(new Date(activity.timestamp), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </div>
                    )}
                    
                    {activity.user && (
                      <div className="activity-item__user">
                        par {activity.user.firstName} {activity.user.lastName}
                      </div>
                    )}
                  </div>
                  
                  {activity.status && (
                    <div className={`activity-item__status activity-item__status--${activity.status}`}>
                      {activity.status}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

RecentActivity.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
    timestamp: PropTypes.string,
    user: PropTypes.object,
    status: PropTypes.string
  })),
  loading: PropTypes.bool,
  maxItems: PropTypes.number,
  showTimestamp: PropTypes.bool,
  onActivityClick: PropTypes.func
};

export default RecentActivity;