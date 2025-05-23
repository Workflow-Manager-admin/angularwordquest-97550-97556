import React from 'react';
import { useGame } from '../contexts/GameContext';
import Button from '../components/common/Button';

/**
 * ProfilePage component displays user profile and game statistics
 */
const ProfilePage = () => {
  const { state, updateUser } = useGame();
  const { user, stats } = state;
  
  const handleNameChange = (e) => {
    updateUser({ name: e.target.value });
  };
  
  const handleThemeChange = (theme) => {
    updateUser({ 
      preferences: {
        ...user.preferences,
        theme
      }
    });
  };
  
  const handleDifficultyChange = (difficulty) => {
    updateUser({ 
      preferences: {
        ...user.preferences,
        difficulty
      }
    });
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>User Profile</h1>
        
        <div className="profile-content">
          <div className="profile-section">
            <h2>Player Details</h2>
            
            <div className="profile-form">
              <div className="form-group">
                <label>Display Name</label>
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={handleNameChange}
                />
              </div>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-label">Level</div>
                  <div className="stat-value">{user.level}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Experience</div>
                  <div className="stat-value">{user.experience} XP</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Game Statistics</h2>
            
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
                <div className="stat-label">Current Streak</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">{stats.totalScore}</div>
                <div className="stat-label">Total Score</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">{stats.gamesPlayed || (stats.wins + stats.losses)}</div>
                <div className="stat-label">Games Played</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">
                  {stats.gamesPlayed ? 
                    Math.round((stats.wins / stats.gamesPlayed) * 100) : 0}%
                </div>
                <div className="stat-label">Win Rate</div>
              </div>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Preferences</h2>
            
            <div className="preferences-container">
              <div className="preference-group">
                <label>Theme</label>
                <div className="button-group">
                  <Button 
                    variant={user.preferences.theme === 'dark' ? 'primary' : 'secondary'}
                    onClick={() => handleThemeChange('dark')}
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={user.preferences.theme === 'light' ? 'primary' : 'secondary'}
                    onClick={() => handleThemeChange('light')}
                  >
                    Light
                  </Button>
                </div>
              </div>
              
              <div className="preference-group">
                <label>Game Difficulty</label>
                <div className="button-group">
                  <Button 
                    variant={user.preferences.difficulty === 'easy' ? 'primary' : 'secondary'}
                    onClick={() => handleDifficultyChange('easy')}
                  >
                    Easy
                  </Button>
                  <Button 
                    variant={user.preferences.difficulty === 'normal' ? 'primary' : 'secondary'}
                    onClick={() => handleDifficultyChange('normal')}
                  >
                    Normal
                  </Button>
                  <Button 
                    variant={user.preferences.difficulty === 'hard' ? 'primary' : 'secondary'}
                    onClick={() => handleDifficultyChange('hard')}
                  >
                    Hard
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Achievements</h2>
            
            <div className="achievements-list">
              {user.achievements.length === 0 ? (
                <div className="empty-achievements">
                  No achievements yet. Keep playing to earn achievements!
                </div>
              ) : (
                <div className="achievements-grid">
                  {user.achievements.map(achievement => (
                    <div key={achievement.id} className="achievement-item">
                      <div className="achievement-icon">{achievement.icon}</div>
                      <div className="achievement-info">
                        <div className="achievement-name">{achievement.name}</div>
                        <div className="achievement-description">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
