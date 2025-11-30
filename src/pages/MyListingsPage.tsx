import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export default function MyListingsPage() {
  const mockListings = [
    {
      id: 1,
      title: 'Large wooden dining table',
      category: 'FURNITURE',
      status: 'PUBLISHED',
      bids: 5,
      from: 'New York, NY',
      to: 'Los Angeles, CA',
      createdAt: '2024-11-20',
    },
    {
      id: 2,
      title: 'Motorcycle - Harley Davidson',
      category: 'MOTORCYCLE',
      status: 'AWARDED',
      bids: 8,
      from: 'Chicago, IL',
      to: 'Miami, FL',
      createdAt: '2024-11-15',
    },
    {
      id: 3,
      title: 'Piano transport needed',
      category: 'PIANO',
      status: 'DRAFT',
      bids: 0,
      from: 'Boston, MA',
      to: 'Seattle, WA',
      createdAt: '2024-11-25',
    },
  ];

  const statusColors: any = {
    DRAFT: 'bg-gray-100 text-gray-800',
    PUBLISHED: 'bg-blue-50 text-blue-700',
    EXPIRED: 'bg-gray-100 text-gray-600',
    AWARDED: 'bg-green-50 text-green-700',
    IN_PROGRESS: 'bg-yellow-50 text-yellow-700',
    COMPLETED: 'bg-gray-100 text-gray-700',
    CANCELLED: 'bg-red-50 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userRole="SHIPPER" />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
            My Listings
          </h1>
          <Link
            to="/create-job"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Create New Listing
          </Link>
        </div>

        {/* Listings */}
        {mockListings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
            <p className="text-base md:text-lg text-gray-600 mb-4">
              You haven't created any listings yet.
            </p>
            <Link to="/create-job" className="text-blue-600 font-medium hover:text-blue-700">
              Create your first listing →
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Bids
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockListings.map(listing => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-xs text-gray-500">
                          {listing.from} → {listing.to}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{listing.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${statusColors[listing.status]}`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{listing.bids}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{listing.createdAt}</td>
                      <td className="px-6 py-4 text-sm space-x-3">
                        <Link to={`/listings/${listing.id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                          View
                        </Link>
                        {(listing.status === 'DRAFT' || listing.status === 'PUBLISHED') && (
                          <Link to={`/create-job`} className="text-blue-600 hover:text-blue-700 font-medium">
                            Edit
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {mockListings.map(listing => (
                <div key={listing.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{listing.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {listing.from} → {listing.to}
                  </p>
                  <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-md mb-4 ${statusColors[listing.status]}`}>
                    {listing.status}
                  </span>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <span className="ml-2 font-medium">{listing.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Bids:</span>
                      <span className="ml-2 font-medium">{listing.bids}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Created:</span>
                      <span className="ml-2 font-medium">{listing.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="flex-1 text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
                    >
                      View
                    </Link>
                    {(listing.status === 'DRAFT' || listing.status === 'PUBLISHED') && (
                      <Link
                        to={`/create-job`}
                        className="flex-1 text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
