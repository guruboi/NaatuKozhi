import React from 'react'
import { ArrowRight, Star } from 'lucide-react'

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="pt-16 md:pt-20 pb-12 md:pb-20">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Premium Farm Fresh
                </span>
              </div>
              
              <h1 className="heading-primary">
                Pure
                <span className="text-primary-600"> Village Chicken</span>
                <br />
                From Our Farmers
              </h1>
              
              <p className="text-primary max-w-xl">
                Experience the authentic taste of traditionally raised, free-range chickens. 
                Our farmers follow time-honored methods to bring you the purest, 
                most nutritious chicken straight from Tamil Nadu villages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary flex items-center justify-center space-x-2 group"
              >
                <span>Order Fresh Chicken</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => scrollToSection('farmers')}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Meet Our Farmers</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-600">Partner Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-gray-600">Free Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-600">24h</div>
                <div className="text-sm text-gray-600">Fresh Delivery</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-100 to-warm-100 rounded-2xl shadow-warm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-4xl">🐓</span>
                    </div>
                    <p className="text-gray-600 font-medium">
                      Premium Village Chicken
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-warm-500 rounded-full flex items-center justify-center animate-float">
                <span className="text-white font-bold text-sm">Fresh</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center" style={{ animationDelay: '1s' }}>
                <span className="text-white font-bold text-xs">Pure</span>
              </div>
            </div>

            {/* Quality Badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero