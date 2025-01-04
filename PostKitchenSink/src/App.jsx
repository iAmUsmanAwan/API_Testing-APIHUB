import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [dataToSend, setDataToSend] = useState(''); // Input data to send
  const [response, setResponse] = useState(null); // Response from API
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error messages

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post(
        'https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post',
        dataToSend,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse(response.data); // Store the response
    } catch (err) {
      setError('Failed to send data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          📨 POST Data API
        </h1>
        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="flex flex-col items-center">
          <textarea
            value={dataToSend}
            onChange={(e) => setDataToSend(e.target.value)}
            placeholder="Enter JSON data to send..."
            className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={6}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full w-full shadow-md transform transition-transform hover:scale-105"
          >
            Send Data
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-6 animate-pulse">
            Sending data...
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}
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
