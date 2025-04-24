"use client"; 

import React from "react";

const Repair = () => {
  // Damage types data for descriptions
  const damageTypes = [
    { 
      title: "Bull's Eye", 
      description: "Circular damage with a cone in the outer layer",
      image: "/bullseye.png"
    },
    { 
      title: "Star Break", 
      description: "Short cracks extending from the impact point",
      image: "/star.png"
    },
    { 
      title: "Combination Break", 
      description: "Both circular damage and cracks",
      image: "/combination.png"
    },
    { 
      title: "Crack", 
      description: "A single line of damage that can spread",
      image: "/crack.png"
    },
  ];

  return (
    <section className="py-12 sm:py-16 mt-20 sm:mt-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-[montserratSemiBold] text-[#2c7a6d] mb-3">
            Windshield Damage Types
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Understanding different types of rock chip damage
          </p>
        </div>

        {/* Damage Types Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {damageTypes.map((type) => (
            <div 
              key={type.title} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {type.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Auto Glass Type Section */}
        <div className="mt-12">
          <h3 className="text-xl sm:text-2xl font-[montserratSemiBold] text-gray-700 mb-6 text-center">
            Type of Auto Glass
          </h3>
          <div className="max-w-lg mx-auto">
            <img 
              src="/CARWINDER.png" 
              alt="Auto Glass Types" 
              className="w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Repair;
