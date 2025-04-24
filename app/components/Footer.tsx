import { MapPin, Facebook, Youtube, Instagram } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">© 2025 Auto Glass Now. All rights reserved.</div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 md:mb-0">
            <Link href="#" className="hover:text-emerald-400">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Privacy Center
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Web Accessibility
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Site Map
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-emerald-400">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-emerald-400">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-emerald-400">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
