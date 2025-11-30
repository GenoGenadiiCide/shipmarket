import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { CheckCircle2, DollarSign, User, ShieldCheck, AlertCircle, MapPin, X } from 'lucide-react';

export default function ListingDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showCreatedMessage = searchParams.get('created') === 'true';
  const [showMessage, setShowMessage] = useState(showCreatedMessage);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const isOwner = true; // Mock
  const isCarrier = false; // Mock

  const mockListing = {
    id: 1,
    title: 'Large wooden dining table',
    description: 'Large wooden dining table, approximately 6 feet long and 3 feet wide. Needs careful handling.',
    category: 'FURNITURE',
    status: 'PUBLISHED',
    pickupAddress: '123 Main Street, New York, NY 10001',
    deliveryAddress: '456 Oak Avenue, Los Angeles, CA 90001',
    pickupDate: '2024-12-01',
    deliveryDate: '2024-12-10',
    flexiblePickup: false,
    flexibleDelivery: false,
    distance: 2789.5,
    ownerName: 'John Doe',
    offers: 5,
  };

  const mockOffers = [
    {
      id: 1,
      amount: 850.00,
      carrierName: 'ABC Transport',
      verified: true,
      rating: 4.8,
      reviews: 127,
      message: 'I can deliver this safely within your timeframe. I have experience with furniture.',
      createdAt: '2024-11-20T10:00:00Z',
      isSelected: false,
      isBestPrice: true,
      isYourOffer: false,
    },
    {
      id: 2,
      amount: 920.00,
      carrierName: 'Fast Freight LLC',
      verified: true,
      rating: 4.6,
      reviews: 89,
      message: 'Professional service with insurance coverage included.',
      createdAt: '2024-11-20T09:30:00Z',
      isSelected: false,
      isBestPrice: false,
      isYourOffer: false,
    },
    {
      id: 3,
      amount: 890.00,
      carrierName: 'Quick Delivery Co',
      verified: false,
      rating: 4.2,
      reviews: 45,
      message: '',
      createdAt: '2024-11-19T15:20:00Z',
      isSelected: false,
      isBestPrice: false,
      isYourOffer: false,
    },
  ];

  const statusColors: any = {
    DRAFT: 'bg-gray-100 text-gray-800',
    PUBLISHED: 'bg-blue-50 text-blue-700',
    EXPIRED: 'bg-gray-100 text-gray-600 border border-gray-300',
    AWARDED: 'bg-green-50 text-green-700',
    IN_PROGRESS: 'bg-yellow-50 text-yellow-700',
    COMPLETED: 'bg-gray-100 text-gray-700',
    CANCELLED: 'bg-red-50 text-red-700',
  };

  const formatTimeAgo = (dateStr: string) => {
    const minutes = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleSelectCarrier = (offer: any) => {
    setSelectedOffer(offer);
    setShowConfirmModal(true);
  };

  const confirmSelection = () => {
    setShowConfirmModal(false);
    alert('Carrier selected successfully!');
  };

  const bestOffer = mockOffers.reduce((min, offer) => offer.amount < min.amount ? offer : min, mockOffers[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userRole="SHIPPER" />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/provider/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            ← Back to marketplace
          </Link>
          {isOwner && (
            <Link to="/dashboard/shipper/listings" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Manage my listings →
            </Link>
          )}
        </div>

        {/* Success Message */}
        {showMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 relative">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-800 mb-1">Your delivery request is now live!</h3>
                <p className="text-green-700">
                  Carriers will now be able to see your request and submit quotes. You'll receive notifications when you get new bids.
                </p>
              </div>
              <button onClick={() => setShowMessage(false)} className="text-green-400 hover:text-green-600 text-2xl">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listing Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
              {/* Title and Status */}
              <div className="flex items-start gap-3 mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 flex-1">
                  {mockListing.title}
                </h1>
                <span className={`px-3 py-1 text-xs font-medium rounded-md ${statusColors[mockListing.status]}`}>
                  {mockListing.status}
                </span>
              </div>

              {/* Description */}
              {mockListing.description && (
                <div className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-base md:text-lg text-gray-600">{mockListing.description}</p>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 text-lg font-semibold">{mockListing.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Offers:</span>
                  <span className="ml-2 text-lg font-semibold">{mockListing.offers} offer(s)</span>
                </div>
              </div>

              {/* Route */}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Route</h2>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Origin address:</span>
                    <p className="text-base font-medium">{mockListing.pickupAddress}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Destination:</span>
                    <p className="text-base font-medium">{mockListing.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Timeline</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Pickup:</span>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">{mockListing.pickupDate || 'TBD'}</p>
                      {mockListing.flexiblePickup && (
                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs rounded">Flexible</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Delivery:</span>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">{mockListing.deliveryDate || 'TBD'}</p>
                      {mockListing.flexibleDelivery && (
                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs rounded">Flexible</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Route overview</h2>
                <div className="bg-gray-200 h-72 rounded-lg flex items-center justify-center text-gray-500 mb-2">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Map: {mockListing.pickupAddress} → {mockListing.deliveryAddress}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Route: {mockListing.distance} mi</p>
              </div>

              {/* Posted By */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-600">Posted by</p>
                <p className="text-lg font-semibold text-gray-900">{mockListing.ownerName}</p>
              </div>
            </div>
          </div>

          {/* Offers Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Carrier Offers</h2>
              <p className="text-sm text-gray-600 mb-4">
                Carriers submit their price offers. The shipper will choose the most suitable carrier.
              </p>

              {/* Auction Status */}
              <div className="mb-4">
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
                  Accepting offers
                </span>
              </div>

              {/* Current Best Offer */}
              {bestOffer && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Current best offer</p>
                      <p className="text-4xl font-bold text-gray-900 my-2">${bestOffer.amount.toFixed(2)} USD</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-600">Submitted by {bestOffer.carrierName}</p>
                        {bestOffer.verified && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Offer Form */}
              {isCarrier && !showOfferForm && (
                <button
                  onClick={() => setShowOfferForm(true)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium mb-4"
                >
                  Submit an offer
                </button>
              )}

              {showOfferForm && isCarrier && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Your amount (USD)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      placeholder={`Current: $${bestOffer.amount.toFixed(2)}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-600 mt-1">Must be lower than ${bestOffer.amount.toFixed(2)}.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Optional message</label>
                    <textarea
                      rows={3}
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      placeholder="Add delivery details, timing, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                      Submit offer
                    </button>
                    <button
                      onClick={() => setShowOfferForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>

                  <p className="text-xs text-gray-600">
                    To stay competitive, your offer should be lower than the current best offer.
                  </p>
                </div>
              )}

              {/* All Offers */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">All offers ({mockOffers.length})</h3>
                <div className="space-y-4">
                  {mockOffers.map(offer => (
                    <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-2xl font-semibold text-gray-900">${offer.amount.toFixed(2)} USD</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {offer.isBestPrice && (
                              <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded">
                                Best price
                              </span>
                            )}
                            {offer.isYourOffer && (
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                Your offer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{offer.carrierName}</span>
                        {offer.verified && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>

                      {offer.rating && (
                        <p className="text-sm text-gray-600 mb-2">
                          ⭐ {offer.rating} ({offer.reviews})
                        </p>
                      )}

                      <p className="text-xs text-gray-500 mb-3">{formatTimeAgo(offer.createdAt)}</p>

                      {offer.message && (
                        <div className="bg-gray-50 border-l-4 border-gray-300 p-3 mb-3 text-sm text-gray-700 italic">
                          "{offer.message}"
                        </div>
                      )}

                      {isOwner && (
                        <button
                          onClick={() => handleSelectCarrier(offer)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Select carrier
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Info */}
              {isOwner && (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
                  Review offers above and select the carrier you prefer. A 10% platform fee (test mode) is charged when you confirm your selection.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm carrier selection</h3>
            <p className="text-gray-600 mb-4">You're choosing {selectedOffer.carrierName} for this job.</p>
            
            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Offer amount:</span>
                <span className="font-semibold">${selectedOffer.amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform fee (10%):</span>
                <span className="font-semibold">${(selectedOffer.amount * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-6">
              This fee simulates the connection payment (test mode). Transport payment is handled separately between you and the carrier.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSelection}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirm and pay fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
