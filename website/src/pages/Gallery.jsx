import { useState } from 'react'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Salle principale du restaurant Zengest",
      category: "Ambiance",
      description: "Notre salle principale avec sa décoration élégante et chaleureuse"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Plat signature du chef",
      category: "Cuisine",
      description: "Création signature de notre chef, alliance parfaite des saveurs"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Bar et cave à vins",
      category: "Ambiance",
      description: "Notre bar et une partie de notre cave à vins exceptionnelle"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Chef Antoine en cuisine",
      category: "Équipe",
      description: "Notre chef étoilé Antoine Dubois en pleine création culinaire"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Dessert signature",
      category: "Cuisine",
      description: "Nos desserts, véritables œuvres d'art sucrées"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Service en salle",
      category: "Équipe",
      description: "Notre équipe de salle, professionnelle et attentionnée"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cuisine ouverte",
      category: "Ambiance",
      description: "Vue sur notre cuisine ouverte, théâtre de nos créations"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Plat de poisson",
      category: "Cuisine",
      description: "Nos poissons frais, préparés selon les traditions françaises"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Terrasse extérieure",
      category: "Ambiance",
      description: "Notre terrasse pour profiter des beaux jours parisiens"
    }
  ]

  const categories = ['Tous', 'Ambiance', 'Cuisine', 'Équipe']

  // Filtrer les images selon la catégorie sélectionnée
  const filteredImages = selectedCategory === 'Tous' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory)

  const openModal = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden' // Empêcher le scroll
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    document.body.style.overflow = 'auto' // Restaurer le scroll
  }

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    setSelectedImage(filteredImages[prevIndex])
  }

  // Gestion des touches clavier
  const handleKeyDown = (e) => {
    if (!isModalOpen) return
    
    switch(e.key) {
      case 'Escape':
        closeModal()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        prevImage()
        break
    }
  }

  // Ajouter event listener pour le clavier
  useState(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, selectedImage])

  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="has-text-centered mb-6">
          <h1 className="title is-1">
            <span className="icon-text">
              <span className="icon has-text-primary">
                <i className="fas fa-camera"></i>
              </span>
              <span>Galerie Photos</span>
            </span>
          </h1>
          <p className="subtitle is-4">
            Découvrez l'ambiance et l'art culinaire de Zengest en images
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="has-text-centered mb-6">
          <div className="buttons is-centered">
            {categories.map((category) => (
              <button
                key={category}
                className={`button ${
                  selectedCategory === category ? 'is-primary' : 'is-outlined'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="icon">
                  <i className={`fas ${
                    category === 'Tous' ? 'fa-th-large' :
                    category === 'Ambiance' ? 'fa-home' :
                    category === 'Cuisine' ? 'fa-utensils' :
                    'fa-users'
                  }`}></i>
                </span>
                <span>{category}</span>
              </button>
            ))}
          </div>
          <p className="has-text-grey">
            {filteredImages.length} photo{filteredImages.length > 1 ? 's' : ''} 
            {selectedCategory !== 'Tous' && ` dans la catégorie "${selectedCategory}"`}
          </p>
        </div>

        {/* Grille d'images */}
        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openModal(image)}
              role="button"
              tabIndex={0}
              aria-label={`Voir ${image.alt} en grand`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
              />
              <div className="image-overlay">
                <span className="tag is-primary is-medium">
                  {image.category}
                </span>
              </div>
              <div className="image-hover-overlay">
                <span className="icon is-large has-text-white">
                  <i className="fas fa-search-plus fa-2x"></i>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message si pas d'images */}
        {filteredImages.length === 0 && (
          <div className="has-text-centered">
            <div className="notification is-light">
              <span className="icon is-large has-text-grey">
                <i className="fas fa-images fa-2x"></i>
              </span>
              <p className="title is-5 mt-4">Aucune image dans cette catégorie</p>
              <p className="subtitle is-6">
                Sélectionnez une autre catégorie ou "Tous" pour voir toutes les photos
              </p>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="has-text-centered mt-6">
          <div className="box">
            <h3 className="title is-4">Envie de découvrir Zengest en personne ?</h3>
            <p className="subtitle is-6 mb-4">
              Réservez votre table pour vivre cette expérience unique
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
                <span>Voir le menu</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'affichage */}
      {isModalOpen && selectedImage && (
        <div className="modal is-active" onClick={closeModal}>
          <div className="modal-background"></div>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal">
              {/* Boutons de navigation */}
              <button 
                className="gallery-nav gallery-prev"
                onClick={prevImage}
                aria-label="Image précédente"
              >
                <span className="icon is-large">
                  <i className="fas fa-chevron-left fa-2x"></i>
                </span>
              </button>
              
              <button 
                className="gallery-nav gallery-next"
                onClick={nextImage}
                aria-label="Image suivante"
              >
                <span className="icon is-large">
                  <i className="fas fa-chevron-right fa-2x"></i>
                </span>
              </button>

              {/* Image principale */}
              <figure className="image">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                />
              </figure>

              {/* Informations de l'image */}
              <div className="gallery-info">
                <div className="box">
                  <h3 className="title is-5">{selectedImage.alt}</h3>
                  <p className="content">{selectedImage.description}</p>
                  <span className="tag is-primary">{selectedImage.category}</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            className="modal-close is-large" 
            aria-label="Fermer"
            onClick={closeModal}
          ></button>
        </div>
      )}
    </div>
  )
}

export default Gallery