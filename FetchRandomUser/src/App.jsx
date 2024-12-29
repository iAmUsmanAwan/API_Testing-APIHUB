import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null); // Stores the fetched user's details.
  const [loading, setLoading] = useState(false); // Indicates whether data is being fetched.
  const [error, setError] = useState(null); // Holds error messages if the request fails.

  const fetchRandomUser = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors
    setUser(null); // Reset user data from previous fetches

    try {
      const response = await axios.get('https://api.freeapi.app/api/v1/public/randomusers/user/random', {
        headers: {
          accept: 'application/json',
        },
      });

      if (response.data && response.data.data) {
        setUser(response.data.data); // Save fetched user data
      } else {
        setError('Failed to retrieve user data.');
      }
    } catch (err) {
      setError('An error occurred while fetching the user. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='container mx-auto py-10 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Fetch a Random User</h1>
      <button
        onClick={fetchRandomUser}
        className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-400'
      >
        {loading ? 'Fetching...' : 'Get Random User'}
      </button>

      {error && <p className='text-red-600 mt-4'>{error}</p>}

      {user && (
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold'>
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className='text-lg'>Email: {user.email}</p>
          <p className='text-lg'>Location: {user.location.city}, {user.location.country}</p>
        </div>
      )}
    </div>
  );
}

export default App;
