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
    { name: "Get FREE Quote", href: "/online-estimate" },
  ]

  return (
    <header className="w-full bg-white">
      {/* Top section with logo and contact info */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => router.push("/")}
          >
            <Image 
              src="/autosafelogo.png" 
              alt="AutoSafeGlass" 
              width={60} 
              height={60}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-[montserratSemiBold] text-[#333333]">
              Auto Safe Glass
            </h1>
          </div>

          {/* Contact Info - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#00a000]" />
              <div onClick={() => window.open("tel:+12159045778")}>
                <p className="text-sm text-gray-600">Call for free quote</p>
                <p className="text-lg font-semibold text-[#00a000]">215-904-5778</p>
              </div>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-gray-600">We provide</p>
              <p className="text-lg font-semibold text-[#00a000]">FREE mobile service!</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
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
      <nav className="w-full bg-[#fff] border-t border-gray-200">
        <div className="container mx-auto flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-4 font-medium border-b-2 border-white text-black ${
                    isActive 
                      ? "!border-[#5a8a22] !text-[#5a8a22]" 
                      : "hover:border-[#5a8a22] duration-300"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              {/* Mobile Contact Info */}
              <div className="px-4 py-3 bg-[#5a8a22] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5" />
                  <div onClick={() => window.open("tel:+12159045778")}>
                    <p className="text-sm">Call for free quote</p>
                    <p className="text-lg font-semibold">215-904-5778</p>
                  </div>
                </div>
                <p className="text-sm">We provide FREE mobile service!</p>
              </div>

              {/* Mobile Menu Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 font-medium transition-colors ${
                      isActive 
                        ? "bg-[#5a8a22] text-white" 
                        : "text-white hover:bg-[#5a8a22]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header