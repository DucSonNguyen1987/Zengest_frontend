// pages/NotFound.jsx
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="has-text-centered">
          <div className="icon is-large has-text-grey-light mb-5">
            <i className="fas fa-utensils fa-5x"></i>
          </div>
          
          <h1 className="title is-1 has-text-grey">404</h1>
          <h2 className="title is-3">Page non trouvée</h2>
          <p className="subtitle is-5 mb-6">
            Désolé, cette page semble avoir quitté notre menu !
          </p>
          
          <div className="content">
            <p>
              Il se peut que cette page ait été supprimée, renommée ou qu'elle n'existe pas. 
              Voici quelques suggestions pour retrouver votre chemin :
            </p>
          </div>

          <div className="buttons is-centered mt-5">
            <Link to="/" className="button is-primary is-medium">
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span>Retour à l'accueil</span>
            </Link>
            <Link to="/menu" className="button is-outlined is-medium">
              <span className="icon">
                <i className="fas fa-utensils"></i>
              </span>
              <span>Voir le menu</span>
            </Link>
            <Link to="/contact" className="button is-outlined is-medium">
              <span className="icon">
                <i className="fas fa-envelope"></i>
              </span>
              <span>Nous contacter</span>
            </Link>
          </div>

          <div className="section">
            <div className="columns">
              <div className="column">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <span className="icon is-large has-text-primary">
                      <i className="fas fa-star fa-2x"></i>
                    </span>
                    <h3 className="title is-5 mt-3">Nos Plats du Jour</h3>
                    <p>Découvrez les créations quotidiennes de notre chef</p>
                    <Link to="/plats-du-jour" className="button is-small is-primary mt-3">
                      Voir les plats
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <span className="icon is-large has-text-warning">
                      <i className="fas fa-calendar-plus fa-2x"></i>
                    </span>
                    <h3 className="title is-5 mt-3">Réservation</h3>
                    <p>Réservez votre table en quelques clics</p>
                    <Link to="/reservations" className="button is-small is-warning mt-3">
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <span className="icon is-large has-text-info">
                      <i className="fas fa-images fa-2x"></i>
                    </span>
                    <h3 className="title is-5 mt-3">Galerie</h3>
                    <p>Explorez notre restaurant en images</p>
                    <Link to="/galerie" className="button is-small is-info mt-3">
                      Voir la galerie
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound