import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(""); // New state for age
  const [college, setCollege] = useState(""); // New state for college
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setMessage(""); // Clear any error/success message when switching forms
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/register" : "/login";

    const data = {
      username,
      password,
    };

    if (isRegistering) {
      // Add age and college if registering
      data.age = age;
      data.college = college;
    }

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);

      if (response.data.success) {
        setMessage(response.data.message); // Show the success message from the backend
        if (!isRegistering) {
          // For login, call onLogin and pass the user data
          onLogin(response.data.user); // Send the user data back to the parent component
        }
      } else {
        setMessage(response.data.message); // Show error message from the backend
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={handleFormSubmit}>
        {message && <p className="error-message">{message}</p>}

        <div className="input-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>

        {isRegistering && (
          <>
            <div className="input-group">
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter Age"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter College"
                required
              />
            </div>
          </>
        )}

        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>

        <button type="submit" className="login-button">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <p className="create-account">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={toggleForm}>
          {isRegistering ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

export default Login;
