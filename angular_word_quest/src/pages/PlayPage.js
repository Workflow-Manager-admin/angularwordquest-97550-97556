import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import HangmanDisplay from '../components/game/HangmanDisplay';
import WordDisplay from '../components/game/WordDisplay';
import Keyboard from '../components/game/Keyboard';
import ScoreBoard from '../components/game/ScoreBoard';
import Button from '../components/common/Button';

/**
 * PlayPage component for the main game interface
 */
const PlayPage = () => {
  const { state, startGame, resetGame } = useGame();
  const [selectedMode, setSelectedMode] = useState('classic');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  
  // Handle game initialization
  const handleStartGame = () => {
    if (selectedMode === 'category' && selectedCategory) {
      startGame(selectedMode, selectedCategory);
    } else {
      startGame(selectedMode);
    }
  };
  
  // Update mode and handle category selection visibility
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setShowCategorySelect(mode === 'category');
    if (mode !== 'category') {
      setSelectedCategory(null);
    }
  };

  // Get list of available categories from the word bank
  const categories = Object.keys(state.wordBank);
  
  return (
    <div className="play-page">
      <div className="container">
        {state.gameStatus === 'initial' ? (
          <div className="game-setup">
            <h1>Start a New Game</h1>
            
            <div className="game-options">
              <div className="mode-selector">
                <h2>Select Game Mode</h2>
                <div className="mode-buttons">
                  <Button 
                    variant={selectedMode === 'classic' ? 'primary' : 'secondary'}
                    onClick={() => handleModeChange('classic')}
                  >
                    Classic Mode
                  </Button>
                  <Button 
                    variant={selectedMode === 'time-attack' ? 'primary' : 'secondary'}
                    onClick={() => handleModeChange('time-attack')}
                  >
                    Time Attack
                  </Button>
                  <Button 
                    variant={selectedMode === 'category' ? 'primary' : 'secondary'}
                    onClick={() => handleModeChange('category')}
                  >
                    Category Challenge
                  </Button>
                </div>
              </div>
              
              {showCategorySelect && (
                <div className="category-selector">
                  <h2>Select Category</h2>
                  <div className="category-buttons">
                    {categories.map(category => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? 'primary' : 'secondary'}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="start-game-button">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={handleStartGame}
                  disabled={selectedMode === 'category' && !selectedCategory}
                >
                  Start Game
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-in-progress">
            <div className="game-header">
              <h1>{selectedMode === 'category' ? `Category: ${state.currentCategory}` : 'WordQuest'}</h1>
              {state.gameStatus !== 'playing' && (
                <div className="game-result">
                  <h2>{state.gameStatus === 'won' ? 'You Won!' : 'Game Over'}</h2>
                  {state.gameStatus === 'lost' && (
                    <p className="game-answer">The word was: <strong>{state.currentWord}</strong></p>
                  )}
                </div>
              )}
            </div>
            
            <div className="game-content">
              <div className="game-area">
                <HangmanDisplay />
                <WordDisplay />
                <Keyboard />
              </div>
              
              <div className="game-sidebar">
                <ScoreBoard />
                
                {state.gameStatus !== 'playing' && (
                  <div className="game-controls">
                    <Button variant="primary" size="large" onClick={handleStartGame}>
                      Play Again
                    </Button>
                    <Button variant="secondary" onClick={resetGame}>
                      Change Mode
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayPage;
