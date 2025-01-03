import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); // Stores the fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error messages
  const [apiUrl, setApiUrl] = useState(''); // API URL entered by the user

  const fetchData = async () => {
    if (!apiUrl.trim()) {
      setError('Please enter a valid API URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null); // Clear previous data

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Accept: 'application/json',
        },
      });

      setData(response.data); // Store the response data
    } catch (err) {
      setError('Failed to fetch data. Please check the API URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
        📜 API Data Fetcher
        </h1>
        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="flex flex-col items-center">
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Enter API URL..."
            className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchData}
            className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full w-full shadow-md transform transition-transform hover:scale-105"
          >
            Fetch Data of this API
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-6 animate-pulse">
            Loading...
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}

        <div className="mt-10 overflow-x-auto">
          {data ? (
            <pre className="bg-gray-100 p-4 rounded-md shadow-md">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            !loading &&
            !error && (
              <p className="text-gray-500 text-center">
                Enter a valid API URL to fetch data.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
