import React, { createContext, useState, useContext } from "react";

// Create the context
const FileContext = createContext();

// Custom hook to use the file context
export const useFileContext = () => {
  return useContext(FileContext);
};

// Context Provider
export const FileProvider = ({ children }) => {
  const [File, setFile] = useState(null); // File state

  // Method to handle file change (e.g., file upload)
  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  // Method to clear the file
  const clearFile = () => {
    setFile(null);
  };

  return (
    <FileContext.Provider value={{ File, handleFileChange, clearFile }}>
      {children}
    </FileContext.Provider>
  );
};
