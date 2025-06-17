import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MinusIcon 
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

import './DashboardCard.scss';

const DashboardCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  loading = false,
  onClick = null,
  className = '',
  trend = null,
  subtitle = null,
  compact = false
}) => {
  
  // ========================================
  // 🎯 LOGIQUE DE TENDANCE
  // ========================================
  
  const getTrendData = () => {
    if (trend !== null) {
      return {
        direction: trend,
        value: change
      };
    }
    
    if (change === undefined || change === null) {
      return null;
    }
    
    const changeNum = parseFloat(change);
    
    if (changeNum > 0) {
      return { direction: 'up', value: `+${changeNum}%` };
    } else if (changeNum < 0) {
      return { direction: 'down', value: `${changeNum}%` };
    } else {
      return { direction: 'neutral', value: '0%' };
    }
  };
  
  const trendData = getTrendData();
  
  // ========================================
  // 🎨 CLASSES CSS
  // ========================================
  
  const getCardClasses = () => {
    const classes = ['dashboard-card'];
    
    classes.push(`dashboard-card--${color}`);
    
    if (compact) classes.push('dashboard-card--compact');
    if (loading) classes.push('dashboard-card--loading');
    if (onClick) classes.push('dashboard-card--clickable');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  const getTrendIcon = () => {
    if (!trendData) return null;
    
    switch (trendData.direction) {
      case 'up':
        return <ArrowUpIcon className="trend-icon trend-icon--up" />;
      case 'down':
        return <ArrowDownIcon className="trend-icon trend-icon--down" />;
      default:
        return <MinusIcon className="trend-icon trend-icon--neutral" />;
    }
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const cardVariants = {
    hover: {
      y: -2,
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };
  
  const countVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };
  
  // ========================================
  // 🎯 RENDU
  // ========================================
  
  if (loading) {
    return (
      <div className={getCardClasses()}>
        <div className="dashboard-card__content">
          <div className="dashboard-card__header">
            <div className="dashboard-card__icon skeleton"></div>
            <div className="dashboard-card__title skeleton skeleton--text"></div>
          </div>
          <div className="dashboard-card__body">
            <div className="dashboard-card__value skeleton skeleton--large"></div>
            <div className="dashboard-card__trend skeleton skeleton--small"></div>
          </div>
        </div>
      </div>
    );
  }
  
  const CardComponent = onClick ? motion.div : 'div';
  const animationProps = onClick ? {
    variants: cardVariants,
    whileHover: 'hover',
    whileTap: 'tap'
  } : {};
  
  return (
    <CardComponent
      className={getCardClasses()}
      onClick={onClick}
      {...animationProps}
    >
      <div className="dashboard-card__content">
        <div className="dashboard-card__header">
          {Icon && (
            <div className="dashboard-card__icon">
              <Icon className="icon" />
            </div>
          )}
          <h3 className="dashboard-card__title">{title}</h3>
        </div>
        
        <div className="dashboard-card__body">
          <motion.div 
            className="dashboard-card__value"
            variants={countVariants}
            initial="initial"
            animate="animate"
          >
            {value}
          </motion.div>
          
          {subtitle && (
            <p className="dashboard-card__subtitle">{subtitle}</p>
          )}
          
          {trendData && (
            <div className={`dashboard-card__trend dashboard-card__trend--${trendData.direction}`}>
              {getTrendIcon()}
              <span className="trend-value">{trendData.value}</span>
            </div>
          )}
        </div>
      </div>
    </CardComponent>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.elementType,
  color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'purple', 'orange']),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  subtitle: PropTypes.string,
  compact: PropTypes.bool
};

export default DashboardCard;