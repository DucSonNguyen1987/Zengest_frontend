// components/home/HeroSection.jsx
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section 
      className="hero is-fullheight-with-navbar"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-half">
              <div className="fade-in-up">
                <h1 className="title is-1 has-text-white has-text-weight-bold">
                  Bienvenue chez
                  <span className="has-text-warning"> Zengest</span>
                </h1>
                <h2 className="subtitle is-3 has-text-white">
                  Une expérience gastronomique unique au cœur de Paris
                </h2>
                <p className="content is-large has-text-white mb-5">
                  Découvrez notre cuisine raffinée, nos plats du jour préparés avec passion 
                  et notre service d'exception dans un cadre élégant et chaleureux.
                </p>
                
                <div className="field is-grouped">
                  <div className="control">
                    <Link 
                      to="/reservations" 
                      className="button is-warning is-large"
                    >
                      <span className="icon">
                        <i className="fas fa-calendar-plus"></i>
                      </span>
                      <span>Réserver une table</span>
                    </Link>
                  </div>
                  <div className="control">
                    <Link 
                      to="/menu" 
                      className="button is-outlined is-white is-large"
                    >
                      <span className="icon">
                        <i className="fas fa-utensils"></i>
                      </span>
                      <span>Découvrir le menu</span>
                    </Link>
                  </div>
                </div>

                {/* Badges de qualité */}
                <div className="mt-6">
                  <div className="tags are-large">
                    <span className="tag is-warning">
                      <span className="icon">
                        <i className="fas fa-star"></i>
                      </span>
                      <span>4.8/5 sur Google</span>
                    </span>
                    <span className="tag is-primary">
                      <span className="icon">
                        <i className="fas fa-award"></i>
                      </span>
                      <span>Cuisine traditionnelle</span>
                    </span>
                    <span className="tag is-info">
                      <span className="icon">
                        <i className="fas fa-leaf"></i>
                      </span>
                      <span>Produits frais</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-half">
              <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="box has-background-white-bis has-text-centered p-6">
                  <h3 className="title is-4 has-text-primary">Réservation Express</h3>
                  <p className="subtitle is-6 mb-4">
                    Réservez en quelques clics ou appelez-nous
                  </p>
                  
                  <div className="field">
                    <div className="control has-icons-left">
                      <input 
                        className="input is-medium" 
                        type="tel" 
                        placeholder="Votre numéro de téléphone"
                      />
                      <span className="icon is-left">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>
                  </div>
                  
                  <div className="field">
                    <div className="control has-icons-left">
                      <input 
                        className="input is-medium" 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-calendar"></i>
                      </span>
                    </div>
                  </div>
                  
                  <div className="field">
                    <div className="control has-icons-left">
                      <div className="select is-medium is-fullwidth">
                        <select>
                          <option>19h00</option>
                          <option>19h30</option>
                          <option>20h00</option>
                          <option>20h30</option>
                          <option>21h00</option>
                          <option>21h30</option>
                        </select>
                      </div>
                      <span className="icon is-left">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                  </div>
                  
                  <div className="field">
                    <div className="control">
                      <Link 
                        to="/reservations" 
                        className="button is-primary is-medium is-fullwidth"
                      >
                        Réserver maintenant
                      </Link>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <p className="content is-small">
                    <strong>Ou appelez directement :</strong><br />
                    <a href="tel:+33123456789" className="has-text-primary">
                      <span className="icon">
                        <i className="fas fa-phone"></i>
                      </span>
                      01 23 45 67 89
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-foot">
        <div className="container has-text-centered">
          <div className="scroll-indicator">
            <i className="fas fa-chevron-down has-text-white fa-2x animate__animated animate__bounce animate__infinite"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection