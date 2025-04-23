"use client";
import { useState, useEffect } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      userInfo.firstName === "" ||
      userInfo.lastName === "" ||
      userInfo.phone === "" ||
      userInfo.email === "" ||
      userInfo.zipCode === ""
    ) {
      alert("Please fill out all fields");
      return;
    }

    if (
      vehicleInfo.licensePlate === "" ||
      vehicleInfo.registeredState === "" ||
      vehicleInfo.vin === ""
    ) {
      alert("Please fill out all fields");
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
        userInfo,
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

  const DamageSeverityStep = () => (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-center flex-1">
          How severe is the damage?
        </h1>
      </div>

      <div className="space-y-4">
        <div
          className={`border rounded-lg p-6 cursor-pointer hover:border-blue-500 ${
            selectedSeverity === "large" ? "border-blue-500" : "border-gray-200"
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
                <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-gray-700">
              The damage is larger than a quarter and/or there are more than 3
              damaged areas.
            </p>
          </div>
        </div>

        <div
          className={`border rounded-lg p-6 cursor-pointer hover:border-blue-500 ${
            selectedSeverity === "small" ? "border-blue-500" : "border-gray-200"
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
                <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
        </div>
            <p className="text-gray-700">
              There are 3 or fewer chips or cracks that are each smaller than a
              quarter.
            </p>
        </div>
        </div>
      </div>
    </>
  );

  const DriverSideLocationsStep = () => (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-center flex-1">
          Where is your damaged glass?
        </h1>
      </div>
      <p className="text-center text-gray-600 mb-6">Select one option</p>

      <div className="space-y-4">
        {[
          { id: "vent", label: "Vent" },
          { id: "front-door", label: "Front Door" },
          { id: "back-door", label: "Back Door" },
          { id: "quarter-panel", label: "Quarter Panel" },
        ].map((location) => (
          <div
            key={location.id}
            className={`border rounded-lg p-6 cursor-pointer hover:border-blue-500 ${
              selectedDriverLocation === location.id
                ? "border-blue-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedDriverLocation(location.id)}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-20 mb-2">
                <Image
                  src={`/car-${location.id}.svg`}
                  alt={`Car ${location.label}`}
                  fill
                  className="object-contain"
                />
                {selectedDriverLocation === location.id && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-700">{location.label}</span>
            </div>
          </div>
        ))}
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
            <span className="text-sm font-medium text-gray-700 block">
              I have multiple windows with damage
            </span>
            <span className="text-xs text-gray-500">
              Select the primary window above and we'll contact you to get more
              details.
            </span>
          </div>
        </label>
      </div>
    </>
  );

  const PassengerSideLocationsStep = () => (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-center flex-1">
          Where is your damaged glass?
        </h1>
      </div>
      <p className="text-center text-gray-600 mb-6">Select one option</p>

      <div className="space-y-4">
        {[
          { id: "vent", label: "Vent" },
          { id: "front-door", label: "Front Door" },
          { id: "back-door", label: "Back Door" },
          { id: "quarter-panel", label: "Quarter Panel" },
        ].map((location) => (
          <div
            key={location.id}
            className={`border rounded-lg p-6 cursor-pointer hover:border-blue-500 ${
              selectedPassengerLocation === location.id
                ? "border-blue-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedPassengerLocation(location.id)}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-20 mb-2">
                <Image
                  src={`/car-${location.id}.svg`}
                  alt={`Car ${location.label}`}
                  fill
                  className="object-contain"
                />
                {selectedPassengerLocation === location.id && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-700">{location.label}</span>
            </div>
          </div>
        ))}
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
            <span className="text-sm font-medium text-gray-700 block">
              I have multiple windows with damage
            </span>
            <span className="text-xs text-gray-500">
              Select the primary window above and we'll contact you to get more
              details.
            </span>
          </div>
        </label>
      </div>
    </>
  );

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
          <h1 className="text-2xl font-bold text-center mb-2">
            Where is your damaged glass?
          </h1>
        <p className="text-center text-gray-600 mb-6">Select one option</p>

        {/* Options */}
        <div className="space-y-4">
          {/* Front Option */}
          <div
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 ${
                selectedOption === "Front"
                  ? "border-blue-500"
                  : "border-gray-200"
            }`}
            onClick={() => setSelectedOption("Front")}
          >
            <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="6"
                    width="16"
                    height="12"
                    rx="2"
                    stroke="#888888"
                    strokeWidth="1.5"
                  />
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
                selectedOption === "Back"
                  ? "border-blue-500"
                  : "border-gray-200"
            }`}
            onClick={() => setSelectedOption("Back")}
          >
            <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="6"
                    width="16"
                    height="12"
                    rx="2"
                    stroke="#888888"
                    strokeWidth="1.5"
                  />
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
                selectedOption === "Driver Side"
                  ? "border-blue-500"
                  : "border-gray-200"
            }`}
            onClick={() => setSelectedOption("Driver Side")}
          >
            <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                selectedOption === "Passenger Side"
                  ? "border-blue-500"
                  : "border-gray-200"
            }`}
            onClick={() => setSelectedOption("Passenger Side")}
          >
            <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                <span className="text-sm font-medium text-gray-700 block">
                  I have multiple windows with damage
                </span>
              <span className="text-xs text-gray-500">
                  Select the primary window above and we'll contact you to get
                  more details.
              </span>
            </div>
          </label>
        </div>
        </>
      )}
    </>
  );

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
        <h1 className="text-2xl font-bold text-center mb-6">
          Review Your Information
        </h1>

        {submitStatus === "success" && (
          <div className="mb-8 p-4 bg-green-100 text-green-700 rounded-lg">
            Thank you! Your estimate request has been submitted successfully.
            We'll send you a confirmation email shortly.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            There was an error submitting your request. Please try again.
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-3">Damage Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Location:</span>{" "}
                {getDamageLocation()}
              </p>
              {hasMultipleWindows && (
                <p className="text-blue-600">Multiple windows have damage</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-3">Vehicle Information</h2>
            <div className="space-y-2">
              {vehicleInfo.method === "license" ? (
                <>
                  <p>
                    <span className="font-medium">License Plate:</span>{" "}
                    {vehicleInfo.licensePlate}
                  </p>
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {vehicleInfo.registeredState}
                  </p>
                  {vehicleInfo.vin && (
                    <p>
                      <span className="font-medium">VIN:</span>{" "}
                      {vehicleInfo.vin}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p>
                    <span className="font-medium">Year:</span>{" "}
                    {vehicleInfo.year}
                  </p>
                  <p>
                    <span className="font-medium">Make:</span>{" "}
                    {vehicleInfo.make}
                  </p>
                  <p>
                    <span className="font-medium">Model:</span>{" "}
                    {vehicleInfo.model}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-3">Contact Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {userInfo.firstName}{" "}
                {userInfo.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {userInfo.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {userInfo.phone}
              </p>
              <p>
                <span className="font-medium">ZIP Code:</span>{" "}
                {userInfo.zipCode}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === "success"}
          className="w-full mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : submitStatus === "success" ? (
            "Submitted Successfully"
          ) : (
            "Submit Estimate Request"
          )}
        </button>
      </>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* Progress Steps */}
      <div className="flex justify-center items-center gap-8 mb-12 max-w-md w-full">
        <div className="flex flex-col items-center flex-1">
          <div
            className={`h-1 w-full ${
              currentStep >= 1 ? "bg-yellow-400" : "bg-gray-200"
            } mb-2`}
          ></div>
          <span
            className={`text-sm ${
              currentStep >= 1 ? "text-gray-800" : "text-gray-400"
            }`}
          >
            Damage
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className={`h-1 w-full ${
              currentStep >= 2 ? "bg-yellow-400" : "bg-gray-200"
            } mb-2`}
          ></div>
          <span
            className={`text-sm ${
              currentStep >= 2 ? "text-gray-800" : "text-gray-400"
            }`}
          >
            Vehicle
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className={`h-1 w-full ${
              currentStep >= 3 ? "bg-yellow-400" : "bg-gray-200"
            } mb-2`}
          ></div>
          <span
            className={`text-sm ${
              currentStep >= 3 ? "text-gray-800" : "text-gray-400"
            }`}
          >
            About You
          </span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className={`h-1 w-full ${
              currentStep >= 4 ? "bg-yellow-400" : "bg-gray-200"
            } mb-2`}
          ></div>
          <span
            className={`text-sm ${
              currentStep >= 4 ? "text-gray-800" : "text-gray-400"
            }`}
          >
            Summary
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full">
        {currentStep === 1 && <DamageStep />}
        {currentStep === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Tell us about your vehicle
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Select one option to provide your vehicle details. We recommend
              license plate or VIN to ensure an accurate quote.
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
                  onClick={() =>
                    setVehicleInfo({ ...vehicleInfo, method: "license" })
                  }
                >
                  VIN Check
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center ${
                    vehicleInfo.method === "manual"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setVehicleInfo({ ...vehicleInfo, method: "manual" })
                  }
                >
                  Year, Make, Model
                </button>
              </div>

              {vehicleInfo.method === "license" ? (
                <>
                  {/* VIN Input */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        VIN
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          value={vehicleInfo.vin}
                          onChange={handleVinChange}
                          placeholder="Enter VIN"
                          maxLength={17}
                        />
                        {isLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                          </div>
                        )}
                      </div>
                      {vinError && (
                        <p className="text-red-500 text-sm mt-1">{vinError}</p>
                      )}
                      {vehicleInfo.year && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-2">Vehicle Information</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><span className="font-medium">Year:</span> {vehicleInfo.year}</p>
                            <p><span className="font-medium">Make:</span> {vehicleInfo.make}</p>
                            <p><span className="font-medium">Model:</span> {vehicleInfo.model}</p>
                            <p><span className="font-medium">Body Style:</span> {vehicleInfo.bodyStyle}</p>
                            <p><span className="font-medium">Engine Type:</span> {vehicleInfo.engineType}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {/* Year Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

                  {/* Make Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

                  {/* Model Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              )}
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Tell us about you
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Please provide your contact information for your quote
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={userInfo.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={userInfo.lastName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastName: e.target.value })
                    }
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={userInfo.zipCode}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, zipCode: e.target.value })
                  }
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
          </>
        )}
        {currentStep === 4 && <SummaryStep />}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {((currentStep > 1 && currentStep < 4) ||
            showDamageSeverity ||
            showDriverSideLocations ||
            showPassengerSideLocations) && (
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 font-medium py-2 px-8 rounded-full transition-colors"
            >
              Back
            </button>
          )}
          {currentStep < 4 && (
            <div
              className={`${
                currentStep > 1 ||
                showDamageSeverity ||
                showDriverSideLocations ||
                showPassengerSideLocations
                  ? "ml-auto"
                  : ""
              }`}
            >
              <button
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedOption}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
            Next
          </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineEstimate;
