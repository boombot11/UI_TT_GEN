import React, { useState } from 'react'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const HomePage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Function to toggle the visibility of the panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center text-center text-white space-y-8 relative z-10">
        <h className="text-4xl font-bold">Generate Your TimeTable</h>
        <p className="text-lg">Create your weekly schedule in a few simple steps</p>
        <a href="/upload" className="px-8 py-4 bg-white hover:bg-white/70 hover:text-black text-black font-bold rounded-lg shadow-md transition duration-300">
          Start Creating
        </a>
      </div>

      {/* Background Blurred Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-yellow-300 opacity-40 rounded-full filter blur-3xl"></div>
      </div>

      {/* Instructions Button (Small button at bottom right) */}
      <button
        onClick={togglePanel}
        className="absolute bottom-16 right-10 w-12 h-12 rounded-full bg-black border border-gray-300 text-white flex items-center justify-center hover:bg-gray-800 transition duration-300"
      >
        <span className="text-lg font-bold"><QuestionMarkIcon/></span>
      </button>

      {/* Instructions Panel */}
      {isPanelOpen && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-80 h-60 bg-white text-black rounded-lg shadow-lg p-4 z-20">
          {/* Close Button */}
          <button
            onClick={togglePanel}
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
          >
            X
          </button>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <p className="text-sm">
            1. Click on the "Start Creating" button to begin generating your timetable.<br />
            2. Follow the prompts to enter your schedule details.<br />
            3. Save and export your timetable when done.
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage
