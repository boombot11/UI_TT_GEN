import { useState } from "react";

// Key-Value Input Component
const KeyValueInput = ({ keyValuePairs, handleInputChange, handleAddInput, handleSubmit }) => {
  const inputStyle = {
    width: "48%",
    paddingLeft: "1.25rem", // pl-5
    marginTop: "1rem", // mt-4
    height: "2.5rem", // h-10
    borderRadius: "0.5rem", // rounded-lg
    backgroundColor: "#111827", // bg-gray-900/80
    border: "1px solid #6b7280", // border-gray-600
    opacity: 0.6, // placeholder:opacity-60
    color: "white",
    fontSize: "1rem", // for better readability
  };

  const buttonStyle = (color) => ({
    color: "white",
    marginTop: "1rem", // mt-2
    padding: "0.5rem 1.25rem", // px-5 py-2
    borderRadius: "0.5rem", // rounded-lg
    backgroundColor: color,
    cursor: "pointer",
  });

  return (
    <div
      style={{
        maxHeight: "60vh",
        backdropFilter:"blur(10px)",
        width:"100vh", // Set height to 40% of the screen height
        overflowY: "auto", // Make it scrollable if content exceeds the height
        padding: "1rem", // Add padding for better spacing
        
        borderRadius: "1rem", // Rounded corners for the container
      
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow for some depth
      }}
    >
      {keyValuePairs.map((pair, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#1f2937",
            display: "flex",
            width: "100%",
            padding: "2rem",
            borderRadius: "1rem",
            marginBottom: "1rem",
            border: "1px solid #6b7280",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#e5e7eb", width: "100%" }}>
              Name full forms submission {index + 1}
            </p>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <input
                type="text"
                value={pair.key}
                onChange={(e) => {
                  console.log(`Input changed for key at index ${index}:`, e.target.value);
                  handleInputChange(index, 'key', e.target.value);
                }}
                placeholder="Key"
                style={inputStyle} // Neutral grey input style
              />
              <input
                type="text"
                value={pair.value}
                onChange={(e) => {
                  console.log(`Input changed for value at index ${index}:`, e.target.value);
                  handleInputChange(index, 'value', e.target.value);
                }}
                placeholder="Value"
                style={inputStyle} // Neutral grey input style
              />
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={handleAddInput}
          style={buttonStyle("#4f46e5")} // bg-indigo-600
        >
          + Add More
        </button>
        <button
          onClick={handleSubmit}
          style={buttonStyle("#4f46e5")} // bg-indigo-600
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Add the custom scrollbar styles
const customScrollbarStyles = `
  /* Custom Scrollbar for the KeyValueInput container */
  div[style*="overflow-y: auto"] {
    scrollbar-width: thin;
    scrollbar-color: #4f46e5 #1f2937; /* thumb and track color */
  }

  div[style*="overflow-y: auto"]::-webkit-scrollbar {
    width: 8px; /* Slimmer scrollbar */
  }

  div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
    background-color: #4f46e5; /* Blue thumb */
    border-radius: 8px;
  }

  div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
    background-color: #1f2937; /* Track background */
    border-radius: 8px;
  }

  div[style*="overflow-y: auto"]::-webkit-scrollbar-button {
    background-color: #4f46e5; /* Button color (if any) */
    display: none; /* Hide button */
  }
`;

// Insert custom scrollbar styles into the document head
const insertCustomScrollbarStyles = () => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = customScrollbarStyles;
  document.head.appendChild(styleTag);
};

// Automatically insert the custom styles on component mount
insertCustomScrollbarStyles();


// Main Component
const KeyValueComponent = ({onKeySubmit}) => {
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', value: '' }]);

  const handleInputChange = (index, field, value) => {
    console.log(`Input changed for ${field} at index ${index}:`, value);
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index][field] = value;
    setKeyValuePairs(updatedPairs);
  };

  const handleAddInput = () => {
    console.log("Adding new key-value pair");
    setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
  };

  const handleSubmit = () => {
    const jsonOutput = keyValuePairs.reduce((acc, pair) => {
      if (pair.key && pair.value) {
        acc[pair.key] = pair.value;
      }
      return acc;
    }, {});
console.log('finalllllllllllllllllllll');
console.log(jsonOutput);
   onKeySubmit(jsonOutput);
  };

  return (
    <div className="p-8">
      <KeyValueInput
        keyValuePairs={keyValuePairs}
        handleInputChange={handleInputChange}
        handleAddInput={handleAddInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default KeyValueComponent;
