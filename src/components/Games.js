import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  return (
    <div className="games-page">
      <h1>Explore Games</h1>
      <div className="games-container">
        <div className="game-item">
          <Link to="/fruit-cutter">
            <img src="/images/Fruitcutter.jpeg" alt="Fruit Cutter" />
            <h3>Fruit Cutter</h3>
          </Link>
        </div>
        <div className="game-item">
          <Link to="/quiz">
            <img src="/images/quiz.jpeg" alt="Quiz" />
            <h3>Quiz</h3>
          </Link>
        </div>
        <div className="game-item">
          <Link to="/puzzle">
            <img src="/images/puzzle.jpeg" alt="Puzzle" />
            <h3>Puzzle Game</h3>
          </Link>
        </div>
        <div className="game-item">
          <Link to="/easter-egg">
            <img src="/images/EGG.png" alt="Easter Egg" />
            <h3>Easter Egg Hunt</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;
