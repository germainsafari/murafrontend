// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void; // Define the prop type
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between p-4 shadow">
      <button onClick={onToggleSidebar} className="text-gray-700 hover:text-indigo-600">
        {/* Replace with your icon */}
        Toggle Sidebar
      </button>
      <h1 className="text-xl font-bold">mura</h1>
      {/* Add other elements here, like guidelines, contact, and language options */}
    </header>
  );
};


export default Header;
