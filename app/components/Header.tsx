"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Phone, ChevronRight } from "lucide-react"

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Services", href: "/services" },
    { name: "Contact Us", href: "/ContactUs" },
  ]

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top section with logo and contact info */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => router.push("/")}
          >
            <div className="relative overflow-hidden rounded-lg transform transition-transform group-hover:scale-105">
              <Image 
                src="/logo.jpg"
                alt="AutoSafeGlass Logo"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-[montserratSemiBold] text-gray-900">
                Auto Safe Glass
              </h1>
              <p className="text-sm text-[#2c7a6d] font-medium hidden md:block">Professional Auto Glass Services</p>
            </div>
          </div>

          {/* Contact Info - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <div 
              className="group flex items-center gap-4 px-6 py-3 bg-[#f0f7f5] rounded-lg cursor-pointer hover:bg-[#e0ede9] transition-all duration-300"
              onClick={() => window.open("tel:+12159045778")}
            >
              <div className="bg-[#2c7a6d] p-2.5 rounded-lg transform transition-transform group-hover:scale-105 group-active:scale-95">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <p className="text-base font-bold text-gray-900">
                215-904-5778
              </p>
            </div>
            <div className="hidden lg:flex items-center px-6 py-3 bg-[#f0f7f5] rounded-lg">
              <div>
                <p className="text-base font-semibold text-[#2c7a6d] animate-pulse">FREE Mobile Service!</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 text-[#2c7a6d] hover:text-[#236b5e] bg-[#f0f7f5] hover:bg-[#e0ede9] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-[#f0f7f5] border-t border-[#e0ede9]">
        <div className="container mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-4 font-medium text-base transition-all relative group ${
                    isActive 
                      ? "text-[#2c7a6d]" 
                      : "text-gray-600 hover:text-[#2c7a6d]"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
                    isActive 
                      ? "bg-[#2c7a6d]" 
                      : "bg-transparent group-hover:bg-[#2c7a6d]/50"
                  }`} />
                </Link>
              )
            })}
            <Link
              href="/online-estimate"
              className="ml-6 px-6 py-2.5 bg-gradient-to-r from-[#2c7a6d] to-[#1f645a] hover:from-[#236b5e] hover:to-[#1c5a4e] text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group inline-flex items-center gap-1.5"
            >
              Get FREE Quote
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Mobile Contact Info */}
              <div className="p-6 bg-[#f0f7f5]">
                <div 
                  className="group flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-[#e0ede9] transition-all duration-300 mb-4"
                  onClick={() => window.open("tel:+12159045778")}
                >
                  <div className="bg-[#2c7a6d] p-2.5 rounded-lg transform transition-transform group-hover:scale-105 group-active:scale-95">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    215-904-5778
                  </p>
                </div>
                <Link
                  href="/online-estimate"
                  className="w-full p-3 mb-4 bg-gradient-to-r from-[#2c7a6d] to-[#1f645a] hover:from-[#236b5e] hover:to-[#1c5a4e] text-white rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 block text-center group flex items-center justify-center gap-1.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get FREE Quote
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="p-4 bg-white rounded-lg text-center">
                  <p className="text-base font-semibold text-[#2c7a6d] animate-pulse">FREE Mobile Service!</p>
                </div>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 p-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center px-5 py-4 rounded-lg font-medium text-base transition-all ${
                        isActive 
                          ? "bg-[#f0f7f5] text-[#2c7a6d]" 
                          : "text-gray-600 hover:bg-[#f0f7f5] hover:text-[#2c7a6d]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      {isActive && <span className="ml-auto">→</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加自定义动画 */}
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
        /* Keep bounce-slow if used elsewhere */
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
    </header>
  )
}

export default Header