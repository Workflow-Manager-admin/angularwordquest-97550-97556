// Initial game state
export const initialGameState = {
  // Game state
  currentWord: '',
  currentCategory: '',
  currentMode: 'classic', // 'classic', 'time-attack', 'category'
  incorrectGuesses: 0,
  guessedLetters: [],
  gameStatus: 'initial', // 'initial', 'playing', 'won', 'lost'
  timeLeft: null,

  // User information
  user: {
    name: 'Player',
    level: 1,
    experience: 0,
    achievements: [],
    preferences: {
      theme: 'dark',
      difficulty: 'normal'
    }
  },

  // Game statistics
  stats: {
    wins: 0,
    losses: 0,
    streak: 0,
    totalScore: 0,
    gamesPlayed: 0,
    bestTime: null
  },

  // Word bank organized by categories
  wordBank: {
    'Animals': [
      'Elephant', 'Giraffe', 'Kangaroo', 'Dolphin', 'Penguin',
      'Zebra', 'Rhinoceros', 'Panther', 'Koala', 'Hummingbird'
    ],
    'Countries': [
      'Australia', 'Brazil', 'Canada', 'Denmark', 'Ethiopia',
      'France', 'Germany', 'Honduras', 'Indonesia', 'Japan'
    ],
    'Foods': [
      'Spaghetti', 'Hamburger', 'Avocado', 'Chocolate', 'Pancakes',
      'Croissant', 'Lasagna', 'Watermelon', 'Quesadilla', 'Sushi'
    ],
    'Technology': [
      'Computer', 'Smartphone', 'Internet', 'Bluetooth', 'Algorithm',
      'Database', 'Wireless', 'Software', 'Hardware', 'Network'
    ],
    'Movies': [
      'Inception', 'Avatar', 'Titanic', 'Interstellar', 'Jaws',
      'Frozen', 'Gladiator', 'Psycho', 'Casablanca', 'Parasite'
    ]
  }
};

// Game difficulty settings
export const difficultySettings = {
  easy: {
    maxIncorrectGuesses: 8,
    timeLimit: 90,
    scoreMultiplier: 0.75
  },
  normal: {
    maxIncorrectGuesses: 6,
    timeLimit: 60,
    scoreMultiplier: 1.0
  },
  hard: {
    maxIncorrectGuesses: 4,
    timeLimit: 45,
    scoreMultiplier: 1.25
  }
};

// Achievement definitions
export const achievements = [
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    condition: (stats) => stats.wins >= 1
  },
  {
    id: 'streak_3',
    name: 'Hat Trick',
    description: 'Win 3 games in a row',
    icon: '🎯',
    condition: (stats) => stats.streak >= 3
  },
  {
    id: 'streak_5',
    name: 'Unbeatable',
    description: 'Win 5 games in a row',
    icon: '🔥',
    condition: (stats) => stats.streak >= 5
  },
  {
    id: 'wins_10',
    name: 'Word Master',
    description: 'Win 10 games total',
    icon: '📚',
    condition: (stats) => stats.wins >= 10
  },
  {
    id: 'wins_25',
    name: 'Lexicon Legend',
    description: 'Win 25 games total',
    icon: '👑',
    condition: (stats) => stats.wins >= 25
  },
  {
    id: 'score_1000',
    name: 'Point Collector',
    description: 'Reach 1000 total points',
    icon: '💯',
    condition: (stats) => stats.totalScore >= 1000
  }
];

// Level threshold definitions
export const levelThresholds = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  3500,   // Level 7
  5000,   // Level 8
  7500,   // Level 9
  10000   // Level 10
];
