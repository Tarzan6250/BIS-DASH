import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Correct imports for icons
import { Link } from 'react-router-dom'; // For navigation
import './Sidebar.css';

const Sidebar = ({ profilePic }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="sidebar-wrapper">
      {/* Toggle button */}
      <button
        className="toggle-btn"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
      </button>

      {/* Sidebar Content */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Profile Section */}
        <div className="sidebar-profile">
          <img src={profilePic} alt="User Profile" className="profile-img" />
          <h3 className="profile-name">User Name</h3>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-content">
          <ul>
            <li>
              <Link to="/" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/games" onClick={toggleSidebar}>
                Games
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={toggleSidebar}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
