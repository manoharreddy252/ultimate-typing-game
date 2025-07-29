import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from './stores/gameStore';
import ParticleBackground from './components/ParticleBackground';
import GameControls from './components/GameControls';
import StatsPanel from './components/StatsPanel';
import TypingArea from './components/TypingArea';
import ResultsModal from './components/ResultsModal';
import MultiplayerPanel from './components/MultiplayerPanel';
import { getRandomText } from './data/texts';
import './App.css';

function App() {
  const { theme, isPlaying, currentText } = useGameStore();
  
  // Initialize with a random text
  useEffect(() => {
    if (!currentText) {
      const text = getRandomText('medium');
      useGameStore.setState({ currentText: text });
    }
  }, [currentText]);
  
  const handleGlobalClick = () => {
    if (!isPlaying && currentText) {
      // Focus is handled in TypingArea component
    }
  };
  
  const getThemeGradient = () => {
    switch (theme) {
      case 'matrix':
        return 'from-black via-green-900/20 to-black';
      case 'cyberpunk':
        return 'from-purple-900 via-pink-900/20 to-black';
      default:
        return 'from-blue-900 via-cyan-900/20 to-black';
    }
  };
  
  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${getThemeGradient()} relative overflow-hidden`}
      onClick={handleGlobalClick}
    >
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          className="text-center py-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={`text-6xl md:text-8xl font-bold mb-4 neon-text ${
              theme === 'matrix' ? 'text-green-400' :
              theme === 'cyberpunk' ? 'text-pink-400' :
              'text-neon-blue'
            }`}
            animate={{
              textShadow: [
                '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
                '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
                '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ULTIMATE
          </motion.h1>
          <motion.h2
            className={`text-3xl md:text-5xl font-light mb-2 ${
              theme === 'matrix' ? 'text-green-300' :
              theme === 'cyberpunk' ? 'text-pink-300' :
              'text-blue-300'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            TYPING GAME
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Experience the most advanced typing game with real-time multiplayer,
            stunning visuals, and cutting-edge technology.
          </motion.p>
        </motion.header>
        
        <main className="flex-1 container mx-auto px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <GameControls />
            <StatsPanel />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TypingArea />
              </div>
              
              <div className="lg:col-span-1">
                <MultiplayerPanel />
              </div>
            </div>
          </div>
        </main>
        
        <motion.footer
          className="text-center py-6 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p>
            Built with ❤️ using React, TypeScript, Framer Motion & Tailwind CSS
          </p>
          <p className="text-sm mt-2">
            © 2024 Ultimate Typing Game - The Future of Typing
          </p>
        </motion.footer>
      </div>
      
      <ResultsModal />
    </div>
  );
}

export default App;