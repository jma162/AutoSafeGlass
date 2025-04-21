'use client'
import Image from 'next/image'
import { Shield, Clock, DollarSign, Wrench, Car, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation';

const ServicesPage = () => {
    const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/alogo.jpg"
            alt="Technician repairing windshield"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Auto Glass Services
          </h1>
          <p className="text-xl mb-8">Expert repairs and replacements you can trust</p>
          <button onClick={() => router.push('/online-estimate')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
            Get Free Quote
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-xl duration-300">
              <div className="relative h-48">
                <Image
                  src="/alogo.jpg"
                  alt="Windshield Repair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Windshield Repair</h3>
                <p className="text-gray-600 mb-4">
                  Quick and effective repair of chips and cracks to prevent further damage.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-xl duration-300">
              <div className="relative h-48">
                <Image
                  src="/alogo.jpg"
                  alt="Windshield Replacement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Windshield Replacement</h3>
                <p className="text-gray-600 mb-4">
                  Professional replacement using OEM-quality glass and expert installation.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-xl duration-300">
              <div className="relative h-48">
                <Image
                  src="/alogo.jpg"
                  alt="Side Window Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Side Window Services</h3>
                <p className="text-gray-600 mb-4">
                  Repair and replacement of side windows and rear glass.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-[montserratSemibold] text-gray-900 mb-8 text-center">
            How Do I Know If My Windshield Can Be Repaired?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Chips and small cracks from road debris don't necessarily mean the end of your windshield, as long as you get them looked at sooner rather than later.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">•</span>
              </div>
              <p className="text-gray-600">The damage is smaller than a quarter.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">•</span>
              </div>
              <p className="text-gray-600">The crack hasn't started to "spider" and grow.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">•</span>
              </div>
              <p className="text-gray-600">There are no more than 3 chips.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">
                We use only the highest quality glass and materials for all repairs and replacements.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
              <p className="text-gray-600">
                Most repairs take less than 30 minutes, and we offer same-day service when possible.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                Competitive pricing and we work with most insurance companies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Your Glass Fixed?
          </h2>
          <p className="text-xl mb-8">
            Schedule an appointment today and get back on the road safely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/online-estimate')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
              Get Free Quote
            </button>
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage