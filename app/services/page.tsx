'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Clock, Shield, Car, ArrowRight } from 'lucide-react'

const ServicesPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-50 relative py-20">
        {/* <div className="absolute inset-0 z-0">
          <Image
            src="/alogo.jpg"
            alt="Auto Safe Glass Services"
            fill
            className="object-cover opacity-20"
          />
        </div> */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Auto Glass Services
          </h1>
          <p className="text-xl mb-8">
            Auto Safe Glass Co. provides free mobile services to the Philadelphia, South Jersey, Trenton-NJ, Wilmington-DE, and their surrounding areas.
          </p>
          <button
            onClick={() => window.location.href = '/online-estimate'}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 text-lg font-medium group shadow-sm hover:shadow-md"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Windshield Replacement</h3>
              <p className="text-gray-600">
                Professional windshield replacement using high-quality glass and expert installation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Rock Chip Repair</h3>
              <p className="text-gray-600">
                Quick and effective repair of chips and cracks to prevent further damage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Door Glass Replacement</h3>
              <p className="text-gray-600">
                Expert replacement of door glass with precision and care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Back Window Replacement</h3>
              <p className="text-gray-600">
                Professional replacement of rear windows with OEM-quality glass.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Side View Mirror Replacement</h3>
              <p className="text-gray-600">
                Replacement of side view mirrors with proper alignment and installation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">All Auto Glass Replacement</h3>
              <p className="text-gray-600">
                Comprehensive auto glass replacement services for all vehicle types.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Insurance Information
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              While most insurance companies will cover auto glass replacement and repairs, always refer to your policy first before calling for auto glass service. If you have auto glass coverage, you could have no out of pocket expense.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-emerald-500 text-xl mr-2">•</span>
                <p className="text-gray-600">
                  Open a claim with your insurance company and tell them that you would like Auto Safe Glass Co. to do the job.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-500 text-xl mr-2">•</span>
                <p className="text-gray-600">
                  Make an appointment. Once you provide us the insurance claim number, we are ready to work for you.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-500 text-xl mr-2">•</span>
                <p className="text-gray-600">
                  Once our technician has completed the job, simply pay us your deductible, and we will take care of the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Warranty Policies
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Limited Warranty</h3>
              <p className="text-gray-600 mb-4">
                This warranty is limited to defects in material or workmanship, such as water and air leaks, for as long as you own the vehicle in which the glass was repaired or installed, and so long as such defects are brought to our attention within 30 days of discovery of a defect.
              </p>
              <p className="text-gray-600">
                If we are unable to replace or repair the warranted product or correct the defective workmanship, we will refund the original purchase price of your warranted product.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Warranty Exclusions</h3>
              <p className="text-gray-600">
                Our warranty program does not include leaks, stress cracks, or related damage sustained from vehicle body damage or rust deterioration. Before our technician begins work on your vehicle, we will use reasonable efforts to advise you of such damage or rust prior to removal of existing glass.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Schedule Service
          </h2>
          <p className="text-xl mb-8" onClick={() => window.open("tel:+12159045778")}>
            Please Call 215-904-5778
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/online-estimate'}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 text-lg font-medium group shadow-sm hover:shadow-md"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              onClick={() => window.open("tel:+12159045778")}
              className="bg-white text-emerald-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* 主标题 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-[montserratSemiBold] text-[#2c7a6d]">
          Why Choose Auto Safe Glass?
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Expert service at your location - home or office
        </p>
      </div>

      {/* 服务特点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#f0f7f5] p-6 rounded-lg shadow-sm hover:bg-[#e0ede9] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-[#2c7a6d]" />
            <h3 className="text-lg font-semibold text-[#2c7a6d]">Fast Service</h3>
          </div>
          <p className="text-gray-600">Same day service available at your location</p>
        </div>

        <div className="bg-[#f0f7f5] p-6 rounded-lg shadow-sm hover:bg-[#e0ede9] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-[#2c7a6d]" />
            <h3 className="text-lg font-semibold text-[#2c7a6d]">Guaranteed Work</h3>
          </div>
          <p className="text-gray-600">Lifetime warranty on all installations</p>
        </div>

        <div className="bg-[#f0f7f5] p-6 rounded-lg shadow-sm hover:bg-[#e0ede9] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Car className="w-5 h-5 text-[#2c7a6d]" />
            <h3 className="text-lg font-semibold text-[#2c7a6d]">All Vehicles</h3>
          </div>
          <p className="text-gray-600">Service for all makes and models</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage