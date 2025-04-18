import { MapPin, Facebook, Youtube, Instagram } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* SERVICES Column */}
          <div>
            <h3 className="font-bold text-sm mb-6">SERVICES</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Auto Glass Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Windshield Repair
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Windshield Replacement
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Side Window / Rear Windshield Replacement
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Mobile Auto Glass Repair
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  ADAS Calibration
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Commercial & Fleet
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div>
            <h3 className="font-bold text-sm mb-6">ABOUT</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Why Auto Glass Now
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  No Hassle Warranty
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Buy Now, Pay Later
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Insurance Claims Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS Column */}
          <div>
            <h3 className="font-bold text-sm mb-6">QUICK LINKS</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Agent Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Find a Location
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  View Locations by State
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Online Estimator
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-blue-500">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo and CTA Column */}
          <div className="flex flex-col items-end">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-blue-500">
                AutoSafeGlass<span className="text-blue-500 text-5xl">.</span>
              </h2>
            </div>
            <div className="space-y-4 w-full">
              <Link
                href="#quote"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-full text-center block transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="#locations"
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-full text-center flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="h-5 w-5" /> Find a Location
              </Link>
              <div className="text-center mt-4">
                <p className="font-medium">Call 1-888-4-FIX-GLASS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">© 2025 Auto Glass Now. All rights reserved.</div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 md:mb-0">
            <Link href="#" className="hover:text-blue-500">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-blue-500">
              Privacy Center
            </Link>
            <Link href="#" className="hover:text-blue-500">
              Web Accessibility
            </Link>
            <Link href="#" className="hover:text-blue-500">
              Site Map
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
