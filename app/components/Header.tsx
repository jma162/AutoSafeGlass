"use client";
import { MapPin, Phone, Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow">
      <div className="h-20 flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <Image src="/autosafelogo.png" alt="AutoSafeGlass" width={80} height={80} onClick={() => router.push("/")}/>
          <h1 className="text-2xl sm:text-3xl font-[montserratSemiBold]">
            AutoSafeGlass
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-[montserratSemiBold]">
          <Link href="/services" className="hover:text-blue-600 duration-300">
            Services
          </Link>
          <Link
            href=""
            className="flex items-center gap-1 hover:text-blue-600 duration-300"
          >
            <MapPin className="w-5 h-5" /> Locations
          </Link>
          <Link
            href=""
            className="flex items-center gap-1 hover:text-blue-600 duration-300"
          >
            <Phone className="w-5 h-5" /> 1-888-4-FIX-GLASS
          </Link>
          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => router.push("/vin-search")}
              className="hidden md:flex items-center gap-2 px-6 py-1.5 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 hover:shadow-lg duration-300 cursor-pointer"
            >
              <Search className='w-5 h-5' />
              <span>Search VIN</span>
            </button> */}
            <button
              onClick={() => router.push("/online-estimate")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-blue-600 hover:shadow-lg duration-300"
            >
              Get A Quote
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 px-4 pb-4 font-[montserratSemiBold]">
          {/* VIN Search Button for Mobile */}
          {/* <button
            onClick={() => router.push("/vin-search")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Search VIN</span>
          </button> */}

          <Link href="" className="hover:text-blue-600 duration-300">
            Services
          </Link>
          <Link
            href=""
            className="flex items-center gap-1 hover:text-blue-600 duration-300"
          >
            <MapPin className="w-5 h-5" /> Locations
          </Link>
          <Link
            href=""
            className="flex items-center gap-1 hover:text-blue-600 duration-300"
          >
            <Phone className="w-5 h-5" /> 1-888-4-FIX-GLASS
          </Link>
          <button
            onClick={() => router.push("/online-estimate")}
            className="bg-blue-500 text-white px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-blue-600 duration-300"
          >
            Get A Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
