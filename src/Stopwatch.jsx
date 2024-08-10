import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('default');

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 100);
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => {
    setIsRunning(false);
    setHistory([...history, time]);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  const lapTimer = () => setLaps([...laps, time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);
  const changeTheme = (newTheme) => setTheme(newTheme);

  return (
    <div className={`stopwatch ${isDarkMode ? 'dark' : ''} ${theme}`}>
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startTimer} className="start-button" disabled={isRunning}>Start</button>
        <button onClick={stopTimer} className="stop-button" disabled={!isRunning}>Stop</button>
        <button onClick={resetTimer} className="reset-button">Reset</button>
        <button onClick={lapTimer} className="lap-button" disabled={!isRunning}>Lap</button>
      </div>
      <button onClick={toggleDarkMode} className="toggle-dark-mode">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="theme-buttons">
        <button onClick={() => changeTheme('colorful')} className="theme-button">Colorful Theme</button>
        <button onClick={() => changeTheme('pastel')} className="theme-button">Pastel Theme</button>
        <button onClick={() => changeTheme('contrast')} className="theme-button">Contrast Theme</button>
      </div>
      <div className="laps">
        <h2>Laps</h2>
        {laps.map((lap, index) => (
          <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
        ))}
      </div>
      <div className="history">
        <h2>History</h2>
        {history.map((time, index) => (
          <div key={index}>Time {index + 1}: {formatTime(time)}</div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
