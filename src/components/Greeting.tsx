// src/components/Greeting.tsx
import React from 'react';

const Greeting: React.FC = () => (
  <div className="text-center mt-12">
    <h2 className="text-4xl font-bold">Hello, Carl</h2>
    <p className="text-xl text-gray-500 mb-4">How can I help you today?</p>
    <p className="text-indigo-600 underline cursor-pointer">Click to know mura guidelines ↗</p>
  </div>
);

export default Greeting;
