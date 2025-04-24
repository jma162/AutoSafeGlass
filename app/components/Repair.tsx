"use client"; 

import React from "react";

const Repair = () => {
  // Damage types data for descriptions
  const damageDescriptions = [
    { 
      title: "Bull's Eye", 
      description: "Circular damage with a cone in the outer layer"
    },
    { 
      title: "Star Break", 
      description: "Short cracks extending from the impact point"
    },
    { 
      title: "Combination Break", 
      description: "Both circular damage and cracks"
    },
    { 
      title: "Crack", 
      description: "A single line of damage that can spread"
    },
  ];

  // Image data for the grid
  const damageImages = [
    { src: "/bullseye.png", alt: "Bull's Eye Damage", title: "Bull's Eye" },
    { src: "/star.png", alt: "Star Break", title: "Star Break" },
    { src: "/combination.png", alt: "Combination Break", title: "Combination Break" },
    { src: "/crack.png", alt: "Crack Damage", title: "Crack" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Centered Header Section */}
      <div className="text-center mb-8 bg-[#f0f7f5] rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-[montserratSemiBold] text-[#2c7a6d] mb-1">
          Windshield Damage Types
        </h2>
        <p className="text-base text-gray-600">
          Understanding different types of rock chip damage
        </p>
      </div>

      {/* Main Content Grid (Images on Left, Description on Right for large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Side: Damage Images Grid */}
        <div className="grid grid-cols-2 gap-4">
          {damageImages.map((img) => (
            <div key={img.src} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 text-center">
              <img 
                src={img.src} 
                alt={img.alt} 
                // Allow image to fill container width, maintain aspect ratio
                className="w-full h-auto object-contain mb-2" 
              />
              <p className="text-sm font-medium text-gray-700">{img.title}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Damage Descriptions - Reduced Padding and Spacing */}
        <div className="bg-[#f0f7f5] rounded-lg p-4 shadow-sm h-fit"> {/* Reduced padding, added h-fit */}
          <h3 className="text-lg font-semibold text-[#2c7a6d] mb-3"> {/* Reduced margin */}
            Common Damage Descriptions
          </h3>
          {/* Reduced list spacing */}
          <ul className="space-y-2"> 
            {damageDescriptions.map((desc) => (
              <li key={desc.title} className="text-sm">
                <strong className="text-gray-800">{desc.title}:</strong> 
                <span className="text-gray-600 ml-1">{desc.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Auto Glass Type Section (Below the main grid) */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="text-xl font-[montserratSemiBold] text-gray-700 mb-3 text-center">
          Type of Auto Glass
        </h3>
        <img 
          src="/CARWINDER.png" 
          alt="Auto Glass Types" 
          className="w-full max-w-xl mx-auto h-auto" 
        />
      </div>
    </div>
  );
};

export default Repair;
