import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
// import confetti from 'canvas-confetti';
import { 
  TrophyIcon, 
  BoltIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ShareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const ResultsModal: React.FC = () => {
  const { 
    showResults, 
    wpm, 
    accuracy, 
    startTime, 
    endTime, 
    resetGame,
    theme 
  } = useGameStore();
  
  React.useEffect(() => {
    if (showResults && wpm > 60) {
      // Confetti animation would go here
      console.log('🎉 Great performance!');
    }
  }, [showResults, wpm]);
  
  const getTimeElapsed = () => {
    if (!startTime || !endTime) return 0;
    return Math.floor((endTime - startTime) / 1000);
  };
  
  const getPerformanceLevel = () => {
    if (wpm >= 80) return { level: 'Legendary', color: 'text-yellow-400', icon: '🏆' };
    if (wpm >= 60) return { level: 'Expert', color: 'text-purple-400', icon: '⭐' };
    if (wpm >= 40) return { level: 'Advanced', color: 'text-blue-400', icon: '🚀' };
    if (wpm >= 25) return { level: 'Intermediate', color: 'text-green-400', icon: '📈' };
    return { level: 'Beginner', color: 'text-gray-400', icon: '🌱' };
  };
  
  const performance = getPerformanceLevel();
  
  const handleShare = () => {
    const text = `I just typed at ${wpm} WPM with ${accuracy}% accuracy! 🚀 Try to beat my score!`;
    if (navigator.share) {
      navigator.share({
        title: 'Ultimate Typing Game Results',
        text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
    }
  };
  
  const getThemeClasses = () => {
    switch (theme) {
      case 'matrix':
        return {
          bg: 'bg-black/90 border-green-500',
          text: 'text-green-400',
          accent: 'text-green-300'
        };
      case 'cyberpunk':
        return {
          bg: 'bg-purple-900/90 border-pink-500',
          text: 'text-pink-300',
          accent: 'text-pink-400'
        };
      default:
        return {
          bg: 'bg-blue-900/90 border-neon-blue',
          text: 'text-neon-blue',
          accent: 'text-blue-300'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  return (
    <AnimatePresence>
      {showResults && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`glass rounded-3xl p-8 max-w-md w-full border-2 ${themeClasses.bg}`}
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-center mb-6">
              <motion.div
                className="text-6xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {performance.icon}
              </motion.div>
              <h2 className={`text-3xl font-bold ${themeClasses.text} neon-text mb-2`}>
                {performance.level}!
              </h2>
              <p className={`${themeClasses.accent}`}>
                Amazing typing performance!
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                className="text-center p-4 rounded-xl bg-white/5"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <BoltIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">{wpm}</div>
                <div className="text-sm text-gray-400">WPM</div>
              </motion.div>
              
              <motion.div
                className="text-center p-4 rounded-xl bg-white/5"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CheckCircleIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </motion.div>
              
              <motion.div
                className="text-center p-4 rounded-xl bg-white/5"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ClockIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">{getTimeElapsed()}s</div>
                <div className="text-sm text-gray-400">Time</div>
              </motion.div>
              
              <motion.div
                className="text-center p-4 rounded-xl bg-white/5"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TrophyIcon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">{Math.floor(wpm * accuracy / 100)}</div>
                <div className="text-sm text-gray-400">Score</div>
              </motion.div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={resetGame}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowPathIcon className="w-5 h-5" />
                Play Again
              </motion.button>
              
              <motion.button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-500/20 border border-blue-500 text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsModal;