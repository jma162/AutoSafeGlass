'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Clock, Shield, Car, ArrowRight, Wrench, LayoutGrid, CircleDot, PanelLeftClose, DollarSign, CheckCircle, Award } from 'lucide-react'

const ServicesPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 进一步增加顶部间距 */}
      <div className="bg-[#f0f7f5] pt-48 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-[montserratSemiBold] text-gray-900 text-center mb-12">
            Auto Glass Services
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12">
            Auto Safe Glass Co. provides free mobile services to the Philadelphia, South Jersey, Trenton-NJ, Wilmington-DE, and their surrounding areas.
          </p>
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/online-estimate'}
              className="inline-flex items-center gap-2 bg-[#2c7a6d] hover:bg-[#236b5e] text-white px-8 py-3 rounded-lg transition-all duration-300 text-lg font-medium"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Windshield Replacement */}
          <div className="bg-[#f0f7f5] p-6 rounded-lg hover:bg-[#e0ede9] transition-all duration-300">
            <Wrench className="w-8 h-8 text-[#2c7a6d] mb-4" />
            <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">Windshield Replacement</h3>
            <p className="text-gray-600">Professional windshield replacement with high-quality materials.</p>
          </div>

          {/* Rock Chip Repair */}
          <div className="bg-[#f0f7f5] p-6 rounded-lg hover:bg-[#e0ede9] transition-all duration-300">
            <CircleDot className="w-8 h-8 text-[#2c7a6d] mb-4" />
            <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">Rock Chip Repair</h3>
            <p className="text-gray-600">Quick and effective repair for chips and cracks.</p>
          </div>

          {/* Door Glass Replacement */}
          <div className="bg-[#f0f7f5] p-6 rounded-lg hover:bg-[#e0ede9] transition-all duration-300">
            <Shield className="w-8 h-8 text-[#2c7a6d] mb-4" />
            <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">Door Glass Replacement</h3>
            <p className="text-gray-600">Expert door window replacement for all vehicle types.</p>
          </div>

          {/* Back Window Replacement */}
          <div className="bg-[#f0f7f5] p-6 rounded-lg hover:bg-[#e0ede9] transition-all duration-300">
            <LayoutGrid className="w-8 h-8 text-[#2c7a6d] mb-4" />
            <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">Back Window Replacement</h3>
            <p className="text-gray-600">Professional back window replacement service.</p>
          </div>

          {/* Side View Mirror Replacement */}
          <div className="bg-[#f0f7f5] p-6 rounded-lg hover:bg-[#e0ede9] transition-all duration-300">
            <PanelLeftClose className="w-8 h-8 text-[#2c7a6d] mb-4" />
            <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">Side View Mirror Replacement</h3>
            <p className="text-gray-600">Complete side mirror replacement and repair services.</p>
          </div>

          {/* All Auto Glass Replacement */}
          <div className="bg-[#f0f7f5] p-6 rounded-lg hover:bg-[#e0ede9] transition-all duration-300">
            <Car className="w-8 h-8 text-[#2c7a6d] mb-4" />
            <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">All Auto Glass Replacement</h3>
            <p className="text-gray-600">Comprehensive auto glass replacement services for all needs.</p>
          </div>
        </div>
      </div>

      {/* Insurance Section */}
      <div className="bg-[#f0f7f5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Insurance Information
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                While most insurance companies will cover auto glass replacement and repairs, always refer to your policy first before calling for auto glass service. If you have auto glass coverage, you could have no out of pocket expense. Please follow the steps below if you have auto glass coverage.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-[#f0f7f5] p-6 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2c7a6d] text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Open a claim with your insurance company and tell them that you would like Auto Safe Glass Co. to do the job. If you desire, Auto Safe Glass Co. can help you make the claim and verify your coverage provided you give us your insurance information. If your policy includes a deductible, you will be responsible for the deductible amount, and your insurance will be responsible for the remaining amount. For windshield repair, most insurance companies cover it at 100 percent coverage with no deductible. To be certain, please refer to your insurance policy.
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-[#f0f7f5] p-6 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2c7a6d] text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Make an appointment. Once you provide us the insurance claim number, we are ready to work for you. Just let us know when and where you want us to do the job and we will do our best to meet your request.
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-[#f0f7f5] p-6 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2c7a6d] text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Once our technician has completed the job, simply pay us your deductible, and we will take care of the rest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Warranty Policies
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Limited Warranty */}
            <div>
              <h3 className="text-2xl font-semibold text-[#2c7a6d] mb-4">
                Limited Warranty
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  This warranty is limited to defects in material or workmanship, such as water and air leaks, for as long as you own the vehicle in which the glass was repaired or installed, and so long as such defects are brought to our attention within 30 days of discovery of a defect. If we are unable to replace or repair the warranted product or correct the defective workmanship, we will refund the original purchase price of your warranted product.
                </p>
                <p className="text-gray-600">
                  The goal of windshield repair is to prevent the break from spreading. It removes air from the break and fills it with a curable, optically matched resin. Many uncontrollable factors, however, such as temperature, size of the break and pressure in the windshield determine a successful repair. Because of these factors, it is hard to guarantee the 100 percent effectiveness of every repair.
                </p>
                <p className="text-gray-600">
                  Therefore, it is possible the repair process can result in the chip or crack becoming larger and we are not responsible for such damage. If you are dissatisfied with the repair or the windshield cracks further after repair, Auto Safe Glass Co. will credit 50% the repair cost toward replacement. If your insurance company paid for the repair, the insurance company will receive the credit. In order to exercise your rights under this warranty, we will require evidence of installation by Auto Safe Glass Co. (such as a copy of your repair invoice).
                </p>
              </div>
            </div>

            {/* Warranty Exclusions */}
            <div>
              <h3 className="text-2xl font-semibold text-[#2c7a6d] mb-4">
                Warranty Exclusions
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our warranty program does not include leaks, stress cracks, or related damage sustained from vehicle body damage or rust deterioration. Before our technician begins work on your vehicle, we will use reasonable efforts to advise you of such damage or rust prior to removal of existing glass, however, this may not be possible nor guarantee your vehicle is free from the aforementioned damage or rust. In these cases, Auto Safe Glass Co. is not responsible for any associated damage.
                </p>
                <p className="text-gray-600">
                  Damage not involving defective workmanship or materials is explicitly excluded from Auto Safe Glass Co. warranty program. Electrical or mechanical components, moving parts or motors, or other non-glass components are only covered by the manufacturer's warranty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Service Section */}
      <div className="bg-[#f0f7f5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Schedule Service
              </h2>
              <p className="text-xl text-gray-600">
                Professional Auto Glass Service at Your Location
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Column - Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#f0f7f5] rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2c7a6d] text-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Call Us
                    </h3>
                    <a 
                      href="tel:+12159045778"
                      className="text-xl font-medium text-[#2c7a6d] hover:text-[#236b5e] transition-colors"
                    >
                      215-904-5778
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#f0f7f5] rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2c7a6d] text-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Service Hours
                    </h3>
                    <div className="space-y-1">
                      <p className="text-gray-600">
                        Mon - Sat: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600">
                        Sunday: By appointment only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - CTA Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => window.location.href = '/online-estimate'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2c7a6d] hover:bg-[#236b5e] text-white px-8 py-4 rounded-lg transition-all duration-300 text-lg font-medium group shadow-sm hover:shadow-md"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a
                  onClick={() => window.open("tel:+12159045778")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-[#2c7a6d] text-[#2c7a6d] px-8 py-4 rounded-lg hover:bg-[#f0f7f5] transition-colors text-lg font-medium cursor-pointer"
                >
                  Call Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Auto Safe Glass Section */}
      <div className="relative bg-[#f0f7f5] py-16 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-[montserratSemiBold] text-[#2c7a6d] text-center mb-12">
            Why Choose Auto Safe Glass?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Quality Service */}
            <div className="bg-white p-8 rounded-xl hover:bg-[#e0ede9] transition-all duration-300 group hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-3">Quality Service</h3>
                <p className="text-gray-600">Expert technicians providing professional auto glass services with attention to detail.</p>
              </div>
            </div>

            {/* Fast Service */}
            <div className="bg-white p-8 rounded-xl hover:bg-[#e0ede9] transition-all duration-300 group hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-3">Fast Service</h3>
                <p className="text-gray-600">Same day service available with quick and efficient installation.</p>
              </div>
            </div>

            {/* Free Mobile Service */}
            <div className="bg-white p-8 rounded-xl hover:bg-[#e0ede9] transition-all duration-300 group hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Car className="w-8 h-8 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-3">Free Mobile Service</h3>
                <p className="text-gray-600">We come to you at no additional cost, wherever you are.</p>
              </div>
            </div>

            {/* Insurance Accepted */}
            <div className="bg-white p-8 rounded-xl hover:bg-[#e0ede9] transition-all duration-300 group hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-3">Insurance Accepted</h3>
                <p className="text-gray-600">We work with all insurance companies and handle the claims process.</p>
              </div>
            </div>

            {/* Lifetime Warranty */}
            <div className="bg-white p-8 rounded-xl hover:bg-[#e0ede9] transition-all duration-300 group hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-3">Lifetime Warranty</h3>
                <p className="text-gray-600">All our installations come with a lifetime warranty for your peace of mind.</p>
              </div>
            </div>

            {/* Certified Technicians */}
            <div className="bg-white p-8 rounded-xl hover:bg-[#e0ede9] transition-all duration-300 group hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-[#2c7a6d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-3">Certified Technicians</h3>
                <p className="text-gray-600">Our technicians are certified and experienced in all types of auto glass work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ServicesPage