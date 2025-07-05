import React from 'react'
import { 
  Phone, 
  Mail, 
  Clock, 
  Feather,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react'

const Footer: React.FC = () => {
  const farmLocations = [
    {
      name: "Pudukottai Farm",
      address: "Village Road, Pudukottai District",
      phone: "+91 98765 43210",
      type: "Main Processing Center"
    },
    {
      name: "Theni Collection Center",
      address: "Farmers Market, Theni District", 
      phone: "+91 98765 43211",
      type: "Collection Point"
    },
    {
      name: "Dindigul Hub",
      address: "NH Road, Dindigul District",
      phone: "+91 98765 43212", 
      type: "Distribution Hub"
    }
  ]

  const meatProcessingLocations = [
    {
      name: "Madurai Processing Unit",
      address: "Industrial Area, Madurai",
      phone: "+91 98765 43213",
      certifications: ["FSSAI Certified", "ISO 22000"]
    },
    {
      name: "Salem Processing Center", 
      address: "Food Park, Salem",
      phone: "+91 98765 43214",
      certifications: ["HACCP Certified", "Halal Certified"]
    }
  ]

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-max section-padding py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <Feather className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-brand">Naatukozhi</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Connecting you with authentic village farmers to bring the purest, 
              most nutritious chicken straight to your table.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Customer Support</p>
                  <p className="text-gray-300">+91 98765 43200</p>
                  <p className="text-gray-300">+91 98765 43201</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-300">orders@naatukozhi.com</p>
                  <p className="text-gray-300">support@naatukozhi.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Operating Hours</p>
                  <p className="text-gray-300">Mon - Sat: 6:00 AM - 8:00 PM</p>
                  <p className="text-gray-300">Sunday: 7:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              Order Fresh Chicken Now
            </button>
          </div>

          {/* Farm Locations */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Farm Locations</h3>
            
            <div className="space-y-4">
              {farmLocations.map((location, index) => (
                <div key={index} className="border-l-2 border-primary-600 pl-4 space-y-1">
                  <h4 className="font-semibold text-primary-300">{location.name}</h4>
                  <p className="text-sm text-gray-300">{location.address}</p>
                  <p className="text-sm text-gray-400">{location.phone}</p>
                  <span className="inline-block bg-primary-900 text-primary-300 px-2 py-1 rounded text-xs">
                    {location.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Meat Processing Locations */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Processing Centers</h3>
            
            <div className="space-y-4">
              {meatProcessingLocations.map((location, index) => (
                <div key={index} className="border-l-2 border-warm-500 pl-4 space-y-2">
                  <h4 className="font-semibold text-warm-300">{location.name}</h4>
                  <p className="text-sm text-gray-300">{location.address}</p>
                  <p className="text-sm text-gray-400">{location.phone}</p>
                  <div className="flex flex-wrap gap-1">
                    {location.certifications.map((cert, certIndex) => (
                      <span 
                        key={certIndex}
                        className="inline-block bg-warm-900 text-warm-300 px-2 py-1 rounded text-xs"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Assurance */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-green-400">Quality Assurance</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• FSSAI Licensed Facilities</li>
                <li>• Cold Chain Maintained</li>
                <li>• Regular Quality Audits</li>
                <li>• Traceability System</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-max section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Naatukozhi. All rights reserved. Made with ❤️ for pure food lovers.
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-primary-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-primary-400 transition-colors">Terms of Service</button>
              <button className="hover:text-primary-400 transition-colors">Refund Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer