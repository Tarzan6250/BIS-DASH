import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = ({ username }) => {
  const [age, setAge] = useState("");
  const [college, setCollege] = useState(""); // College name from the database
  const [profilePic, setProfilePic] = useState(1); // Store profile picture number
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const profilePicOptions = [
    "/images/ryuken.jpg",
    "/images/hinata.jpg",
    "/images/Dragon.jpg",
    "/images/Goku.jpg",
  ];

  useEffect(() => {
    if (!username) {
      setMessage("Username is required to load profile details.");
      return;
    }

    const fetchUserDetails = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(`http://localhost:5000/user/details/${username}`);
        console.log("Response from server:", response.data); // Log the server response

        if (response.data.success) {
          const user = response.data.user;
          setAge(user.age);
          setCollege(user.college); // Set the fetched college name
          setProfilePic(user.profilePic || 1); // Default to first picture if not set
        } else {
          setMessage("Error fetching user details: " + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setMessage("An error occurred while fetching user details.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    if (!username) {
      setMessage("Username is required to update details.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/user/details", {
        username,
        age,
        college,
        profilePic,
      });

      if (response.data.success) {
        setMessage("Details updated successfully!");
        setIsEditing(false);
      } else {
        setMessage(response.data.message || "Error updating details.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Profile</h2>
      <div className="profile-content">
        {isLoading ? (
          <p>Loading your profile...</p> // Display loading message
        ) : (
          <>
            <img
              className="profile-pic"
              src={profilePicOptions[profilePic - 1]}
              alt="Profile"
              width="120"
              height="120"
            />
            {isEditing ? (
              <form className="profile-form" onSubmit={handleUpdateDetails}>
                <div className="form-group">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="College"
                    required
                  />
                </div>
                <div className="form-group">
                  <p className="profile-pic-selection-text">Select Profile Picture:</p>
                  <div className="profile-pic-options">
                    {profilePicOptions.map((pic, index) => (
                      <img
                        key={index}
                        src={pic}
                        alt={`Pic ${index + 1}`}
                        className={`profile-pic-option ${profilePic === index + 1 ? "selected" : ""}`}
                        onClick={() => setProfilePic(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <button type="submit" className="update-button">Update Details</button>
              </form>
            ) : (
              <div className="profile-details">
                <p><strong>Username:</strong> {username}</p> {/* Display the username */}
                <p><strong>Age:</strong> {age}</p>
                <p><strong>College:</strong> {college}</p> {/* Display the college name */}
                <button onClick={() => setIsEditing(true)} className="edit-button">Edit Details</button>
              </div>
            )}
          </>
        )}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
