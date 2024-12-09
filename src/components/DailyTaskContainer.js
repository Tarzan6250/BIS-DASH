// DailyTaskContainer.js

import React, { useState, useEffect } from 'react';
import './styles.css'; // If you have separate CSS for the tasks

const Mission = ({ task, onComplete }) => {
  const [startTime, setStartTime] = useState(null);

  const handlePlay = () => {
    setStartTime(new Date());
    onComplete(task.id, startTime);
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Fruit Cutter':
        return <img src="/images/fruit_cutter.jpg" alt="Fruit Cutter" className="task-icon" />;
      case 'Puzzle':
        return <img src="/images/puzzle.jpg" alt="Puzzle" className="task-icon" />;
      case 'Easter Eggs':
        return <img src="/images/quiz.jpg" alt="Easter Eggs" className="task-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`mission ${task.completed ? 'completed' : ''}`}>
      <div className="mission-left">
        {getIcon(task.name)}
      </div>
      <div className="mission-details">
        <h3 className="mission-name">
          {task.name}
          {task.completed && <span className="checkmark">✔</span>}
        </h3>
        {task.completed && (
          <p className="mission-time">
            Time: {task.time}
          </p>
        )}
      </div>
      <button
        onClick={() => { if (!task.completed) handlePlay(); }}
        disabled={task.completed}
        className="play-btn"
      >
        {task.completed ? 'Completed' : 'Play'}
      </button>
    </div>
  );
};

const DailyTaskContainer = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Fruit Cutter', file: '/fruit-cutter', completed: false, time: null },
    { id: 2, name: 'Puzzle', file: '/puzzle', completed: false, time: null },
    { id: 3, name: 'Easter Eggs', file: '/easter-eggs', completed: false, time: null },
  ]);

  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [currentBadge, setCurrentBadge] = useState('');

  useEffect(() => {
    const checkAllCompleted = tasks.every(task => task.completed);
    setAllTasksCompleted(checkAllCompleted);

    if (checkAllCompleted) {
      const today = new Date().getDate(); // Get the day of the month
      const badgeIndex = today % 3 + 1; // Rotate through 3 badges (badge1, badge2, badge3)
      setCurrentBadge(`/images/badges/badge${badgeIndex}.jpg`);
    }
  }, [tasks]);

  const handleComplete = (id, startTime) => {
    const endTime = new Date();
    const timeDiff = endTime - startTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: true, time: `${hours} hr ${remainingMinutes} min ${remainingSeconds} sec` }
          : task
      )
    );

    setTimeout(() => {
      setTasks(prevTasks =>
        prevTasks.map(task => ({ ...task, completed: false, time: null }))
      );
    }, 24 * 60 * 60 * 1000);
  };

  return (
    <div className="task-container">
      <h2 className="header">Daily Missions</h2>
      {tasks.map(task => (
        <Mission key={task.id} task={task} onComplete={handleComplete} />
      ))}

      {allTasksCompleted && (
        <div className="badge-container">
          <h3>Congratulations! You Earned Today's Badge</h3>
          <img src={currentBadge} alt="Today's Badge" className="badge-image" />
        </div>
      )}
    </div>
  );
};

export default DailyTaskContainer;
