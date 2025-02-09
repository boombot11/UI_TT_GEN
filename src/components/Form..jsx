import React from 'react';
import { useNavigate } from 'react-router-dom';
import Generate from './Generate';
import { useFileContext } from './FileContext';

const GenerateContainer = () => {
  const navigate = useNavigate();
  const { file } = useFileContext();
  // Function to handle the file upload logic
  const uploadFile = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const blob = await response.blob(); // Get the zip file from the response

      // Create a URL for the blob and return it
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // Handle click event from the Generate component
  const handleButtonClick = async (formData) => {
    try {
      const downloadUrl = await uploadFile(formData);

      // If successful, navigate to the download link
      navigate("/download", { state: { downloadUrl } });
    } catch (error) {
      alert("There was an error uploading the file.");
    }
  };

  return (
    <Generate onButtonClick={handleButtonClick} fileInput={file}/>
  );
};

export default GenerateContainer;
