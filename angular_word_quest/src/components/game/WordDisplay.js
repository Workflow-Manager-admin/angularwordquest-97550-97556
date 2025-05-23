import React from 'react';
import { useGame } from '../../contexts/GameContext';

/**
 * WordDisplay component shows the current word with guessed letters revealed
 */
const WordDisplay = () => {
  const { state } = useGame();
  const { currentWord, guessedLetters, gameStatus } = state;

  // Function to get display value for each letter
  const getLetterDisplay = (letter) => {
    if (letter === ' ') {
      return ' ';
    }
    
    const isRevealed = guessedLetters.includes(letter.toLowerCase()) || 
                       gameStatus === 'lost';
    
    return isRevealed ? letter : '_';
  };

  return (
    <div className="word-display">
      <div className="word-container">
        {currentWord.split('').map((letter, index) => (
          <span 
            key={index} 
            className={`word-letter ${letter === ' ' ? 'space' : ''}`}
          >
            {getLetterDisplay(letter)}
          </span>
        ))}
      </div>
      
      {state.currentCategory && (
        <div className="word-category">
          Category: <span>{state.currentCategory}</span>
        </div>
      )}
    </div>
  );
};

export default WordDisplay;
