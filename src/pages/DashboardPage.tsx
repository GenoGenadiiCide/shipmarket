import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Package, MessageSquare, ShoppingCart, FileText, CheckCircle2, Bell, Search, Plus, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const userRole = 'SHIPPER'; // Mock: can be 'SHIPPER' or 'CARRIER'
  const userName = 'John Doe';

  const shipperStats = {
    totalListings: 8,
    activeListings: 3,
    bidsReceived: 24,
    totalBookings: 5,
    activeBookings: 2,
    notifications: 3,
  };

  const carrierStats = {
    totalBids: 15,
    acceptedBids: 8,
    bookings: 8,
    activeBookings: 3,
    notifications: 5,
  };

  const stats = userRole === 'SHIPPER' ? shipperStats : carrierStats;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userRole={userRole} userName={userName} />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            {userRole === 'SHIPPER' 
              ? 'Manage your shipping requests and bookings'
              : 'Find new opportunities and manage your bids'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {userRole === 'SHIPPER' ? (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <Package className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Total Listings</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalListings}</p>
                    <p className="text-xs text-gray-500">{shipperStats.activeListings} active</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Bids Received</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{shipperStats.bidsReceived}</p>
                    <p className="text-xs text-gray-500">Total offers on your listings</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <ShoppingCart className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{shipperStats.totalBookings}</p>
                    <p className="text-xs text-gray-500">{shipperStats.activeBookings} active</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Total Bids</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{carrierStats.totalBids}</p>
                    <p className="text-xs text-gray-500">{carrierStats.acceptedBids} accepted</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Bookings</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{carrierStats.bookings}</p>
                    <p className="text-xs text-gray-500">{carrierStats.activeBookings} active</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <Bell className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Notifications</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{carrierStats.notifications}</p>
                    <p className="text-xs text-gray-500">Unread messages</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userRole === 'SHIPPER' ? (
              <>
                <Link
                  to="/create-job"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Plus className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Create New Listing</h3>
                      <p className="text-sm text-gray-600">
                        Post a new shipping request and get competitive bids
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/dashboard/shipper/listings"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Package className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">My Listings</h3>
                      <p className="text-sm text-gray-600">
                        View and manage all your shipping requests
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/dashboard"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <ShoppingCart className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">My Bookings</h3>
                      <p className="text-sm text-gray-600">
                        Track your active and completed bookings
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/provider/jobs"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Search className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Available Jobs</h3>
                      <p className="text-sm text-gray-600">
                        View and bid on active delivery requests
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/dashboard/carrier/bids"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">My Bids</h3>
                      <p className="text-sm text-gray-600">
                        View and manage all your submitted bids
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/dashboard"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">My Bookings</h3>
                      <p className="text-sm text-gray-600">
                        Track your accepted bookings and deliveries
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <Link to="/dashboard" className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-md transition-colors">
              <Bell className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">View all your notifications</p>
              </div>
            </Link>

            {userRole === 'CARRIER' && (
              <Link to="/dashboard" className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-md transition-colors">
                <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Carrier Profile</h3>
                  <p className="text-sm text-gray-600">Update your profile and settings</p>
                </div>
              </Link>
            )}

            <Link to="/dashboard" className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-md transition-colors">
              <MessageSquare className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Support</h3>
                <p className="text-sm text-gray-600">Get help or contact us</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
