"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Get FREE Quote", href: "/online-estimate" },
    { name: "Our Services", href: "/services" },
    { name: "Contact Us", href: "/ContactUs" },
  ]

  return (
    <div className="w-full bg-white">
      {/* Top section with logo and contact info */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3" onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
          <Image src="/autosafelogo.png" alt="AutoSafeGlass" width={100} height={100} />
          <h1 className="text-3xl md:text-4xl font-[montserratSemiBold] text-[#333333]">Auto Safe Glass</h1>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="flex flex-col items-end">
            <p className="text-lg">
              Call <span className="text-[#00a000] font-bold">215-904-5778</span> for free quote or appointment.
            </p>
            <p className="text-lg italic">
              We provide <span className="text-[#00a000] font-bold">FREE</span> mobile service!
            </p>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="w-full bg-[#6ba229]">
        <div className="container mx-auto flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-4 font-medium transition-colors ${
                  isActive ? "bg-[#5a8a22] text-white" : "text-white hover:bg-[#5a8a22]"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
