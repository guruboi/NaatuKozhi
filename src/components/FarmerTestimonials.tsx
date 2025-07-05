import { useRef, useEffect, useState, useCallback } from 'react'
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
  const [isPaused, setIsPaused] = useState(false)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
  const lastManualScrollTime = useRef<number>(0)

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
    }
  ]

  // Create many copies for seamless infinite scroll (6 sets for better buffering)
  const infiniteFarmers = [...farmers, ...farmers, ...farmers, ...farmers, ...farmers, ...farmers]
  const CARD_WIDTH = 350 // Increased from 344 to ensure full card movement

  // Auto-scroll with better infinite loop handling
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    
    autoScrollRef.current = setInterval(() => {
      if (scrollRef.current && !isPaused) {
        const container = scrollRef.current
        const totalWidth = container.scrollWidth
        const singleSetWidth = totalWidth / 6 // Now we have 6 copies
        const currentScroll = container.scrollLeft
        const now = Date.now()
        
        // Only auto-scroll if no recent manual interaction (last 200ms)
        if (now - lastManualScrollTime.current > 200) {
          container.scrollLeft += 1
          
          // More robust boundary detection - reset when past middle (3rd set)
          if (currentScroll >= singleSetWidth * 3.5) {
            // Smooth reset to equivalent position in 2nd set
            const positionInSet = currentScroll % singleSetWidth
            container.scrollLeft = singleSetWidth + positionInSet
          }
        }
      }
    }, 16)
  }, [isPaused])

  // Start auto-scroll on mount
  useEffect(() => {
    startAutoScroll()
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [startAutoScroll])

  // Manual scroll with better boundary handling
  const handleScroll = useCallback((direction: 'left' | 'right') => {
    console.log('🔥 Button clicked:', direction)
    
    if (!scrollRef.current) {
      console.log('❌ No scroll ref')
      return
    }
    
    const container = scrollRef.current
    const currentScroll = container.scrollLeft
    const totalWidth = container.scrollWidth
    const singleSetWidth = totalWidth / 6
    const moveAmount = direction === 'right' ? CARD_WIDTH : -CARD_WIDTH
    
    // Record the manual interaction time
    lastManualScrollTime.current = Date.now()
    
    // Check if we need to handle boundaries for manual scroll
    let targetScroll = currentScroll + moveAmount
    
    if (direction === 'right' && targetScroll >= singleSetWidth * 4) {
      // If going too far right, wrap to earlier position
      const positionInSet = currentScroll % singleSetWidth
      container.scrollLeft = singleSetWidth + positionInSet
      targetScroll = container.scrollLeft + moveAmount
    } else if (direction === 'left' && targetScroll < singleSetWidth) {
      // If going too far left, wrap to later position
      const positionInSet = currentScroll % singleSetWidth
      container.scrollLeft = singleSetWidth * 3 + positionInSet
      targetScroll = container.scrollLeft + moveAmount
    }
    
    console.log('📍 Current:', currentScroll, 'Move:', moveAmount, 'Expected target:', targetScroll)
    console.log('⏰ Manual scroll timestamp recorded - auto-scroll will pause for 200ms')
    
    // Execute the scroll
    container.scrollBy({
      left: moveAmount,
      behavior: 'smooth'
    })
    
    console.log('✅ Scroll command sent (auto-scroll continues)')
  }, [CARD_WIDTH])

  // Intersection Observer for lazy loading
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

  const handleImageLoad = useCallback((farmerId: number) => {
    setLoadedImages(prev => new Set([...prev, farmerId]))
  }, [])

  const handleImageError = useCallback((farmerId: number) => {
    console.log('❌ Image failed to load for farmer:', farmerId)
  }, [])

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

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
            <span className="text-sm font-medium">
              {isPaused ? 'Paused' : 'Auto-scrolling'}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isPaused ? 'bg-gray-400' : 'bg-primary-600 animate-pulse'
            }`}></div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleScroll('left')}
              className="group w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-colors duration-200" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="group w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Farmers Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar pb-8 pt-4 scroll-smooth"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {infiniteFarmers.map((farmer, index) => {
            const isVisible = visibleFarmers.has(farmer.id)
            const isImageLoaded = loadedImages.has(farmer.id)

            return (
              <div 
                key={`${farmer.id}-${index}`}
                className="group flex-shrink-0 w-80 bg-white rounded-xl shadow-gentle hover:shadow-warm transition-all duration-500 animate-slide-up cursor-pointer transform hover:scale-[1.02] hover:-translate-y-2"
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
                      className={`w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(farmer.id)}
                      onError={() => handleImageError(farmer.id)}
                    />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary-200 rounded-full mx-auto flex items-center justify-center transition-all duration-300 group-hover:bg-primary-300">
                        <span className="text-2xl">👨‍🌾</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{farmer.name}</p>
                      {isVisible && farmer.videoThumbnail && !isImageLoaded && (
                        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      )}
                    </div>
                  </div>
                  
                  {isVisible && isImageLoaded && farmer.videoThumbnail && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-primary-600 ml-1" />
                      </div>
                    </button>
                  )}
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 transition-all duration-300 group-hover:bg-white">
                    <MapPin className="w-3 h-3 text-primary-600" />
                    <span className="text-xs font-medium text-gray-700">{farmer.village}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 bg-white rounded-b-xl overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{farmer.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(farmer.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current transition-transform duration-300 group-hover:scale-110" style={{ animationDelay: `${i * 50}ms` }} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{farmer.district} District</span>
                      <span>{farmer.experience} experience</span>
                    </div>
                    
                    <div className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium group-hover:bg-primary-200 transition-colors duration-300">
                      {farmer.speciality}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 leading-relaxed italic group-hover:text-gray-800 transition-colors duration-300">
                    "{farmer.quote}"
                  </blockquote>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95">
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
          <button className="btn-primary hover:scale-105 active:scale-95 transition-all duration-300">
            Schedule Farm Visit
          </button>
        </div>
      </div>
    </section>
  )
}

export default FarmerTestimonials