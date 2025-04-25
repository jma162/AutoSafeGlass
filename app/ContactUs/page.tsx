'use client'
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const ContactUs = () => {
  const handleEmail = (email: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleMainStoreNavigation = () => {
    if (typeof window !== 'undefined') {
      const address = "1200 Route 70 E. #707, Cherry Hill, NJ 08034";
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[200px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-[montserratSemiBold] text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help with all your auto glass needs. Contact us today for professional service.
          </p>
        </div>

        {/* Contact Info */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {/* Phone */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="bg-blue-50 p-2 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-base text-gray-500">Call us at</p>
                <a 
                  href="tel:+12159045778"
                  className="text-xl font-[montserratSemiBold] text-gray-900 hover:text-blue-600"
                >
                  215-904-5778
                </a>
              </div>
            </div>

            {/* Email */}
            <div 
              onClick={() => handleEmail("info@autosafeglass.com")}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="bg-purple-50 p-2 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-base text-gray-500">Email us at</p>
                <p className="text-lg font-[montserratSemiBold] text-gray-900">
                  info@autosafeglass.com
                </p>
              </div>
            </div>

            {/* Main Store Address */}
            <div 
              onClick={handleMainStoreNavigation}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="bg-emerald-50 p-2 rounded-lg mt-1">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-base text-gray-500">Find us at</p>
                  <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">
                    Main Store
                  </span>
                </div>
                <p className="text-base font-[montserratSemiBold] text-gray-900">
                  1200 Route 70 E. #707
                </p>
                <p className="text-base font-[montserratSemiBold] text-gray-900">
                  Cherry Hill, NJ 08034
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-[montserratSemiBold] text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-sm text-blue-600">Open Today</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-medium">Monday - Friday</p>
                  <span className="text-gray-900 font-[montserratSemiBold]">
                    8:00 AM - 6:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Get Started Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl sm:text-3xl font-[montserratSemiBold] text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Get a free online quote today or give us a call for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.location.href='/online-estimate'}
              className="px-7 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-bold text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              Get Free Quote
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => window.open("tel:+12159045778")}
              className="px-7 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-bold text-base shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 group inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5 mr-1.5" /> Call Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs