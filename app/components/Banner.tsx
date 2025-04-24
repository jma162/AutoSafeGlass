"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const Banner = () => {
  const router = useRouter()
  
  // Define the first slide data directly
  const firstSlide = {
    id: 1,
    title: "Windshield Replacement",
    subtitle: "Professional service",
    image: "/banner.jpeg",
  }

  // Estimate header height - adjust mt-[130px] if needed based on actual layout
  const estimatedHeaderHeight = "130px"

  return (
    <div 
      className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden"
      style={{ marginTop: estimatedHeaderHeight }} // Use style for dynamic margin
    >
      {/* Single Slide */}
      <div className="relative w-full h-full">
        <div
          key={firstSlide.id}
          className="absolute inset-0 w-full h-full opacity-100"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${firstSlide.image})`,
              backgroundPosition: 'center center'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-white w-full max-w-3xl mx-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                {firstSlide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 px-2">
                {firstSlide.subtitle}
              </p>
              
              {/* CTA Button Container */}
              <div className="inline-block animate-bounce-slow px-4 sm:px-0">
                <button
                  onClick={() => router.push("/online-estimate")}
                  className="relative group active:scale-95 transition-all duration-200 w-full sm:w-auto"
                >
                  {/* Outer glow - 增加发光效果 */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Inner glow - 增加内发光 */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-lg opacity-75 group-hover:opacity-90 transition duration-500"></div>
                  
                  {/* Button content - 增大按钮尺寸和字体 */}
                  <div className="relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wider group-active:translate-y-0.5 transition-transform whitespace-nowrap">
                        Get A Free Quote
                      </span>
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1.5 group-active:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Bottom text - 增大字体和发光效果 */}
                  <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 text-yellow-300 text-sm sm:text-base font-semibold animate-pulse drop-shadow-lg">
                    Mobile Service Available
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  )
}

export default Banner
