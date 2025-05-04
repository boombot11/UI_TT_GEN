import React, { useState, useEffect } from 'react';

const FormDataTest = () => {
  // State for form input
  const [title, setTitle] = useState('');
  const [formData, setFormData] = useState({
    config_data: '',
    file: '',
    classrooms: '',
    labs: ''
  });
  const [formDataList, setFormDataList] = useState([]);

  // Handle saving form data
  const handleSaveFormData = async () => {
    if (!title || !formData.config_data) {
      alert('Title and form data are required!');
      return;
    }

    const formDataObject = {
      title,
      formData
    };

    try {
      const response = await fetch('http://localhost:5000/saveForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Form data saved successfully!');
        console.log(result);
        setTitle('');
        setFormData({ config_data: '', file: '', classrooms: '', labs: '' });
      } else {
        alert('Error saving form data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving form data');
    }
  };

  // Fetch all form data
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getForm');
        const data = await response.json();
        console.log('before fetch')
        console.log(data)
        if (response.ok) {
          setFormDataList(data);
        } else {
          alert('Error fetching form data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error fetching form data');
      }
    };

    fetchFormData();
  }, []); // Runs only once on component mount

  return (
    <div style={{ padding: '20px' }}>
      {/* First Half: Save Form Data */}
      <h2>Save Form Data</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          style={{ padding: '5px', margin: '10px 0' }}
        />
        <input
          type="text"
          value={formData.config_data}
          onChange={(e) => setFormData({ ...formData, config_data: e.target.value })}
          placeholder="Enter config data"
          style={{ padding: '5px', margin: '10px 0' }}
        />
        <input
          type="text"
          value={formData.file}
          onChange={(e) => setFormData({ ...formData, file: e.target.value })}
          placeholder="Enter file name"
          style={{ padding: '5px', margin: '10px 0' }}
        />
        <input
          type="text"
          value={formData.classrooms}
          onChange={(e) => setFormData({ ...formData, classrooms: e.target.value })}
          placeholder="Enter classrooms"
          style={{ padding: '5px', margin: '10px 0' }}
        />
        <input
          type="text"
          value={formData.labs}
          onChange={(e) => setFormData({ ...formData, labs: e.target.value })}
          placeholder="Enter labs"
          style={{ padding: '5px', margin: '10px 0' }}
        />
        <button
          onClick={handleSaveFormData}
          style={{
            padding: '10px 20px',
            margin: '10px 0',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Save Form Data
        </button>
      </div>

      {/* Second Half: Display All Saved Form Data */}
      <h2>Saved Form Data</h2>
      <div>
        {formDataList.length === 0 ? (
          <p>No form data available</p>
        ) : (
          formDataList.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
              <h3>{item.title}</h3>
              <pre>{JSON.stringify(item.data, null, 2)}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormDataTest;
