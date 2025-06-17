import { Link } from 'react-router-dom'
import useDailySpecials from '../../hooks/useDailySpecials'

const DailySpecials = () => {
  const { 
    dailySpecials, 
    isLoading, 
    error, 
    hasSpecials, 
    refresh 
  } = useDailySpecials({
    autoFetch: true,
    refreshInterval: 5 * 60 * 1000 // Rafraîchir toutes les 5 minutes
  })

  // Données de fallback pour la démo
  const fallbackSpecials = [
    {
      id: 'demo-1',
      name: 'Saumon Grillé aux Herbes',
      description: 'Filet de saumon grillé, légumes de saison et sauce hollandaise maison',
      price: 28.50,
      image: '/images/salmon-demo.jpg',
      isAvailable: true,
      category: 'Poisson'
    },
    {
      id: 'demo-2', 
      name: 'Risotto aux Champignons',
      description: 'Risotto crémeux aux champignons sauvages, parmesan et truffe',
      price: 24.00,
      image: '/images/risotto-demo.jpg',
      isAvailable: true,
      category: 'Végétarien'
    }
  ]

  // Utiliser les données API ou fallback
  const specialsToShow = hasSpecials ? dailySpecials : fallbackSpecials
  const showFallback = !hasSpecials && !isLoading && !error

  if (isLoading) {
    return (
      <section className="section is-medium">
        <div className="container">
          <div className="has-text-centered">
            <div className="loader-container">
              <div className="button is-loading is-large is-primary">Loading</div>
            </div>
            <p className="title is-4 mt-4">Chargement des plats du jour...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section is-medium" id="plats-du-jour">
      <div className="container">
        {/* Header avec gestion d'erreur */}
        <div className="has-text-centered mb-6">
          <h2 className="title is-2">
            <span className="icon-text">
              <span className="icon has-text-warning">
                <i className="fas fa-star fa-lg"></i>
              </span>
              <span>Nos Plats du Jour</span>
            </span>
          </h2>
          <p className="subtitle is-4">
            {showFallback ? (
              "Découvrez nos suggestions du chef"
            ) : error ? (
              <>
                Nos créations culinaires du moment
                <br />
                <small className="has-text-grey">
                  (Mise à jour en temps réel depuis notre cuisine)
                </small>
              </>
            ) : (
              <>
                Fraîchement préparés ce {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long',
                  day: 'numeric', 
                  month: 'long' 
                })}
                <br />
                <small className="has-text-grey">
                  Mis à jour en temps réel par notre équipe
                </small>
              </>
            )}
          </p>

          {/* Bouton refresh et statut */}
          <div className="field is-grouped is-grouped-centered mt-4">
            {error && (
              <div className="control">
                <div className="notification is-warning is-light">
                  <button className="delete" onClick={() => window.location.reload()}></button>
                  <strong>Connexion limitée:</strong> Affichage des suggestions du chef
                  <button 
                    className="button is-small is-warning ml-3"
                    onClick={refresh}
                  >
                    <span className="icon">
                      <i className="fas fa-refresh"></i>
                    </span>
                    <span>Réessayer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Affichage des plats */}
        {specialsToShow.length > 0 ? (
          <div className="columns is-multiline">
            {specialsToShow.map((special, index) => (
              <div key={special.id || `special-${index}`} className="column is-half">
                <div className="card daily-special-card">
                  {/* Image du plat */}
                  <div className="card-image">
                    <figure className="image is-3by2">
                      <img 
                        src={special.image || `https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                        alt={special.name}
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
                        }}
                      />
                      {special.category && (
                        <div className="image-overlay">
                          <span className="tag is-primary is-medium">
                            {special.category}
                          </span>
                        </div>
                      )}
                    </figure>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <h3 className="title is-4">{special.name}</h3>
                        <p className="subtitle is-6 has-text-grey">
                          {special.description}
                        </p>
                      </div>
                      <div className="media-right">
                        <span className="tag is-warning is-large menu-price">
                          {typeof special.price === 'number' 
                            ? `${special.price.toFixed(2)}€`
                            : special.price || '-- €'
                          }
                        </span>
                      </div>
                    </div>

                    {/* Informations additionnelles */}
                    {special.ingredients && (
                      <div className="content">
                        <p className="is-size-7 has-text-grey">
                          <strong>Ingrédients:</strong> {special.ingredients}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="field is-grouped">
                      <div className="control">
                        <Link 
                          to="/reservations" 
                          className="button is-primary"
                        >
                          <span className="icon">
                            <i className="fas fa-calendar-plus"></i>
                          </span>
                          <span>Réserver</span>
                        </Link>
                      </div>
                      <div className="control">
                        <Link 
                          to="/menu" 
                          className="button is-outlined"
                        >
                          <span className="icon">
                            <i className="fas fa-eye"></i>
                          </span>
                          <span>Voir le menu</span>
                        </Link>
                      </div>
                      {!special.isAvailable && (
                        <div className="control">
                          <span className="tag is-danger">Épuisé</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Pas de plats du jour */
          <div className="has-text-centered">
            <div className="box">
              <span className="icon is-large has-text-grey-light">
                <i className="fas fa-utensils fa-3x"></i>
              </span>
              <h3 className="title is-4 mt-4">Aucun plat du jour disponible</h3>
              <p className="subtitle is-6">
                Notre chef prépare de nouvelles créations. 
                Revenez bientôt ou découvrez notre menu complet.
              </p>
              <Link to="/menu" className="button is-primary">
                <span className="icon">
                  <i className="fas fa-book"></i>
                </span>
                <span>Voir notre menu</span>
              </Link>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="has-text-centered mt-6">
          <Link 
            to="/plats-du-jour" 
            className="button is-primary is-medium"
          >
            <span className="icon">
              <i className="fas fa-arrow-right"></i>
            </span>
            <span>Voir tous nos plats du jour</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DailySpecials