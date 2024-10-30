// src/components/MessageInput.tsx
import React from 'react';

const MessageInput: React.FC = () => (
  <footer className="w-full fixed bottom-0 flex justify-center pb-6">
    <div className="w-1/2 bg-gray-100 rounded-full shadow-lg px-4 py-2 flex items-center">
      <input
        type="text"
        placeholder="Message"
        className="w-full bg-transparent outline-none text-gray-700"
      />
    </div>
  </footer>
);

export default MessageInput;
