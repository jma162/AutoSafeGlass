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

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] mt-[80px] overflow-hidden">
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
                  {/* Outer glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#2c7a6d] via-[#236b5e] to-[#1c5a4e] rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Inner glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2c7a6d] to-[#236b5e] rounded-full blur opacity-70 group-hover:opacity-90 transition duration-500"></div>
                  
                  {/* Button content */}
                  <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-[#2c7a6d] hover:bg-[#236b5e] rounded-full transition-all duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wider group-active:translate-y-0.5 transition-transform whitespace-nowrap">
                        Get A Free Quote
                      </span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 group-active:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Bottom text */}
                  <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 text-yellow-300 text-xs sm:text-sm font-medium animate-pulse">
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
            transform: translateY(-6px);
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
