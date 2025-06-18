import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/slices/authSlice';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  useDocumentTitle('Mon Profil - Zengest Admin');
  
  return (
    <div className="profile-page">
      <div className="container is-fluid">
        <h1 className="title is-4">Mon Profil</h1>
        <p className="subtitle is-6">Gestion de votre compte utilisateur</p>
        
        <div className="columns">
          <div className="column is-4">
            <div className="box has-text-centered">
              <figure className="image is-128x128 is-inline-block">
                <img 
                  className="is-rounded" 
                  src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.firstName}+${currentUser?.lastName}&background=eb2f06&color=fff`}
                  alt="Avatar"
                />
              </figure>
              <h3 className="title is-5 mt-4">
                {currentUser?.firstName} {currentUser?.lastName}
              </h3>
              <p className="subtitle is-6">{currentUser?.role}</p>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <h3 className="title is-5">Informations Personnelles</h3>
              <div className="field">
                <label className="label">Prénom</label>
                <div className="control">
                  <input className="input" type="text" defaultValue={currentUser?.firstName} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nom</label>
                <div className="control">
                  <input className="input" type="text" defaultValue={currentUser?.lastName} />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" defaultValue={currentUser?.email} />
                </div>
              </div>
              <div className="field">
                <label className="label">Téléphone</label>
                <div className="control">
                  <input className="input" type="tel" defaultValue={currentUser?.phone} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary">Sauvegarder</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };