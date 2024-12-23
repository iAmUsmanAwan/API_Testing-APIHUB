import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('');      // userId: Stores the input value for the user ID which will be inputed manually.
  const [user, setUser] = useState(null);        // user: Stores the fetched user's details.
  const [loading, setLoading] = useState(false); // loading: Indicates whether the app is currently fetching data from the API.
  const [error, setError] = useState(null);      // error: Holds any error messages if the fetch request fails.

  const fetchUserById = async () => {
    if (!userId) {
      setError('Please enter a valid user ID.');
      return;
    }

    const maxId = 500; // Defined the maximum valid ID by the testing of the API in 1000 range

    if (parseInt(userId, 10) > maxId || parseInt(userId, 10) < 1) {
      setError(`Please enter a User ID within the range of 1 to ${maxId}.`);
      return;
    }

    setLoading(true);   // Show the loading on the Button
    setError(null);     // Reset any previous error messages
    setUser(null);      // Reset user data from previous searches

    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/randomusers/${userId}`);

      if (response.data && response.data.data) {
        setUser(response.data.data);   // Save the fetched user data
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('Failed to fetch user. Please try again.');
    } finally {
      setLoading(false);  // Hide the loading
    }
  };

  return (
    <div className='rounded text-3xl mx-auto ml-10 container py-10 px-10 min-w-full justify-self-center'>
      <h1 className='rounded text-6xl mx-auto ml-10'>User Search by ID</h1>
      <h3>Maximum valid ID: 500</h3>
      <hr /> {"      "}
      <hr /> {"      "}
      <hr /> {"      "}
      
      <div className="my-4">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={fetchUserById}
          className=' bg-violet-600 text-white hover:bg-blue-400 font-bold py-2 px-4 ml-2 rounded items-center'
        >
          {loading ? 'Searching...' : 'Search User'}
        </button>
      </div>

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
