import { Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-semibold text-white">ShipMarket</span>
            </div>
            <p className="text-sm text-gray-400">
              The trusted marketplace for shipping and transportation.
            </p>
          </div>

          {/* For Shippers */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Shippers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/create-job" className="hover:text-white transition-colors">Post a Listing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* For Carriers */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Carriers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/auth/register" className="hover:text-white transition-colors">Become a Carrier</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrier Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2024 ShipMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
