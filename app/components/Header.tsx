"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"

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
                src="/autosafelogo.png" 
                alt="AutoSafeGlass" 
                width={60} 
                height={60}
                className="w-12 h-12 md:w-14 md:h-14 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-[montserratSemiBold] text-gray-900">
                Auto Safe Glass
              </h1>
              <p className="text-sm text-gray-500 font-medium hidden md:block">Professional Auto Glass Services</p>
            </div>
          </div>

          {/* Contact Info - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <div 
              className="group flex items-center gap-4 px-6 py-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300"
              onClick={() => window.open("tel:+12159045778")}
            >
              <div className="bg-gray-900 p-2.5 rounded-lg transform transition-transform group-hover:scale-105 group-active:scale-95">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <p className="text-base font-bold text-gray-900">
                215-904-5778
              </p>
            </div>
            <div className="hidden lg:flex items-center px-6 py-3 bg-gray-100 rounded-lg">
              <div>
                <p className="text-base font-bold text-gray-900">FREE mobile service!</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
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
      <nav className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-4 font-medium text-base transition-all relative group ${
                    isActive 
                      ? "text-gray-900" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
                    isActive 
                      ? "bg-gray-900" 
                      : "bg-transparent group-hover:bg-gray-300"
                  }`} />
                </Link>
              )
            })}
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
              <div className="p-6 bg-gray-50">
                <div 
                  className="group flex items-center gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300 mb-4"
                  onClick={() => window.open("tel:+12159045778")}
                >
                  <div className="bg-gray-900 p-2.5 rounded-lg transform transition-transform group-hover:scale-105 group-active:scale-95">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    215-904-5778
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-base font-bold text-gray-900">FREE mobile service!</p>
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
                          ? "bg-gray-100 text-gray-900" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
    </header>
  )
}

export default Header