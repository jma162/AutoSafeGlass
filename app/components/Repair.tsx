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
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-[montserratSemiBold] text-[#2c7a6d] mb-2">
          Windshield Damage Types
        </h2>
        <p className="text-gray-600">
          Understanding different types of rock chip damage
        </p>
      </div>

      {/* Damage Types Grid */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {damageTypes.map((type) => (
          <div key={type.title} className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-center">
            <img 
              src={type.image} 
              alt={type.title} 
              className="w-20 h-20 object-contain" 
            />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Auto Glass Type Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-[montserratSemiBold] text-gray-700 mb-4 text-center">
          Type of Auto Glass
        </h3>
        <img 
          src="/CARWINDER.png" 
          alt="Auto Glass Types" 
          className="max-w-lg mx-auto w-full" 
        />
      </div>
    </div>
  );
};

export default Repair;
