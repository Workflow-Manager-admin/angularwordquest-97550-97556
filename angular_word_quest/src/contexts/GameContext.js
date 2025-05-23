import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { initialGameState } from '../data/initialData';
import { syncWordBankWithSupabase } from '../utils/supabaseClient';

// Create the context
const GameContext = createContext();

// Action types
export const ACTIONS = {
  START_GAME: 'start_game',
  MAKE_GUESS: 'make_guess',
  END_GAME: 'end_game',
  CHANGE_MODE: 'change_mode',
  RESET_GAME: 'reset_game',
  ADD_WORD: 'add_word',
  REMOVE_WORD: 'remove_word',
  UPDATE_CATEGORY: 'update_category',
  UPDATE_USER: 'update_user',
  SYNC_WORD_BANK: 'sync_word_bank',
  UPDATE_STATS: 'update_stats',
};

// Game reducer function to handle state updates
const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_GAME:
      return {
        ...state,
        currentWord: action.payload.word,
        currentCategory: action.payload.category,
        incorrectGuesses: 0,
        guessedLetters: [],
        gameStatus: 'playing',
        timeLeft: action.payload.timeLimit || null,
      };
    
    case ACTIONS.MAKE_GUESS:
      const letter = action.payload.letter;
      const currentWord = state.currentWord.toLowerCase();
      const isCorrectGuess = currentWord.includes(letter.toLowerCase());
      const updatedGuessedLetters = [...state.guessedLetters, letter];
      
      // Check if all letters have been guessed correctly
      const uniqueLetters = [...new Set(currentWord.split(''))].filter(char => char !== ' ');
      const correctGuesses = uniqueLetters.filter(char => 
        updatedGuessedLetters.includes(char.toLowerCase())
      );
      
      const hasWon = correctGuesses.length === uniqueLetters.length;
      const hasLost = isCorrectGuess ? state.incorrectGuesses >= 5 : state.incorrectGuesses + 1 >= 6;
      
      // Update stats if the game is ending
      let updatedStats = { ...state.stats };
      if (hasWon) {
        updatedStats = {
          ...updatedStats,
          wins: updatedStats.wins + 1,
          streak: updatedStats.streak + 1,
          totalScore: updatedStats.totalScore + 
            (100 - state.incorrectGuesses * 10 + (state.timeLeft ? state.timeLeft : 0)),
        };
      } else if (hasLost) {
        updatedStats = {
          ...updatedStats,
          losses: updatedStats.losses + 1,
          streak: 0,
        };
      }
      
      return {
        ...state,
        guessedLetters: updatedGuessedLetters,
        incorrectGuesses: isCorrectGuess ? state.incorrectGuesses : state.incorrectGuesses + 1,
        gameStatus: hasWon ? 'won' : hasLost ? 'lost' : 'playing',
        stats: updatedStats,
      };
    
    case ACTIONS.END_GAME:
      return {
        ...state,
        gameStatus: action.payload.status,
      };
    
    case ACTIONS.CHANGE_MODE:
      return {
        ...state,
        currentMode: action.payload.mode,
        timeLeft: action.payload.timeLimit || null,
      };
    
    case ACTIONS.RESET_GAME:
      return {
        ...state,
        currentWord: '',
        currentCategory: '',
        incorrectGuesses: 0,
        guessedLetters: [],
        gameStatus: 'initial',
        timeLeft: null,
      };
    
    case ACTIONS.ADD_WORD:
      return {
        ...state,
        wordBank: {
          ...state.wordBank,
          [action.payload.category]: [
            ...(state.wordBank[action.payload.category] || []),
            action.payload.word,
          ],
        },
      };
    
    case ACTIONS.REMOVE_WORD:
      return {
        ...state,
        wordBank: {
          ...state.wordBank,
          [action.payload.category]: state.wordBank[action.payload.category].filter(
            word => word !== action.payload.word
          ),
        },
      };
    
    case ACTIONS.UPDATE_CATEGORY:
      const { operation, category, newName } = action.payload;
      if (operation === 'add') {
        return {
          ...state,
          wordBank: {
            ...state.wordBank,
            [category]: [],
          },
        };
      } else if (operation === 'remove') {
        const { [category]: _, ...remainingCategories } = state.wordBank;
        return {
          ...state,
          wordBank: remainingCategories,
        };
      } else if (operation === 'rename') {
        const { [category]: words, ...remainingCategories } = state.wordBank;
        return {
          ...state,
          wordBank: {
            ...remainingCategories,
            [newName]: words,
          },
        };
      }
      return state;
    
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    
    case ACTIONS.SYNC_WORD_BANK:
      return {
        ...state,
        wordBank: action.payload.wordBank,
      };
    
    case ACTIONS.UPDATE_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload,
        },
      };
      
    default:
      return state;
  }
};

// Provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [isLoadingWordBank, setIsLoadingWordBank] = useState(false);

  // Load game state from localStorage when component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('wordQuestState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({
          type: ACTIONS.UPDATE_USER,
          payload: parsedState.user || initialGameState.user
        });
        
        if (parsedState.stats) {
          dispatch({
            type: ACTIONS.UPDATE_STATS,
            payload: parsedState.stats
          });
        }
      } catch (error) {
        console.error('Error parsing saved state:', error);
      }
    }
  }, []);

  // Sync with Supabase when component mounts
  useEffect(() => {
    const syncWithSupabase = async () => {
      try {
        setIsLoadingWordBank(true);
        const wordBank = await syncWordBankWithSupabase();
        
        // Check if we received data from Supabase
        if (Object.keys(wordBank).length > 0) {
          dispatch({
            type: ACTIONS.SYNC_WORD_BANK,
            payload: { wordBank }
          });
        }
      } catch (error) {
        console.error('Error syncing with Supabase:', error);
      } finally {
        setIsLoadingWordBank(false);
      }
    };
    
    syncWithSupabase();
  }, []);

  // Save game state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wordQuestState', JSON.stringify({
      stats: state.stats,
      user: state.user,
      wordBank: state.wordBank,
    }));
  }, [state.stats, state.user, state.wordBank]);

  // Helper functions
  const startGame = (mode, category = null) => {
    // Select category
    const availableCategories = Object.keys(state.wordBank);
    const selectedCategory = category || availableCategories[Math.floor(Math.random() * availableCategories.length)];
    
    // Select word from category
    const words = state.wordBank[selectedCategory];
    const selectedWord = words[Math.floor(Math.random() * words.length)];
    
    let timeLimit = null;
    if (mode === 'time-attack') {
      timeLimit = 60; // 60 seconds for time attack mode
    }
    
    dispatch({
      type: ACTIONS.START_GAME,
      payload: {
        word: selectedWord,
        category: selectedCategory,
        timeLimit,
      }
    });
    
    dispatch({
      type: ACTIONS.CHANGE_MODE,
      payload: {
        mode,
        timeLimit,
      }
    });
  };

  const makeGuess = (letter) => {
    dispatch({
      type: ACTIONS.MAKE_GUESS,
      payload: { letter }
    });
  };

  const resetGame = () => {
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  const addWord = (category, word) => {
    dispatch({
      type: ACTIONS.ADD_WORD,
      payload: { category, word }
    });
  };

  const removeWord = (category, word) => {
    dispatch({
      type: ACTIONS.REMOVE_WORD,
      payload: { category, word }
    });
  };

  const updateCategory = (operation, category, newName = null) => {
    dispatch({
      type: ACTIONS.UPDATE_CATEGORY,
      payload: { operation, category, newName }
    });
  };

  const updateUser = (userData) => {
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: userData
    });
  };

  // Build the value object with state and all helper functions
  const value = {
    state,
    startGame,
    makeGuess,
    resetGame,
    addWord,
    removeWord,
    updateCategory,
    updateUser,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
