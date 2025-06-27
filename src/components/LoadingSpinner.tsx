
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h2>
        <p className="text-gray-500">Fetching your latest data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
