import React from "react";

const Repair = () => {
  const rockChips = [
    { name: "Star", image: "/star.png" },
    { name: "Crack", image: "/crack.png" },
    { name: "Bullseye", image: "/bullseye.png" },
    { name: "Halfmoon", image: "/halfmoon.png" },
    { name: "Combination", image: "/combination.png" },
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-[montserratSemiBold] text-center text-gray-800 mb-12">
          Auto Glass Repair & Replacement
        </h2>
        
        <div className="space-y-12">
          {/* Rock Chip Types */}
          <div>
            <h3 className="text-xl font-[montserratSemiBold] text-gray-700 mb-6 text-center">
              Type of Rock Chip
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {rockChips.map((chip) => (
                <div 
                  key={chip.name}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img 
                    src={chip.image} 
                    alt={`${chip.name} Rock Chip`} 
                    className="w-full max-w-[120px] mx-auto"
                  />
                  <p className="text-gray-600 text-center mt-3 font-medium">
                    {chip.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Auto Glass Types */}
          <div>
            <h3 className="text-xl font-[montserratSemiBold] text-gray-700 mb-6 text-center">
              Type of Auto Glass
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img 
                src="/CARWINDER.png" 
                alt="Auto Glass Types" 
                className="w-full max-w-3xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repair;
