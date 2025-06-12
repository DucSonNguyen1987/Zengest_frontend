import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useContact } from '../hooks/useContact'
import SEOHead, { SEOPresets } from '../components/SEOHead'
import { LoadingSpinner, showToast } from '../components/common'

const Contact = () => {
  const { sendMessage, isSubmitting } = useContact()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await sendMessage(data)
      reset()
    } catch (error) {
      // L'erreur est déjà gérée par le hook useContact
      console.error('Erreur lors de l\'envoi:', error)
    }
  }

  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="has-text-centered mb-6">
          <h1 className="title is-1">
            <span className="icon-text">
              <span className="icon has-text-primary">
                <i className="fas fa-envelope"></i>
              </span>
              <span>Nous Contacter</span>
            </span>
          </h1>
          <p className="subtitle is-4">
            Une question ? Une demande spéciale ? N'hésitez pas à nous écrire
          </p>
        </div>

        <div className="columns is-variable is-8">
          {/* Formulaire de contact */}
          <div className="column is-half">
            <div className="card">
              <div className="card-header">
                <h2 className="card-header-title is-size-4">
                  <span className="icon">
                    <i className="fas fa-paper-plane"></i>
                  </span>
                  <span>Formulaire de Contact</span>
                </h2>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Nom complet */}
                  <div className="field">
                    <label className="label">Nom complet *</label>
                    <div className="control has-icons-left">
                      <input 
                        className={`input ${errors.name ? 'is-danger' : ''}`}
                        type="text" 
                        placeholder="Votre nom complet"
                        {...register('name', { 
                          required: 'Le nom est requis',
                          minLength: { value: 2, message: 'Le nom doit faire au moins 2 caractères' }
                        })}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    {errors.name && (
                      <p className="help is-danger">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="field">
                    <label className="label">Email *</label>
                    <div className="control has-icons-left">
                      <input 
                        className={`input ${errors.email ? 'is-danger' : ''}`}
                        type="email" 
                        placeholder="votre@email.com"
                        {...register('email', { 
                          required: 'L\'email est requis',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email invalide'
                          }
                        })}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    {errors.email && (
                      <p className="help is-danger">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div className="field">
                    <label className="label">Téléphone</label>
                    <div className="control has-icons-left">
                      <input 
                        className="input"
                        type="tel" 
                        placeholder="06 12 34 56 78"
                        {...register('phone')}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>
                  </div>

                  {/* Sujet */}
                  <div className="field">
                    <label className="label">Sujet *</label>
                    <div className="control has-icons-left">
                      <div className="select is-fullwidth">
                        <select 
                          {...register('subject', { required: 'Veuillez sélectionner un sujet' })}
                          className={errors.subject ? 'is-danger' : ''}
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="reservation">Réservation</option>
                          <option value="event">Événement privé</option>
                          <option value="menu">Question sur le menu</option>
                          <option value="partnership">Partenariat</option>
                          <option value="complaint">Réclamation</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                      <span className="icon is-left">
                        <i className="fas fa-tag"></i>
                      </span>
                    </div>
                    {errors.subject && (
                      <p className="help is-danger">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="field">
                    <label className="label">Message *</label>
                    <div className="control">
                      <textarea 
                        className={`textarea ${errors.message ? 'is-danger' : ''}`}
                        placeholder="Votre message..."
                        rows="5"
                        {...register('message', { 
                          required: 'Le message est requis',
                          minLength: { value: 10, message: 'Le message doit faire au moins 10 caractères' }
                        })}
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="help is-danger">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Consentement RGPD */}
                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input 
                          type="checkbox" 
                          {...register('consent', { required: 'Vous devez accepter la politique de confidentialité' })}
                        />
                        <span className="ml-2">
                          J'accepte que mes données soient utilisées pour me recontacter 
                          conformément à notre <a href="/privacy" className="has-text-primary">politique de confidentialité</a>
                        </span>
                      </label>
                    </div>
                    {errors.consent && (
                      <p className="help is-danger">{errors.consent.message}</p>
                    )}
                  </div>

                  {/* Bouton submit */}
                  <div className="field">
                    <div className="control">
                      <button 
                        type="submit"
                        className={`button is-primary is-fullwidth is-medium ${isSubmitting ? 'is-loading' : ''}`}
                        disabled={isSubmitting}
                      >
                        <span className="icon">
                          <i className="fas fa-paper-plane"></i>
                        </span>
                        <span>Envoyer le message</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Informations pratiques et carte */}
          <div className="column is-half">
            {/* Informations de contact */}
            <div className="card mb-5">
              <div className="card-header">
                <h2 className="card-header-title is-size-4">
                  <span className="icon">
                    <i className="fas fa-info-circle"></i>
                  </span>
                  <span>Informations Pratiques</span>
                </h2>
              </div>
              <div className="card-content">
                <div className="content">
                  {/* Adresse */}
                  <div className="media">
                    <div className="media-left">
                      <span className="icon is-large has-text-primary">
                        <i className="fas fa-map-marker-alt fa-lg"></i>
                      </span>
                    </div>
                    <div className="media-content">
                      <h3 className="title is-6 mb-1">Adresse</h3>
                      <p>
                        123 Rue de la Gastronomie<br />
                        75001 Paris, France
                      </p>
                      <a 
                        href="https://maps.google.com/?q=123+Rue+de+la+Gastronomie+75001+Paris"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button is-small is-outlined is-primary mt-2"
                      >
                        <span className="icon">
                          <i className="fas fa-directions"></i>
                        </span>
                        <span>Itinéraire</span>
                      </a>
                    </div>
                  </div>

                  <hr />

                  {/* Téléphone */}
                  <div className="media">
                    <div className="media-left">
                      <span className="icon is-large has-text-primary">
                        <i className="fas fa-phone fa-lg"></i>
                      </span>
                    </div>
                    <div className="media-content">
                      <h3 className="title is-6 mb-1">Téléphone</h3>
                      <p>
                        <a href="tel:+33123456789" className="has-text-dark">
                          01 23 45 67 89
                        </a>
                      </p>
                      <p className="is-size-7 has-text-grey">
                        Réservations et renseignements
                      </p>
                    </div>
                  </div>

                  <hr />

                  {/* Email */}
                  <div className="media">
                    <div className="media-left">
                      <span className="icon is-large has-text-primary">
                        <i className="fas fa-envelope fa-lg"></i>
                      </span>
                    </div>
                    <div className="media-content">
                      <h3 className="title is-6 mb-1">Email</h3>
                      <p>
                        <a href="mailto:contact@zengest.fr" className="has-text-dark">
                          contact@zengest.fr
                        </a>
                      </p>
                      <p className="is-size-7 has-text-grey">
                        Réponse sous 24h
                      </p>
                    </div>
                  </div>

                  <hr />

                  {/* Horaires */}
                  <div className="media">
                    <div className="media-left">
                      <span className="icon is-large has-text-primary">
                        <i className="fas fa-clock fa-lg"></i>
                      </span>
                    </div>
                    <div className="media-content">
                      <h3 className="title is-6 mb-1">Horaires d'ouverture</h3>
                      <div className="content is-small">
                        <div className="columns is-mobile is-gapless">
                          <div className="column">
                            <strong>Lun - Ven :</strong><br />
                            <strong>Samedi :</strong><br />
                            <strong>Dimanche :</strong>
                          </div>
                          <div className="column">
                            12h-14h30, 19h-22h30<br />
                            19h-23h<br />
                            <span className="has-text-danger">Fermé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte interactive */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-header-title is-size-4">
                  <span className="icon">
                    <i className="fas fa-map"></i>
                  </span>
                  <span>Notre Localisation</span>
                </h2>
              </div>
              <div className="card-content p-0">
                <div className="map-container">
                  {/* Carte OpenStreetMap intégrée */}
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=2.3387%2C48.8584%2C2.3397%2C48.8594&layer=mapnik&marker=48.8589%2C2.3392"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation Restaurant Zengest"
                  ></iframe>
                  
                  {/* Overlay pour Google Maps comme alternative */}
                  <div className="map-overlay">
                    <a 
                      href="https://maps.google.com/?q=Restaurant+Zengest+Paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button is-primary is-small"
                    >
                      <span className="icon">
                        <i className="fab fa-google"></i>
                      </span>
                      <span>Ouvrir dans Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <section className="section">
          <div className="columns">
            <div className="column">
              <div className="notification is-info is-light">
                <h3 className="title is-5">
                  <span className="icon">
                    <i className="fas fa-info-circle"></i>
                  </span>
                  <span>Réservations</span>
                </h3>
                <p>
                  Pour les réservations, nous vous recommandons d'utiliser notre 
                  <a href="/reservations" className="has-text-link"> système de réservation en ligne</a> 
                  ou de nous appeler directement.
                </p>
              </div>
            </div>
            <div className="column">
              <div className="notification is-warning is-light">
                <h3 className="title is-5">
                  <span className="icon">
                    <i className="fas fa-users"></i>
                  </span>
                  <span>Événements Privés</span>
                </h3>
                <p>
                  Pour les groupes de plus de 8 personnes ou les événements privés, 
                  contactez-nous directement pour discuter de vos besoins spécifiques.
                </p>
              </div>
            </div>
            <div className="column">
              <div className="notification is-success is-light">
                <h3 className="title is-5">
                  <span className="icon">
                    <i className="fas fa-leaf"></i>
                  </span>
                  <span>Allergies & Régimes</span>
                </h3>
                <p>
                  Nous adaptons nos plats aux allergies et régimes spéciaux. 
                  N'hésitez pas à nous en informer lors de votre réservation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact;