import { useState } from 'react';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
  unreadCount?: number;
}

export function NotificationBell({ unreadCount = 0 }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mockNotifications = [
    { id: 1, text: 'New offer received on your listing', time: '5m ago', read: false },
    { id: 2, text: 'Carrier selected for your job', time: '1h ago', read: false },
    { id: 3, text: 'Your offer was accepted', time: '2h ago', read: true },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="h-5 w-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {mockNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No notifications
              </div>
            ) : (
              mockNotifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notif.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
