"use client"
import { MapPin, Sparkles } from "lucide-react"

const Banner = () => {
  return (
    <div className="relative w-full h-[520px] overflow-hidden pt-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-18%20170252-umt7V981sKUqh3NvLL3zr9mPlkwhZG.png')",
        }}
      />

      {/* White Card */}
      {/* <div className="absolute md:left-12 top-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-md">
        <div className="mb-6">
          <Sparkles className="text-yellow-400 h-6 w-6 mb-2" />
          <h1 className="text-4xl font-[montserratSemiBold] mb-2">Need Your Windshield Fixed?</h1>
          <div className="w-16 h-1 bg-yellow-400 mb-4"></div>
          <p className="text-lg">Get a quote & schedule an appointment.</p>
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            placeholder="ZIP CODE"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-r-md hover:bg-blue-600 transition-colors">
            Get Started
          </button>
        </div>

        <button className="flex items-center text-blue-500 mt-4 hover:underline">
          <MapPin className="h-4 w-4 mr-2" />
          Use my current location
        </button>
      </div> */}
    </div>
  )
}

export default Banner
