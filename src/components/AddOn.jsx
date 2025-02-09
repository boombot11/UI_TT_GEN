
export const ExtraAddOnInput = ({ addOns, handleInputChange, handleAddInput }) => {
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
  
  
  
  
  