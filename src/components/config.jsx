


import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";


const Config = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Handle the file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
 
      setFile(selectedFile);
    }
  };
  

  // Function to handle file upload
  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  // Function to upload file to the backend
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
  
    navigate("/upload/process-file");
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
          <ModifyConfig></ModifyConfig>
         
        </div>
      </div>
    </>
  );
};

export default Config;

const ModifyConfig = () => {

    const navigate = useNavigate();
    const CustomClickHandler = () => {
      navigate("/upload/process-file");
    }

    return (
      <div className="bg-gray-800/90 w-full md:w-[95%] lg:w-[80%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10 flex flex-col items-center">
        <p className="text-white text-xl font-semibold mb-6">SelectConfig</p>
  
        {/* Departments Section (Using Flexbox) */}
        <div className="flex flex-col justify-center space-y-4 w-full mb-6">
          {['CS', 'IT', 'CSDS', 'AIML', 'ALDS', 'EXTC', 'MECH'].map((department, index) => (
            <div key={index} className="bg-gray-700/90 text-center p-4 rounded-lg shadow-lg border-2 border-gray-600 flex-1 min-w-[200px]">
              <p className="text-white">{department}</p>
            </div>
          ))}
        </div>
  
        {/* Custom Config Button */}
        <button onClick={CustomClickHandler} className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 mt-4">
          Custom Config
        </button>
      </div>
    );
  };


  