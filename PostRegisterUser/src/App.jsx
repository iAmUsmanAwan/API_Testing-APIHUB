import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "ADMIN", // Default role is ADMIN
    username: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Submit form data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "https://api.freeapi.app/api/v1/users/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(`User registered successfully: ${JSON.stringify(response.data)}`);
    } catch (err) {
      setError("Failed to register user. Please check your inputs and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Register User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        {responseMessage && <p className="text-green-600 mt-4">{responseMessage}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default App;
