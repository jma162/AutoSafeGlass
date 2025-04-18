"use client"
import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

const OnlineEstimate = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState("Back")
  const [hasMultipleWindows, setHasMultipleWindows] = useState(false)
  const [vehicleInfo, setVehicleInfo] = useState({
    method: "license", // or "vin"
    licensePlate: "",
    registeredState: "",
    vin: "",
  })
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
  })

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const DamageStep = () => (
    <>
      <h1 className="text-2xl font-bold text-center mb-2">Where is your damaged glass?</h1>
      <p className="text-center text-gray-600 mb-6">Select one option</p>

      {/* Options */}
      <div className="space-y-4">
        {/* Front Option */}
        <div
          className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 ${
            selectedOption === "Front" ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setSelectedOption("Front")}
        >
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="16" height="12" rx="2" stroke="#888888" strokeWidth="1.5" />
              <path d="M4 12H20" stroke="#888888" strokeWidth="1.5" />
              <path d="M8 6V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M16 6V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M4 9H20" stroke="#888888" strokeWidth="1.5" />
              <path d="M4 15H20" stroke="#888888" strokeWidth="1.5" />
            </svg>
            {selectedOption === "Front" && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <span className="mt-2 text-sm">Front</span>
        </div>

        {/* Back Option */}
        <div
          className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 ${
            selectedOption === "Back" ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setSelectedOption("Back")}
        >
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="16" height="12" rx="2" stroke="#888888" strokeWidth="1.5" />
              <path d="M4 12H20" stroke="#888888" strokeWidth="1.5" />
              <path d="M8 6V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M16 6V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M4 9H20" stroke="#888888" strokeWidth="1.5" />
              <path d="M4 15H20" stroke="#888888" strokeWidth="1.5" />
            </svg>
            {selectedOption === "Back" && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <span className="mt-2 text-sm">Back</span>
        </div>

        {/* Driver Side Option */}
        <div
          className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 ${
            selectedOption === "Driver Side" ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setSelectedOption("Driver Side")}
        >
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 10C3 8.89543 3.89543 8 5 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10Z"
                stroke="#888888"
                strokeWidth="1.5"
              />
              <path d="M7 8V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M17 8V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M7 12H17" stroke="#888888" strokeWidth="1.5" />
              <path d="M7 15H17" stroke="#888888" strokeWidth="1.5" />
              <path
                d="M9 10.5C9 10.2239 9.22386 10 9.5 10H12.5C12.7761 10 13 10.2239 13 10.5V11.5C13 11.7761 12.7761 12 12.5 12H9.5C9.22386 12 9 11.7761 9 11.5V10.5Z"
                fill="#A4CAFE"
                stroke="#888888"
                strokeWidth="0.5"
              />
            </svg>
            {selectedOption === "Driver Side" && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <span className="mt-2 text-sm">Driver Side</span>
        </div>

        {/* Passenger Side Option */}
        <div
          className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 ${
            selectedOption === "Passenger Side" ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setSelectedOption("Passenger Side")}
        >
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 10C3 8.89543 3.89543 8 5 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10Z"
                stroke="#888888"
                strokeWidth="1.5"
              />
              <path d="M7 8V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M17 8V18" stroke="#888888" strokeWidth="1.5" />
              <path d="M7 12H17" stroke="#888888" strokeWidth="1.5" />
              <path d="M7 15H17" stroke="#888888" strokeWidth="1.5" />
              <path
                d="M11 10.5C11 10.2239 11.2239 10 11.5 10H14.5C14.7761 10 15 10.2239 15 10.5V11.5C15 11.7761 14.7761 12 14.5 12H11.5C11.2239 12 11 11.7761 11 11.5V10.5Z"
                fill="#A4CAFE"
                stroke="#888888"
                strokeWidth="0.5"
              />
            </svg>
            {selectedOption === "Passenger Side" && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <span className="mt-2 text-sm">Passenger Side</span>
        </div>
      </div>

      {/* Multiple Windows Checkbox */}
      <div className="mt-6">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 text-blue-500 border-gray-300 rounded"
            checked={hasMultipleWindows}
            onChange={(e) => setHasMultipleWindows(e.target.checked)}
          />
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-700 block">I have multiple windows with damage</span>
            <span className="text-xs text-gray-500">
              Select the primary window above and we'll contact you to get more details.
            </span>
          </div>
        </label>
      </div>
    </>
  )

  const VehicleStep = () => (
    <>
      <h1 className="text-2xl font-bold text-center mb-2">Tell us about your vehicle</h1>
      <p className="text-center text-gray-600 mb-6">
        Select one option to provide your vehicle details. We recommend license plate or VIN to ensure an accurate quote.
      </p>

      <div className="space-y-4">
        {/* Method Selection */}
        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-lg text-center ${
              vehicleInfo.method === "license"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setVehicleInfo({ ...vehicleInfo, method: "license" })}
          >
            License Plate or VIN
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg text-center ${
              vehicleInfo.method === "manual"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setVehicleInfo({ ...vehicleInfo, method: "manual" })}
          >
            Year, Make, Model
          </button>
        </div>

        {vehicleInfo.method === "license" ? (
          <>
            {/* License Plate Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={vehicleInfo.licensePlate}
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, licensePlate: e.target.value })}
                  placeholder="Enter license plate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registered State</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-blue-500 focus:border-blue-500"
                    value={vehicleInfo.registeredState}
                    onChange={(e) => setVehicleInfo({ ...vehicleInfo, registeredState: e.target.value })}
                  >
                    <option value="">Select state</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    {/* Add more states */}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Find my car
              </button>
              <div className="text-center">
                <span className="text-gray-500">OR</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">VIN</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={vehicleInfo.vin}
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, vin: e.target.value })}
                  placeholder="Enter VIN"
                />
                <button
                  className="text-blue-600 text-sm mt-1 hover:underline"
                  onClick={() => {/* Add help modal */}}
                >
                  Where is my VIN?
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {/* Year, Make, Model inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter year"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter make"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter model"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )

  const AboutYouStep = () => (
    <>
      <h1 className="text-2xl font-bold text-center mb-2">Tell us about you</h1>
      <p className="text-center text-gray-600 mb-6">
        Please provide your contact information for your quote
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={userInfo.firstName}
              onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={userInfo.lastName}
              onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={userInfo.zipCode}
            onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
            placeholder="Enter ZIP code"
          />
        </div>
      </div>
    </>
  )

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* Progress Steps */}
      <div className="flex justify-center items-center gap-8 mb-12 max-w-md w-full">
        <div className="flex flex-col items-center flex-1">
          <div className={`h-1 w-full ${currentStep >= 1 ? "bg-yellow-400" : "bg-gray-200"} mb-2`}></div>
          <span className={`text-sm ${currentStep >= 1 ? "text-gray-800" : "text-gray-400"}`}>Damage</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className={`h-1 w-full ${currentStep >= 2 ? "bg-yellow-400" : "bg-gray-200"} mb-2`}></div>
          <span className={`text-sm ${currentStep >= 2 ? "text-gray-800" : "text-gray-400"}`}>Vehicle</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className={`h-1 w-full ${currentStep >= 3 ? "bg-yellow-400" : "bg-gray-200"} mb-2`}></div>
          <span className={`text-sm ${currentStep >= 3 ? "text-gray-800" : "text-gray-400"}`}>About You</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className={`h-1 w-full ${currentStep >= 4 ? "bg-yellow-400" : "bg-gray-200"} mb-2`}></div>
          <span className={`text-sm ${currentStep >= 4 ? "text-gray-800" : "text-gray-400"}`}>Schedule</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full">
        {currentStep === 1 && <DamageStep />}
        {currentStep === 2 && <VehicleStep />}
        {currentStep === 3 && <AboutYouStep />}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 font-medium py-2 px-8 rounded-full transition-colors"
            >
              Back
            </button>
          )}
          <div className={`${currentStep > 1 ? "ml-auto" : ""}`}>
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-full transition-colors"
            >
              {currentStep === 3 ? "Get Quote" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineEstimate
