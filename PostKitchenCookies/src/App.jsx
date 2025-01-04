import React, { useState } from "react";
import axios from "axios";

function App() {
  const [key, setKey] = useState(""); // State to store the key
  const [value, setValue] = useState(""); // State to store the value
  const [response, setResponse] = useState(null); // Store API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const postData = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = { [key]: value }; // Dynamic data to be sent
      const response = await axios.post(
        "https://api.freeapi.app/api/v1/kitchen-sink/cookies/set",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data); // Store the response
    } catch (err) {
      setError("Failed to send data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          🍪 POST Cookies API
        </h1>
        <hr className="border-t-2 border-gray-300 my-4" />

        {/* Input Fields */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Enter Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={postData}
          className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full w-full shadow-md transform transition-transform hover:scale-105"
        >
          Send Data
        </button>

        {/* Loading Indicator */}
        {loading && (
          <p className="text-center text-gray-500 mt-6 animate-pulse">
            Sending data...
          </p>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}

        {/* Response Display */}
        {response && (
          <div className="mt-10 overflow-x-auto">
            <h2 className="text-lg font-bold mb-4">Response:</h2>
            <pre className="bg-gray-100 p-4 rounded-md shadow-md">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
