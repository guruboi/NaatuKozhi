import { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Star, Play } from 'lucide-react'

interface Farmer {
  id: number
  name: string
  village: string
  district: string
  experience: string
  quote: string
  rating: number
  image: string
  videoThumbnail: string
  speciality: string
}

const FarmerTestimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [visibleFarmers, setVisibleFarmers] = useState<Set<number>>(new Set())
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [isScrolling, setIsScrolling] = useState(true)
  const [scrollSpeed, setScrollSpeed] = useState(1.5)
  const speedTransitionRef = useRef<NodeJS.Timeout | null>(null)

  const farmers: Farmer[] = [
    {
      id: 1,
      name: "Murugan",
      village: "Pudukottai",
      district: "Pudukottai",
      experience: "15 years",
      quote: "என் கோழிகள் எல்லாம் இயற்கை முறையில் வளர்க்கப்படுகின்றன. மருந்து இல்லை, கெமிக்கல் இல்லை. தூய்மையான உணவு மட்டுமே.",
      rating: 5,
      image: "",
      videoThumbnail: "",
      speciality: "Free Range Specialist"
    },
    {
      id: 2,
      name: "Lakshmi",
      village: "Theni",
      district: "Theni",
      experience: "12 years",
      quote: "Our chickens roam freely in open fields. They eat natural grains and herbs. That's why the taste is so different and healthy.",
      rating: 5,
      image: "",
      videoThumbnail: "",
      speciality: "Organic Feed Expert"
    },
    {
      id: 3,
      name: "Raman",
      village: "Dindigul",
      district: "Dindigul",
      experience: "20 years",
      quote: "My grandfather taught me this method. Same way we raise chickens for generations. Natural and pure, like it should be.",
      rating: 5,
      image: "",
      videoThumbnail: "",
      speciality: "Traditional Methods"
    },
    {
      id: 4,
      name: "Kamala",
      village: "Madurai",
      district: "Madurai",
      experience: "18 years",
      quote: "நாங்கள் வளர்க்கும் கோழிகள் எங்கள் குடும்பத்தின் ஒரு பகுதி. அவற்றை நேசித்து கவனித்துக் கொள்கிறோம். அதனால்தான் சுவையும் தரமும் அதிகம்.",
      rating: 5,
      image: "",
      videoThumbnail: "",
      speciality: "Family Farm Tradition"
    },
    {
      id: 5,
      name: "Selvam",
      village: "Karur",
      district: "Karur",
      experience: "16 years",
      quote: "Technology helps, but traditional wisdom is key. We use both to give you the best quality chicken with complete traceability.",
      rating: 5,
      image: "",
      videoThumbnail: "",
      speciality: "Modern Traditional Blend"
    }
  ]

  // Create duplicated farmers array for infinite loop
  const infiniteFarmers = [...farmers, ...farmers]

  // Simple continuous auto-scroll
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!isScrolling) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const interval = setInterval(() => {
      if (scrollContainer) {
        const singleSetWidth = scrollContainer.scrollWidth / 2
        
        scrollContainer.scrollLeft += scrollSpeed
        
        if (scrollContainer.scrollLeft >= singleSetWidth - 10) {
          scrollContainer.scrollLeft = scrollContainer.scrollLeft - singleSetWidth
        }
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isScrolling, scrollSpeed]) // Added scrollSpeed dependency

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speedTransitionRef.current) {
        clearTimeout(speedTransitionRef.current)
      }
    }
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const farmerId = entry.target.getAttribute('data-farmer-id')
            if (farmerId) {
              const id = parseInt(farmerId)
              setVisibleFarmers(prev => new Set([...prev, id]))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const timeoutId = setTimeout(() => {
      const cards = document.querySelectorAll('[data-farmer-id]')
      cards.forEach(card => observer.observe(card))
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      console.log('🎯 Button clicked:', direction)
      
      // Clear any existing speed transitions
      if (speedTransitionRef.current) {
        clearTimeout(speedTransitionRef.current)
      }

      // Smoothly slow down auto-scroll (don't stop completely)
      setScrollSpeed(0.3) // Slow down to 20% during manual scroll

      const scrollAmount = 340
      const currentScroll = scrollRef.current.scrollLeft
      const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount

      console.log('📍 Scrolling from', currentScroll, 'to', newScroll)

      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })

      // Quickly resume normal speed - no awkward pause
      speedTransitionRef.current = setTimeout(() => {
        setScrollSpeed(0.8) // Quick ramp to 80%
        speedTransitionRef.current = setTimeout(() => {
          setScrollSpeed(1.5) // Back to full speed
          console.log('✅ Speed smoothly restored')
        }, 200)
      }, 400) // Resume quickly after just 400ms
      
      console.log('✅ Manual scroll with smooth speed adjustment')
    }
  }

  const handleImageLoad = (farmerId: number) => {
    setLoadedImages(prev => new Set([...prev, farmerId]))
  }

  const handleImageError = (farmerId: number) => {
    console.log('❌ Image failed to load for farmer:', farmerId)
  }

  return (
    <section id="farmers" className="py-16 md:py-24 bg-gradient-to-br from-warm-50 to-primary-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="heading-secondary mb-6">
            Meet Our 
            <span className="text-primary-600"> Village Farmers</span>
          </h2>
          <p className="text-primary max-w-3xl mx-auto">
            Real stories from real farmers who take pride in raising the finest chickens 
            using time-honored traditions passed down through generations.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-sm font-medium">Auto-scrolling testimonials</span>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Farmers Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar pb-8 pt-4"
          style={{ 
            scrollBehavior: 'auto',
            scrollSnapType: 'none'
          }}
          onMouseEnter={() => setIsScrolling(false)}
          onMouseLeave={() => setIsScrolling(true)}
        >
          {infiniteFarmers.map((farmer, index) => {
            const isVisible = visibleFarmers.has(farmer.id)
            const isImageLoaded = loadedImages.has(farmer.id)

            return (
              <div 
                key={`${farmer.id}-${Math.floor(index / farmers.length)}`}
                className="group flex-shrink-0 w-80 bg-white rounded-xl shadow-gentle hover:shadow-warm transition-all duration-300 animate-slide-up cursor-pointer transform hover:scale-[1.01] hover:-translate-y-1"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  minWidth: '320px',
                  width: '320px'
                }}
                data-farmer-id={farmer.id}
              >
                {/* Video/Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-warm-100 rounded-t-xl overflow-hidden">
                  {isVisible && farmer.videoThumbnail && farmer.image && (
                    <img
                      src={farmer.videoThumbnail || farmer.image}
                      alt={`${farmer.name} from ${farmer.village}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(farmer.id)}
                      onError={() => handleImageError(farmer.id)}
                    />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary-200 rounded-full mx-auto flex items-center justify-center">
                        <span className="text-2xl">👨‍🌾</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{farmer.name}</p>
                      {isVisible && farmer.videoThumbnail && !isImageLoaded && (
                        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      )}
                    </div>
                  </div>
                  
                  {isVisible && isImageLoaded && farmer.videoThumbnail && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all duration-300 cursor-pointer">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-primary-600 ml-1" />
                      </div>
                    </button>
                  )}
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-primary-600" />
                    <span className="text-xs font-medium text-gray-700">{farmer.village}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 bg-white rounded-b-xl overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{farmer.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(farmer.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{farmer.district} District</span>
                      <span>{farmer.experience} experience</span>
                    </div>
                    
                    <div className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      {farmer.speciality}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "{farmer.quote}"
                  </blockquote>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105">
                    View Farm Story
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 space-y-6 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900">
            Want to visit our farms?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We believe in complete transparency. Schedule a visit to meet our farmers 
            and see how your chicken is raised with love and care.
          </p>
          <button className="btn-primary cursor-pointer hover:scale-105 transition-transform">
            Schedule Farm Visit
          </button>
        </div>
      </div>
    </section>
  )
}

export default FarmerTestimonials