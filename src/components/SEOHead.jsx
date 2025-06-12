import { Helmet } from 'react-helmet-async'

/**
 * Composant SEO pour gérer les meta tags de chaque page
 * @param {Object} props - Props du composant
 * @returns {JSX.Element} Meta tags optimisés
 */
const SEOHead = ({
  title = "Restaurant Zengest - Gastronomie Française à Paris",
  description = "Découvrez le restaurant Zengest, cuisine gastronomique française étoilée au cœur de Paris. Réservez votre table pour une expérience culinaire d'exception.",
  keywords = "restaurant gastronomique, cuisine française, Paris, chef étoilé, plats du jour, réservation restaurant",
  canonicalUrl = window.location.href,
  ogImage = "/images/restaurant-hero.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData = null,
  noIndex = false
}) => {
  // Données structurées par défaut pour un restaurant
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Restaurant Zengest",
    "description": description,
    "url": "https://zengest.fr",
    "telephone": "+33123456789",
    "email": "contact@zengest.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Rue de la Gastronomie",
      "addressLocality": "Paris",
      "postalCode": "75001",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8589",
      "longitude": "2.3392"
    },
    "openingHours": [
      "Mo-Fr 12:00-14:30",
      "Mo-Fr 19:00-22:30",
      "Sa 19:00-23:00"
    ],
    "servesCuisine": "French",
    "priceRange": "€€€",
    "acceptsReservations": true,
    "hasMenu": "https://zengest.fr/menu",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "image": [
      "https://zengest.fr/images/restaurant-exterior.jpg",
      "https://zengest.fr/images/restaurant-interior.jpg",
      "https://zengest.fr/images/signature-dish.jpg"
    ]
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Helmet>
      {/* Meta tags de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Meta viewport pour mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Restaurant Zengest" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@zengest" />
      
      {/* Additional meta tags pour restaurants */}
      <meta name="geo.region" content="FR-75" />
      <meta name="geo.placename" content="Paris" />
      <meta name="geo.position" content="48.8589;2.3392" />
      <meta name="ICBM" content="48.8589, 2.3392" />
      
      {/* Données structurées JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  )
}

// Presets SEO pour différentes pages
export const SEOPresets = {
  home: {
    title: "Restaurant Zengest - Gastronomie Française Étoilée à Paris",
    description: "Découvrez l'excellence de la cuisine française au restaurant Zengest. Chef étoilé, plats du jour créatifs, service d'exception. Réservez votre table au cœur de Paris.",
    keywords: "restaurant gastronomique Paris, cuisine française étoilée, chef Antoine Dubois, plats du jour, menu gastronomique, réservation restaurant Paris"
  },
  
  menu: {
    title: "Menu Gastronomique - Restaurant Zengest Paris",
    description: "Découvrez notre menu gastronomique français : entrées raffinées, plats signature et desserts d'exception. Carte des vins exceptionnelle par notre sommelier.",
    keywords: "menu gastronomique, carte restaurant Paris, cuisine française, plats signature, foie gras, homard, desserts, carte des vins"
  },
  
  dailySpecials: {
    title: "Plats du Jour - Créations Quotidiennes du Chef | Zengest",
    description: "Nos plats du jour changent quotidiennement selon les arrivages et l'inspiration de notre chef étoilé. Créations uniques avec des produits de saison.",
    keywords: "plats du jour Paris, spécialités quotidiennes, produits de saison, cuisine créative, chef étoilé, arrivages frais"
  },
  
  about: {
    title: "À Propos - Histoire & Philosophie du Restaurant Zengest",
    description: "Découvrez l'histoire du restaurant Zengest, la philosophie culinaire du chef Antoine Dubois et notre équipe passionnée. 15 ans d'excellence gastronomique.",
    keywords: "histoire restaurant Zengest, chef Antoine Dubois, équipe restaurant, philosophie culinaire, restaurant étoilé Paris"
  },
  
  contact: {
    title: "Contact & Réservations - Restaurant Zengest Paris",
    description: "Contactez le restaurant Zengest pour vos réservations, événements privés ou questions. Situé au cœur de Paris, 123 Rue de la Gastronomie.",
    keywords: "contact restaurant Zengest, réservation Paris, événements privés, restaurant gastronomique contact, adresse restaurant Paris"
  },
  
  gallery: {
    title: "Galerie Photos - Ambiance & Cuisine du Restaurant Zengest",
    description: "Découvrez en images l'ambiance raffinée du restaurant Zengest, nos créations culinaires et notre équipe passionnée. Galerie photo complète.",
    keywords: "photos restaurant Zengest, galerie images, ambiance restaurant, plats gastronomiques photos, équipe chef"
  },
  
  reservations: {
    title: "Réservation en Ligne - Restaurant Zengest Paris",
    description: "Réservez votre table au restaurant Zengest en ligne. Système de réservation simple et sécurisé. Disponibilités en temps réel.",
    keywords: "réservation restaurant Paris, réserver table Zengest, booking restaurant gastronomique, réservation en ligne"
  }
}

export default SEOHead;