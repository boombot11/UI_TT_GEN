import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline"; // Import Heroicon Trash icon

const Config = () => {
  return (
    <>
      {/* Background Shapes (Fixed) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        {/* Add your background shapes here */}
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-indigo-900 to-black flex items-center justify-center py-10">
        <div className="relative flex flex-col pt-20 justify-center w-full max-w-lg space-y-10">
          <ModifyConfig />
        </div>
      </div>
    </>
  );
};

export default Config;

const ModifyConfig = () => {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch configs when component mounts
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await fetch("getForm");
        if (!response.ok) {
          throw new Error("Failed to fetch config data");
        }
        const data = await response.json();
        setConfigs(data);
      } catch (err) {
        console.error("Error fetching config data:", err);
        setError("Could not load config data.");
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  // Handle click to navigate to a specific config process
  const handleConfigClick = (configTitle) => {
    navigate(`/upload/process-file/?title=${configTitle}`);
  };

  // Handle deleting the config
  const handleDeleteConfig = async (configTitle) => {
    try {
      const response = await fetch("/deleteForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: configTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete config");
      }

      // Remove the deleted config from the UI state
      setConfigs((prevConfigs) =>
        prevConfigs.filter((config) => config.title !== configTitle)
      );
    } catch (err) {
      console.error("Error deleting config:", err);
      setError("Could not delete the config.");
    }
  };

  return (
    <div className="bg-gray-800/90 w-full md:w-[95%] lg:w-[80%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10 flex flex-col items-center">
      <p className="text-white text-xl font-semibold mb-6">Select Config</p>

      {/* Configs Section */}
      <div className="flex flex-col justify-center space-y-4 w-full mb-6">
        {loading ? (
          <p className="text-white text-center">Loading configs...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : configs.length === 0 ? (
          <p className="text-white text-center">No configs available</p>
        ) : (
          configs.map((config, index) => (
            <div
              key={index}
              className="bg-gray-700/90 text-center p-4 rounded-lg shadow-lg border-2 border-gray-600 flex-1 min-w-[200px] relative"
            >
              <p
                onClick={() => handleConfigClick(config.title)}
                className="text-white cursor-pointer"
              >
                {config.title}
              </p>

              {/* Delete Icon */}
              <button
                onClick={() => handleDeleteConfig(config.title)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Custom Config Button */}
      <button
        onClick={() => navigate("/upload/process-file")}
        className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 mt-4"
      >
        Custom Config
      </button>
    </div>
  );
};
