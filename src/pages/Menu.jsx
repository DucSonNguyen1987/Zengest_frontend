import { useState, useEffect } from 'react'
import { useMenu } from '../hooks/useMenu'
import SEOHead, { SEOPresets } from '../components/SEOHead'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const Menu = ({ dailySpecials = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')

  // Hook pour récupérer le menu depuis l'API
  const { 
    menu, 
    categories, 
    isLoading, 
    error, 
    hasMenu,
    searchMenu 
  } = useMenu({
    autoFetch: true
  })

  // SEO dynamique selon le type de page
  const seoProps = dailySpecials ? SEOPresets.dailySpecials : SEOPresets.menu

  // Données de fallback pour la démo (si API indisponible)
  const fallbackMenu = {
    categories: [
      {
        id: 1,
        name: 'Entrées',
        icon: 'fas fa-seedling',
        description: 'Pour bien commencer votre repas',
        items: [
          {
            id: 1,
            name: 'Foie gras maison',
            description: 'Foie gras de canard mi-cuit, brioche toastée et chutney de figues',
            price: 32.00,
            allergens: ['Gluten'],
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 2,
            name: 'Carpaccio de Saint-Jacques',
            description: 'Noix de Saint-Jacques, vinaigrette aux agrumes et caviar d\'Aquitaine',
            price: 28.00,
            allergens: ['Mollusques'],
            isAvailable: true,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 3,
            name: 'Velouté de châtaignes',
            description: 'Crème de châtaignes, émulsion de truffe et lard croustillant',
            price: 18.00,
            allergens: ['Lait'],
            isVegetarian: true,
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          }
        ]
      },
      {
        id: 2,
        name: 'Plats Principaux',
        icon: 'fas fa-utensils',
        description: 'Le cœur de notre cuisine',
        items: [
          {
            id: 4,
            name: 'Filet de bœuf Rossini',
            description: 'Filet de bœuf, foie gras poêlé, sauce Périgueux et légumes confits',
            price: 45.00,
            allergens: ['Sulfites'],
            isSignature: true,
            cookingTime: '15-20 min',
            image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 5,
            name: 'Sole meunière',
            description: 'Sole fraîche, beurre noisette, pommes de terre grenailles et haricots verts',
            price: 38.00,
            allergens: ['Poisson', 'Lait'],
            freshDaily: true,
            image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 6,
            name: 'Risotto aux cèpes',
            description: 'Riz Carnaroli, cèpes frais, parmesan 24 mois et truffe noire',
            price: 32.00,
            allergens: ['Lait'],
            isVegetarian: true,
            seasonal: true,
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          }
        ]
      },
      {
        id: 3,
        name: 'Desserts',
        icon: 'fas fa-birthday-cake',
        description: 'Une finale en beauté',
        items: [
          {
            id: 7,
            name: 'Soufflé au Grand Marnier',
            description: 'Soufflé chaud à la liqueur d\'orange, glace vanille bourbon',
            price: 16.00,
            allergens: ['Œufs', 'Lait', 'Gluten'],
            cookingTime: '25 min',
            mustOrder: true,
            image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 8,
            name: 'Tarte Tatin revisitée',
            description: 'Pommes caramélisées, pâte sablée aux amandes et crème fraîche',
            price: 14.00,
            allergens: ['Fruits à coque', 'Gluten', 'Lait'],
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 9,
            name: 'Chocolat noir intense',
            description: 'Déclinaison de chocolat Valrhona 70%, sorbet cacao et tuile croustillante',
            price: 15.00,
            allergens: ['Lait', 'Œufs'],
            glutenFree: true,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          }
        ]
      }
    ]
  }

  // Utiliser les données API ou fallback
  const menuToDisplay = hasMenu ? menu : fallbackMenu
  const categoriesToDisplay = categories.length > 0 ? categories : fallbackMenu.categories

  // Filtrer les plats selon les critères
  const getFilteredItems = () => {
    let allItems = []
    
    // Récupérer tous les plats de toutes les catégories
    menuToDisplay.categories?.forEach(category => {
      allItems = [...allItems, ...category.items.map(item => ({
        ...item,
        categoryName: category.name
      }))]
    })

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      allItems = allItems.filter(item => 
        item.categoryName.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filtrer par recherche
    if (searchTerm) {
      allItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrer par prix
    if (priceFilter !== 'all') {
      switch(priceFilter) {
        case 'low':
          allItems = allItems.filter(item => item.price < 25)
          break
        case 'medium':
          allItems = allItems.filter(item => item.price >= 25 && item.price < 40)
          break
        case 'high':
          allItems = allItems.filter(item => item.price >= 40)
          break
      }
    }

    return allItems
  }

  const filteredItems = getFilteredItems()

  if (dailySpecials) {
    return (
      <div className="section" style={{ paddingTop: '5rem' }}>
        <SEOHead {...seoProps} />
        <div className="container">
          <div className="has-text-centered mb-6">
            <h1 className="title is-1">Nos Plats du Jour</h1>
            <p className="subtitle is-4">
              Créations quotidiennes inspirées des saisons et des arrivages
            </p>
          </div>
          
          <div className="notification is-info">
            <div className="columns is-vcentered">
              <div className="column">
                <p className="has-text-centered">
                  <strong>🔄 Connexion API en temps réel</strong>
                  <br />
                  Les plats du jour sont mis à jour automatiquement par notre équipe.
                </p>
              </div>
              <div className="column is-narrow">
                <a href="/" className="button is-primary">
                  <span className="icon">
                    <i className="fas fa-arrow-left"></i>
                  </span>
                  <span>Retour à l'accueil</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <SEOHead {...seoProps} />
      <div className="container">
        {/* Header */}
        <div className="has-text-centered mb-6">
          <h1 className="title is-1">
            <span className="icon-text">
              <span className="icon has-text-primary">
                <i className="fas fa-utensils"></i>
              </span>
              <span>Notre Menu</span>
            </span>
          </h1>
          <p className="subtitle is-4">
            Une cuisine raffinée qui célèbre les saveurs françaises authentiques
          </p>
          
          {/* Statut API */}
          {!hasMenu && !isLoading && (
            <div className="notification is-warning is-light">
              <span className="icon">
                <i className="fas fa-wifi"></i>
              </span>
              <span>Mode démo - Menu sera connecté à l'API backend</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Chargement du menu..." />}

        {/* Error State */}
        {error && (
          <ErrorMessage 
            message={error}
            onRetry={() => window.location.reload()}
            showRetry={true}
          />
        )}

        {/* Menu Content */}
        {!isLoading && (
          <>
            {/* Filtres et recherche */}
            <div className="box mb-6">
              <div className="columns is-multiline">
                {/* Recherche */}
                <div className="column is-half">
                  <div className="field">
                    <label className="label">Rechercher un plat</label>
                    <div className="control has-icons-left">
                      <input 
                        className="input"
                        type="text"
                        placeholder="Nom du plat, ingrédient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="icon is-left">
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Filtre catégorie */}
                <div className="column is-one-quarter">
                  <div className="field">
                    <label className="label">Catégorie</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select 
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="all">Toutes les catégories</option>
                          {categoriesToDisplay.map(category => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtre prix */}
                <div className="column is-one-quarter">
                  <div className="field">
                    <label className="label">Gamme de prix</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select 
                          value={priceFilter}
                          onChange={(e) => setPriceFilter(e.target.value)}
                        >
                          <option value="all">Tous les prix</option>
                          <option value="low">Moins de 25€</option>
                          <option value="medium">25€ - 40€</option>
                          <option value="high">Plus de 40€</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Résultats de recherche */}
              {(searchTerm || selectedCategory !== 'all' || priceFilter !== 'all') && (
                <div className="has-text-centered">
                  <p className="content">
                    <strong>{filteredItems.length}</strong> plat{filteredItems.length > 1 ? 's' : ''} 
                    {searchTerm && ` pour "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` dans "${selectedCategory}"`}
                    {priceFilter !== 'all' && ` (${priceFilter === 'low' ? 'moins de 25€' : priceFilter === 'medium' ? '25€-40€' : 'plus de 40€'})`}
                  </p>
                  {(searchTerm || selectedCategory !== 'all' || priceFilter !== 'all') && (
                    <button 
                      className="button is-small is-outlined"
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('all')
                        setPriceFilter('all')
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-times"></i>
                      </span>
                      <span>Effacer les filtres</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Menu par catégories ou résultats filtrés */}
            {(selectedCategory === 'all' && !searchTerm && priceFilter === 'all') ? (
              /* Affichage par catégories */
              menuToDisplay.categories?.map((category) => (
                <section key={category.id} className="mb-6">
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-header-title is-size-3">
                        <span className="icon mr-3 has-text-primary">
                          <i className={category.icon}></i>
                        </span>
                        <span>{category.name}</span>
                      </h2>
                      {category.description && (
                        <p className="card-header-subtitle">{category.description}</p>
                      )}
                    </div>
                    <div className="card-content">
                      <div className="columns is-multiline">
                        {category.items.map((item) => (
                          <div key={item.id} className="column is-full">
                            <div className="menu-item-card">
                              <div className="columns is-vcentered">
                                {/* Image du plat */}
                                <div className="column is-narrow">
                                  <figure className="image is-96x96">
                                    <img 
                                      src={item.image}
                                      alt={item.name}
                                      className="is-rounded"
                                      onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&q=80'
                                      }}
                                    />
                                  </figure>
                                </div>

                                {/* Informations du plat */}
                                <div className="column">
                                  <div className="content">
                                    <h3 className="title is-5 mb-2">
                                      {item.name}
                                      {item.isSignature && (
                                        <span className="tag is-warning is-small ml-2">
                                          <span className="icon">
                                            <i className="fas fa-star"></i>
                                          </span>
                                          <span>Signature</span>
                                        </span>
                                      )}
                                    </h3>
                                    
                                    <p className="mb-3">{item.description}</p>
                                    
                                    {/* Informations supplémentaires */}
                                    <div className="tags">
                                      {item.allergens?.map((allergen, index) => (
                                        <span key={index} className="tag is-warning is-light is-small">
                                          <span className="icon">
                                            <i className="fas fa-exclamation-triangle"></i>
                                          </span>
                                          <span>{allergen}</span>
                                        </span>
                                      ))}
                                      {item.isVegetarian && (
                                        <span className="tag is-success is-light is-small">
                                          <span className="icon">
                                            <i className="fas fa-leaf"></i>
                                          </span>
                                          <span>Végétarien</span>
                                        </span>
                                      )}
                                      {item.glutenFree && (
                                        <span className="tag is-info is-light is-small">
                                          Sans gluten
                                        </span>
                                      )}
                                      {item.freshDaily && (
                                        <span className="tag is-link is-light is-small">
                                          <span className="icon">
                                            <i className="fas fa-fish"></i>
                                          </span>
                                          <span>Pêche du jour</span>
                                        </span>
                                      )}
                                    </div>

                                    {/* Informations spéciales */}
                                    {item.cookingTime && (
                                      <p className="is-size-7 has-text-grey">
                                        <span className="icon">
                                          <i className="fas fa-clock"></i>
                                        </span>
                                        Temps de cuisson : {item.cookingTime}
                                      </p>
                                    )}
                                    {item.mustOrder && (
                                      <p className="is-size-7 has-text-info">
                                        <span className="icon">
                                          <i className="fas fa-info-circle"></i>
                                        </span>
                                        À commander en début de repas
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Prix */}
                                <div className="column is-narrow">
                                  <div className="has-text-right">
                                    <span className="menu-price tag is-large is-primary">
                                      {item.price.toFixed(2)}€
                                    </span>
                                    {!item.isAvailable && (
                                      <p className="tag is-danger is-small mt-2">
                                        Épuisé
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              /* Résultats de recherche/filtres */
              <section className="mb-6">
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-header-title is-size-4">
                      Résultats de recherche
                    </h2>
                  </div>
                  <div className="card-content">
                    {filteredItems.length > 0 ? (
                      <div className="columns is-multiline">
                        {filteredItems.map((item) => (
                          <div key={item.id} className="column is-full">
                            <div className="menu-item-card">
                              <div className="columns is-vcentered">
                                <div className="column is-narrow">
                                  <figure className="image is-96x96">
                                    <img 
                                      src={item.image}
                                      alt={item.name}
                                      className="is-rounded"
                                    />
                                  </figure>
                                </div>
                                <div className="column">
                                  <div className="content">
                                    <h3 className="title is-5 mb-2">
                                      {item.name}
                                      <span className="tag is-light is-small ml-2">
                                        {item.categoryName}
                                      </span>
                                    </h3>
                                    <p>{item.description}</p>
                                  </div>
                                </div>
                                <div className="column is-narrow">
                                  <span className="menu-price tag is-large is-primary">
                                    {item.price.toFixed(2)}€
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="has-text-centered">
                        <span className="icon is-large has-text-grey-light">
                          <i className="fas fa-search fa-3x"></i>
                        </span>
                        <h3 className="title is-4 mt-4">Aucun résultat</h3>
                        <p className="subtitle is-6">
                          Essayez avec d'autres mots-clés ou modifiez vos filtres
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Wine pairing */}
            <section className="section">
              <div className="box has-background-primary-light">
                <div className="columns is-vcentered">
                  <div className="column">
                    <h3 className="title is-4">
                      <span className="icon-text">
                        <span className="icon has-text-primary">
                          <i className="fas fa-wine-glass-alt"></i>
                        </span>
                        <span>Accords Mets & Vins</span>
                      </span>
                    </h3>
                    <p className="content">
                      Notre sommelier vous propose les meilleurs accords pour sublimer votre repas. 
                      Plus de 200 références de vins français et internationaux vous attendent.
                    </p>
                  </div>
                  <div className="column is-narrow">
                    <button className="button is-primary">
                      <span className="icon">
                        <i className="fas fa-book"></i>
                      </span>
                      <span>Voir la carte des vins</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to action */}
            <div className="has-text-centered">
              <h3 className="title is-4">Tenté par notre cuisine ?</h3>
              <p className="subtitle is-6 mb-4">
                Réservez votre table pour découvrir ces saveurs exceptionnelles
              </p>
              <div className="buttons is-centered">
                <a href="/reservations" className="button is-primary is-medium">
                  <span className="icon">
                    <i className="fas fa-calendar-plus"></i>
                  </span>
                  <span>Réserver maintenant</span>
                </a>
                <a href="/plats-du-jour" className="button is-outlined is-medium">
                  <span className="icon">
                    <i className="fas fa-star"></i>
                  </span>
                  <span>Voir les plats du jour</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Menu