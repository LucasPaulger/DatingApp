'use client';

import { useState } from 'react';
import IceBreakers from '@/components/IceBreakers';

const MessagesPage = () => {
  const [messageText, setMessageText] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  
  // Mock data for demonstration
  const matches = [
    { id: '1', name: 'Sarah', lastMessage: 'Hey, how are you?' },
    { id: '2', name: 'Michael', lastMessage: 'That sounds fun!' },
    { id: '3', name: 'Emma', lastMessage: 'Would love to hear more about that' },
  ];

  const handlePromptSelect = (prompt: string) => {
    setMessageText(prompt);
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedMatch) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText, 'to match:', selectedMatch);
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Matches List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Your Matches</h2>
            <div className="space-y-3">
              {matches.map(match => (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatch(match.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedMatch === match.id 
                      ? 'bg-rose-50 border border-rose-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-800">{match.name}</div>
                  <div className="text-sm text-gray-500 truncate">{match.lastMessage}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="md:col-span-2">
            {selectedMatch ? (
              <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">
                    {matches.find(m => m.id === selectedMatch)?.name}
                  </h3>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {/* Messages would be displayed here */}
                  <div className="text-center text-gray-500 my-8">
                    Start a new conversation!
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-rose-300"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 h-[600px] flex items-center justify-center">
                Select a match to start chatting
              </div>
            )}

            {/* Ice Breakers */}
            {selectedMatch && (
              <div className="mt-6">
                <IceBreakers onSelectPrompt={handlePromptSelect} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 