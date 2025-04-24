const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#EFF6FF]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-[montserratSemiBold] text-[#2c7a6d] mb-4">
            Why Choose Auto Safe Glass?
          </h2>
          <p className="text-xl text-gray-600">
            Professional service with guaranteed satisfaction
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Video Section */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full aspect-video object-cover"
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Features Section */}
          <div className="lg:w-1/2 space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                <span className="text-[#2c7a6d] text-2xl font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">
                  Complete Auto Glass Solutions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive services for all your automotive glass needs, from repairs to full replacements.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                <span className="text-[#2c7a6d] text-2xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">
                  Expert Installation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional technicians with years of experience ensuring quality service.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                <span className="text-[#2c7a6d] text-2xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">
                  Insurance Friendly
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We work with all insurance companies and handle the claims process for you.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                <span className="text-[#2c7a6d] text-2xl font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2">
                  Competitive Pricing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Quality service at affordable rates with flexible payment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
