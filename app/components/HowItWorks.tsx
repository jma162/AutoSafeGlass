const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      {/* Logo */}
      <div className="text-center mb-12">
        <h2 className="text-gray-900 text-4xl font-bold tracking-tight">
          Why Choose Auto Safe Glass?
        </h2>
        <p className="mt-4 text-gray-500 text-lg">
          Professional service with guaranteed satisfaction
        </p>
      </div>

      {/* Features in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
        {/* Left column */}
        <div className="space-y-8">
          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-900 text-2xl">›</span>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Complete Auto Glass Solutions
              </h3>
              <p className="mt-1 text-gray-600">
                All your automotive glass needs
              </p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-900 text-2xl">›</span>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Premium Quality & Safety
              </h3>
              <p className="mt-1 text-gray-600">
                High quality materials and service
              </p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-900 text-2xl">›</span>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Expert Installation
              </h3>
              <p className="mt-1 text-gray-600">
                Professional installation
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-900 text-2xl">✓</span>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Insurance Friendly
              </h3>
              <p className="mt-1 text-gray-600">
                All insurance accepted
              </p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-900 text-2xl">✓</span>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Competitive Pricing
              </h3>
              <p className="mt-1 text-gray-600">
                Low cost & great service
              </p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-900 text-2xl">✓</span>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Lifetime Warranty
              </h3>
              <p className="mt-1 text-gray-600">
                Guaranteed satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
