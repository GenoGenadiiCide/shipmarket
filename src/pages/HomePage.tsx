import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AddressAutocomplete } from '../components/AddressAutocomplete';
import { ArrowRight, Package, Users, CheckCircle2, Truck, Shield, CreditCard, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [error, setError] = useState('');

  const isAuthenticated = false; // Mock: change to true to test logged in state

  const handleGetQuotes = (e: React.FormEvent) => {
    e.preventDefault();
    // If authenticated, go to create job page
    // If not authenticated, go to registration
    if (isAuthenticated) {
      navigate('/create-job');
    } else {
      navigate('/auth/register');
    }
  };

  const mockListings = [
    { id: 1, title: 'Large wooden dining table', from: 'New York, NY', to: 'Los Angeles, CA', offers: 5 },
    { id: 2, title: 'Motorcycle - Harley Davidson', from: 'Chicago, IL', to: 'Miami, FL', offers: 8 },
    { id: 3, title: 'Piano transport needed', from: 'Boston, MA', to: 'Seattle, WA', offers: 3 },
  ];

  const [pickupAddressData, setPickupAddressData] = useState<any>(null);
  const [deliveryAddressData, setDeliveryAddressData] = useState<any>(null);

  const isFormValid = pickupLocation && deliveryLocation && category;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={false} />

      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Trust Badge */}
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                Trusted by 10,000+ users
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
              Delivery firms compete for your job
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-gray-600">
              Get quotes from verified carriers. Compare prices. Choose the best offer.
            </p>

            {/* Quote Form */}
            <form onSubmit={handleGetQuotes} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 shadow-sm">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">What do you need to move?</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="FURNITURE">Furniture</option>
                  <option value="CAR">Car</option>
                  <option value="MOTORCYCLE">Motorcycle</option>
                  <option value="VEHICLE">Vehicle</option>
                  <option value="MOVE">Move</option>
                  <option value="FREIGHT">Freight</option>
                  <option value="BOAT">Boat</option>
                  <option value="PARTS">Parts</option>
                  <option value="PIANO">Piano</option>
                  <option value="PETS">Pets</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <AddressAutocomplete
                label="Collection Location"
                placeholder="City, State or Full Address"
                required
                onChange={(val, data) => {
                  setPickupLocation(val);
                  setPickupAddressData(data);
                  setError('');
                }}
              />

              <AddressAutocomplete
                label="Delivery Location"
                placeholder="City, State or Full Address"
                required
                onChange={(val, data) => {
                  setDeliveryLocation(val);
                  setDeliveryAddressData(data);
                  setError('');
                }}
              />

              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                Get Quotes
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Secondary CTA */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-2">Are you a carrier?</p>
              <Link
                to="/auth/register"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Become a Carrier
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Open Delivery Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Open delivery jobs</h2>
              <p className="text-sm md:text-base text-gray-600 mt-1">Fresh delivery jobs available now</p>
            </div>
            <Link
              to="/provider/jobs"
              className="px-4 py-2 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              View all jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map(listing => (
              <Link
                key={listing.id}
                to={`/listings/${listing.id}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{listing.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {listing.from} → {listing.to}
                </p>
                <p className="text-xs text-gray-500">{listing.offers} offer{listing.offers !== 1 ? 's' : ''}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">How it works</h2>
            <p className="text-base md:text-lg text-gray-600">Simple, fast, and secure shipping marketplace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Post Your Listing</h3>
              <p className="text-sm md:text-base text-gray-600">
                Describe what you need to ship, origin, and destination.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Receive Offers</h3>
              <p className="text-sm md:text-base text-gray-600">
                Verified carriers submit competitive offers with prices and delivery timelines.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Choose & Book</h3>
              <p className="text-sm md:text-base text-gray-600">
                Compare offers, check ratings, and select the best carrier for your needs.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Truck className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Track & Deliver</h3>
              <p className="text-sm md:text-base text-gray-600">
                Communicate with your carrier, track progress, and receive your shipment safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Trust & Safety</h2>
            <p className="text-base md:text-lg text-gray-600">Your security and peace of mind are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Carriers</h3>
              <p className="text-sm md:text-base text-gray-600">
                All carriers undergo identity verification and background checks.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-sm md:text-base text-gray-600">
                Payments are processed securely through Stripe and held until delivery.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Star className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating System</h3>
              <p className="text-sm md:text-base text-gray-600">
                Both shippers and carriers can rate each other after completed deliveries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How much does it cost to post a listing?</h3>
              <p className="text-sm text-gray-600">
                Posting a listing is completely free. We only charge a small platform fee (10%) when you accept a bid and complete a booking.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I verify my carrier account?</h3>
              <p className="text-sm text-gray-600">
                After registration, our admin team will review your profile and documents. Once verified, you'll receive a verified badge on your profile.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What happens if my shipment is damaged?</h3>
              <p className="text-sm text-gray-600">
                If there's an issue with delivery, you can dispute the booking. Our support team will review the case and help resolve the matter fairly.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I get paid as a carrier?</h3>
              <p className="text-sm text-gray-600">
                Once the shipper marks the delivery as complete, payment is released to your account. Payments are processed securely through Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}