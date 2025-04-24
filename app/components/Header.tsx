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

  // Recalculate estimated header height (adjust if needed, probably larger now)
  // Top section: ~116px (py-2 + logo 100px) + Nav bar: ~56px (h-14) = ~172px
  const estimatedHeaderHeight = "180px"

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top section - Keeping py-2 */}
      <div className="container mx-auto px-4 py-2">
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
                width={100}
                height={100}
                className="w-20 h-20 md:w-24 md:h-24 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-[montserratSemiBold] text-gray-900">
                Auto Safe Glass
              </h1>
              <p className="text-sm text-[#2c7a6d] font-medium hidden md:block">
                Professional Auto Glass Services
              </p>
            </div>
          </div>

          {/* Contact Info - Re-added FREE Mobile Service */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+12159045778"
              className="group flex items-center gap-2 px-4 py-2 bg-[#f0f7f5] rounded-full cursor-pointer hover:bg-[#e0ede9] transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-[#2c7a6d]" />
              <p className="text-sm font-semibold text-[#2c7a6d]">
                215-904-5778
              </p>
            </a>
            {/* Restored FREE Mobile Service Text */}
            <div className="hidden lg:flex items-center px-4 py-2 bg-[#f0f7f5] rounded-full"> 
              <p className="text-sm font-semibold text-[#2c7a6d] animate-pulse">
                FREE Mobile Service!
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#2c7a6d] hover:text-[#236b5e] bg-[#f0f7f5] hover:bg-[#e0ede9] rounded-lg transition-colors"
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

      {/* Navigation bar - Theme Dark Green Background */}
      <nav className="bg-[#236b5e] shadow">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation: All items aligned right */}
          <div className="hidden md:flex justify-end items-center h-14 gap-2">
            {/* Navigation Links (Now on the right) */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 font-semibold text-base transition-all duration-200 relative group rounded-md ${
                    isActive
                      ? "bg-[#1c5a4e] text-white"
                      : "text-green-100 hover:text-white hover:bg-[#1c5a4e]/60"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            {/* CTA Button (Now on the right with links) */}
            <Link
              href="/online-estimate"
              className="ml-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-bold text-sm shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 group inline-flex items-center gap-1.5 whitespace-nowrap"
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
              {/* Simplified Mobile Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-lg">Menu</h2>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Mobile Menu Links */}
              <div className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center px-4 py-3 rounded-md font-medium text-base transition-all ${
                        isActive 
                          ? "bg-[#f0f7f5] text-[#2c7a6d]" 
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Footer with Buttons */}
              <div className="p-4 border-t border-gray-200 space-y-3">
                <div className="p-3 bg-[#f0f7f5] rounded-lg text-center">
                  <p className="text-sm font-semibold text-[#2c7a6d] animate-pulse">
                    FREE Mobile Service!
                  </p>
                </div>
                <Link
                  href="/online-estimate"
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-semibold shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 block text-center group flex items-center justify-center gap-1.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get FREE Quote
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <button
                  className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5"
                  onClick={() => { window.open("tel:+12159045778"); setIsMobileMenuOpen(false); }}
                >
                  <Phone className="w-4 h-4" /> Call Us
                </button>
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