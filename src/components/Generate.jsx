import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtraAddOnInput } from './AddOn';
import KeyValueComponent from './ConfigJson';
import { useFormData } from './FormDataContext';


const Generate = ({ onButtonClick, fileInput, configData = null }) => {
  const navigate = useNavigate();

  const [headerInput, ChangeheaderInput] = useState(null);
  const [footerInput, ChangefooterInput] = useState(null);
  const [configInput, ChangeconfigInput] = useState(null);
  const { storeFormData } = useFormData();
  const [classrooms, ChangeClassrooms] = useState('');
  const [labs, ChangeLabs] = useState('');
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', value: '' }]);
  const [circles, setCircles] = useState([false, false, false, false]);
  const [addOns, setAddOns] = useState([{ content: '', time: '', sheetName: '', day: '' }]);

  // Auto-fill config data
  useEffect(() => {
    if (configData) {
      if (configData.keyValuePairs) {
        console.log('xxx')
        console.log(configData.keyValuePairs)
        setKeyValuePairs(configData.keyValuePairs);
      }
      if (configData.classrooms) ChangeClassrooms(configData.classrooms);
      if (configData.labs) ChangeLabs(configData.labs);
      if (configData.addOns) setAddOns(configData.addOns);
      if (configData.addOns) {
        setCircles(prevCircles => {
          const newCircles = [...prevCircles]; // Make a copy of the current circles
          newCircles[3] = true; // Set the 4th circle (index 3) to true
          return newCircles; // Return the updated array
        });
      }
      
      
    }
  }, [configData]);

  const changeConfig = (File) => {
    ChangeconfigInput(File);
  };

  const handleButtonClick = async () => {
    const formData = new FormData();
    formData.append('config_data', JSON.stringify(keyValuePairs));
    formData.append('file', fileInput);
    formData.append('config', configInput);
    formData.append('classrooms', classrooms);
    formData.append('labs', labs);
    formData.append('header', headerInput);
    formData.append('footer', footerInput);
    formData.append('addOns', JSON.stringify(addOns));

    onButtonClick(formData);
  };

  const handleSaveConfig = async () => {
    const title = prompt('Enter a title for this config:');
    if (!title) {
      alert('Title is required to save the config.');
      return;
    }

    const formData = {
      keyValuePairs,
      classrooms,
      labs,
      addOns,
    };

    try {
      const response = await fetch('http://localhost:5000/saveForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, formData }),
      });

      if (response.ok) {
        alert('Config saved successfully!');
      } else {
        alert('Failed to save config.');
      }
    } catch (err) {
      console.error('Error saving config:', err);
      alert('An error occurred while saving the config.');
    }
  };

  const toggleCircle = (index) => {
    const updatedCircles = [...circles];
    updatedCircles[index] = !updatedCircles[index];
    setCircles(updatedCircles);
  };

  const handleAddInput = () => {
    setAddOns([...addOns, { content: '', time: '', sheetName: '', day: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedAddOns = [...addOns];
    updatedAddOns[index][field] = value;
    setAddOns(updatedAddOns);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden"></div>

      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black flex items-center justify-center py-10">
        <div className="relative flex mt-20 flex-col justify-center w-full max-w-3xl space-y-10 items-center">
          
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

          <InputSection 
            onClick={ChangeClassrooms}
            label="Input classroom numbers whose time table is to be generated" 
            placeholder="Eg. 64, 65, 66..." 
            value={classrooms}
          />
          <InputSection  
            onClick={ChangeLabs}
            label="Input Lab names whose time table is to be generated" 
            placeholder="Eg. L1, L2, L3..." 
            value={labs}
          />

          {circles[0] && <HeaderInput onClick={ChangeheaderInput} label="Input the header file" placeholder="" />}
          {circles[1] && <HeaderInput onClick={ChangefooterInput} label="Input the Footer file" placeholder="" />}
          {circles[2] && <HeaderInput onClick={ChangeconfigInput} label="Enter your config json file" placeholder="" />}
          {circles[3] && (
            <ExtraAddOnInput 
            classes={classrooms}
            lab={labs}
              addOns={addOns} 
              handleInputChange={handleInputChange} 
              handleAddInput={handleAddInput} 
            />
          )}

  <KeyValueComponent 
  keyValuePairsConfig={keyValuePairs} 
  onKeySubmit={setKeyValuePairs} 
   />

          <div className="flex space-x-4">
            <button
              onClick={handleButtonClick}
              className="px-10 border border-white/20 py-2 bg-indigo-600 text-white font-semibold rounded-lg mt-5 hover:bg-indigo-500"
            >
              Generate
            </button>

            <button
              onClick={handleSaveConfig}
              className="px-10 border border-white/20 py-2 bg-gray-700 text-white font-semibold rounded-lg mt-5 hover:bg-gray-600"
            >
              Save Config
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;


const InputSection = ({ label, placeholder, onClick, value }) => {
  const handleChange = (e) => {
    onClick(e.target.value);
  };

  return (
    <div className="w-full px-6">
      <label className="block text-white mb-2">{label}</label>
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

const ConfigInput = ({ click,label, placeholder }) => {
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
          onChange={(e)=>click(e.target.files[0])}
          style={inputStyle}
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

