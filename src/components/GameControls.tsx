import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { getRandomText } from '../data/texts';
import { 
  PlayIcon, 
  ArrowPathIcon, 
  Cog6ToothIcon,
  UserGroupIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const GameControls: React.FC = () => {
  const {
    isPlaying,
    isFinished,
    difficulty,
    theme,
    startGame,
    resetGame,
    setDifficulty,
    setTheme,
    isMultiplayer
  } = useGameStore();
  
  const handleStart = () => {
    const text = getRandomText(difficulty);
    startGame(text);
  };
  
  const handleReset = () => {
    resetGame();
  };
  
  const difficulties = [
    { key: 'easy', label: 'Easy', color: 'text-green-400' },
    { key: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { key: 'hard', label: 'Hard', color: 'text-red-400' },
    { key: 'code', label: 'Code', color: 'text-purple-400' }
  ] as const;
  
  const themes = [
    { key: 'neon', label: 'Neon', color: 'from-blue-400 to-cyan-400' },
    { key: 'matrix', label: 'Matrix', color: 'from-green-400 to-emerald-400' },
    { key: 'cyberpunk', label: 'Cyberpunk', color: 'from-pink-400 to-purple-400' }
  ] as const;
  
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={isPlaying || isFinished ? handleReset : handleStart}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
          glass border-2 transition-all duration-300
          ${isPlaying || isFinished 
            ? 'border-red-500 text-red-400 hover:bg-red-500/20' 
            : 'border-green-500 text-green-400 hover:bg-green-500/20'
          }
          hover:scale-105 hover:shadow-lg neon-border
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying || isFinished ? (
          <>
            <ArrowPathIcon className="w-5 h-5" />
            Reset
          </>
        ) : (
          <>
            <PlayIcon className="w-5 h-5" />
            Start Game
          </>
        )}
      </motion.button>
      
      <div className="flex items-center gap-2">
        <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
        <div className="flex rounded-xl overflow-hidden border border-gray-600">
          {difficulties.map((diff) => (
            <motion.button
              key={diff.key}
              onClick={() => setDifficulty(diff.key)}
              className={`
                px-4 py-2 text-sm font-medium transition-all duration-300
                ${difficulty === diff.key 
                  ? `${diff.color} bg-white/10` 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {diff.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <SparklesIcon className="w-5 h-5 text-gray-400" />
        <div className="flex rounded-xl overflow-hidden border border-gray-600">
          {themes.map((themeOption) => (
            <motion.button
              key={themeOption.key}
              onClick={() => setTheme(themeOption.key)}
              className={`
                px-4 py-2 text-sm font-medium transition-all duration-300
                ${theme === themeOption.key 
                  ? `bg-gradient-to-r ${themeOption.color} text-white` 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {themeOption.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      <motion.button
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
          glass border transition-all duration-300
          ${isMultiplayer 
            ? 'border-purple-500 text-purple-400 bg-purple-500/20' 
            : 'border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <UserGroupIcon className="w-4 h-4" />
        {isMultiplayer ? 'In Room' : 'Multiplayer'}
      </motion.button>
    </motion.div>
  );
};

export default GameControls;