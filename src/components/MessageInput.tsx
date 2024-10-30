// // src/components/MessageInput.tsx
// import React from 'react';

// const MessageInput: React.FC = () => (
//   <footer className="w-full fixed bottom-0 flex justify-center pb-6">
//     <div className="w-1/2 bg-gray-100 rounded-full shadow-lg px-4 py-2 flex items-center">
//       <input
//         type="text"
//         placeholder="Message"
//         className="w-full bg-transparent outline-none text-gray-700"
//       />
//     </div>
//   </footer>
// );

// export default MessageInput;
// src/components/MessageInput.tsx

import React, { KeyboardEvent, ChangeEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  value, 
  onChange 
}) => {
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      await onSendMessage(value);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="container mx-auto flex items-center gap-2">
        <input
          type="text"
          className="flex-grow h-10 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type your message..."
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          onKeyDown={handleKeyDown}
        />
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white disabled:opacity-50 bg-black hover:bg-gray-800 h-10 px-4 py-2"
          onClick={() => onSendMessage(value)}
          disabled={disabled}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;