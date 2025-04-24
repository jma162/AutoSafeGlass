'use client'
import { useState } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'

interface VehicleDetails {
  Make: string
  Model: string
  ModelYear: string
  Series: string
  VehicleType: string
  BodyClass: string
  DriveType: string
  FuelTypePrimary: string
  Manufacturer: string
  TransmissionStyle: string
  [key: string]: string
}

const VinSearch = () => {
  const [vin, setVin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(null)

  const handleSearch = async () => {
    if (!vin || vin.length !== 17) {
      setError('Please enter a valid 17-character VIN number')
      return
    }

    setIsLoading(true)
    setError('')
    setVehicleDetails(null)

    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
      const data = await response.json()

      if (data.Results) {
        const details: VehicleDetails = data.Results.reduce((acc: any, item: any) => {
          if (item.Value && item.Value !== '0' && item.Value !== 'Not Applicable') {
            acc[item.Variable] = item.Value
          }
          return acc
        }, {})

        setVehicleDetails(details)
      } else {
        setError('No vehicle details found for this VIN')
      }
    } catch (err) {
      setError('Failed to fetch vehicle details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-[montserratSemibold] text-gray-900 mb-4">
            Vehicle Identification Number (VIN) Search
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your 17-character VIN number to get detailed information about your vehicle
          </p>
        </div>

        {/* Search Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
                VIN Number
              </label>
              <input
                type="text"
                id="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                placeholder="Enter 17-character VIN"
                maxLength={17}
              />
            </div>
            <div className="sm:self-end">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {vehicleDetails && (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(vehicleDetails).map(([key, value]) => (
                <div key={key} className="border-b border-gray-100 pb-4">
                  <dt className="text-sm font-medium text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                  <dd className="mt-1 text-lg text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 text-center text-gray-600">
          <p>Can't find your VIN? The VIN is typically located on:</p>
          <ul className="mt-2 space-y-1">
            <li>Driver's side dashboard near the windshield</li>
            <li>Driver's side door jamb</li>
            <li>Vehicle registration and insurance documents</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VinSearch