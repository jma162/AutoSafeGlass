"use client"

import { ChevronRight, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const Banner = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Define slides data
  const slides = [
    {
      id: 1,
      title: "Windshield Replacement",
      subtitle: "Free Mobile Service",
      image: "/banner.jpeg",
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  // Estimate header height - adjust mt-[130px] if needed based on actual layout
  const estimatedHeaderHeight = "130px"

  return (
    <div 
      className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden mx-auto max-w-[1920px]"
      style={{ marginTop: estimatedHeaderHeight }}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center brightness-140"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center center'
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12">
              <div className="text-center text-white w-full max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {slide.title}
                </h1>

                <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full px-4 py-2 mb-6 shadow-md animate-pulse-slow">
                  <p className="text-base sm:text-lg md:text-xl font-bold text-black tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {slide.subtitle}
                  </p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="rounded-lg p-3 inline-block">
                    <p className="text-white text-lg sm:text-xl font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Service Areas:</p>
                    <div className="flex items-center justify-center gap-2 text-base sm:text-lg mt-2">
                      <span className="font-bold text-lg sm:text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">•</span>
                      <span className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Philadelphia</span>
                      <span className="font-bold text-lg sm:text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">•</span>
                      <span className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">South Jersey</span>
                      <span className="font-bold text-lg sm:text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">•</span>
                      <span className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Surrounding Areas</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button Container */}
                <div className="inline-block animate-bounce-slow px-4 sm:px-0">
                  <button
                    onClick={() => router.push("/online-estimate")}
                    className="relative group active:scale-95 transition-all duration-200 w-full sm:w-auto"
                  >
                    {/* Outer glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Inner glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-lg opacity-75 group-hover:opacity-90 transition duration-500"></div>
                    
                    {/* Button content */}
                    <div className="relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wider group-active:translate-y-0.5 transition-transform whitespace-nowrap">
                          Get A Free Quote
                        </span>
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1.5 group-active:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.03);
          }
        }
        .animate-pulse {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
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
