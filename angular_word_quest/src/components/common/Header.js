import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import Navigation from './Navigation';

/**
 * Header component with logo, navigation, and user information
 */
const Header = () => {
  const { state } = useGame();
  const { user } = state;

  return (
    <header className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link to="/" className="logo">
            <span className="logo-symbol">A</span> AngularWordQuest
          </Link>
          
          <Navigation />
          
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-level">Level {user.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
