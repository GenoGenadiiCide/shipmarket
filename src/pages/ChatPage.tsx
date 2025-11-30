import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatPage() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');

  const mockChat = {
    id: chatId,
    listingTitle: 'Large wooden dining table',
    route: 'New York, NY → Los Angeles, CA',
    otherUserName: 'ABC Transport',
  };

  const mockMessages = [
    {
      id: 1,
      senderId: 'other',
      senderName: 'ABC Transport',
      text: 'Hi! I can handle this delivery for you.',
      timestamp: '2024-11-26T10:00:00Z',
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      text: 'Great! When can you pick it up?',
      timestamp: '2024-11-26T10:05:00Z',
    },
    {
      id: 3,
      senderId: 'other',
      senderName: 'ABC Transport',
      text: 'I can pick it up this Friday morning. Does that work for you?',
      timestamp: '2024-11-26T10:10:00Z',
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'You',
      text: 'Yes, Friday works perfectly! What time exactly?',
      timestamp: '2024-11-26T10:15:00Z',
    },
  ];

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isAuthenticated={true} userRole="SHIPPER" />

      <div className="mx-auto max-w-[1920px] w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="mb-6">
          <Link
            to="/chats"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">{mockChat.listingTitle}</h1>
          <p className="text-sm text-gray-600 mt-1">{mockChat.route}</p>
          <p className="text-xs text-gray-500 mt-1">Chat with {mockChat.otherUserName}</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 overflow-y-auto" style={{ height: 'calc(100vh - 380px)' }}>
          {mockMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-center">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-4">
              {mockMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.senderId === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                    {msg.senderId !== 'me' && (
                      <span className="text-xs font-medium text-gray-600 mb-1 px-1">{msg.senderName}</span>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg.senderId === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.senderId === 'me' ? 'opacity-70' : 'opacity-60'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
