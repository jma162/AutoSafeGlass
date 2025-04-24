'use client'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// 修复 Leaflet marker 图标问题
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ContactUs = () => {
  const [isMounted, setIsMounted] = useState(false);
  const center = { lat: 39.9343, lng: -75.0393 };

  // 添加导航函数
  const handleNavigation = (address: string, city: string) => {
    const fullAddress = `${address}, ${city}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  // 添加邮件处理函数
  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  // 添加总店导航函数
  const handleMainStoreNavigation = () => {
    const address = "1200 Route 70 E. #707, Cherry Hill, NJ 08034";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  // 合作伙伴数据
  const partners = [
    {
      name: "Ken's Auto Inc.",
      type: "Auto Repair & Auto Glass",
      address: "341 N. 10th St.",
      city: "Philadelphia, PA 19107",
      location: { lat: 39.9577, lng: -75.1567 }
    },
    {
      name: "Maaco Collision Repair & Auto Painting",
      type: "Auto Body Shop",
      address: "1750 Pine St.",
      city: "Philadelphia, PA 19103",
      location: { lat: 39.9477, lng: -75.1707 }
    },
    {
      name: "Cherry Hill Auto Body",
      type: "Auto Body & Glass",
      address: "1500 Route 38",
      city: "Cherry Hill, NJ 08002",
      location: { lat: 39.9377, lng: -74.9987 }
    },
    {
      name: "Delaware Valley Auto Glass",
      type: "Auto Glass Specialist",
      address: "2300 Market St.",
      city: "Philadelphia, PA 19103",
      location: { lat: 39.9527, lng: -75.1777 }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-[montserratSemiBold] text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help with all your auto glass needs. Contact us today for professional service.
          </p>
        </div>

        {/* 联系信息和地图 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 联系信息卡片 */}
          <div className="space-y-4 sm:space-y-6">
            {/* 电话 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-base text-gray-500">Call us at</p>
                <p className="text-xl font-[montserratSemiBold] text-gray-900">
                  215-904-5778
                </p>
              </div>
            </div>

            {/* 邮箱 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-base text-gray-500">Email us at</p>
                <p className="text-lg font-[montserratSemiBold] text-gray-900">
                  info@autosafeglass.com
                </p>
              </div>
            </div>

            {/* 总店地址 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="bg-emerald-50 p-2 rounded-lg mt-1">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-base text-gray-500">Find us at</p>
                  <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">
                    Main Store
                  </span>
                </div>
                <p className="text-base font-[montserratSemiBold] text-gray-900">
                  1200 Route 70 E. #707
                </p>
                <p className="text-base font-[montserratSemiBold] text-gray-900">
                  Cherry Hill, NJ 08034
                </p>
              </div>
            </div>

            {/* 营业时间 - 更新配色 */}
            <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-[montserratSemiBold] text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-sm text-blue-600">Open Today</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* 工作日 */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-medium">Monday - Friday</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-[montserratSemiBold]">
                      8:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>

                {/* 周六 */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-medium">Saturday</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-[montserratSemiBold]">
                      8:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>

                {/* 周日 */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-medium">Sunday</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-[montserratSemiBold]">
                      By appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 地图和合作伙伴列表 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 地图 */}
            <div className="bg-white rounded-lg shadow-sm p-1 h-[400px]">
              <MapContainer
                center={[center.lat, center.lng]}
                zoom={11}
                style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {partners.map((partner, index) => (
                  <Marker
                    key={index}
                    position={[partner.location.lat, partner.location.lng]}
                    icon={icon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{partner.name}</h3>
                        <p className="text-sm text-emerald-600">{partner.type}</p>
                        <div 
                          className="cursor-pointer hover:text-emerald-500 transition-colors"
                          onClick={() => handleNavigation(partner.address, partner.city)}
                        >
                          <p className="text-sm">{partner.address}</p>
                          <p className="text-sm">{partner.city}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* 合作伙伴列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-[montserratSemiBold] text-gray-900 mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-blue-600 mb-2">
                    {partner.type}
                  </p>
                  <div 
                    className="flex items-start gap-2 cursor-pointer group"
                    onClick={() => handleNavigation(partner.address, partner.city)}
                  >
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 group-hover:text-blue-600" />
                    <div>
                      <p className="text-gray-600 group-hover:text-gray-900">
                        {partner.address}
                      </p>
                      <p className="text-gray-600 group-hover:text-gray-900">
                        {partner.city}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA 部分 */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-[montserratSemiBold] text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <button
            onClick={() => window.location.href = '/online-estimate'}
            className="inline-flex items-center gap-2 bg-[#2c7a6d] hover:bg-[#236b5e] text-white px-8 py-3 rounded-lg transition-colors text-lg font-medium"
          >
            Get Free Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactUs