import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export default function ChatsPage() {
  const mockChats = [
    {
      id: '1',
      listingTitle: 'Large wooden dining table',
      userRole: 'shipper',
      route: 'New York, NY → Los Angeles, CA',
      lastMessage: 'When can you pick up the table?',
      lastMessageSender: 'ABC Transport',
      lastMessageTime: '5 minutes ago',
      unread: true,
    },
    {
      id: '2',
      listingTitle: 'Motorcycle - Harley Davidson',
      userRole: 'carrier',
      route: 'Chicago, IL → Miami, FL',
      lastMessage: 'I can deliver it by Friday',
      lastMessageSender: 'You',
      lastMessageTime: '2 hours ago',
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userRole="SHIPPER" />

      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Your conversations with carriers and shippers</p>
        </div>

        {mockChats.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-sm text-gray-600">
              Start a conversation by selecting a carrier for your listing.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockChats.map(chat => (
              <Link
                key={chat.id}
                to={`/chats/${chat.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                      {chat.listingTitle}
                    </h3>
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                      You are {chat.userRole}
                    </span>
                    <p className="text-sm text-gray-600">{chat.route}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex-1 min-w-0">
                    {chat.lastMessage ? (
                      <p className="text-sm text-gray-700 truncate">
                        {chat.lastMessageSender === 'You' ? '[You]: ' : `[${chat.lastMessageSender}]: `}
                        {chat.lastMessage}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No messages yet</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                    {chat.lastMessageTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
