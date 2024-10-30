// src/components/QuickAccessButtons.tsx
import React from 'react';

const QuickAccessButtons: React.FC = () => {
  const options = [
    "I have a depression, got divorced last year...",
    "Help me quit smoking",
    "Recommendations for ADHD",
    "Therapy session for trauma"
  ];

  return (
    <div className="flex space-x-4 mt-8 justify-center">
      {options.map((text, idx) => (
        <div key={idx} className="p-4 bg-gray-200 rounded-lg shadow-md">
          {text}
        </div>
      ))}
    </div>
  );
};

export default QuickAccessButtons;
