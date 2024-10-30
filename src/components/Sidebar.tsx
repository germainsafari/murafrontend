// src/components/Sidebar.tsx
import React from 'react';
import { ChatAltIcon, PlusIcon } from '@heroicons/react/outline';

const Sidebar: React.FC = () => {
  const chatHistory = ['Chat 1', 'Chat 2', 'Chat 3']; // Dummy data

  return (
    <div className="fixed z-10 bg-white w-64 h-full shadow-lg p-4 space-y-2">
      <button className="flex items-center text-gray-700 hover:text-indigo-600">
        <ChatAltIcon className="h-5 w-5" />
        <span className="ml-2">Chat History</span>
      </button>
      <button className="flex items-center text-gray-700 hover:text-indigo-600">
        <PlusIcon className="h-5 w-5" />
        <span className="ml-2">New Chat</span>
      </button>
      
      {/* Display chat history */}
      <div className="mt-4 space-y-2">
        {chatHistory.map((chat, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded-lg">
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
