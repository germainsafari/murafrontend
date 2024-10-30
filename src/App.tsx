// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Greeting from './components/Greeting';
import QuickAccessButtons from './components/QuickAccessButtons';
import MessageInput from './components/MessageInput';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      {isSidebarOpen && <Sidebar />}
      <main className="flex-grow container mx-auto px-4">
        <Greeting />
        <QuickAccessButtons />
      </main>
      <MessageInput />
    </div>
  );
};

export default App;
