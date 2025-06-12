import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          {/* Informations Restaurant */}
          <div className="column is-one-third">
            <h3 className="title is-5 has-text-white">Restaurant Zengest</h3>
            <div className="content">
              <p>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <span>123 Rue de la Gastronomie<br />75001 Paris, France</span>
                </span>
              </p>
              <p>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-phone"></i>
                  </span>
                  <span>01 23 45 67 89</span>
                </span>
              </p>
              <p>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span>contact@zengest.fr</span>
                </span>
              </p>
            </div>
          </div>

          {/* Horaires */}
          <div className="column is-one-third">
            <h3 className="title is-5 has-text-white">Horaires d'ouverture</h3>
            <div className="content">
              <div className="table-container">
                <table className="table is-borderless">
                  <tbody>
                    <tr>
                      <td className="has-text-light">Lundi - Vendredi</td>
                      <td className="has-text-white">12h00 - 14h30<br />19h00 - 22h30</td>
                    </tr>
                    <tr>
                      <td className="has-text-light">Samedi</td>
                      <td className="has-text-white">19h00 - 23h00</td>
                    </tr>
                    <tr>
                      <td className="has-text-light">Dimanche</td>
                      <td className="has-text-light">Fermé</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Navigation & Réseaux Sociaux */}
          <div className="column is-one-third">
            <h3 className="title is-5 has-text-white">Suivez-nous</h3>
            <div className="content">
              <div className="field is-grouped">
                <p className="control">
                  <a 
                    href="https://facebook.com/zengest" 
                    className="button is-medium is-outlined is-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <span className="icon">
                      <i className="fab fa-facebook-f"></i>
                    </span>
                  </a>
                </p>
                <p className="control">
                  <a 
                    href="https://instagram.com/zengest" 
                    className="button is-medium is-outlined is-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <span className="icon">
                      <i className="fab fa-instagram"></i>
                    </span>
                  </a>
                </p>
                <p className="control">
                  <a 
                    href="https://twitter.com/zengest" 
                    className="button is-medium is-outlined is-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <span className="icon">
                      <i className="fab fa-twitter"></i>
                    </span>
                  </a>
                </p>
              </div>
              
              <div className="mt-4">
                <p className="has-text-light">Navigation rapide</p>
                <div className="buttons are-small mt-2">
                  <Link to="/menu" className="button is-text is-small has-text-light">
                    Menu
                  </Link>
                  <Link to="/reservations" className="button is-text is-small has-text-light">
                    Réservations
                  </Link>
                  <Link to="/contact" className="button is-text is-small has-text-light">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="has-background-grey" />
        
        <div className="columns is-vcentered">
          <div className="column">
            <p className="has-text-light">
              &copy; {currentYear} Restaurant Zengest. Tous droits réservés.
            </p>
          </div>
          <div className="column has-text-right">
            <p className="has-text-light is-size-7">
              Développé avec ❤️ pour la gastronomie française
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer