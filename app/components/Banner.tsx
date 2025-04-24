"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

const Banner = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Windshield Replacement",
      subtitle: "Professional service with lifetime warranty",
      image: "/banner.jpeg",
    },
    {
      id: 2,
      title: "Auto Glass Repair",
      subtitle: "Fast and affordable solutions",
      image: "/autoFix.jpeg",
    },
    {
      id: 3,
      title: "Mobile Service Available",
      subtitle: "We come to you at no extra cost",
      image: "/mobileGlass.jpeg",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] mt-[80px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
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
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 px-2">
                  {slide.subtitle}
                </p>
                
                {/* CTA Button Container */}
                <div className="inline-block animate-bounce-slow">
                  <button
                    onClick={() => router.push("/online-estimate")}
                    className="relative group active:scale-95 transition-all duration-200"
                  >
                    {/* Outer glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Inner glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-90 transition duration-500"></div>
                    
                    {/* Button content */}
                    <div className="relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-active:shadow-inner">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wider group-active:translate-y-0.5 transition-transform whitespace-nowrap">
                          Get A Free Quote
                        </span>
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 group-active:translate-x-0.5 transition-all" />
                      </div>
                    </div>

                    {/* Bottom text */}
                    <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 text-yellow-300 text-xs sm:text-sm font-medium animate-pulse">
                      Free Mobile Service Available
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - 在手机端隐藏 */}
      <button
        onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="hidden sm:block absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
        className="hidden sm:block absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all cursor-pointer ${
              index === currentSlide 
                ? "bg-white scale-110" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
