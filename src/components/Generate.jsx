import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Generate = ({ onButtonClick }) => {
  const navigate = useNavigate();

  const [fileInput, ChangefileInput] = useState(null);
  const [headerInput, ChangeheaderInput] = useState(null);
  const [footerInput, ChangefooterInput] = useState(null);
  const [configInput, ChangeconfigInput] = useState(null);
  const [classrooms, ChangeClassrooms] = useState("");
  const [labs, ChangeLabs] = useState("");

  // Manage state for each circle's status (on/off)
  const [circles, setCircles] = useState([false, false, false, false]);

  // State for extra add-ons
  const [addOns, setAddOns] = useState([{ content: '', time: '', sheetName: '', day: '' }]);

  const handleButtonClick = async () => {
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("config", configInput.files[0]);
    formData.append("classrooms", classrooms);
    formData.append("labs", labs);
    formData.append("header", headerInput.files[0]);
    formData.append("footer", footerInput.files[0]);

    // Append extra add-ons to formData

 formData.append("addOns", JSON.stringify(addOns));
    onButtonClick(formData);
  };

  // Toggle the status of a specific circle
  const toggleCircle = (index) => {
    const updatedCircles = [...circles];
    updatedCircles[index] = !updatedCircles[index];
    setCircles(updatedCircles);
  };

  // Add more extra add-ons input fields
  const handleAddInput = () => {
    setAddOns([...addOns, { content: '', time: '', sheetName: '', day: '' }]);
  };

  // Handle input change for extra add-ons
  const handleInputChange = (index, field, value) => {
    const updatedAddOns = [...addOns];
    updatedAddOns[index][field] = value;
    setAddOns(updatedAddOns);
  };

  return (
    <div>
      {/* Background Shapes (Fixed) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        {/* (Background shapes unchanged) */}
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black flex items-center justify-center py-10">
        <div className="relative flex mt-20 flex-col justify-center w-full max-w-3xl space-y-10 items-center">
          
          {/* Row of Circles with White Border and Descriptions */}
          <div className="flex space-x-8 mb-8">
            {circles.map((status, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  onClick={() => toggleCircle(index)} 
                  className={`w-8 h-8 rounded-full cursor-pointer ${status ? 'bg-blue-500' : 'bg-gray-600'} border-2 border-white transition-all duration-300`}
                />
                <span className="text-white text-xs mt-2">
                  {index === 0 ? 'Header' : index === 1 ? 'Footer' : index === 2 ? 'Config' : 'Extra Add-Ons'}
                </span>
              </div>
            ))}
          </div>

          {/* Render Input Sections Based on Circle Toggle */}
          <InputSection 
            onClick={ChangeClassrooms}
            label="Input classroom numbers whose time table is to be generated" 
            placeholder="Eg. 64, 65, 66..." 
          />
          <InputSection  
            onClick={ChangeLabs}
            label="Input Lab names whose time table is to be generated" 
            placeholder="Eg. L1, L2, L3..." 
          />

          {circles[0] && <HeaderInput onClick={ChangeheaderInput} label="Input the header file" placeholder="" />}
          {circles[1] && <HeaderInput onClick={ChangefooterInput} label="Input the Footer file" placeholder="" />}
          {circles[2] && <HeaderInput onClick={ChangeconfigInput} label="Enter your config json file" placeholder="" />}
          {circles[3] && <ExtraAddOnInput 
            addOns={addOns} 
            handleInputChange={handleInputChange} 
            handleAddInput={handleAddInput} 
          />}
          
          {/* Generate Button */}
          <button
            onClick={handleButtonClick}
            className="px-10 border border-white/20 py-2 bg-indigo-600 text-white font-semibold rounded-lg mt-5 hover:bg-indigo-500"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;


const ExtraAddOnInput = ({ addOns, handleInputChange, handleAddInput }) => {
  return (
    <div>
      {addOns.map((addOn, index) => (
        <div key={index} className="bg-gray-800/90 flex w-full md:w-[95%] min-w-[90vh] lg:w-[80%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10 mb-4">
          <div className="text-white flex flex-col w-full justify-between items-center">
            <p className="text-gray-200 w-full">Extra Add-On {index + 1}</p>
            <input
              type="text"
              value={addOn.content}
              onChange={(e) => handleInputChange(index, 'content', e.target.value)}
              placeholder="Content"
              className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10 placeholder:opacity-60"
            />
            <input
              type="text"
              value={addOn.time}
              onChange={(e) => handleInputChange(index, 'time', e.target.value)}
              placeholder="Time (e.g. 8:30-9:30)"
              className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10 placeholder:opacity-60"
            />
            <input
              type="text"
              value={addOn.day}
              onChange={(e) => handleInputChange(index, 'day', e.target.value)}
              placeholder="Day (e.g. Monday)"
              className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10 placeholder:opacity-60"
            />
            <input
              type="text"
              value={addOn.sheetName}
              onChange={(e) => handleInputChange(index, 'sheetName', e.target.value)}
              placeholder="Sheet Name"
              className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10 placeholder:opacity-60"
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleAddInput}
        className="text-white mt-2 bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500"
      >
        + Add More
      </button>
    </div>
  );
};






const InputSection = ({ label, placeholder ,onClick}) => {
  return (
    <div className="bg-gray-800/90 flex w-full md:w-[95%] lg:w-[80%]  border border-gray-500 p-8 rounded-lg shadow-xl relative z-10">
      <div className="text-white flex flex-col w-full justify-between items-center">
        <p className="text-gray-200 w-full">{label}</p>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10 placeholder:opacity-60"
        />
      </div>
    </div>
  );
};

const HeaderInput = ({ label, placeholder }) => {
  const divStyle = {
    backgroundColor: 'rgba(31, 41, 55, 0.9)', // bg-gray-800/90
    display: 'flex',
    width: '100%',
    maxWidth: '60vh',
    borderWidth: '1px',
    borderColor: '#6b7280', // border-gray-500
    padding: '2rem', // p-8
    borderRadius: '0.75rem', // rounded-lg
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-xl
    position: 'relative',
    zIndex: 10
  };

  const textStyle = {
    color: '#e5e7eb', // text-white
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '1.25rem', // pl-5
    marginTop: '1rem', // mt-4
    borderWidth: '1px',
    borderColor: '#4b5563', // border-gray-600
    borderRadius: '0.5rem', // rounded-lg
    backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-900/80

    opacity: 0.6 // placeholder:opacity-60
  };

  return (
    <div style={divStyle}>
      <div style={textStyle}>
        <p style={{ color: '#e5e7eb' }}>{label}</p>
        <input
          type="file"
          placeholder={placeholder}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

