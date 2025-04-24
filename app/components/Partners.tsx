"use client";

import { MapPin, Building2 } from 'lucide-react'

const Partners = () => {
  // 合作伙伴数据
  const partners = [
    {
      name: "Ken's Auto Inc.",
      type: "Auto Repair & Auto Glass",
      address: "341 N. 10th St.",
      city: "Philadelphia, PA 19107",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.409690133911!2d-75.1568066846186!3d39.9545609794213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c801d4781c1d%3A0x7ddc7c87f7a89e6d!2s341%20N%2010th%20St%2C%20Philadelphia%2C%20PA%2019107!5e0!3m2!1sen!2sus!4v1600000000001!5m2!1sen!2sus"
    },
    {
      name: "Maaco Collision Repair & Auto Painting",
      type: "Auto Body Shop",
      address: "1750 Pine St.",
      city: "Philadelphia, PA 19103",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.858193059138!2d-75.1715809846189!3d39.9453647794224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c61e6a5e67d7%3A0x7e1a4ac3c3c317e1!2s1750%20Pine%20St%2C%20Philadelphia%2C%20PA%2019103!5e0!3m2!1sen!2sus!4v1600000000002!5m2!1sen!2sus"
    },
    {
      name: "Cherry Hill Auto Body",
      type: "Auto Body & Glass",
      address: "1500 Route 38",
      city: "Cherry Hill, NJ 08002",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.451958716568!2d-75.0328614846173!3d39.9146739794273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c1354a901b6f0b%3A0x8e550368f8b7d3e1!2s1500%20NJ-38%2C%20Cherry%20Hill%2C%20NJ%2008002!5e0!3m2!1sen!2sus!4v1600000000003!5m2!1sen!2sus"
    },
    {
      name: "Delaware Valley Auto Glass",
      type: "Auto Glass Specialist",
      address: "2300 Market St.",
      city: "Philadelphia, PA 19103",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.6354193396737!2d-75.1801297846187!3d39.9500427794218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c63a0f87e75b%3A0x4b6b9e5b6b0d1485!2s2300%20Market%20St%2C%20Philadelphia%2C%20PA%2019103!5e0!3m2!1sen!2sus!4v1600000000004!5m2!1sen!2sus"
    }
  ];

  return (
    <div className="bg-[#f0f7f5] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-[montserratSemiBold] text-[#2c7a6d] text-center mb-12">
          Our Partners
        </h2>
        
        {/* Grid for partners cards */}
        {/* Adjusted grid columns for better spacing with maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          {partners.map((partner, index) => (
            <div 
              key={index}
              // Increased padding slightly
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" 
            >
              <div className="flex items-center gap-4 mb-4"> {/* Grouped icon and name */}
                <div className="w-14 h-14 bg-[#f0f7f5] rounded-full flex items-center justify-center flex-shrink-0"> 
                  <Building2 className="w-7 h-7 text-[#2c7a6d]" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-[#2c7a6d]">
                    {partner.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {partner.type}
                  </p>
                </div>
              </div>
              
              {/* Address Section */}
              <div className="flex items-start gap-2 mb-4 text-sm"> 
                <MapPin className="w-4 h-4 text-[#2c7a6d] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">{partner.address}</p>
                  <p className="text-gray-600">{partner.city}</p>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="mt-auto rounded-lg overflow-hidden border border-gray-200 aspect-video"> {/* Use aspect-video for standard ratio */}
                {/* Ensure the src is correctly populated */}
                {partner.mapEmbedUrl ? (
                  <iframe
                    src={partner.mapEmbedUrl} 
                    width="100%"
                    height="100%" // Let aspect-video control height relative to width
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${partner.name} Location Map`}
                  ></iframe>
                ) : (
                  // Optional: Placeholder if URL is missing
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Map not available</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners; 