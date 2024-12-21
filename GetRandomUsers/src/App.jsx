import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);       // user: Stores the fetched random user's details.
  const [loading, setLoading] = useState(false);             // loading: Indicates whether the app is currently fetching data from the API.
  const [error, setError] = useState(null);      // error: Holds any error messages if the fetch request fails.

  const fetchRandomUser = async () => {
    setLoading(true);     // Show the loading on the Button
    setError(null);     // Reset any previous error messages

    function getRandomNumber(min, max) {
      if (max === 20) {
        max--; // Decrease max by 1 to exclude 20
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    try {
      const response = await axios.get('https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=20');

      const randomUser = response.data.data.data[getRandomNumber(0, 20)];     // data is the array we get from the API, which is also part of the data object
      setUser(randomUser);      // Save the randomly fetched person data to the user
    } catch (err) {
      setError('Failed to fetch user. Please try again.');
    } finally {
      setLoading(false);    // hide the loading
    }
  };

  return (
    <div className='rounded text-3xl mx-auto ml-10 container py-10 px-10 min-w-full justify-self-center'>
      <h1 className='rounded text-6xl mx-auto ml-10'>Random User Generator</h1>
      <hr/> {"      "}
      <hr/> {"      "}
      <hr/> {"      "}
      <button onClick={fetchRandomUser} className=' bg-violet-600 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded items-center'>
        {loading ? 'Loading...' : 'Get Random User'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{ marginTop: '20px' }}>
          <img
            src={user.picture.large}
            alt="User Avatar"
            style={{ borderRadius: '50%', marginBottom: '10px' }}
          />
          <h2>
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p>Email: {user.email}</p>
          <p>Location: {user.location.city}, {user.location.country}</p>
        </div>
      )}
    </div>
  );
}

export default App;
