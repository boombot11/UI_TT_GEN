import React from "react";
import { useLocation } from "react-router-dom";

const Download = () => {
  const location = useLocation();
  const { downloadUrl } = location.state || {};

  if (!downloadUrl) {
    return <div>Error: No file URL found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black flex items-center justify-center py-10">
      <div className="relative flex mt-20 flex-col justify-center w-full max-w-3xl space-y-10 items-center">
        <div className="text-white w-full text-center rounded-lg">
          <h2 className="text-2xl font-semibold">Download Your Files</h2>
        </div>

        <div className="bg-gray-800/90 flex w-full md:w-[95%] lg:w-[80%] border border-gray-500 px-8 py-4 rounded-lg shadow-xl relative z-10">
          <div className="text-white flex w-full justify-between items-center">
            <p className="text-gray-200 w-full">
              Click below to download your zip file containing all the generated sheets.
            </p>
            <a href={downloadUrl} download="generated_files.zip">
              <div className="border-[0.5px] shadow-lg border-gray-600 cursor-pointer rounded-lg aspect-square  h-12 flex justify-center items-center hover:bg-gray-900/60 bg-gray-900/80">
                <span className="text-white p-6">Download</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
