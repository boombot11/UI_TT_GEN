import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

const Result = () => {
  return (
    <div>
      {/* Background Shapes (Fixed) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <div className="fixed top-1/6 left-1/4 w-96 h-96 bg-red-500 opacity-25 rounded-full filter blur-3xl"></div>
        <div className="fixed top-1/4 left-1/3 w-80 h-80 bg-teal-400 opacity-25 rounded-full filter blur-3xl"></div>
        <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-yellow-300 opacity-15 rounded-full filter blur-3xl"></div>
        <div className="fixed top-2/4 left-1/2 w-72 h-72 bg-green-500 opacity-25 rounded-full filter blur-3xl"></div>
        <div className="fixed top-3/4 right-1/3 w-80 h-80 bg-orange-400 opacity-25 rounded-full filter blur-3xl"></div>
        <div className="fixed bottom-1/3 left-1/4 w-96 h-96 bg-pink-400 opacity-25 rounded-full filter blur-3xl"></div>
        <div className="fixed bottom-2/4 left-1/2 w-72 h-72 bg-indigo-600 opacity-15 rounded-full filter blur-3xl"></div>
        <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 opacity-25 rounded-full filter blur-3xl"></div>
        <div className="fixed bottom-1/6 left-1/8 w-96 h-96 bg-purple-600 opacity-15 rounded-full filter blur-3xl"></div>
      </div>

      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black flex items-center justify-center py-10">
        <div className="relative flex mt-20 flex-col justify-center w-full max-w-3xl space-y-10 items-center">
          {/* Header: Generated Sheets */}
          <div className=" text-white w-full text-center rounded-lg">
            <h2 className="text-2xl font-semibold">Generated Sheets</h2>
          </div>

          {/* Generated Sheets Divs */}
          <div className="bg-gray-800/90 flex w-full md:w-[95%] lg:w-[80%] border border-gray-500 px-8 py-4 rounded-lg shadow-xl relative z-10">
            <div className="text-white flex w-full justify-between items-center">
              <p className="text-gray-200 w-full">
                <span className="font-semibold">Classroom wise</span> generated excel sheet
              </p>
              <div className="border-[0.5px] shadow-lg border-gray-600 cursor-pointer rounded-lg aspect-square w-12 h-12 flex justify-center items-center hover:bg-gray-900/60 bg-gray-900/80">
                <DownloadIcon className="opacity-90 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/90 flex w-full md:w-[95%] lg:w-[80%] border border-gray-500 px-8 py-4 rounded-lg shadow-xl relative z-10">
            <div className="text-white flex w-full justify-between items-center">
              <p className="text-gray-200 w-full">
              <span className="font-semibold">Lab wise</span> generated excel sheet
              </p>
              <div className="border-[0.5px] shadow-lg border-gray-600 cursor-pointer rounded-lg aspect-square w-12 h-12 flex justify-center items-center hover:bg-gray-900/60 bg-gray-900/80">
                <DownloadIcon className="opacity-90 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/90 flex w-full md:w-[95%] lg:w-[80%] border border-gray-500 px-8 py-4 rounded-lg shadow-xl relative z-10">
            <div className="text-white flex w-full justify-between items-center">
              <p className="text-gray-200 w-full">
              <span className="font-semibold">Teacher wise</span> generated excel sheet
              </p>
              <div className="border-[0.5px] shadow-lg border-gray-600 cursor-pointer rounded-lg aspect-square w-12 h-12 flex justify-center items-center hover:bg-gray-900/60 bg-gray-900/80">
                <DownloadIcon className="opacity-90 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
