import { useState, useEffect } from 'react'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Cliente fidèle',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c09d0e54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Une expérience culinaire exceptionnelle ! Le service est impeccable et les plats du jour sont toujours une belle surprise. Je recommande vivement !',
      date: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jean-Pierre Martin',
      role: 'Amateur de gastronomie',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Le restaurant Zengest a dépassé toutes mes attentes. La qualité des produits et la créativité du chef font de chaque visite un moment magique.',
      date: '2024-03-10'
    },
    {
      id: 3,
      name: 'Sophie Leclerc',
      role: 'Blogueuse culinaire',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Un cadre magnifique, une équipe aux petits soins et une cuisine raffinée. Zengest mérite sa réputation d\'excellence. Un incontournable !',
      date: '2024-03-08'
    },
    {
      id: 4,
      name: 'Thomas Rousseau',
      role: 'Chef d\'entreprise',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Parfait pour les repas d\'affaires. L\'ambiance est professionnelle et la cuisine d\'une qualité irréprochable. Mes clients sont toujours conquis.',
      date: '2024-03-05'
    },
    {
      id: 5,
      name: 'Isabelle Moreau',
      role: 'Amatrice de vins',
      avatar: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'La carte des vins est exceptionnelle et les conseils du sommelier parfaits. Chaque accord mets-vins est une découverte extraordinaire.',
      date: '2024-03-02'
    }
  ]

  // Rotation automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Change toutes les 6 secondes

    return () => clearInterval(interval)
  }, [testimonials.length])

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`icon has-text-warning ${index < rating ? '' : 'has-text-grey-light'}`}
      >
        <i className="fas fa-star"></i>
      </span>
    ))
  }

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
  }

  return (
    <section className="section is-medium">
      <div className="container">
        {/* Header */}
        <div className="has-text-centered mb-6">
          <h2 className="title is-2">Ce Que Disent Nos Clients</h2>
          <p className="subtitle is-4">
            Leurs expériences témoignent de notre passion pour l'excellence
          </p>
        </div>

        {/* Témoignage principal */}
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <div className="card testimonial-card">
              <div className="card-content">
                {/* Citation */}
                <div className="has-text-centered mb-5">
                  <span className="icon is-large has-text-primary">
                    <i className="fas fa-quote-left fa-2x"></i>
                  </span>
                </div>

                {/* Contenu du témoignage */}
                <div className="content has-text-centered">
                  <p className="is-size-5 has-text-grey-dark mb-5">
                    {testimonials[currentTestimonial].comment}
                  </p>

                  {/* Rating */}
                  <div className="field is-grouped is-grouped-centered mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>

                  {/* Profil client */}
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-64x64">
                        <img 
                          className="is-rounded" 
                          src={testimonials[currentTestimonial].avatar}
                          alt={testimonials[currentTestimonial].name}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[currentTestimonial].name)}&background=2c5530&color=fff&size=64`
                          }}
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-5 mb-1">{testimonials[currentTestimonial].name}</p>
                      <p className="subtitle is-6 has-text-grey">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="has-text-centered mt-5">
          <div className="field is-grouped is-grouped-centered">
            {testimonials.map((_, index) => (
              <div key={index} className="control">
                <button
                  className={`button is-small is-rounded ${
                    index === currentTestimonial ? 'is-primary' : 'is-light'
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Témoignage ${index + 1}`}
                >
                  {index === currentTestimonial ? (
                    <span className="icon is-small">
                      <i className="fas fa-circle"></i>
                    </span>
                  ) : (
                    <span className="icon is-small">
                      <i className="far fa-circle"></i>
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques de satisfaction */}
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="box">
                <span className="icon is-large has-text-success">
                  <i className="fas fa-thumbs-up fa-2x"></i>
                </span>
                <h3 className="title is-4 mt-3">98%</h3>
                <p className="subtitle is-6">Clients satisfaits</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <span className="icon is-large has-text-warning">
                  <i className="fas fa-star fa-2x"></i>
                </span>
                <h3 className="title is-4 mt-3">4.8/5</h3>
                <p className="subtitle is-6">Note moyenne</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <span className="icon is-large has-text-info">
                  <i className="fas fa-heart fa-2x"></i>
                </span>
                <h3 className="title is-4 mt-3">95%</h3>
                <p className="subtitle is-6">Clients fidèles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="has-text-centered">
          <h3 className="title is-4">Rejoignez nos clients satisfaits</h3>
          <p className="subtitle is-6 mb-4">
            Réservez votre table et découvrez pourquoi Zengest fait l'unanimité
          </p>
          <div className="buttons is-centered">
            <a href="/reservations" className="button is-primary is-medium">
              <span className="icon">
                <i className="fas fa-calendar-plus"></i>
              </span>
              <span>Réserver maintenant</span>
            </a>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="button is-outlined is-medium">
              <span className="icon">
                <i className="fab fa-google"></i>
              </span>
              <span>Voir tous les avis</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection