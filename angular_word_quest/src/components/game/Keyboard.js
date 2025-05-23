import React from 'react';
import { useGame } from '../../contexts/GameContext';
import Button from '../common/Button';

/**
 * Keyboard component for letter input during the game
 */
const Keyboard = () => {
  const { state, makeGuess } = useGame();
  const { guessedLetters, gameStatus } = state;
  
  // Create the keyboard rows
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // Handle letter click
  const handleLetterClick = (letter) => {
    if (gameStatus === 'playing' && !guessedLetters.includes(letter.toLowerCase())) {
      makeGuess(letter.toLowerCase());
    }
  };

  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter.toLowerCase());
            const isCorrectGuess = state.currentWord.toLowerCase().includes(letter.toLowerCase()) && isGuessed;
            const isDisabled = isGuessed || gameStatus !== 'playing';
            
            let buttonVariant = 'secondary';
            if (isGuessed) {
              buttonVariant = isCorrectGuess ? 'success' : 'danger';
            }
            
            return (
              <Button
                key={letter}
                variant={buttonVariant}
                size="small"
                disabled={isDisabled}
                onClick={() => handleLetterClick(letter)}
                className="keyboard-key"
              >
                {letter}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
