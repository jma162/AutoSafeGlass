"use client"; // <<< MUST BE THE VERY FIRST LINE

// Correct imports (ensure memo and useCallback are here if needed)
import { useState, useEffect, useCallback, memo } from "react"; 
import { Check, ChevronDown, Loader2, Car, User, FileText, AlertCircle, Info, Send, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Clock, Shield, DollarSign } from "lucide-react";

// Add this interface before the OnlineEstimate component
interface ContactStepProps {
  userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    zipCode: string;
    note: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const OnlineEstimate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Back");
  const [hasMultipleWindows, setHasMultipleWindows] = useState(false);
  const [showDamageSeverity, setShowDamageSeverity] = useState(false);
  const [showDriverSideLocations, setShowDriverSideLocations] = useState(false);
  const [showPassengerSideLocations, setShowPassengerSideLocations] =
    useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedDriverLocation, setSelectedDriverLocation] = useState("");
  const [selectedPassengerLocation, setSelectedPassengerLocation] =
    useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    method: "license", // or "vin"
    licensePlate: "",
    registeredState: "",
    vin: "",
    year: "",
    make: "",
    model: "",
    bodyStyle: "",
    engineType: "",
  });
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const [years, setYears] = useState<string[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vinError, setVinError] = useState("");

  // Memoize the handleChange function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }, []); // Empty dependency array since setUserInfo is stable

  const handleNext = () => {
    if (currentStep === 1) {
      if (selectedOption === "Front" && !showDamageSeverity) {
        setShowDamageSeverity(true);
        return;
      }
      if (selectedOption === "Driver Side" && !showDriverSideLocations) {
        setShowDriverSideLocations(true);
        return;
      }
      if (selectedOption === "Passenger Side" && !showPassengerSideLocations) {
        setShowPassengerSideLocations(true);
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!validateContactInfo()) {
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (showDamageSeverity) {
      setShowDamageSeverity(false);
      return;
    }
    if (showDriverSideLocations) {
      setShowDriverSideLocations(false);
      return;
    }
    if (showPassengerSideLocations) {
      setShowPassengerSideLocations(false);
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // 只验证联系信息
    if (!validateContactInfo()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = {
        damage: {
          location: selectedOption,
          subLocation:
            selectedOption === "Front"
              ? selectedSeverity === "large"
                ? "Large Damage"
                : "Small Damage"
              : selectedOption === "Driver Side"
              ? selectedDriverLocation
              : selectedPassengerLocation,
          hasMultipleWindows,
        },
        vehicle: vehicleInfo,
        userInfo: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phone: userInfo.phone,
          email: userInfo.email,
          zipCode: userInfo.zipCode,
          note: userInfo.note,
        },
      };

      const response = await fetch("/api/submit-estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchYears = async () => {
    try {
      const response = await fetch('/api/car-data?type=years');
      const data = await response.json();
      setYears(data.map((item: any) => item.Model_Year).sort((a: string, b: string) => parseInt(b) - parseInt(a)));
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const fetchMakes = async (year: string) => {
    try {
      const response = await fetch(`/api/car-data?type=makes&year=${year}`);
      const data = await response.json();
      console.log(data, 'data');
      if (data.error) {
        console.error('Error fetching makes:', data.error);
        return;
      }
      // Sort makes alphabetically
      const sortedMakes = data.map((item: any) => item.MakeName).sort();
      setMakes(sortedMakes);
    } catch (error) {
      console.error('Error fetching makes:', error);
    }
  };

  const fetchModels = async (make: string) => {
    try {
      const response = await fetch(`/api/car-data?type=models&make=${make}`);
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching models:', data.error);
        return;
      }
      setModels(data.map((item: any) => item.Model_Name).sort());
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleVinChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const vin = e.target.value;
    setVehicleInfo(prev => ({ ...prev, vin }));
    
    if (vin.length === 17) {
      setIsLoading(true);
      setVinError("");
      try {
        const response = await fetch(`/api/vin-lookup?vin=${vin}`);
        const data = await response.json();
        
        if (data.error) {
          setVinError(data.error);
        } else {
          setVehicleInfo(prev => ({
            ...prev,
            year: data.year,
            make: data.make,
            model: data.model,
            bodyStyle: data.bodyStyle,
            engineType: data.engineType
          }));
        }
      } catch (error) {
        setVinError("Failed to fetch VIN data");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const DamageStep = () => (
    <>
      {showPassengerSideLocations ? (
        <PassengerSideLocationsStep />
      ) : showDriverSideLocations ? (
        <DriverSideLocationsStep />
      ) : showDamageSeverity ? (
        <DamageSeverityStep />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Where is your damaged glass?</h2>
          <p className="text-gray-600 mb-8">Select the location of the damage on your vehicle</p>

          <div className="grid grid-cols-2 gap-4">
            {/* Front Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
                selectedOption === "Front"
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedOption("Front")}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                <svg
                    width="48"
                    height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                    className={selectedOption === "Front" ? "text-emerald-500" : "text-gray-400"}
                >
                  <rect
                    x="4"
                    y="6"
                    width="16"
                    height="12"
                    rx="2"
                      stroke="currentColor"
                    strokeWidth="1.5"
                  />
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 6V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 6V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {selectedOption === "Front" && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
                <span className="font-medium text-gray-900">Front Windshield</span>
                <p className="text-sm text-gray-500 mt-1 text-center">Damage to the front windshield</p>
              </div>
            </div>

            {/* Back Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
                selectedOption === "Back"
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedOption("Back")}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                <svg
                    width="48"
                    height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                    className={selectedOption === "Back" ? "text-emerald-500" : "text-gray-400"}
                >
                  <rect
                    x="4"
                    y="6"
                    width="16"
                    height="12"
                    rx="2"
                      stroke="currentColor"
                    strokeWidth="1.5"
                  />
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 6V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 6V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {selectedOption === "Back" && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
                <span className="font-medium text-gray-900">Back Window</span>
                <p className="text-sm text-gray-500 mt-1 text-center">Damage to the rear window</p>
              </div>
            </div>

            {/* Driver Side Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
                selectedOption === "Driver Side"
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedOption("Driver Side")}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                <svg
                    width="48"
                    height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                    className={selectedOption === "Driver Side" ? "text-emerald-500" : "text-gray-400"}
                >
                  <path
                    d="M3 10C3 8.89543 3.89543 8 5 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10Z"
                      stroke="currentColor"
                    strokeWidth="1.5"
                  />
                    <path d="M7 8V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M17 8V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 15H17" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M9 10.5C9 10.2239 9.22386 10 9.5 10H12.5C12.7761 10 13 10.2239 13 10.5V11.5C13 11.7761 12.7761 12 12.5 12H9.5C9.22386 12 9 11.7761 9 11.5V10.5Z"
                      fill="currentColor"
                      stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
                {selectedOption === "Driver Side" && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
                <span className="font-medium text-gray-900">Driver Side</span>
                <p className="text-sm text-gray-500 mt-1 text-center">Damage to driver side windows</p>
              </div>
            </div>

            {/* Passenger Side Option */}
            <div
              className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
                selectedOption === "Passenger Side"
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedOption("Passenger Side")}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                <svg
                    width="48"
                    height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                    className={selectedOption === "Passenger Side" ? "text-emerald-500" : "text-gray-400"}
                >
                  <path
                    d="M3 10C3 8.89543 3.89543 8 5 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10Z"
                      stroke="currentColor"
                    strokeWidth="1.5"
                  />
                    <path d="M7 8V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M17 8V18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 15H17" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M11 10.5C11 10.2239 11.2239 10 11.5 10H14.5C14.7761 10 15 10.2239 15 10.5V11.5C15 11.7761 14.7761 12 14.5 12H11.5C11.2239 12 11 11.7761 11 11.5V10.5Z"
                      fill="currentColor"
                      stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
                {selectedOption === "Passenger Side" && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
                <span className="font-medium text-gray-900">Passenger Side</span>
                <p className="text-sm text-gray-500 mt-1 text-center">Damage to passenger side windows</p>
              </div>
            </div>
          </div>

          {/* Multiple Windows Checkbox */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-emerald-500 border-gray-300 rounded"
                checked={hasMultipleWindows}
                onChange={(e) => setHasMultipleWindows(e.target.checked)}
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-900 block">
                  I have multiple windows with damage
                </span>
                <span className="text-sm text-gray-500">
                  Select the primary window above and we'll contact you to get more details.
                </span>
              </div>
            </label>
          </div>
        </>
      )}
    </>
  );

  const DamageSeverityStep = () => (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">How severe is the damage?</h2>
      <p className="text-gray-600 mb-8">Select the type of damage to your windshield</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
            selectedSeverity === "large" ? "border-emerald-400 bg-emerald-50" : "border-gray-200"
          }`}
          onClick={() => setSelectedSeverity("large")}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/windshield-large-damage.svg"
                alt="Large damage"
                width={64}
                height={64}
                className="object-contain"
              />
              {selectedSeverity === "large" && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Large Damage</h3>
              <p className="text-sm text-gray-500 mt-1">
                The damage is larger than a quarter and/or there are more than 3 damaged areas.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
            selectedSeverity === "small" ? "border-emerald-400 bg-emerald-50" : "border-gray-200"
          }`}
          onClick={() => setSelectedSeverity("small")}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/windshield-small-damage.svg"
                alt="Small damage"
                width={64}
                height={64}
                className="object-contain"
              />
              {selectedSeverity === "small" && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Small Damage</h3>
              <p className="text-sm text-gray-500 mt-1">
                There are 3 or fewer chips or cracks that are each smaller than a quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const DriverSideLocationsStep = () => (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Where is your damaged glass?</h2>
      <p className="text-gray-600 mb-8">Select the specific location of the damage</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: "vent", label: "Vent Window", description: "Small triangular window at the front" },
          { id: "front-door", label: "Front Door", description: "Window in the front door" },
          { id: "back-door", label: "Back Door", description: "Window in the back door" },
          { id: "quarter-panel", label: "Quarter Panel", description: "Window behind the back door" },
        ].map((location) => (
          <div
            key={location.id}
            className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
              selectedDriverLocation === location.id
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedDriverLocation(location.id)}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-20 mb-4">
                <Image
                  src={`/car-${location.id}.svg`}
                  alt={`Car ${location.label}`}
                  fill
                  className="object-contain"
                />
                {selectedDriverLocation === location.id && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <span className="font-medium text-gray-900">{location.label}</span>
              <p className="text-sm text-gray-500 mt-1 text-center">{location.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Multiple Windows Checkbox */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 text-emerald-500 border-gray-300 rounded"
            checked={hasMultipleWindows}
            onChange={(e) => setHasMultipleWindows(e.target.checked)}
          />
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-900 block">
              I have multiple windows with damage
            </span>
            <span className="text-sm text-gray-500">
              Select the primary window above and we'll contact you to get more details.
            </span>
          </div>
        </label>
      </div>
    </>
  );

  const PassengerSideLocationsStep = () => (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Where is your damaged glass?</h2>
      <p className="text-gray-600 mb-8">Select the specific location of the damage</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: "vent", label: "Vent Window", description: "Small triangular window at the front" },
          { id: "front-door", label: "Front Door", description: "Window in the front door" },
          { id: "back-door", label: "Back Door", description: "Window in the back door" },
          { id: "quarter-panel", label: "Quarter Panel", description: "Window behind the back door" },
        ].map((location) => (
          <div
            key={location.id}
            className={`border rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors ${
              selectedPassengerLocation === location.id
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedPassengerLocation(location.id)}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-20 mb-4">
                <Image
                  src={`/car-${location.id}.svg`}
                  alt={`Car ${location.label}`}
                  fill
                  className="object-contain"
                />
                {selectedPassengerLocation === location.id && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <span className="font-medium text-gray-900">{location.label}</span>
              <p className="text-sm text-gray-500 mt-1 text-center">{location.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Multiple Windows Checkbox */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 text-emerald-500 border-gray-300 rounded"
            checked={hasMultipleWindows}
            onChange={(e) => setHasMultipleWindows(e.target.checked)}
          />
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-900 block">
              I have multiple windows with damage
            </span>
            <span className="text-sm text-gray-500">
              Select the primary window above and we'll contact you to get more details.
            </span>
          </div>
        </label>
      </div>
    </>
  );

  const ContactStep = memo(({ userInfo, handleChange }: ContactStepProps) => {
    console.log("Rendering ContactStep");
    return (
      <>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Contact Information</h2>
        <p className="text-gray-600 mb-8">Please provide your contact details so we can reach you about your estimate.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          {/* Zip Code */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={userInfo.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          {/* Note Field */}
          <div className="md:col-span-2">
             <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
               Note (Optional)
             </label>
             <textarea
               id="note"
               name="note"
               rows={3}
               value={userInfo.note}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
               placeholder="Any additional details? (e.g., preferred contact time)"
             />
          </div>
        </div>
      </>
    );
  });
  ContactStep.displayName = 'ContactStep';

  const SummaryStep = () => {
    const getDamageLocation = () => {
      if (selectedOption === "Front") {
        return selectedSeverity === "large"
          ? "Front Windshield - Large Damage"
          : "Front Windshield - Small Damage";
      }
      if (selectedOption === "Driver Side") {
        return `Driver Side - ${selectedDriverLocation
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`;
      }
      if (selectedOption === "Passenger Side") {
        return `Passenger Side - ${selectedPassengerLocation
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`;
      }
      return selectedOption;
    };

    return (
      <>
        <h1 className="text-2xl font-bold text-center mb-8">
          Review Your Estimate Request
        </h1>

        {submitStatus === "success" && (
          <div className="mb-8 p-6 bg-[#f0f7f5] border border-[#e0ede9] rounded-lg">
            <div className="flex items-center gap-3 text-[#2c7a6d] mb-2">
              <Check className="w-5 h-5" />
              <h3 className="font-semibold">Request Submitted Successfully!</h3>
            </div>
            <p className="text-gray-600">
              Thank you for choosing Auto Safe Glass. We'll send you a confirmation email shortly.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">Submission Error</h3>
            </div>
            <p className="text-gray-600">
              There was an error submitting your request. Please try again or contact us directly.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Damage Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-5 h-5 text-[#2c7a6d]" />
              <h2 className="font-semibold text-lg text-gray-900">Damage Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Location:</span>
                <span className="text-gray-900">{getDamageLocation()}</span>
              </div>
              {hasMultipleWindows && (
                <div className="flex items-center gap-2 text-[#2c7a6d]">
                  <Info className="w-4 h-4" />
                  <span>Multiple windows have damage</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-5 h-5 text-[#2c7a6d]" />
              <h2 className="font-semibold text-lg text-gray-900">Vehicle Information</h2>
            </div>
            <div className="space-y-3">
              {vehicleInfo.method === "license" ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">License Plate:</span>
                    <span className="text-gray-900">{vehicleInfo.licensePlate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">State:</span>
                    <span className="text-gray-900">{vehicleInfo.registeredState}</span>
                  </div>
                  {vehicleInfo.vin && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">VIN:</span>
                      <span className="text-gray-900">{vehicleInfo.vin}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Year:</span>
                    <span className="text-gray-900">{vehicleInfo.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Make:</span>
                    <span className="text-gray-900">{vehicleInfo.make}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Model:</span>
                    <span className="text-gray-900">{vehicleInfo.model}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-[#2c7a6d]" />
              <h2 className="font-semibold text-lg text-gray-900">Contact Information</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-24">Name:</span>
                <span className="text-gray-900">{userInfo.firstName} {userInfo.lastName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-24">Phone:</span>
                <span className="text-gray-900">{userInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-24">Email:</span>
                <span className="text-gray-900">{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-24">ZIP Code:</span>
                <span className="text-gray-900">{userInfo.zipCode}</span>
              </div>
              {/* Display Note if it exists */}
              {userInfo.note && (
                <div className="flex items-start gap-2 pt-2 border-t border-gray-200 mt-3">
                  <span className="font-medium text-gray-700 w-24 mt-0.5">Note for our team:</span>
                  <p className="text-gray-900 flex-1 whitespace-pre-wrap">{userInfo.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === "success"}
          className="w-full mt-8 bg-[#f0f7f5] hover:bg-[#e0ede9] text-[#2c7a6d] py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium text-lg border border-[#e0ede9]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : submitStatus === "success" ? (
            <>
              <Check className="w-5 h-5" />
              Submitted Successfully
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Estimate Request
            </>
          )}
        </button>

        {/* Service Note */}
        <p className="text-center text-gray-500 mt-6">
          Free mobile service available in all service areas
        </p>
      </>
    );
  };

  const validateContactInfo = () => {
    if (!userInfo.firstName.trim()) {
      alert("Please enter your first name");
      return false;
    }
    if (!userInfo.lastName.trim()) {
      alert("Please enter your last name");
      return false;
    }
    if (!userInfo.phone.trim()) {
      alert("Please enter your phone number");
      return false;
    }
    if (!userInfo.email.trim()) {
      alert("Please enter your email address");
      return false;
    }
    if (!userInfo.zipCode.trim()) {
      alert("Please enter your ZIP code");
      return false;
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    
    // 验证电话号码格式（美国格式）
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(userInfo.phone)) {
      alert("Please enter a valid phone number");
      return false;
    }
    
    // 验证邮编格式（美国格式）
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(userInfo.zipCode)) {
      alert("Please enter a valid ZIP code");
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-[#f0f7f5]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Auto Glass Estimate
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Complete the form below to receive a free estimate for your auto glass repair or replacement. 
              Free mobile service available in all service areas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    icon: Car,
                    title: "Damage Details",
                    desc: "Select damage location and type"
                  },
                  {
                    step: 2,
                    icon: Car,
                    title: "Vehicle Information",
                    desc: "Enter your vehicle details"
                  },
                  {
                    step: 3,
                    icon: User,
                    title: "Contact Information",
                    desc: "Tell us about yourself"
                  },
                  {
                    step: 4,
                    icon: FileText,
                    title: "Review & Submit",
                    desc: "Review your information"
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      currentStep >= item.step 
                        ? 'bg-[#2c7a6d] text-white' 
                        : 'bg-[#f0f7f5] text-gray-400'
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        currentStep >= item.step ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Support */}
              <div className="mt-8 pt-6 border-t border-[#e0ede9]">
                <div className="flex flex-col items-center text-center">
                  <Phone className="w-6 h-6 text-[#2c7a6d] mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <a 
                    href="tel:+12159045778"
                    className="text-lg font-bold text-[#2c7a6d] hover:text-[#236b5e]"
                  >
                    215-904-5778
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Step Content */}
              {currentStep === 1 && <DamageStep />}
              {currentStep === 2 && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Information</h2>
                    <p className="text-gray-600 mb-6">
                      Select one option to provide your vehicle details. We recommend
                      license plate or VIN to ensure an accurate quote.
                    </p>
              
                    <div className="space-y-6">
                      {/* Method Selection */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          className={`p-4 rounded-lg text-center transition-colors ${
                            vehicleInfo.method === "license"
                              ? "bg-[#f0f7f5] text-[#2c7a6d] border-2 border-[#2c7a6d]"
                              : "bg-[#f0f7f5] text-gray-700 hover:bg-[#e0ede9] border border-[#e0ede9]"
                          }`}
                          onClick={() =>
                            setVehicleInfo({ ...vehicleInfo, method: "license" })
                          }
                        >
                          <Car className="w-6 h-6 mx-auto mb-2" />
                          <span className="block font-medium">VIN Check</span>
                        </button>
                        <button
                          className={`p-4 rounded-lg text-center transition-colors ${
                            vehicleInfo.method === "manual"
                              ? "bg-[#f0f7f5] text-[#2c7a6d] border-2 border-[#2c7a6d]"
                              : "bg-[#f0f7f5] text-gray-700 hover:bg-[#e0ede9] border border-[#e0ede9]"
                          }`}
                          onClick={() =>
                            setVehicleInfo({ ...vehicleInfo, method: "manual" })
                          }
                        >
                          <Car className="w-6 h-6 mx-auto mb-2" />
                          <span className="block font-medium">Year, Make, Model</span>
                        </button>
                      </div>
              
                      {vehicleInfo.method === "license" ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              VIN
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                                value={vehicleInfo.vin}
                                onChange={handleVinChange}
                                placeholder="Enter VIN"
                                maxLength={17}
                              />
                              {isLoading && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <Loader2 className="w-5 h-5 animate-spin text-[#2c7a6d]" />
                                </div>
                              )}
                            </div>
                            {vinError && (
                              <p className="text-red-500 text-sm mt-1">{vinError}</p>
                            )}
                            {vehicleInfo.year && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="font-medium mb-2">Vehicle Information</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p><span className="font-medium">Year:</span> {vehicleInfo.year}</p>
                                  <p><span className="font-medium">Make:</span> {vehicleInfo.make}</p>
                                  <p><span className="font-medium">Model:</span> {vehicleInfo.model}</p>
                                  <p><span className="font-medium">Body Style:</span> {vehicleInfo.bodyStyle}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Year
                              </label>
                              <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                                value={vehicleInfo.year}
                                onChange={(e) => {
                                  setVehicleInfo(prev => ({ ...prev, year: e.target.value }));
                                  fetchMakes(e.target.value);
                                }}
                              >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </div>
              
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Make
                              </label>
                              <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                                value={vehicleInfo.make}
                                onChange={(e) => {
                                  setVehicleInfo(prev => ({ ...prev, make: e.target.value }));
                                  fetchModels(e.target.value);
                                }}
                                disabled={!vehicleInfo.year}
                              >
                                <option value="">Select Make</option>
                                {makes.map((make) => (
                                  <option key={make} value={make}>
                                    {make}
                                  </option>
                                ))}
                              </select>
                            </div>
              
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Model
                              </label>
                              <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                                value={vehicleInfo.model}
                                onChange={(e) =>
                                  setVehicleInfo(prev => ({ ...prev, model: e.target.value }))
                                }
                                disabled={!vehicleInfo.make}
                              >
                                <option value="">Select Model</option>
                                {models.map((model) => (
                                  <option key={model} value={model}>
                                    {model}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
              )}
              {currentStep === 3 && <ContactStep userInfo={userInfo} handleChange={handleChange} />}
              {currentStep === 4 && <SummaryStep />}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-[#e0ede9]">
                {((currentStep > 1 && currentStep < 4) ||
                  showDamageSeverity ||
                  showDriverSideLocations ||
                  showPassengerSideLocations) && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[#2c7a6d] hover:text-[#236b5e] font-medium py-2.5 px-6 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                )}
                {currentStep < 4 && (
                  <div className={currentStep > 1 ? "ml-auto" : "w-full"}>
                    <button
                      onClick={handleNext}
                      disabled={currentStep === 1 && !selectedOption}
                      className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        currentStep === 1 && !selectedOption ? "opacity-50 cursor-not-allowed" : ""
                      } ${currentStep === 1 ? "w-full" : ""}`}
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Service Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  title: "Fast Service",
                  desc: "Same day service available"
                },
                {
                  icon: Shield,
                  title: "Mobile Service Available",
                  desc: "Service at your location"
                },
                {
                  icon: DollarSign,
                  title: "Insurance Accepted",
                  desc: "We work with all insurances"
                }
              ].map((feature) => (
                <div key={feature.title} className="bg-white rounded-lg p-6 text-center">
                  <feature.icon className="w-8 h-8 text-[#2c7a6d] mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineEstimate;
