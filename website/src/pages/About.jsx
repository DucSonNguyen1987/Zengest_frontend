import SEOHead, { SEOPresets } from '../components/SEOHead'

const About = () => {
  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <SEOHead {...SEOPresets.about} />
      <div className="container">
        {/* Hero About */}
        <div className="has-text-centered mb-6">
          <h1 className="title is-1">À Propos de Zengest</h1>
          <p className="subtitle is-4">
            Une passion pour la gastronomie française depuis 2008
          </p>
        </div>

        {/* Histoire du restaurant */}
        <section className="section">
          <div className="columns is-vcentered">
            <div className="column is-half">
              <h2 className="title is-3">Notre Histoire</h2>
              <div className="content">
                <p className="is-size-5">
                  Depuis plus de 15 ans, le restaurant Zengest incarne l'excellence de la gastronomie française 
                  au cœur de Paris. Fondé par le Chef étoilé Antoine Dubois, notre établissement a su allier 
                  tradition culinaire et innovation créative.
                </p>
                <p>
                  Notre philosophie repose sur trois piliers fondamentaux : la qualité des produits, 
                  le respect des saisons et la créativité de nos équipes. Chaque plat raconte une histoire, 
                  celle de producteurs passionnés et de techniques culinaires transmises de génération en génération.
                </p>
                <p>
                  Au fil des années, Zengest est devenu bien plus qu'un restaurant : c'est un lieu de rencontre, 
                  de partage et de découverte gastronomique où chaque client devient un invité privilégié.
                </p>
              </div>
            </div>
            <div className="column is-half">
              <figure className="image is-4by3">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Restaurant Zengest - Vue d'ensemble"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Chef et équipe */}
        <section className="section">
          <div className="columns is-vcentered">
            <div className="column is-half">
              <figure className="image is-4by3">
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Chef Antoine Dubois"
                />
              </figure>
            </div>
            <div className="column is-half">
              <h2 className="title is-3">Notre Chef</h2>
              <div className="content">
                <h3 className="title is-4">Antoine Dubois</h3>
                <p className="subtitle is-6">Chef étoilé • Meilleur Ouvrier de France</p>
                <p>
                  Formé dans les plus prestigieuses maisons parisiennes, Antoine Dubois a obtenu sa première 
                  étoile Michelin en 2012. Sa cuisine, à la fois respectueuse de la tradition et résolument 
                  moderne, lui a valu la reconnaissance de ses pairs et l'amour de sa clientèle.
                </p>
                <p>
                  Passionné par les produits du terroir français, il travaille en étroite collaboration 
                  avec des producteurs locaux pour garantir la fraîcheur et la qualité de chaque ingrédient 
                  qui compose ses créations culinaires.
                </p>
                <blockquote>
                  <p className="is-italic">
                    "La cuisine, c'est l'art de transformer des produits simples en émotions pures. 
                    Chaque assiette doit raconter une histoire et créer des souvenirs inoubliables."
                  </p>
                  <footer>- Antoine Dubois</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs et engagement */}
        <section className="section has-background-light">
          <div className="container">
            <div className="has-text-centered mb-6">
              <h2 className="title is-3">Nos Valeurs</h2>
              <p className="subtitle is-5">
                Les principes qui guident notre approche culinaire
              </p>
            </div>

            <div className="columns">
              <div className="column">
                <div className="card h-100">
                  <div className="card-content has-text-centered">
                    <span className="icon is-large has-text-success">
                      <i className="fas fa-leaf fa-2x"></i>
                    </span>
                    <h3 className="title is-5 mt-3">Respect de l'Environnement</h3>
                    <p>
                      Circuits courts, produits bio et de saison, gestion responsable des déchets. 
                      Nous nous engageons pour une gastronomie durable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card h-100">
                  <div className="card-content has-text-centered">
                    <span className="icon is-large has-text-primary">
                      <i className="fas fa-handshake fa-2x"></i>
                    </span>
                    <h3 className="title is-5 mt-3">Partenariats Locaux</h3>
                    <p>
                      Collaboration étroite avec les producteurs locaux, soutien aux artisans 
                      et valorisation du savoir-faire français.
                    </p>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card h-100">
                  <div className="card-content has-text-centered">
                    <span className="icon is-large has-text-warning">
                      <i className="fas fa-award fa-2x"></i>
                    </span>
                    <h3 className="title is-5 mt-3">Excellence Culinaire</h3>
                    <p>
                      Formation continue de nos équipes, innovation constante et recherche 
                      de la perfection dans chaque détail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="section">
          <div className="has-text-centered mb-6">
            <h2 className="title is-3">Notre Équipe</h2>
            <p className="subtitle is-5">
              Des professionnels passionnés à votre service
            </p>
          </div>

          <div className="columns">
            <div className="column">
              <div className="card">
                <div className="card-content has-text-centered">
                  <figure className="image is-128x128 mx-auto mb-4">
                    <img 
                      className="is-rounded"
                      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Marie Leroy - Sommelier"
                    />
                  </figure>
                  <h3 className="title is-5">Marie Leroy</h3>
                  <p className="subtitle is-6">Sommelier</p>
                  <p>Plus de 200 références de vins sélectionnées avec passion</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <div className="card-content has-text-centered">
                  <figure className="image is-128x128 mx-auto mb-4">
                    <img 
                      className="is-rounded"
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Pierre Martin - Chef Pâtissier"
                    />
                  </figure>
                  <h3 className="title is-5">Pierre Martin</h3>
                  <p className="subtitle is-6">Chef Pâtissier</p>
                  <p>Créateur de desserts qui allient tradition et modernité</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <div className="card-content has-text-centered">
                  <figure className="image is-128x128 mx-auto mb-4">
                    <img 
                      className="is-rounded"
                      src="https://images.unsplash.com/photo-1594736797933-d0f06ba09914?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Sophie Dubois - Directrice de salle"
                    />
                  </figure>
                  <h3 className="title is-5">Sophie Dubois</h3>
                  <p className="subtitle is-6">Directrice de salle</p>
                  <p>Garante de l'excellence du service et de votre bien-être</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="has-text-centered">
          <h3 className="title is-4">Prêt à découvrir Zengest ?</h3>
          <p className="subtitle is-6 mb-4">
            Venez vivre une expérience gastronomique inoubliable
          </p>
          <div className="buttons is-centered">
            <a href="/reservations" className="button is-primary is-medium">
              <span className="icon">
                <i className="fas fa-calendar-plus"></i>
              </span>
              <span>Réserver une table</span>
            </a>
            <a href="/contact" className="button is-outlined is-medium">
              <span className="icon">
                <i className="fas fa-envelope"></i>
              </span>
              <span>Nous contacter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About