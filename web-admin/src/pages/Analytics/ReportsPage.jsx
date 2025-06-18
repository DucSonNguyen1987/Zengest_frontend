import React from 'react';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';

const ReportsPage = () => {
  useDocumentTitle('Rapports - Zengest Admin');
  
  return (
    <div className="reports-page">
      <div className="container is-fluid">
        <h1 className="title is-4">Rapports Détaillés</h1>
        <p className="subtitle is-6">Génération et export de rapports</p>
        
        <div className="notification is-info is-light">
          <p><strong>À développer :</strong> Générateur de rapports, exports PDF/Excel, planification automatique</p>
        </div>
      </div>
    </div>
  );
};

export { ReportsPage };