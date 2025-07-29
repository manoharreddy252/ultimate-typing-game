import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';

const TypingArea: React.FC = () => {
  const {
    currentText,
    currentIndex,
    isPlaying,
    updateProgress,
    startGame,
    theme
  } = useGameStore();
  
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isPlaying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlaying]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;
    
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const expectedChar = currentText[currentIndex];
    
    if (lastChar === expectedChar) {
      updateProgress(currentIndex + 1, true);
      setUserInput(value);
    } else if (value.length > userInput.length) {
      // Incorrect character typed
      updateProgress(currentIndex + 1, false);
      setUserInput(value);
    } else {
      // Backspace
      setUserInput(value);
    }
  };
  
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'px-1 py-0.5 rounded transition-all duration-200 ';
      
      if (index < currentIndex) {
        // Already typed
        if (userInput[index] === char) {
          className += 'correct';
        } else {
          className += 'incorrect';
        }
      } else if (index === currentIndex) {
        // Current character
        className += 'current';
      } else {
        // Not yet typed
        className += 'text-gray-400';
      }
      
      return (
        <motion.span
          key={index}
          className={className}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.01 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      );
    });
  };
  
  const getThemeClasses = () => {
    switch (theme) {
      case 'matrix':
        return 'bg-black border-green-500 text-green-400';
      case 'cyberpunk':
        return 'bg-purple-900/20 border-pink-500 text-pink-300';
      default:
        return 'bg-blue-900/20 border-neon-blue text-neon-blue';
    }
  };
  
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Text Display */}
      <motion.div
        className={`glass rounded-2xl p-8 mb-6 border-2 ${getThemeClasses()}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-2xl leading-relaxed font-mono tracking-wide">
          {renderText()}
        </div>
      </motion.div>
      
      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="opacity-0 absolute -z-10"
        autoComplete="off"
        spellCheck={false}
      />
      
      {/* Focus Indicator */}
      {!isPlaying && (
        <motion.div
          className="text-center text-gray-400 mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click anywhere to focus and start typing...
        </motion.div>
      )}
    </motion.div>
  );
};

export default TypingArea;