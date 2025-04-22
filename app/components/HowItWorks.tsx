import Link from "next/link"

const HowItWorks = () => {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-[montserratSemiBold] mb-4">How It Works</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            With 30+ years in the auto glass industry, we will get you back on the road in no time.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Step 1 */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/alogo.jpg"
              alt="Damaged windshield"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-70 flex items-end p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span>1</span>
                </div>
                <p className="text-white text-xl font-medium">Tell us about the damage</p>
              </div>
            </div>
          </div>
  
          {/* Step 2 */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/alogo.jpg"
              alt="Customer service representative"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-70 flex items-end p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span>2</span>
                </div>
                <p className="text-white text-xl font-medium">
                  Get an estimate. We'll help if you want to use insurance.
                </p>
              </div>
            </div>
          </div>
  
          {/* Step 3 */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/alogo.jpg"
              alt="Service van"
              className="w-full h-64 object-cover object-right"
            />
            <div className="absolute inset-0 bg-black opacity-70 flex items-end p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span>3</span>
                </div>
                <p className="text-white text-xl font-medium">Schedule your appointment</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/online-estimate"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full text-center transition-colors"
          >
            Get Quote & Schedule
          </Link>
          <Link
            href="tel:18884349527"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-8 rounded-full text-center transition-colors"
          >
            Call 215-904-5778
          </Link>
        </div>
      </div>
    )
  }
  
  export default HowItWorks
  