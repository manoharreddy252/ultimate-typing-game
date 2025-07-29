import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { UserIcon, TrophyIcon } from '@heroicons/react/24/outline';

const MultiplayerPanel: React.FC = () => {
  const { players, isMultiplayer, currentPlayer, theme } = useGameStore();
  
  if (!isMultiplayer || players.length === 0) {
    return null;
  }
  
  const sortedPlayers = [...players].sort((a, b) => b.wpm - a.wpm);
  
  const getThemeClasses = () => {
    switch (theme) {
      case 'matrix':
        return {
          bg: 'bg-green-900/20 border-green-500',
          text: 'text-green-400',
          accent: 'text-green-300'
        };
      case 'cyberpunk':
        return {
          bg: 'bg-pink-900/20 border-pink-500',
          text: 'text-pink-300',
          accent: 'text-pink-400'
        };
      default:
        return {
          bg: 'bg-blue-900/20 border-neon-blue',
          text: 'text-neon-blue',
          accent: 'text-blue-300'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  return (
    <motion.div
      className={`glass rounded-2xl p-6 border-2 ${themeClasses.bg} mb-8`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <UserIcon className={`w-6 h-6 ${themeClasses.text}`} />
        <h3 className={`text-xl font-bold ${themeClasses.text} neon-text`}>
          Live Leaderboard
        </h3>
      </div>
      
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            className={`
              leaderboard-item flex items-center gap-4 p-3 rounded-xl
              ${player.id === currentPlayer?.id ? 'bg-white/10 border border-white/20' : 'bg-white/5'}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm">
              {index === 0 ? <TrophyIcon className="w-4 h-4" /> : index + 1}
            </div>
            
            <img
              src={player.avatar}
              alt={player.name}
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
            
            <div className="flex-1">
              <div className={`font-semibold ${themeClasses.text}`}>
                {player.name}
                {player.id === currentPlayer?.id && (
                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    You
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-400">
                {player.wpm} WPM • {player.accuracy}% accuracy
              </div>
            </div>
            
            <div className="w-24">
              <div className="text-xs text-gray-400 mb-1">
                {Math.round(player.progress)}%
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${player.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <div className="text-right">
              {player.isFinished ? (
                <div className="text-green-400 text-sm font-semibold">
                  ✓ Finished
                </div>
              ) : (
                <div className="text-yellow-400 text-sm">
                  Typing...
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-sm text-gray-400 text-center">
          Room: <span className={themeClasses.text}>#{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
          {' • '}
          {players.length} player{players.length !== 1 ? 's' : ''} online
        </div>
      </div>
    </motion.div>
  );
};

export default MultiplayerPanel;