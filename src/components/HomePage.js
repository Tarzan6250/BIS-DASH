import React from 'react';
import './HomePage.css'; // Link to CSS file

const HomePage = ({ profilePic }) => {
  return (
    <div className="homepage">
      {/* Welcome Section */}
      <div className="welcome">
        <h1>Welcome to BIS ARENA</h1>
        <p>Your hub for exciting games and interactive challenges.</p>
        <button className="cta-btn">Start Playing</button>
      </div>

      {/* Games Section */}
      <div className="games-section">
        <h2>Explore And Face Challenges</h2>
        <div className="games-container">
          <div className="game-card">
            <img src="/images/Fruitcutter.jpeg" alt="Fruit Cutter" />
            <h3>Fruit Cutter</h3>
            <p>Test your reflexes and knowledge in this fun fruit-cutting game.</p>
          </div>
          <div className="game-card">
            <img src="/images/Leaderboard.jpeg" alt="Leaderboard" />
            <h3>Leaderboard</h3>
            <p>Compete with others and climb to the top of the leaderboard.</p>
          </div>
          <div className="game-card">
            <img src="/images/EGG.png" alt="Easter Egg" />
            <h3>Easter Egg Hunt</h3>
            <p>Find all the hidden eggs to earn exclusive rewards.</p>
          </div>
          <div className="game-card">
            <img src="/images/puzzle.jpeg" alt="Puzzle Game" />
            <h3>Puzzle Game</h3>
            <p>Solve puzzles to score points and challenge your friends.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>
          BIS Arena is an interactive platform designed to provide an engaging experience for users. It offers exciting features like fun games, a leaderboard for friendly competition, an Easter Egg Hunt, and video-based learning. With a modern design and smooth navigation, the website ensures an enjoyable and seamless experience for everyone.
        </p>
        <p className="rights">&copy; {new Date().getFullYear()} BIS ARENA. All Rights Reserved.</p>
      </footer>
    </div>
    
  );
};

export default HomePage;
