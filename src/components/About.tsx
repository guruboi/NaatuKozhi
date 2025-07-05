import React from 'react'
import { Heart, Shield, Truck, Users } from 'lucide-react'

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Who We Are',
      description: 'A passionate team dedicated to connecting consumers with authentic village farmers who raise chickens the traditional way.'
    },
    {
      icon: Shield,
      title: 'Why We Do It',
      description: 'To preserve traditional farming methods and ensure families get access to pure, chemical-free chicken that tastes like it used to.'
    },
    {
      icon: Users,
      title: 'Our Mission',
      description: 'Supporting local farmers while delivering the freshest, healthiest chicken directly to your doorstep with complete transparency.'
    },
    {
      icon: Truck,
      title: 'How We Do It',
      description: 'Direct partnerships with village farmers, cold-chain logistics, and a commitment to delivering within 24 hours of processing.'
    }
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-secondary mb-6">
            Our Story of 
            <span className="text-primary-600"> Pure Tradition</span>
          </h2>
          <p className="text-primary max-w-3xl mx-auto">
            Born from a desire to bring back the authentic taste of village-raised chicken, 
            we've built a network of trusted farmers who share our commitment to quality and tradition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center space-y-4 p-6 rounded-xl hover:bg-primary-50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-200 transition-colors">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-primary-50 to-warm-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Our Values & Commitment
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Transparency</h4>
                    <p className="text-gray-600">Know your farmer, know your food. Every chicken comes with its story.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quality</h4>
                    <p className="text-gray-600">No antibiotics, no growth hormones, just pure, natural chicken.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
                    <p className="text-gray-600">Supporting rural livelihoods and preserving traditional farming practices.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Freshness</h4>
                    <p className="text-gray-600">From farm to your table in less than 24 hours, maintaining the cold chain.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Process Flow Placeholder */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Partner Farmers</h5>
                    <p className="text-sm text-gray-600">Traditional village raising methods</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Quality Processing</h5>
                    <p className="text-sm text-gray-600">Hygienic processing centers</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Fresh Delivery</h5>
                    <p className="text-sm text-gray-600">Direct to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About