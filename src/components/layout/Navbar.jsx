import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isActive, setIsActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Gestion du scroll pour navbar transparente
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsActive(false)
  }, [location])

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  const isActiveLink = (path) => {
    return location.pathname === path ? 'is-active' : ''
  }

  return (
    <nav 
      className={`navbar is-fixed-top ${isScrolled ? 'has-shadow' : ''}`}
      role="navigation" 
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img 
              src="/logo-zengest.png" 
              alt="Zengest Restaurant" 
              width="120" 
              height="40"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <span 
              className="title is-4 has-text-primary"
              style={{ display: 'none', marginLeft: '10px' }}
            >
              Zengest
            </span>
          </Link>

          <button
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isActive}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link 
              to="/" 
              className={`navbar-item ${isActiveLink('/')}`}
            >
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span>Accueil</span>
            </Link>

            <Link 
              to="/menu" 
              className={`navbar-item ${isActiveLink('/menu')}`}
            >
              <span className="icon">
                <i className="fas fa-utensils"></i>
              </span>
              <span>Notre Menu</span>
            </Link>

            <Link 
              to="/plats-du-jour" 
              className={`navbar-item ${isActiveLink('/plats-du-jour')}`}
            >
              <span className="icon">
                <i className="fas fa-star"></i>
              </span>
              <span>Plats du Jour</span>
            </Link>

            <Link 
              to="/about" 
              className={`navbar-item ${isActiveLink('/about')}`}
            >
              <span className="icon">
                <i className="fas fa-info-circle"></i>
              </span>
              <span>À Propos</span>
            </Link>

            <Link 
              to="/galerie" 
              className={`navbar-item ${isActiveLink('/galerie')}`}
            >
              <span className="icon">
                <i className="fas fa-camera"></i>
              </span>
              <span>Galerie</span>
            </Link>

            <Link 
              to="/contact" 
              className={`navbar-item ${isActiveLink('/contact')}`}
            >
              <span className="icon">
                <i className="fas fa-envelope"></i>
              </span>
              <span>Contact</span>
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar