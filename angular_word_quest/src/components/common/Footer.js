import React from 'react';

/**
 * Footer component with credits and information
 */
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} AngularWordQuest - A Hangman-style Word Game</p>
        <div className="footer-links">
          <a href="#rules">Game Rules</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
