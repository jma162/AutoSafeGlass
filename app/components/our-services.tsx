"use client"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();
  return (
    <div className="relative w-full bg-black">
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('/alogo.jpg')",
        }}
      /> */}

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-end">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-3xl font-[montserratSemiBold] mb-8">Our Services</h2>

            <div className="space-y-6">
              {/* Windshield Repair */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center">
                  <div className="text-sky-500 mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V8C20 9.10457 19.1046 10 18 10H6C4.89543 10 4 9.10457 4 8V6Z"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                      />
                      <path
                        d="M5 10L7 19C7.33333 20 8.4 20 9 20H15C15.6 20 16.6667 20 17 19L19 10"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                      />
                      <path d="M9 14L15 14" stroke="#0EA5E9" strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="font-medium">Windshield Repair</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
              </div>

              {/* Windshield Replacement */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center">
                  <div className="text-sky-500 mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V8C20 9.10457 19.1046 10 18 10H6C4.89543 10 4 9.10457 4 8V6Z"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                      />
                      <path
                        d="M5 10L7 19C7.33333 20 8.4 20 9 20H15C15.6 20 16.6667 20 17 19L19 10"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                      />
                      <path d="M9 14L15 14" stroke="#0EA5E9" strokeWidth="2" />
                      <path d="M12 10V20" stroke="#0EA5E9" strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="font-medium">Windshield Replacement</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
              </div>

              {/* Side window / rear windshield */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center">
                  <div className="text-sky-500 mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L5 13H19L21 8" stroke="#0EA5E9" strokeWidth="2" />
                      <rect x="5" y="13" width="14" height="5" stroke="#0EA5E9" strokeWidth="2" />
                      <path d="M7 13V18" stroke="#0EA5E9" strokeWidth="2" />
                      <path d="M12 13V18" stroke="#0EA5E9" strokeWidth="2" />
                      <path d="M17 13V18" stroke="#0EA5E9" strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="font-medium">Side window / rear windshield</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
              </div>
            </div>

            <div className="mt-8">
              <button onClick={() => router.push('/our-services')} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-full transition-colors">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
