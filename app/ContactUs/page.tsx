'use client'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We come to you! We provide free mobile service to the Philadelphia, South Jersey, Trenton-NJ, Wilmington-DE, and their surrounding areas.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            We are open from Monday to Saturday, 8 A.M. to 6 P.M., Sunday by appointment only.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Call today!</h3>
                    <p className="text-xl font-semibold text-green-600">215-904-5778</p>
                    <p className="text-gray-600">Auto Safe Glass Co.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@autosafeglass.com</p>
                    <p className="text-gray-600">www.autosafeglass.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">1200 Route 70 E. #707</p>
                    <p className="text-gray-600">Cherry Hill, NJ 08034</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Hours</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ken's Auto Inc.</h3>
              <p className="text-gray-600 mb-2">(Auto Repair & Auto Glass)</p>
              <p className="text-gray-600">341 N. 10th St.</p>
              <p className="text-gray-600">Philadelphia, PA 19107</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lei's Auto Service Center Inc.</h3>
              <p className="text-gray-600 mb-2">(Auto Repair, Body & Auto Glass)</p>
              <p className="text-gray-600">24 S. 42nd St.</p>
              <p className="text-gray-600">Philadelphia, PA 19104</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">S & D Auto</h3>
              <p className="text-gray-600 mb-2">(Auto Repair & Auto Glass)</p>
              <p className="text-gray-600">361 E. Chew Ave.</p>
              <p className="text-gray-600">Philadelphia, PA 19120</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dai Auto Repair</h3>
              <p className="text-gray-600 mb-2">(Auto Repair & Auto Glass)</p>
              <p className="text-gray-600">4331 Rt. 130 S.</p>
              <p className="text-gray-600">Edgewater Park, NJ 08010</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tim's Auto Care</h3>
              <p className="text-gray-600 mb-2">(Auto Repair & Auto Glass)</p>
              <p className="text-gray-600">651 Levitt Parkway.</p>
              <p className="text-gray-600">Willingboro, NJ 08046</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Service</h2>
          <p className="text-xl text-gray-600 mb-6">Please Call</p>
          <a 
            href="tel:215-904-5778" 
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
          >
            215-904-5778
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactUs