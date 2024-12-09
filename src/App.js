import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Games from "./components/Games";
import Login from "./components/Login";

function App() {
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/120");
  const [user, setUser] = useState(null);

  // Handle user login by storing user data (username, etc.)
  const handleLogin = (userData) => {
    setUser(userData); // Save the user data on successful login
  };

  // Handle profile picture change
  const handleProfilePicChange = (newPicture) => {
    setProfilePic(newPicture);
  };

  return (
    <div className="app-container">
      {user ? (
        <>
          {/* Sidebar with profile picture */}
          <Sidebar profilePic={profilePic} />

          <div className="main-content">
            {/* Routes for logged-in users */}
            <Routes>
              <Route path="/" element={<HomePage profilePic={profilePic} />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    username={user.username} // Pass the username prop to Profile
                    onProfilePicChange={handleProfilePicChange}
                    profilePic={profilePic}
                  />
                }
              />
              <Route path="/games" element={<Games />} />
              {/* Add any other routes for logged-in users here */}
            </Routes>
          </div>
        </>
      ) : (
        // Routes for users not logged in
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
