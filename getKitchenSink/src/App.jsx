import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); // Stores the fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error messages
  const [showData, setShowData] = useState(false); // Toggles data visibility

  // Fetch data when "Show Data" button is clicked
  useEffect(() => {
    if (showData) fetchData();
  }, [showData]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.freeapi.app/api/v1/kitchen-sink/http-methods/get',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      setData(response.data); // Store the response data
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDataVisibility = () => {
    setShowData((prevShowData) => !prevShowData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-red-800 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
        📜 API Data Viewer 
        </h1>
        <hr className="border-t-2 border-gray-300 my-4" />

        <button
          onClick={toggleDataVisibility}
          className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full w-full shadow-md transform transition-transform hover:scale-105"
        >
          {showData ? 'Hide Data 📕' : 'Show Data 📃'}
        </button>

        {loading && (
          <p className="text-center text-gray-500 mt-6 animate-pulse">
            Loading...
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}

        {showData && (
          <div className="mt-10 overflow-x-auto">
            {data ? (
              <pre className="bg-gray-100 p-4 rounded-md shadow-md">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500 text-center">No data available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
