import React from 'react'
import Banner from './components/Banner'
import HowItWorks from './components/HowItWorks'
import { Phone, Clock, ChevronRight, MapPin, Car } from 'lucide-react'

const page = () => {
  return (
    <main className="flex flex-col">
      {/* Hero Section with Banner */}
      <Banner />

      {/* Quick Action Section */}
      <div className="bg-white py-8 sm:py-12">
        {/* Service Areas 横向展示 */}
        <div className="w-full flex justify-center mb-6">
          <div className="inline-block px-4 py-2 rounded-lg bg-[#2c7a6d] bg-opacity-90 w-full max-w-xs sm:max-w-none">
            <div className="flex flex-col items-center sm:flex-row sm:justify-center">
              <span className="text-white text-base sm:text-lg font-bold tracking-wide mb-1 sm:mb-0 sm:mr-2">Service areas:</span>
              <div className="flex items-center gap-2 mb-1 sm:mb-0 sm:mr-2">
                <span className="font-bold text-lg sm:text-xl text-white align-middle">•</span>
                <span className="text-white font-bold text-sm sm:text-base">Philadelphia</span>
              </div>
              <div className="flex items-center gap-2 mb-1 sm:mb-0 sm:mr-2">
                <span className="font-bold text-lg sm:text-xl text-white align-middle">•</span>
                <span className="text-white font-bold text-sm sm:text-base">South Jersey</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-white align-middle">•</span>
                <span className="text-white font-bold text-sm sm:text-base">Surrounding Areas</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Get Quote Button */}
            <div className="bg-[#f0f7f5] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Service Available</h3>
                <p className="text-gray-600 mb-4">We come to you for free</p>
                <a 
                  href="/online-estimate"
                  className="inline-flex items-center gap-2 bg-white text-[#2c7a6d] px-6 py-3 rounded-lg font-semibold hover:bg-[#f0f7f5] transition-colors"
                >
                  Start Now
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-[#f0f7f5] p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Same day service available</p>
                <a 
                  href="tel:+12159045778"
                  className="text-xl font-bold text-[#2c7a6d] hover:text-[#236b5e]"
                >
                  215-904-5778
                </a>
              </div>
            </div>

            {/* Service Hours */}
            <div className="bg-[#f0f7f5] p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Hours</h3>
                <div className="space-y-1 text-gray-600">
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Lifetime Warranty */}
            <div className="bg-[#f0f7f5] p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2c7a6d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600">On all installations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-[#f0f7f5] py-8 sm:py-12">
        <HowItWorks />
      </div>
    </main>
  )
}

export default page