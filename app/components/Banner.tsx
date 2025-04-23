"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
      image: "/banner.jpeg",
    },
    {
      id: 3,
      title: "Mobile Service Available",
      subtitle: "We come to you at no extra cost",
      image: "/banner.jpeg",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <>
    <div className="relative w-full h-[520px] overflow-hidden">
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
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center text-white max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <button
                  onClick={() => router.push("/online-estimate")}
                  className="bg-[#6ba229] hover:bg-[#5a8a22] text-white font-medium py-3 px-8 rounded-full text-lg transition-colors cursor-pointer"
                >
                  Get A Free Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? "bg-white scale-125" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default Banner
