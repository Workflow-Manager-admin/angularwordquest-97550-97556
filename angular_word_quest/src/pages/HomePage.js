import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage component displays the main landing page of the app
 */
const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="subtitle">Welcome to</div>
        
        <h1 className="title">WordQuest</h1>
        
        <div className="description">
          A fun and challenging word guessing game with multiple modes and categories!
        </div>
        
        <Link to="/play" className="btn btn-large">
          Start Playing
        </Link>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Game Features</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>Multiple Game Modes</h3>
              <p>Play classic mode, time attack, or category challenges</p>
            </div>
            
            <div className="feature-card">
              <h3>Word Categories</h3>
              <p>Challenge yourself with words from different categories</p>
            </div>
            
            <div className="feature-card">
              <h3>Track Progress</h3>
              <p>Level up and earn achievements as you play</p>
            </div>
            
            <div className="feature-card">
              <h3>Custom Words</h3>
              <p>Add your own words and categories in the admin area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
