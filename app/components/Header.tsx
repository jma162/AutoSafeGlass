"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Phone, ChevronRight, Clock, Car } from "lucide-react"

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
              className="ml-2 px-5 py-2 bg-[#2c7a6d] hover:bg-[#236b5e] text-white rounded-full font-bold text-sm shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 group inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              Get FREE Quote
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - 改为从左侧滑出 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* 改为从左侧滑出 */}
          <div className="absolute left-0 top-0 w-[280px] h-full bg-white shadow-xl flex flex-col">
            {/* Logo 区域 */}
            <div className="flex items-center p-4 border-b border-gray-100">
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo.jpg"
                  alt="AutoSafeGlass Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-[montserratSemiBold] text-gray-900">
                  Auto Safe Glass
                </h1>
                <p className="text-xs text-[#2c7a6d]">
                  Professional Auto Glass Services
                </p>
              </div>
              {/* 关闭按钮移到右上角 */}
              <button
                className="ml-auto p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 导航链接 */}
            <nav className="flex flex-col px-4 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 text-lg font-medium border-b border-gray-100 ${
                    pathname === link.href 
                      ? "text-[#2c7a6d]" 
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA 按钮 */}
            <div className="px-4 mt-4">
              <button
                onClick={() => {
                  router.push("/online-estimate")
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-[#2c7a6d] hover:bg-[#236b5e] text-white rounded-lg py-3 text-lg font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get Free Quote
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* 联系信息 */}
            <div className="mt-6 px-4 space-y-3 border-t border-gray-100 pt-4">
              <a 
                href="tel:+12159045778" 
                className="flex items-center gap-3 text-gray-600 hover:text-[#2c7a6d] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg font-medium">215-904-5778</span>
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Mon-Sat: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-blue-600" />
                <span className="text-base font-medium text-blue-600">
                  FREE Mobile Service
                </span>
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