import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function AvailableJobsPage() {
  const [pickupState, setPickupState] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  const mockJobs = [
    {
      id: 1,
      title: 'Large wooden dining table',
      category: 'FURNITURE',
      from: 'New York, NY, USA',
      to: 'Los Angeles, CA, USA',
      description: 'Large wooden dining table, approximately 6 feet long and 3 feet wide. Needs careful handling.',
      timeframe: 'Within 2 weeks',
      offers: 5,
      createdAt: '2024-11-26T08:00:00Z',
      isNew: true,
    },
    {
      id: 2,
      title: 'Motorcycle - Harley Davidson',
      category: 'MOTORCYCLE',
      from: 'Chicago, IL, USA',
      to: 'Miami, FL, USA',
      description: '2015 Harley Davidson Street 750. Needs to be transported in enclosed trailer.',
      timeframe: 'Flexible',
      offers: 8,
      createdAt: '2024-11-25T15:30:00Z',
      isNew: true,
    },
    {
      id: 3,
      title: 'Piano transport needed',
      category: 'PIANO',
      from: 'Boston, MA, USA',
      to: 'Seattle, WA, USA',
      description: 'Upright piano, approximately 500 lbs. Requires professional moving equipment.',
      timeframe: 'Within a week',
      offers: 3,
      createdAt: '2024-11-20T10:00:00Z',
      isNew: false,
    },
    {
      id: 4,
      title: 'Full house move',
      category: 'MOVE',
      from: 'Austin, TX, USA',
      to: 'Denver, CO, USA',
      description: '3 bedroom house contents. Approximately 8000 lbs of furniture and boxes.',
      timeframe: 'Specific date: 2024-12-15',
      offers: 12,
      createdAt: '2024-11-18T09:00:00Z',
      isNew: false,
    },
  ];

  const isNew = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return diff < 24 * 60 * 60 * 1000; // Less than 24 hours
  };

  const formatTimeAgo = (dateStr: string) => {
    const minutes = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const hasFilters = pickupState || deliveryState || sortBy !== 'newest';

  const clearFilters = () => {
    setPickupState('');
    setDeliveryState('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userRole="CARRIER" />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 sticky top-16 bg-gray-50 py-4 z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            Available Jobs
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            New requests appear here in real time
          </p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Pickup State (Point A)
              </label>
              <select
                value={pickupState}
                onChange={(e) => setPickupState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                {usStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Delivery State (Point B)
              </label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                {usStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="price-high">Price: high to low</option>
                <option value="price-low">Price: low to high</option>
              </select>
            </div>

            {hasFilters && (
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        {mockJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
            <h3 className="text-gray-900 mb-2">No jobs found matching your filters.</h3>
            <p className="text-gray-600 mb-4">
              {hasFilters ? 'Try adjusting your filters or check back later.' : 'Check back later for new job opportunities.'}
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear State Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Category and New Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                    {job.category}
                  </span>
                  {isNew(job.createdAt) && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
                      <Sparkles className="h-3 w-3" />
                      New
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {job.title}
                </h3>

                {/* Locations */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">From: {job.from}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">To: {job.to}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                {/* Timeframe */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-xs font-medium text-gray-700">Timeframe: {job.timeframe}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                  <span>{formatTimeAgo(job.createdAt)}</span>
                  <span>{job.offers} offer(s)</span>
                </div>

                {/* CTA */}
                <Link
                  to={`/listings/${job.id}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
