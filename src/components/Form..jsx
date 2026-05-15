import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Generate from './Generate';
import { useFileContext } from './FileContext';

const GenerateContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { File } = useFileContext();

  const [configData, setConfigData] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(false);

  // Extract `title` query parameter from URL
  const searchParams = new URLSearchParams(location.search);
  const Title = searchParams.get('title');

  useEffect(() => {
    const fetchConfigData = async () => {
      if (!Title) return;
      console.log("enteringggggggg  ");
      console.log(Title)
      const Data = {
        title: Title
      };
      setLoadingConfig(true);
      try {
        const response = await fetch('http://localhost:5000/SpecificForm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Data),
        });
        console.log('inside')
       console.log(response)
        if (!response.ok) throw new Error('Failed to fetch config data');

        const data = await response.json();
        console.log(data.data)
        setConfigData(data.data);
        console.log(configData) // assuming data.data contains { classrooms, labs, keyValuePairs, addOns }
      } catch (err) {
        console.error('Failed to load config:', err);
        alert('Error loading saved configuration.');
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchConfigData();
  }, [Title,loadingConfig]);

  const uploadFile = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleButtonClick = async (formData) => {
    try {
      const downloadUrl = await uploadFile(formData);
      navigate("/download", { state: { downloadUrl } });
    } catch (error) {
      alert("There was an error uploading the file.");
    }
  };

  // Show loading while fetching config
  if (loadingConfig) {
    return (
      <div className="text-white text-center mt-20">
        Loading saved configuration...
      </div>
    );
  }

  return (
    <Generate onButtonClick={handleButtonClick} fileInput={File} configData={configData} />
  );
};

export default GenerateContainer;
