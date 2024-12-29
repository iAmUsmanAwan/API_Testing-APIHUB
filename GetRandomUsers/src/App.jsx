import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);       // Stores the fetched random user's details
  const [loading, setLoading] = useState(false);// Indicates whether the app is currently fetching data
  const [error, setError] = useState(null);     // Holds error messages
  const [page, setPage] = useState(1);          // Page number to fetch data from the API
  const [limit, setLimit] = useState(20);       // Number of items to fetch per page

  const fetchRandomUser = async () => {
    setLoading(true);     // Show loading state
    setError(null);       // Reset error messages

    function getRandomNumber(min, max) {
      if (max === 20) max--; // Adjust max to exclude 20
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=${limit}`, { 
      headers: {
        'Accept': 'application/json', // Add any necessary headers here
        //* 'Authorization': 'Bearer <your_token>',  // Example if needed for authorization
      }
    });
      const randomUser = response.data.data.data[getRandomNumber(0, limit - 1)]; // Random user from current page
      setUser(randomUser);
    
    } catch (err) {
      setError('Failed to fetch user. Please try again.');
    
    } finally {
      setLoading(false);
    }
  };

  // Handle Next Page
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setUser(null); // Reset user data when changing the page
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1)); // Ensure page doesn't go below 1
    setUser(null); // Reset user data when changing the page
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-10'>
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-4">Random User Generator</h1>
        <hr className="border-t-2 border-gray-300 my-4" />
        
        <div className="flex justify-center items-center gap-4 my-4">
          <button
            onClick={handlePreviousPage}
            className='bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400'
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span className="font-semibold">Page {page}</span>
          <button
            onClick={handleNextPage}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Next Page
          </button>
        </div>

        <button
          onClick={fetchRandomUser}
          className='bg-violet-600 text-white hover:bg-violet-700 font-bold py-2 px-6 rounded-full w-full mt-4'
        >
          {loading ? 'Loading...' : 'Get Random User'}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {user && (
          <div className="mt-6 text-center">
            <img
              src={user.picture.large}
              alt="User Avatar"
              className="rounded-full mx-auto mb-4 shadow-lg"
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
            <h2 className="text-2xl font-semibold text-gray-800">{user.name.title} {user.name.first} {user.name.last}</h2>
            <p className="text-lg text-gray-600 mt-2">Email: {user.email}</p>
            <p className="text-lg text-gray-600">Location: {user.location.city}, {user.location.country}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;