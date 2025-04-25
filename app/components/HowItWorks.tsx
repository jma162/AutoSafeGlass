const HowItWorks = () => {
  return (
    <section className="py-8 sm:py-12 bg-[#EFF6FF]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-[montserratSemiBold] text-[#2c7a6d] mb-2">
            Why Choose Auto Safe Glass?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Professional service with guaranteed satisfaction
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Video Section */}
          <div className="lg:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="auto"
                className="w-full aspect-video object-cover"
                poster="/video-poster.jpg"
              >
                <source src="/video.mp4" type="video/mp4" />
                <source src="/video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Features Section */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feature 1 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2c7a6d] text-sm font-bold">1</span>
                </div>
                <h3 className="text-base font-semibold text-[#2c7a6d]">
                  Complete Auto Glass Solutions
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Comprehensive services for all your automotive glass needs, from repairs to full replacements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2c7a6d] text-sm font-bold">2</span>
                </div>
                <h3 className="text-base font-semibold text-[#2c7a6d]">
                  Expert Installation
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Professional technicians with years of experience ensuring quality service.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2c7a6d] text-sm font-bold">3</span>
                </div>
                <h3 className="text-base font-semibold text-[#2c7a6d]">
                  Mobile Service
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                We come to you for convenient service at your location.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2c7a6d] text-sm font-bold">4</span>
                </div>
                <h3 className="text-base font-semibold text-[#2c7a6d]">
                  Insurance Assistance
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                We work with most insurance companies to make the process easy for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
