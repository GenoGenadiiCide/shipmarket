import { Link } from 'react-router-dom';
import { Truck, LogOut } from 'lucide-react';
import { NotificationBell } from './NotificationBell';

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: 'SHIPPER' | 'CARRIER' | 'ADMIN';
  userName?: string;
}

export function Header({ isAuthenticated = false, userRole = 'SHIPPER', userName = 'John Doe' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">ShipMarket</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a href="#how-it-works" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              How it works
            </a>

            {isAuthenticated ? (
              <>
                <NotificationBell unreadCount={3} />
                <Link to="/chats" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  Messages
                </Link>
                <Link to="/dashboard" className="px-3 py-1.5 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                {userRole === 'ADMIN' && (
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    Admin
                  </button>
                )}
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="px-3 py-1.5 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link to="/auth/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
