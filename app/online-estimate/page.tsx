"use client";

import { useState, useEffect, useCallback, useRef } from "react"; 
import { Check, Loader2, Car, User, FileText, AlertCircle, Info, Send, Phone, ChevronLeft, ChevronRight, Upload, X, Camera, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { Shield} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Back");
  const [showDamageSeverity, setShowDamageSeverity] = useState(false);
  const [showDriverSideLocations, setShowDriverSideLocations] = useState(false);
  const [showPassengerSideLocations, setShowPassengerSideLocations] =
    useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedDriverLocation, setSelectedDriverLocation] = useState("");
  const [selectedPassengerLocation, setSelectedPassengerLocation] =
    useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    method: "manual", // or "vin"
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
  const [willClaimInsurance, setWillClaimInsurance] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Add these functions near the top of the component
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Modify the handleChange function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setUserInfo(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else if (name === 'email') {
      // Convert email to lowercase
      const formattedEmail = value.toLowerCase().trim();
      setUserInfo(prev => ({
        ...prev,
        [name]: formattedEmail
      }));
    } else {
      setUserInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, []);

  const validateVehicleInfo = () => {
    if (vehicleInfo.method === "license") {
      return vehicleInfo.vin.trim() !== "";
    } else {
      return vehicleInfo.year.trim() !== "" && 
             vehicleInfo.make.trim() !== "" && 
             vehicleInfo.model.trim() !== "";
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep(1)) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep(2) && validateVehicleInfo()) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (validateContactInfo()) {
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateContactInfo()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      
      formData.append('damage', JSON.stringify({
        location: selectedOption
      }));
      
      formData.append('vehicle', JSON.stringify(vehicleInfo));
      formData.append('userInfo', JSON.stringify(userInfo));
      formData.append('willClaimInsurance', willClaimInsurance);
      
      photos.forEach((photo, index) => {
        formData.append(`photo${index}`, photo);
      });

      const response = await fetch("/api/submit-estimate", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus("success");
        toast.custom((t) => (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] mt-[60px]">
            <div className="absolute inset-0 bg-black/20" />
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } relative z-[10000] max-w-md w-full bg-white shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-4 my-4`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Request Submitted Successfully!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      We will contact you soon.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ), {
          duration: 4000,
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setSubmitStatus("error");
        toast.custom((t) => (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] mt-[60px]">
            <div className="absolute inset-0 bg-black/20" />
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } relative z-[10000] max-w-md w-full bg-white shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-4 my-4`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Submission Error
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ), {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
      toast.custom((t) => (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] mt-[60px]">
          <div className="absolute inset-0 bg-black/20" />
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } relative z-[10000] max-w-md w-full bg-white shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-4 my-4`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Submission Error
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {error instanceof Error ? error.message : 'Please try again or contact us directly.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ), {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchYears = async () => {
    try {
      const response = await fetch('/api/car-data?type=years');
      const data = await response.json();
      console.log("🚀 ~ fetchYears ~ data:", data)
      setYears(data.map((item: any) => item.Model_Year).sort((a: string, b: string) => parseInt(b) - parseInt(a)));
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const fetchMakes = async (year: string) => {
    try {
      setMakes(['Loading...']);
      
      const response = await fetch(`/api/car-data?type=makes&year=${year}`, {
        next: { revalidate: 86400 } // Cache for 24 hours
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching makes:', data.error);
        setMakes([]);
        return;
      }
      setMakes(data);
    } catch (error) {
      console.error('Error fetching makes:', error);
      setMakes([]);
    }
  };

  const fetchModels = async (make: string, year: string) => {
    if (!make || !year) {
      setModels([]);
      return;
    }
    try {
      setModels(['Loading...']);
      
      const response = await fetch(`/api/car-data?type=models&make=${make}&year=${year}`, {
        next: { revalidate: 3600 }
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching models:', data.error);
        setModels([]);
        return;
      }
      // Filter out null/undefined values and ensure unique values
      const validModels = data
        .filter((item: any) => item && item.model_name)
        .map((item: any) => item.model_name)
        .filter((model: string) => model !== null && model !== undefined)
        .filter((model: string, index: number, self: string[]) => self.indexOf(model) === index)
        .sort();
      setModels(validModels);
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);
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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStream(stream);
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Failed to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg');
    });

    const formData = new FormData();
    formData.append('image', imageBlob);

    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.vin) {
        setVehicleInfo(prev => ({ ...prev, vin: data.vin }));
        stopCamera();
      } else {
        alert('No VIN detected. Please try again or enter manually.');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again or enter manually.');
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  // useEffect(() => {
  //   setPreviews(photos.map(photo => URL.createObjectURL(photo)));
  // }, [photos]);

  const handlePhotosChange = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const newPhotos = [...photos, ...newFiles];
    setPhotos(newPhotos);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };


  const DamageStep = () => (
    <div className="space-y-6 px-4 sm:px-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Where is your damaged glass? <span className="text-red-500">*</span></h2>
      <p className="text-gray-600 mb-4">Select the location of the damage on your vehicle</p>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Left side - Image */}
        <div className="relative h-[400px] w-full">
          <Image
            src="/CARWINDER.png"
            alt="Car damage location reference"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right side - Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="damage-location" className="block text-sm font-medium text-gray-700">
              Select the location of damage on your vehicle <span className="text-red-500">*</span>
            </label>
            <select
              id="damage-location"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#236b5e] focus:border-transparent transition-colors ${
                !selectedOption && currentStep === 1 ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Please select</option>
              <option value="Windshield">Windshield</option>
              <option value="Driver side front door">Driver side front door</option>
              <option value="Driver side rear door">Driver side rear door</option>
              <option value="Driver side vent">Driver side vent</option>
              <option value="Driver side quarter">Driver side quarter</option>
              <option value="Driver side mirror">Driver side mirror</option>
              <option value="Passenger side front door">Passenger side front door</option>
              <option value="Passenger side rear door">Passenger side rear door</option>
              <option value="Passenger side vent">Passenger side vent</option>
              <option value="Passenger side quarter">Passenger side quarter</option>
              <option value="Passenger side mirror">Passenger side mirror</option>
              <option value="Back window">Back window</option>
              <option value="Rock chip repair">Rock chip repair</option>
            </select>
            {!selectedOption && currentStep === 1 && (
              <p className="mt-1 text-sm text-red-500">Please select the damage location</p>
            )}
          </div>

          {/* Insurance Claim Question */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Will you be making an insurance claim? <span className="text-red-500">*</span>
            </label>
            <select
              value={willClaimInsurance}
              onChange={(e) => setWillClaimInsurance(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#236b5e] focus:border-transparent transition-colors outline-none"
              required
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
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
    </>
  );

  const PhotoUploadStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Photos of Damage</h2>
      
      <div className="bg-[#f0f7f5] p-6 rounded-lg border border-[#e0ede9] mb-6">
        <h3 className="text-lg font-medium text-[#2c7a6d] mb-3">Why Photos Are Important</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2c7a6d] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span>Help us provide a more accurate estimate for your repair</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2c7a6d] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span>Allow our technicians to better prepare for your service</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2c7a6d] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span>Speed up the repair process by helping us identify needed parts in advance</span>
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
        <h3 className="text-lg font-medium text-blue-700 mb-3">Photo Tips</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
            <span>Take photos in good lighting conditions</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
            <span>Include both close-up shots of the damage and wider shots showing its location</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
            <span>Ensure the damage is clearly visible and in focus</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
            <span>Try to capture any cracks or chips from multiple angles</span>
          </li>
        </ul>
      </div>

      {/* Photo Grid */}
      {previews.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview: string, index: number) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={preview}
                  alt={`Damage preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="relative aspect-square">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="add-more-photos"
                onChange={(e) => handlePhotosChange(e.target.files)}
              />
              <label
                htmlFor="add-more-photos"
                className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2c7a6d] transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add More</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Initial Upload Area */}
      {previews.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="photo-upload"
            onChange={(e) => handlePhotosChange(e.target.files)}
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Camera className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2 font-medium">Click to upload photos</p>
            <p className="text-sm text-gray-500">or drag and drop</p>
          </label>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
       Maximum file size: 10MB per image.
      </p>
    </div>
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
            {vehicleInfo.vin && vehicleInfo.vin.trim() !== "" && (
              <p className="text-gray-600 mt-2">
                Your VIN: <span className="font-medium">{vehicleInfo.vin}</span>
              </p>
            )}
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
              <h2 className="font-semibold text-base md:text-lg text-gray-900">Damage Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Location:</span>
                <span className="text-gray-900">{getDamageLocation()}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-5 h-5 text-[#2c7a6d]" />
              <h2 className="font-semibold text-base md:text-lg text-gray-900">Vehicle Information</h2>
            </div>
            <div className="space-y-3">
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
              {vehicleInfo.vin && vehicleInfo.vin.trim() !== "" && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">VIN:</span>
                  <span className="text-gray-900">{vehicleInfo.vin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-base md:text-lg text-gray-900">Contact Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-900">{userInfo.firstName} {userInfo.lastName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="text-gray-900">{userInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-base md:text-lg text-gray-900">Insurance Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Insurance Claim:</span>
                <span className="text-gray-900">
                  {willClaimInsurance === 'yes' ? 'Yes' : willClaimInsurance === 'no' ? 'No' : 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* Uploaded Photos */}
          {previews.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-5 h-5 text-[#2c7a6d]" />
                <h2 className="font-semibold text-base md:text-lg text-gray-900">Uploaded Photos</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === "success"}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium text-base md:text-lg"
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
      </>
    );
  };

  const validateContactInfo = () => {
    const errors = {
      firstName: !userInfo.firstName.trim(),
      lastName: !userInfo.lastName.trim(),
      phone: !userInfo.phone.trim() || !/^\d{3}-\d{3}-\d{4}$/.test(userInfo.phone),
      email: !userInfo.email.trim() || !validateEmail(userInfo.email),
      zipCode: !userInfo.zipCode.trim() || !/^\d{5}(-\d{4})?$/.test(userInfo.zipCode)
    };

    return !Object.values(errors).some(error => error);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return true; // First step is always accessible
      case 2:
        // Check if damage location and insurance info are selected
        if (selectedOption === "" || willClaimInsurance === "") return false;
        // Check if vehicle info is complete
        return vehicleInfo.method === "license" 
          ? (vehicleInfo.vin !== "")
          : (vehicleInfo.year !== "" && vehicleInfo.make !== "" && vehicleInfo.model !== "");
      case 3:
        // Check if contact info is complete
        if (!validateStep(2)) return false;
        return validateContactInfo();
      case 4:
        // Check if photos are added (optional)
        if (!validateStep(3)) return false;
        return true;
      case 5:
        // Check if vehicle info is complete
        if (!validateStep(4)) return false;
        return true;
      default:
        return false;
    }
  };

  const canNavigateToStep = (targetStep: number) => {
    // Can always go back to previous steps
    if (targetStep < currentStep) return true;
    
    // For forward navigation, check all previous steps
    for (let step = 1; step <= targetStep; step++) {
      if (!validateStep(step)) {
        return false;
      }
    }
    return true;
  };

  const handleStepClick = (step: number) => {
    if (canNavigateToStep(step)) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7f5]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Get Your Free Auto Glass Estimate
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md">
              Complete the form below to receive a free estimate for your auto glass repair or replacement. 
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 mt-4 sm:mt-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-[#2c7a6d] transition-all duration-500"
                style={{ width: `${(currentStep - 1) * 25}%` }}
              />
            </div>
            
            <div className="relative flex justify-between">
              {[
                { step: 1, icon: Car, title: "Damage" },
                { step: 2, icon: Car, title: "Vehicle" },
                { step: 3, icon: User, title: "Contact" },
                { step: 4, icon: Upload, title: "Photos" },
                { step: 5, icon: FileText, title: "Review" }
              ].map((item) => {
                const isClickable = canNavigateToStep(item.step);
                return (
                  <button 
                    key={item.step}
                    onClick={() => handleStepClick(item.step)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center ${
                      isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 sm:mb-2 transition-all duration-300 ${
                      currentStep >= item.step 
                        ? 'bg-[#2c7a6d] text-white shadow-lg scale-110' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <item.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                      currentStep >= item.step 
                        ? 'text-[#2c7a6d]' 
                        : 'text-gray-500'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {currentStep === 1 && <DamageStep />}
          {currentStep === 2 && (
            <>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Vehicle Information</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Select one option to provide your vehicle details. We recommend
                entering your VIN # to ensure an accurate quote.
              </p>
          
              <div className="space-y-4 sm:space-y-6">
                {/* Method Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button
                    className={`p-3 sm:p-4 rounded-lg text-center transition-colors ${
                      vehicleInfo.method === "license"
                        ? "bg-[#f0f7f5] text-[#2c7a6d] border-2 border-[#2c7a6d]"
                        : "bg-[#f0f7f5] text-gray-700 hover:bg-[#e0ede9] border border-[#e0ede9]"
                    }`}
                    onClick={() =>
                      setVehicleInfo({ ...vehicleInfo, method: "license" })
                    }
                  >
                    <Car className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
                    <span className="block text-sm sm:text-base font-medium">VIN Check</span>
                  </button>
                  <button
                    className={`p-3 sm:p-4 rounded-lg text-center transition-colors ${
                      vehicleInfo.method === "manual"
                        ? "bg-[#f0f7f5] text-[#2c7a6d] border-2 border-[#2c7a6d]"
                        : "bg-[#f0f7f5] text-gray-700 hover:bg-[#e0ede9] border border-[#e0ede9]"
                    }`}
                    onClick={() =>
                      setVehicleInfo({ ...vehicleInfo, method: "manual" })
                    }
                  >
                    <Car className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
                    <span className="block text-sm sm:text-base font-medium">Year, Make, Model</span>
                  </button>
                </div>
          
                {vehicleInfo.method === "license" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        VIN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="vin"
                        value={vehicleInfo.vin}
                        onChange={handleVinChange}
                        placeholder="Enter VIN"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                      />
                      <div className="mt-3 p-4 bg-[#f0f7f5] rounded-lg border border-[#e0ede9]">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-[#2c7a6d] flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-semibold text-[#2c7a6d] mb-2">Where to find your VIN:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2c7a6d] mt-1.5"></div>
                                <span>Driver's side dashboard near windshield</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2c7a6d] mt-1.5"></div>
                                <span>Driver's side door jamb</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2c7a6d] mt-1.5"></div>
                                <span>Vehicle registration card</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2c7a6d] mt-1.5"></div>
                                <span>Insurance card</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2c7a6d] mt-1.5"></div>
                                <span>Vehicle title</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year <span className="text-red-500">*</span>
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
                          Make <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                          value={vehicleInfo.make}
                          onChange={(e) => {
                            setVehicleInfo(prev => ({ ...prev, make: e.target.value }));
                            fetchModels(e.target.value, vehicleInfo.year);
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
                          Model <span className="text-red-500">*</span>
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
                          {models && models.length > 0 && models.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* VIN Input */}
                    <div className="mt-4">
                      <div className="mb-2">
                        <div className="flex items-center gap-2 bg-[#f0f7f5] p-3 rounded-lg border border-[#e0ede9]">
                          <Info className="w-5 h-5 text-[#2c7a6d] flex-shrink-0" />
                          <p className="text-sm text-[#2c7a6d] font-medium">
                            Please provide VIN for an accurate quote
                          </p>
                        </div>
                      </div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        VIN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="vin"
                        value={vehicleInfo.vin}
                        onChange={handleVinChange}
                        placeholder="Enter VIN"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7a6d] focus:border-transparent transition-colors"
                      />
                      {vinError && (
                        <p className="text-red-500 text-sm mt-1">{vinError}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {currentStep === 3 && (
              <>
                <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-6">Your Contact Information <span className="text-red-500">*</span></h2>
                <p className="text-sm md:text-base text-gray-600 mb-8">Please provide your contact details so we can reach you about your estimate.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 shadow-sm rounded-md focus:ring-[#236b5e] focus:border-[#236b5e] outline-none"
                      required
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 shadow-sm rounded-md focus:ring-[#236b5e] focus:border-[#236b5e] outline-none"
                      required
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChange}
                        placeholder="XXX-XXX-XXXX"
                        maxLength={12}
                        className="w-full pl-10 pr-4 py-2 shadow-sm rounded-md focus:ring-[#236b5e] focus:border-[#236b5e] outline-none"
                        required
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="w-full pl-10 pr-4 py-2 shadow-sm rounded-md focus:ring-[#236b5e] focus:border-[#236b5e] outline-none"
                        required
                      />
                    </div>
                  </div>
                  {/* ZIP Code */}
                  <div>
                    <label htmlFor="zipCode" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={userInfo.zipCode}
                        onChange={handleChange}
                        placeholder="XXXXX"
                        maxLength={5}
                        className="w-full pl-10 pr-4 py-2 shadow-sm rounded-md focus:ring-[#236b5e] focus:border-[#236b5e] outline-none"
                        required
                      />
                    </div>
                  </div>
                  {/* Note Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="note" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Note (Optional)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      value={userInfo.note}
                      onChange={handleChange}
                      className="w-full px-4 py-2 shadow-sm rounded-md focus:ring-[#236b5e] focus:border-[#236b5e] outline-none"
                      placeholder="Any additional details? (e.g., preferred contact time)"
                    />
                  </div>
                </div>
              </>
          ) }
          {currentStep === 4 && <PhotoUploadStep />}
          {currentStep === 5 && <SummaryStep />}

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-row-reverse justify-center gap-4">
            {currentStep < 5 && (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!selectedOption || !willClaimInsurance)) ||
                  (currentStep === 2 && !validateVehicleInfo()) ||
                  (currentStep === 3 && !validateContactInfo())
                }
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md min-w-[140px]"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            {currentStep > 1 && currentStep < 5 && (
              <button
                onClick={handleBack}
                className="border-2 border-gray-300 text-gray-600 font-medium py-3 px-8 rounded-lg flex items-center justify-center gap-2 text-base transition-all duration-200 hover:bg-gray-50 min-w-[140px]"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-2xl mx-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <button
                onClick={captureImage}
                className="bg-white p-4 rounded-full shadow-lg"
              >
                <Camera className="w-6 h-6" />
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500 text-white p-4 rounded-full shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineEstimate;