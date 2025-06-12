import { Link } from 'react-router-dom'
import SEOHead, { SEOPresets } from '../components/SEOHead'
import HeroSection from '../components/home/HeroSection'
import DailySpecials from '../components/home/DailySpecials'
import FeatureSection from '../components/home/FeatureSection'
import TestimonialsSection from '../components/home/TestimonialsSection'

const Home = () => {
  return (
    <div className="home-page">
      <SEOHead {...SEOPresets.home} />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Plats du Jour */}
      <DailySpecials />

      {/* Nos Points Forts */}
      <FeatureSection />

      {/* Section Réservation Rapide */}
      <section className="section is-medium has-background-light">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-half">
              <h2 className="title is-3">Réservez votre table</h2>
              <p className="subtitle is-5">
                Vivez une expérience culinaire inoubliable dans notre restaurant. 
                Réservez dès maintenant pour garantir votre place.
              </p>
              <div className="buttons">
                <Link to="/reservations" className="button is-primary is-medium">
                  <span className="icon">
                    <i className="fas fa-calendar-plus"></i>
                  </span>
                  <span>Réserver maintenant</span>
                </Link>
                <Link to="/menu" className="button is-outlined is-medium">
                  <span className="icon">
                    <i className="fas fa-eye"></i>
                  </span>
                  <span>Voir le menu</span>
                </Link>
              </div>
            </div>
            <div className="column is-half">
              <figure className="image is-4by3">
                <img 
                  src="/images/restaurant-interior.jpg" 
                  alt="Intérieur du restaurant Zengest"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
                  }}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <TestimonialsSection />

      {/* Informations pratiques */}
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content has-text-centered">
                  <div className="icon is-large has-text-primary mb-4">
                    <i className="fas fa-clock fa-2x"></i>
                  </div>
                  <h3 className="title is-5">Horaires</h3>
                  <div className="content">
                    <p><strong>Lun - Ven:</strong> 12h-14h30, 19h-22h30</p>
                    <p><strong>Samedi:</strong> 19h-23h</p>
                    <p><strong>Dimanche:</strong> Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-one-third">
              <div className="card">
                <div className="card-content has-text-centered">
                  <div className="icon is-large has-text-primary mb-4">
                    <i className="fas fa-map-marker-alt fa-2x"></i>
                  </div>
                  <h3 className="title is-5">Adresse</h3>
                  <div className="content">
                    <p>123 Rue de la Gastronomie</p>
                    <p>75001 Paris, France</p>
                    <Link to="/contact" className="button is-small is-primary is-outlined mt-3">
                      Voir la carte
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-one-third">
              <div className="card">
                <div className="card-content has-text-centered">
                  <div className="icon is-large has-text-primary mb-4">
                    <i className="fas fa-phone fa-2x"></i>
                  </div>
                  <h3 className="title is-5">Contact</h3>
                  <div className="content">
                    <p><strong>Téléphone:</strong> 01 23 45 67 89</p>
                    <p><strong>Email:</strong> contact@zengest.fr</p>
                    <Link to="/contact" className="button is-small is-primary is-outlined mt-3">
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home