// App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Reservations from './pages/Reservations'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'

function App() {

  
  useEffect(() => {
  // Test de connexion API
  fetch('/api/health')
    .then(response => response.json())
    .then(data => {
      console.log('✅ Backend connecté:', data);
    })
    .catch(error => {
      console.error('❌ Erreur backend:', error);
    });
}, []);


  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/plats-du-jour" element={<Menu dailySpecials />} />
          <Route path="/about" element={<About />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App