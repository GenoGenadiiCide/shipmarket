import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Package, Users, CheckCircle2, Truck } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={false} />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Simple, fast, and secure shipping marketplace
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <Package className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Post Your Listing</h3>
            <p className="text-sm md:text-base text-gray-600">
              Describe what you need to ship, origin, and destination.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <Users className="h-12 w-12 text-gray-600 mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Receive Offers</h3>
            <p className="text-sm md:text-base text-gray-600">
              Verified carriers submit competitive offers with prices and delivery timelines.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Choose & Book</h3>
            <p className="text-sm md:text-base text-gray-600">
              Compare offers, check ratings, and select the best carrier for your needs.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Track & Deliver</h3>
            <p className="text-sm md:text-base text-gray-600">
              Communicate with your carrier, track progress, and receive your shipment safely.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
