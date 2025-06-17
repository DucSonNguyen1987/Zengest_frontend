// Page Dashboard principale
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  CurrencyEuroIcon,
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Actions Redux
import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import { setBreadcrumb } from '@/store/slices/uiSlice';

// Sélecteurs
import { selectDashboardData, selectDashboardLoading } from '@/store/slices/dashboardSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { selectTheme } from '@/store/slices/uiSlice';

// Composants
import DashboardCard from '@/components/dashboard/DashboardCard/DashboardCard';
import MetricsWidget from '@/components/dashboard/MetricsWidget/MetricsWidget';
import RecentActivity from '@/components/dashboard/RecentActivity/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions/QuickActions';
import PageLoader from '@/components/common/Loading/PageLoader';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

// Utilitaires
import { formatCurrency, formatNumber } from '../../../shared/utils/formatters';

// Styles
import './Dashboard.scss';

// ========================================
// 🏗️ PAGE DASHBOARD
// ========================================

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // États Redux
  const dashboardData = useSelector(selectDashboardData);
  const isLoading = useSelector(selectDashboardLoading);
  const currentUser = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);
  
  // État local
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [chartsLoaded, setChartsLoaded] = useState(false);
  
  // Hooks personnalisés
  useDocumentTitle('Dashboard - Zengest Admin');
  useRealTimeUpdates(['orders', 'reservations', 'tables'], 30000); // Refresh toutes les 30s
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Configuration du breadcrumb
  useEffect(() => {
    dispatch(setBreadcrumb([
      { label: 'Dashboard', path: '/' }
    ]));
  }, [dispatch]);
  
  // Chargement initial des données
  useEffect(() => {
    dispatch(fetchDashboardData({ period: selectedPeriod }));
  }, [dispatch, selectedPeriod]);
  
  // Animation des graphiques
  useEffect(() => {
    if (dashboardData && !isLoading) {
      const timer = setTimeout(() => {
        setChartsLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [dashboardData, isLoading]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setChartsLoaded(false);
  };
  
  const handleRefreshData = () => {
    dispatch(fetchDashboardData({ period: selectedPeriod, forceRefresh: true }));
    setChartsLoaded(false);
  };
  
  // ========================================
  // 📊 CONFIGURATION DES GRAPHIQUES
  // ========================================
  
  const getChartOptions = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.mode === 'dark' ? '#e5e7eb' : '#374151',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: theme.mode === 'dark' ? '#f9fafb' : '#111827',
        font: {
          size: 14,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: theme.mode === 'dark' ? '#1f2937' : '#ffffff',
        titleColor: theme.mode === 'dark' ? '#f9fafb' : '#111827',
        bodyColor: theme.mode === 'dark' ? '#e5e7eb' : '#374151',
        borderColor: theme.mode === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme.mode === 'dark' ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: theme.mode === 'dark' ? '#374151' : '#e5e7eb'
        }
      },
      y: {
        ticks: {
          color: theme.mode === 'dark' ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: theme.mode === 'dark' ? '#374151' : '#e5e7eb'
        }
      }
    }
  });
  
  // Données pour le graphique des ventes
  const salesChartData = {
    labels: dashboardData?.salesChart?.labels || [],
    datasets: [
      {
        label: 'Ventes (€)',
        data: dashboardData?.salesChart?.data || [],
        borderColor: '#eb2f06',
        backgroundColor: 'rgba(235, 47, 6, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  // Données pour le graphique des commandes
  const ordersChartData = {
    labels: dashboardData?.ordersChart?.labels || [],
    datasets: [
      {
        label: 'Commandes',
        data: dashboardData?.ordersChart?.data || [],
        backgroundColor: [
          '#eb2f06',
          '#00d2d3',
          '#ff6348',
          '#2ed573',
          '#ffa502'
        ]
      }
    ]
  };
  
  // Données pour le graphique des réservations
  const reservationsChartData = {
    labels: dashboardData?.reservationsChart?.labels || [],
    datasets: [
      {
        label: 'Réservations',
        data: dashboardData?.reservationsChart?.data || [],
        backgroundColor: '#00d2d3',
        borderColor: '#00a8cc',
        borderWidth: 1
      }
    ]
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
  
  if (isLoading && !dashboardData) {
    return <PageLoader message="Chargement du dashboard..." />;
  }
  
  const metrics = dashboardData?.metrics || {};
  const recentActivities = dashboardData?.recentActivities || [];
  
  return (
    <motion.div
      className="dashboard-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header du dashboard */}
      <motion.div className="dashboard-header" variants={itemVariants}>
        <div className="dashboard-title">
          <h1>Bonjour, {currentUser?.firstName} 👋</h1>
          <p>Voici un aperçu de l'activité de votre restaurant aujourd'hui</p>
        </div>
        
        <div className="dashboard-controls">
          <div className="period-selector">
            <label>Période :</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="period-select"
            >
              <option value="today">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
            </select>
          </div>
          
          <motion.button
            className="refresh-button"
            onClick={handleRefreshData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            <ClockIcon className="button-icon" />
            Actualiser
          </motion.button>
        </div>
      </motion.div>
      
      {/* Métriques principales */}
      <motion.div className="dashboard-metrics" variants={itemVariants}>
        <div className="metrics-grid">
          <DashboardCard
            title="Chiffre d'affaires"
            value={formatCurrency(metrics.revenue || 0)}
            change={metrics.revenueChange}
            icon={CurrencyEuroIcon}
            color="green"
            loading={isLoading}
          />
          
          <DashboardCard
            title="Commandes"
            value={formatNumber(metrics.orders || 0)}
            change={metrics.ordersChange}
            icon={ShoppingBagIcon}
            color="blue"
            loading={isLoading}
          />
          
          <DashboardCard
            title="Réservations"
            value={formatNumber(metrics.reservations || 0)}
            change={metrics.reservationsChange}
            icon={CalendarDaysIcon}
            color="purple"
            loading={isLoading}
          />
          
          <DashboardCard
            title="Clients servis"
            value={formatNumber(metrics.customers || 0)}
            change={metrics.customersChange}
            icon={UsersIcon}
            color="orange"
            loading={isLoading}
          />
        </div>
      </motion.div>
      
      {/* Graphiques et widgets */}
      <div className="dashboard-content">
        <div className="dashboard-left">
          {/* Graphique des ventes */}
          <motion.div className="dashboard-chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3>Évolution des ventes</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#eb2f06' }}></span>
                  Ventes journalières
                </span>
              </div>
            </div>
            <div className="chart-container">
              {chartsLoaded && (
                <Line 
                  data={salesChartData} 
                  options={getChartOptions('Ventes par jour')}
                />
              )}
            </div>
          </motion.div>
          
          {/* Graphique des commandes par statut */}
          <motion.div className="dashboard-chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3>Répartition des commandes</h3>
            </div>
            <div className="chart-container chart-small">
              {chartsLoaded && (
                <Doughnut 
                  data={ordersChartData} 
                  options={getChartOptions('Commandes par statut')}
                />
              )}
            </div>
          </motion.div>
        </div>
        
        <div className="dashboard-right">
          {/* Graphique des réservations */}
          <motion.div className="dashboard-chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3>Réservations par jour</h3>
            </div>
            <div className="chart-container chart-small">
              {chartsLoaded && (
                <Bar 
                  data={reservationsChartData} 
                  options={getChartOptions('Réservations hebdomadaires')}
                />
              )}
            </div>
          </motion.div>
          
          {/* Widgets d'information */}
          <motion.div className="dashboard-widgets" variants={itemVariants}>
            <MetricsWidget
              title="Plat le plus commandé"
              value={metrics.topDish?.name || 'Aucune donnée'}
              subtitle={`${metrics.topDish?.count || 0} commandes`}
              icon={FireIcon}
              trend="up"
            />
            
            <MetricsWidget
              title="Temps moyen de livraison"
              value={`${metrics.avgDeliveryTime || 0} min`}
              subtitle="Dernières 24h"
              icon={TruckIcon}
              trend={metrics.avgDeliveryTime <= 30 ? 'up' : 'down'}
            />
            
            <MetricsWidget
              title="Taux d'occupation"
              value={`${metrics.occupancyRate || 0}%`}
              subtitle="Tables occupées"
              icon={ChartBarIcon}
              trend={metrics.occupancyRate >= 70 ? 'up' : 'neutral'}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Section inférieure */}
      <div className="dashboard-bottom">
        {/* Activité récente */}
        <motion.div className="dashboard-activity" variants={itemVariants}>
          <RecentActivity 
            activities={recentActivities}
            loading={isLoading}
          />
        </motion.div>
        
        {/* Actions rapides */}
        <motion.div className="dashboard-actions" variants={itemVariants}>
          <QuickActions />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;