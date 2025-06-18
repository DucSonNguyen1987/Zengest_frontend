import React from 'react';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { ChartBarIcon, CurrencyEuroIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

const AnalyticsPage = () => {
  useDocumentTitle('Analytics - Zengest Admin');
  
  return (
    <div className="analytics-page">
      <div className="container is-fluid">
        <h1 className="title is-4">Analytics & Rapports</h1>
        <p className="subtitle is-6">Tableaux de bord et métriques de performance</p>
        
        {/* Métriques rapides */}
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-success">
                <CurrencyEuroIcon className="h-8 w-8" />
              </span>
              <p className="heading">Chiffre d'affaires aujourd'hui</p>
              <p className="title is-4">2,450€</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-info">
                <UserGroupIcon className="h-8 w-8" />
              </span>
              <p className="heading">Clients servis</p>
              <p className="title is-4">87</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-warning">
                <ChartBarIcon className="h-8 w-8" />
              </span>
              <p className="heading">Commandes</p>
              <p className="title is-4">42</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-primary">
                <ClockIcon className="h-8 w-8" />
              </span>
              <p className="heading">Temps moyen service</p>
              <p className="title is-4">18 min</p>
            </div>
          </div>
        </div>
        
        <div className="notification is-info is-light">
          <p><strong>À développer :</strong> Graphiques détaillés, rapports exportables, tendances</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;