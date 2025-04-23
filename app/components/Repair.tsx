import React from "react";

const Repair = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-[montserratSemiBold] mb-10">
          Auto Glass Repair & Replacement
        </h2>
        <div className="flex flex-col gap-5">
        <div>
            <p className="text-gray-700 font-[montserratSemiBold] text-xl mb-4">Type of Rock Chip</p>
            <div className="flex items-center gap-5">
                <div>
                    <img src="/star.png" alt="Rock Chip Repair" className="w-40" />
                    <p className="text-gray-700 text-center pt-1.5">Star</p>
                </div>
                <div>
                    <img src="/crack.png" alt="Rock Chip Repair" className="w-40" />
                    <p className="text-gray-700 text-center pt-1.5">Crack</p>
                </div>
                <div>
                    <img src="/bullseye.png" alt="Rock Chip Repair" className="w-40" />
                    <p className="text-gray-700 text-center pt-1.5">Bullseye</p>
                </div>
                <div>
                    <img src="/halfmoon.png" alt="Rock Chip Repair" className="w-40" />
                    <p className="text-gray-700 text-center pt-1.5">Halfmoon</p>
                </div>
                <div>
                    <img src="/combination.png" alt="Rock Chip Repair" className="w-40" />
                    <p className="text-gray-700 text-center pt-1.5">Combination</p>
                </div>
            </div>
          </div>
          <div>
            <p className="text-gray-700 font-[montserratSemiBold] text-xl mb-4">Type of Auto Glass</p>
            <img src="/CARWINDER.png" alt="Rock Chip Repair" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repair;
