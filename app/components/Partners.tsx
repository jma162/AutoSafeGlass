import { MapPin, Building2 } from 'lucide-react'

const Partners = () => {
  // 合作伙伴数据
  const partners = [
    {
      name: "Ken's Auto Inc.",
      type: "Auto Repair & Auto Glass",
      address: "341 N. 10th St.",
      city: "Philadelphia, PA 19107"
    },
    {
      name: "Maaco Collision Repair & Auto Painting",
      type: "Auto Body Shop",
      address: "1750 Pine St.",
      city: "Philadelphia, PA 19103"
    },
    {
      name: "Cherry Hill Auto Body",
      type: "Auto Body & Glass",
      address: "1500 Route 38",
      city: "Cherry Hill, NJ 08002"
    },
    {
      name: "Delaware Valley Auto Glass",
      type: "Auto Glass Specialist",
      address: "2300 Market St.",
      city: "Philadelphia, PA 19103"
    }
  ];

  return (
    <div className="bg-[#f0f7f5] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-[montserratSemiBold] text-[#2c7a6d] text-center mb-12">
          Our Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* 统一使用 Building2 图标 */}
              <div className="w-16 h-16 bg-[#f0f7f5] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-[#2c7a6d]" />
              </div>
              
              <h3 className="text-xl font-semibold text-[#2c7a6d] mb-2 text-center">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {partner.type}
              </p>
              <div className="flex items-start gap-2 pt-4 border-t border-[#e0ede9]">
                <MapPin className="w-5 h-5 text-[#2c7a6d] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">
                    {partner.address}
                  </p>
                  <p className="text-gray-600">
                    {partner.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners; 