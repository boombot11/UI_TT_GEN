// src/context/FormDataContext.js
import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
  const [formDataState, setFormDataState] = useState(null);

  const formDataToObject = (formData) => {
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    return formDataObject;
  };

  const storeFormData = async (formData) => {
    // Convert FormData to an object for easier access
    const formDataObject = formDataToObject(formData);

    // Store formData object in context
    setFormDataState(formDataObject);

    // Send to backend
    try {
      const response = await fetch('/api/store-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) throw new Error('Failed to send form data');

      const result = await response.json();
      console.log('Successfully stored on backend:', result);
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <FormDataContext.Provider value={{ formDataState, storeFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
