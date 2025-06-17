const FeatureSection = () => {
  const features = [
    {
      icon: 'fas fa-leaf',
      title: 'Produits Frais',
      description: 'Ingrédients sélectionnés quotidiennement chez nos producteurs locaux pour une fraîcheur optimale.',
      color: 'is-success'
    },
    {
      icon: 'fas fa-award',
      title: 'Cuisine Traditionnelle',
      description: 'Recettes authentiques revisitées avec créativité par notre chef étoilé, dans le respect de la tradition.',
      color: 'is-warning'
    },
    {
      icon: 'fas fa-heart',
      title: 'Service Personnalisé',
      description: 'Une équipe passionnée à votre service pour une expérience gastronomique sur mesure et inoubliable.',
      color: 'is-danger'
    },
    {
      icon: 'fas fa-wine-glass-alt',
      title: 'Cave Exceptionnelle',
      description: 'Plus de 200 références de vins français et internationaux sélectionnés par notre sommelier.',
      color: 'is-primary'
    },
    {
      icon: 'fas fa-clock',
      title: 'Plats du Jour',
      description: 'Créations quotidiennes inspirées des saisons et des arrivages, pour surprendre vos papilles.',
      color: 'is-info'
    },
    {
      icon: 'fas fa-users',
      title: 'Ambiance Conviviale',
      description: 'Un cadre chaleureux et élégant, parfait pour vos repas en famille, entre amis ou en amoureux.',
      color: 'is-link'
    }
  ]

  return (
    <section className="section is-medium has-background-light">
      <div className="container">
        {/* Header */}
        <div className="has-text-centered mb-6">
          <h2 className="title is-2">Pourquoi Choisir Zengest ?</h2>
          <p className="subtitle is-4">
            Six raisons qui font de nous votre restaurant de référence
          </p>
        </div>

        {/* Grid des features */}
        <div className="columns is-multiline">
          {features.map((feature, index) => (
            <div key={index} className="column is-one-third">
              <div className="card feature-card h-100">
                <div className="card-content has-text-centered">
                  {/* Icône */}
                  <div className={`icon is-large has-text-${feature.color.replace('is-', '')} mb-4`}>
                    <i className={`${feature.icon} fa-3x`}></i>
                  </div>

                  {/* Titre */}
                  <h3 className="title is-4 mb-3">{feature.title}</h3>
                  
                  {/* Description */}
                  <p className="content">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="section">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="has-text-centered">
                <h3 className="title is-1 has-text-primary">15+</h3>
                <p className="subtitle is-5">Années d'expérience</p>
              </div>
            </div>
            <div className="column">
              <div className="has-text-centered">
                <h3 className="title is-1 has-text-warning">4.8</h3>
                <p className="subtitle is-5">Note moyenne Google</p>
              </div>
            </div>
            <div className="column">
              <div className="has-text-centered">
                <h3 className="title is-1 has-text-info">1000+</h3>
                <p className="subtitle is-5">Clients satisfaits</p>
              </div>
            </div>
            <div className="column">
              <div className="has-text-centered">
                <h3 className="title is-1 has-text-success">50+</h3>
                <p className="subtitle is-5">Plats à la carte</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="has-text-centered">
          <div className="box">
            <h3 className="title is-4">Prêt à vivre l'expérience Zengest ?</h3>
            <p className="subtitle is-6 mb-4">
              Réservez dès maintenant votre table et laissez-vous surprendre par notre cuisine d'exception.
            </p>
            <div className="buttons is-centered">
              <a href="/reservations" className="button is-primary is-medium">
                <span className="icon">
                  <i className="fas fa-calendar-plus"></i>
                </span>
                <span>Réserver maintenant</span>
              </a>
              <a href="/menu" className="button is-outlined is-medium">
                <span className="icon">
                  <i className="fas fa-utensils"></i>
                </span>
                <span>Découvrir le menu</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection