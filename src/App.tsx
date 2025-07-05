import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import FarmerTestimonials from './components/FarmerTestimonials'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-primary-50">
      <Header />
      <main>
        <Hero />
        <About />
        <FarmerTestimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App