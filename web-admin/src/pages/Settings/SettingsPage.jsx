import React, { useState } from 'react';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { 
  Cog6ToothIcon, 
  GlobeAltIcon, 
  DevicePhoneMobileIcon,
  BellIcon,
  ShieldCheckIcon,
  ServerIcon 
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  useDocumentTitle('Paramètres - Zengest Admin');
  
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'Général', icon: Cog6ToothIcon },
    { id: 'site', label: 'Site Vitrine', icon: GlobeAltIcon },
    { id: 'mobile', label: 'App Mobile', icon: DevicePhoneMobileIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Sécurité', icon: ShieldCheckIcon },
    { id: 'system', label: 'Système', icon: ServerIcon }
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="box">
            <h3 className="title is-5">Paramètres Généraux</h3>
            <div className="field">
              <label className="label">Nom du restaurant</label>
              <div className="control">
                <input className="input" type="text" defaultValue="Le Bistrot de Zengest" />
              </div>
            </div>
            <div className="field">
              <label className="label">Fuseau horaire</label>
              <div className="control">
                <div className="select">
                  <select defaultValue="Europe/Paris">
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="notification is-info is-light">
            <p><strong>À développer :</strong> Configuration {tabs.find(t => t.id === activeTab)?.label}</p>
          </div>
        );
    }
  };
  
  return (
    <div className="settings-page">
      <div className="container is-fluid">
        <h1 className="title is-4">Paramètres</h1>
        <p className="subtitle is-6">Configuration de l'application</p>
        
        <div className="columns">
          <div className="column is-3">
            <aside className="menu">
              <ul className="menu-list">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <a 
                        className={activeTab === tab.id ? 'is-active' : ''}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span className="icon">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>{tab.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
          <div className="column">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPage };