import React from 'react';
import { useGame } from '../../contexts/GameContext';

/**
 * HangmanDisplay component shows the hangman visualization based on incorrect guesses
 */
const HangmanDisplay = () => {
  const { state } = useGame();
  const { incorrectGuesses } = state;
  
  // SVG parts to reveal based on incorrect guesses (0-6)
  const hangmanParts = [
    <circle key="head" cx="200" cy="80" r="20" className="hangman-part" />, // head
    <line key="body" x1="200" y1="100" x2="200" y2="150" className="hangman-part" />, // body
    <line key="left-arm" x1="200" y1="120" x2="170" y2="140" className="hangman-part" />, // left arm
    <line key="right-arm" x1="200" y1="120" x2="230" y2="140" className="hangman-part" />, // right arm
    <line key="left-leg" x1="200" y1="150" x2="180" y2="190" className="hangman-part" />, // left leg
    <line key="right-leg" x1="200" y1="150" x2="220" y2="190" className="hangman-part" /> // right leg
  ];
  
  // Base structure always visible
  const baseStructure = (
    <>
      <line x1="50" y1="250" x2="250" y2="250" strokeWidth="3" stroke="#444" /> {/* base */}
      <line x1="100" y1="250" x2="100" y2="30" strokeWidth="3" stroke="#444" /> {/* pole */}
      <line x1="100" y1="30" x2="200" y2="30" strokeWidth="3" stroke="#444" /> {/* top */}
      <line x1="200" y1="30" x2="200" y2="60" strokeWidth="3" stroke="#444" /> {/* noose */}
    </>
  );

  return (
    <div className="hangman-display">
      <svg width="300" height="250" viewBox="0 0 300 250">
        {baseStructure}
        {hangmanParts.slice(0, incorrectGuesses).map(part => part)}
      </svg>
      <div className="guesses-info">
        <span>Incorrect guesses: {incorrectGuesses}/6</span>
      </div>
    </div>
  );
};

export default HangmanDisplay;
