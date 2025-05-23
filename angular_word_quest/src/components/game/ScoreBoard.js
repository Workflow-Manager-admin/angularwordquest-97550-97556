import React from 'react';
import { useGame } from '../../contexts/GameContext';

/**
 * ScoreBoard component displays current game statistics
 */
const ScoreBoard = () => {
  const { state } = useGame();
  const { stats, currentMode } = state;
  
  return (
    <div className="scoreboard">
      <h3>Game Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.wins}</div>
          <div className="stat-label">Wins</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.losses}</div>
          <div className="stat-label">Losses</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Streak</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.totalScore}</div>
          <div className="stat-label">Score</div>
        </div>
      </div>
      
      {currentMode === 'time-attack' && stats.bestTime && (
        <div className="best-time">
          <span>Best Time: {stats.bestTime}s</span>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
