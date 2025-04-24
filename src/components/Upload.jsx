import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { useFileContext } from "./FileContext";

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { File, handleFileChange } = useFileContext(); 
  
  // Handle the file selection
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileChange(selectedFile); // Save the selected file in context
    }
    console.log('file selected')
    console.log(selectedFile)
    setFile(selectedFile);
  };

  // Function to handle file upload
  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  // Function to upload file to the backend
  const handleSubmit = async () => {
    if (!file) {
      if (File) {
        navigate("/config");
        return;
      }
      alert("Please select a file before uploading.");
      return;
    }

    navigate("/config");
  };

  // Function to remove the selected file
  const handleRemoveFile = () => {
    setFile(null); // Clear the file state
    handleFileChange(null); // Clear the context file
  };

  return (
    <>
      {/* Background Shapes (Fixed) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        {/* Add your background shapes here */}
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black flex items-center justify-center py-10">
        <div className="relative flex flex-col pt-20 justify-center w-full max-w-lg space-y-10">
          {/* Template Section */}
          <div className="bg-gray-800/90 flex w-[90%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10">
            <div className="text-white flex w-full justify-between items-center">
              <div className="text-gray-200 w-full">
                <div className="text-xl pb-2 opacity-50">Template</div>
                <strong>Download</strong> the excel sheet and only use this as the template for uploading any files
              </div>
              <div className="border-[0.5px] shadow-lg border-gray-600 cursor-pointer rounded-lg aspect-square w-12 h-12 flex justify-center items-center hover:bg-gray-900/60 bg-gray-900/80">
                <DownloadIcon className="opacity-90 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/90 flex w-[90%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10">
            <div className="text-white flex w-full justify-between items-center">
              <div className="text-gray-200 w-full">
                <div className="text-xl pb-2 opacity-50">Documentation</div>
                <strong>Download</strong> Documentation containing the rules and guidelines of inputs and upload procedure
              </div>
              <div className="border-[0.5px] shadow-lg border-gray-600 cursor-pointer rounded-lg aspect-square w-12 h-12 flex justify-center items-center hover:bg-gray-900/60 bg-gray-900/80">
                <DownloadIcon className="opacity-90 w-4" />
              </div>
            </div>
          </div>

          {/* Upload Files Section */}
          <div className="bg-gray-800/90 flex flex-col w-[90%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10">
            <div className="text-white">
              <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            </div>

            {/* Custom File Upload Box */}
            <div
              onClick={handleUploadClick}
              className="w-full h-20 border-2 rounded-lg border-dashed border-gray-600 bg-gray-900/80 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-900/60"
            >
              <span className="text-lg">Click to Upload File</span>
            </div>

            {/* Hidden File Input */}
            <input
              id="fileInput"
              type="file"
              onChange={handleFile}
              className="hidden"
            />
            <p className="text-gray-400 text-sm mt-3">Upload Only Excel</p>

            {/* File Display Section */}
            {file && (
              <div className="flex items-center space-x-2 mt-4 bg-gray-900/60 p-3 rounded-lg">
                <span className="text-white">{file.name}</span>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 absolute right-10 font-bold"
                >
                  ✖
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="px-3 py-2 bg-indigo-600 text-white border-none rounded-lg mt-5 font-semibold hover:bg-indigo-600/70"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
