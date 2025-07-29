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
    >\n      {/* Start/Reset Button */}\n      <motion.button\n        onClick={isPlaying || isFinished ? handleReset : handleStart}\n        className={`\n          flex items-center gap-2 px-6 py-3 rounded-xl font-semibold\n          glass border-2 transition-all duration-300\n          ${isPlaying || isFinished \n            ? 'border-red-500 text-red-400 hover:bg-red-500/20' \n            : 'border-green-500 text-green-400 hover:bg-green-500/20'\n          }\n          hover:scale-105 hover:shadow-lg neon-border\n        `}\n        whileHover={{ scale: 1.05 }}\n        whileTap={{ scale: 0.95 }}\n      >\n        {isPlaying || isFinished ? (\n          <>\n            <ArrowPathIcon className=\"w-5 h-5\" />\n            Reset\n          </>\n        ) : (\n          <>\n            <PlayIcon className=\"w-5 h-5\" />\n            Start Game\n          </>\n        )}\n      </motion.button>\n      \n      {/* Difficulty Selector */}\n      <div className=\"flex items-center gap-2\">\n        <Cog6ToothIcon className=\"w-5 h-5 text-gray-400\" />\n        <div className=\"flex rounded-xl overflow-hidden border border-gray-600\">\n          {difficulties.map((diff) => (\n            <motion.button\n              key={diff.key}\n              onClick={() => setDifficulty(diff.key)}\n              className={`\n                px-4 py-2 text-sm font-medium transition-all duration-300\n                ${difficulty === diff.key \n                  ? `${diff.color} bg-white/10` \n                  : 'text-gray-400 hover:text-white hover:bg-white/5'\n                }\n              `}\n              whileHover={{ scale: 1.05 }}\n              whileTap={{ scale: 0.95 }}\n            >\n              {diff.label}\n            </motion.button>\n          ))}\n        </div>\n      </div>\n      \n      {/* Theme Selector */}\n      <div className=\"flex items-center gap-2\">\n        <SparklesIcon className=\"w-5 h-5 text-gray-400\" />\n        <div className=\"flex rounded-xl overflow-hidden border border-gray-600\">\n          {themes.map((themeOption) => (\n            <motion.button\n              key={themeOption.key}\n              onClick={() => setTheme(themeOption.key)}\n              className={`\n                px-4 py-2 text-sm font-medium transition-all duration-300\n                ${theme === themeOption.key \n                  ? `bg-gradient-to-r ${themeOption.color} text-white` \n                  : 'text-gray-400 hover:text-white hover:bg-white/5'\n                }\n              `}\n              whileHover={{ scale: 1.05 }}\n              whileTap={{ scale: 0.95 }}\n            >\n              {themeOption.label}\n            </motion.button>\n          ))}\n        </div>\n      </div>\n      \n      {/* Multiplayer Button */}\n      <motion.button\n        className={`\n          flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium\n          glass border transition-all duration-300\n          ${isMultiplayer \n            ? 'border-purple-500 text-purple-400 bg-purple-500/20' \n            : 'border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400'\n          }\n        `}\n        whileHover={{ scale: 1.05 }}\n        whileTap={{ scale: 0.95 }}\n      >\n        <UserGroupIcon className=\"w-4 h-4\" />\n        {isMultiplayer ? 'In Room' : 'Multiplayer'}\n      </motion.button>\n    </motion.div>\n  );\n};\n\nexport default GameControls;