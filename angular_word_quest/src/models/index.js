/**
 * User model definition
 * @typedef {Object} User
 * @property {string} name - User's display name
 * @property {number} level - Current user level
 * @property {number} experience - User's experience points
 * @property {string[]} achievements - IDs of achieved accomplishments
 * @property {Object} preferences - User preferences
 * @property {string} preferences.theme - UI theme preference ('light' or 'dark')
 * @property {string} preferences.difficulty - Game difficulty ('easy', 'normal', or 'hard')
 */

/**
 * Game statistics model definition
 * @typedef {Object} GameStats
 * @property {number} wins - Total number of games won
 * @property {number} losses - Total number of games lost
 * @property {number} streak - Current winning streak
 * @property {number} totalScore - Cumulative score across all games
 * @property {number} gamesPlayed - Total number of games played
 * @property {number|null} bestTime - Best completion time in seconds (for time-based modes)
 */

/**
 * Word bank model definition
 * @typedef {Object.<string, string[]>} WordBank
 * Maps category names to arrays of words belonging to that category
 */

/**
 * Game state model definition
 * @typedef {Object} GameState
 * @property {string} currentWord - The word being guessed in the current game
 * @property {string} currentCategory - Category of the current word
 * @property {string} currentMode - Current game mode ('classic', 'time-attack', 'category')
 * @property {number} incorrectGuesses - Number of incorrect guesses made
 * @property {string[]} guessedLetters - Letters already guessed
 * @property {string} gameStatus - Current game status ('initial', 'playing', 'won', 'lost')
 * @property {number|null} timeLeft - Seconds remaining in timed modes
 * @property {User} user - User information
 * @property {GameStats} stats - Game statistics
 * @property {WordBank} wordBank - Collection of words organized by category
 */

/**
 * Achievement model definition
 * @typedef {Object} Achievement
 * @property {string} id - Unique identifier for the achievement
 * @property {string} name - Display name for the achievement
 * @property {string} description - Description of how to earn the achievement
 * @property {string} icon - Emoji or icon representing the achievement
 * @property {function} condition - Function that determines if achievement is earned
 */

// Export type definitions as empty objects for JSDoc support
export const models = {
  User: {},
  GameStats: {},
  WordBank: {},
  GameState: {},
  Achievement: {}
};
