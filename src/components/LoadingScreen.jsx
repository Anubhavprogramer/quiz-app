import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-white">
      {/* Circular spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-purple-700 rounded-full animate-spin"></div>

      {/* Loading text */}
      <div className="mt-6 text-lg font-semibold text-purple-900 animate-pulse">
        Loading your quiz...
      </div>
    </div>
  );
};

export default LoadingScreen;
