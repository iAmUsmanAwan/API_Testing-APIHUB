import React, { useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('user.email@domain.com');  // Store the email entered by the user
  const [responseMessage, setResponseMessage] = useState('');  // Store the API response message
  const [loading, setLoading] = useState(false);  // Show loading indicator during the request

  const sendForgotPasswordRequest = async () => {
    if (!email) {
      setResponseMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true); // Start loading animation or indicator
    const url = 'https://api.freeapi.app/api/v1/users/forgot-password';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),  // Send the email in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);  // Success message from the server
      } else {
        setResponseMessage(data.message);  // Error message from the server
      }

    } catch (error) {
      setResponseMessage('Request failed: ' + error.message);  // Handle any other errors
    } finally {
      setLoading(false);  // Stop loading animation or indicator
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => { e.preventDefault(); sendForgotPasswordRequest(); }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}  {/* Display response message */}
    </div>
  );
};

export default App;
