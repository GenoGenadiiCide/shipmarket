import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export default function MyBidsPage() {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const mockBids = [
    {
      id: 1,
      listingTitle: 'Large wooden dining table',
      from: 'New York, NY',
      to: 'Los Angeles, CA',
      price: 850.00,
      status: 'PENDING',
      submittedAt: '2024-11-20',
      listingId: 1,
    },
    {
      id: 2,
      listingTitle: 'Motorcycle - Harley Davidson',
      from: 'Chicago, IL',
      to: 'Miami, FL',
      price: 1200.00,
      status: 'WON',
      submittedAt: '2024-11-15',
      listingId: 2,
    },
    {
      id: 3,
      listingTitle: 'Piano transport needed',
      from: 'Boston, MA',
      to: 'Seattle, WA',
      price: 950.00,
      status: 'LOST',
      submittedAt: '2024-11-10',
      listingId: 3,
    },
  ];

  const statusColors: any = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    WON: 'bg-green-100 text-green-800',
    LOST: 'bg-red-100 text-red-800',
    WITHDRAWN: 'bg-gray-100 text-gray-800',
    EXPIRED: 'bg-orange-100 text-orange-800',
  };

  const filteredBids = filterStatus === 'ALL' 
    ? mockBids 
    : mockBids.filter(bid => bid.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userRole="CARRIER" />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Offers</h1>
          <Link
            to="/provider/jobs"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Browse Listings
          </Link>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
            <option value="EXPIRED">EXPIRED</option>
          </select>
        </div>

        {/* Bids */}
        {filteredBids.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't submitted any offers yet.</p>
            <Link to="/provider/jobs" className="text-blue-600 font-medium hover:text-blue-700">
              Browse available listings →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Listing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBids.map(bid => (
                  <tr key={bid.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        to={`/listings/${bid.listingId}`}
                        className="text-blue-600 font-medium hover:text-blue-700"
                      >
                        {bid.listingTitle}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {bid.from} → {bid.to}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${bid.price.toFixed(2)} USD
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[bid.status]}`}>
                        {bid.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{bid.submittedAt}</td>
                    <td className="px-6 py-4 text-sm">
                      {bid.status === 'PENDING' && (
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Withdraw
                        </button>
                      )}
                      {bid.status === 'WON' && (
                        <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
                          View Booking
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
