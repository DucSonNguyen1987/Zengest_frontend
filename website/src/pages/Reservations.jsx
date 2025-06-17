// src/pages/Reservations.jsx
import React, { useState } from 'react';
import { reservationService } from '../services/api/reservationService';
import toast from 'react-hot-toast';

export const Reservations = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation basique
      if (!formData.firstName || !formData.phone || !formData.date || !formData.time) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }

      const result = await reservationService.createReservation(formData);
      
      console.log('Réservation créée:', result);
      toast.success('Réservation confirmée ! Vous recevrez une confirmation par email.');
      
      // Reset du formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '19:00',
        guests: '2',
        specialRequests: ''
      });

    } catch (error) {
      console.error('Erreur réservation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="has-text-centered mb-6">
          <h1 className="title is-1">Réserver une Table</h1>
          <p className="subtitle is-4">
            Garantissez votre place pour une expérience gastronomique inoubliable
          </p>
        </div>

        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="card">
              <div className="card-header">
                <h2 className="card-header-title">Formulaire de Réservation</h2>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  {/* Informations client */}
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Prénom *</label>
                        <div className="control">
                          <input 
                            className="input" 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Votre prénom"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Nom</label>
                        <div className="control">
                          <input 
                            className="input" 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                          <input 
                            className="input" 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="votre@email.com"
                          />
                          <span className="icon is-left">
                            <i className="fas fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Téléphone *</label>
                        <div className="control has-icons-left">
                          <input 
                            className="input" 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="06 12 34 56 78"
                            required
                          />
                          <span className="icon is-left">
                            <i className="fas fa-phone"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date et heure */}
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Date souhaitée *</label>
                        <div className="control has-icons-left">
                          <input 
                            className="input" 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                          <span className="icon is-left">
                            <i className="fas fa-calendar"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Heure *</label>
                        <div className="control has-icons-left">
                          <div className="select is-fullwidth">
                            <select 
                              name="time" 
                              value={formData.time} 
                              onChange={handleInputChange}
                              required
                            >
                              <option value="19:00">19h00</option>
                              <option value="19:30">19h30</option>
                              <option value="20:00">20h00</option>
                              <option value="20:30">20h30</option>
                              <option value="21:00">21h00</option>
                              <option value="21:30">21h30</option>
                            </select>
                          </div>
                          <span className="icon is-left">
                            <i className="fas fa-clock"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Nombre de personnes *</label>
                        <div className="control has-icons-left">
                          <div className="select is-fullwidth">
                            <select 
                              name="guests" 
                              value={formData.guests} 
                              onChange={handleInputChange}
                              required
                            >
                              <option value="1">1 personne</option>
                              <option value="2">2 personnes</option>
                              <option value="3">3 personnes</option>
                              <option value="4">4 personnes</option>
                              <option value="5">5 personnes</option>
                              <option value="6">6 personnes</option>
                              <option value="8">8 personnes</option>
                              <option value="10">10 personnes</option>
                            </select>
                          </div>
                          <span className="icon is-left">
                            <i className="fas fa-users"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Demandes spéciales</label>
                    <div className="control">
                      <textarea 
                        className="textarea" 
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Allergies, régime alimentaire, occasion spéciale..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button 
                        className={`button is-primary is-fullwidth is-medium ${isSubmitting ? 'is-loading' : ''}`}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <span className="icon">
                          <i className="fas fa-calendar-check"></i>
                        </span>
                        <span>
                          {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="has-text-centered mt-5">
              <p className="content">
                <strong>Préférez-vous réserver par téléphone ?</strong><br />
                Appelez-nous au <a href="tel:+33123456789">01 23 45 67 89</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;