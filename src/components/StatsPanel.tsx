import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { ClockIcon, BoltIcon, CheckCircleIcon, FireIcon } from '@heroicons/react/24/outline';

const StatsPanel: React.FC = () => {
  const { wpm, accuracy, isPlaying, startTime, theme } = useGameStore();
  
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, startTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
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
  
  const stats = [
    {
      icon: BoltIcon,
      label: 'WPM',
      value: wpm,
      suffix: '',
      color: 'text-yellow-400'
    },
    {
      icon: CheckCircleIcon,
      label: 'Accuracy',
      value: accuracy,
      suffix: '%',
      color: 'text-green-400'
    },
    {
      icon: ClockIcon,
      label: 'Time',
      value: formatTime(timeElapsed),
      suffix: '',
      color: 'text-blue-400'
    },
    {
      icon: FireIcon,
      label: 'Streak',
      value: Math.floor(wpm / 10),
      suffix: '',
      color: 'text-red-400'
    }
  ];
  
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={`glass rounded-xl p-4 border ${themeClasses.bg}`}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
            <motion.div
              className={`text-2xl font-bold ${themeClasses.text} neon-text`}
              key={stat.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {stat.value}{stat.suffix}
            </motion.div>
          </div>
          <div className={`text-sm ${themeClasses.accent} uppercase tracking-wide`}>
            {stat.label}
          </div>
          
          {stat.label === 'WPM' && (
            <motion.div
              className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((wpm / 100) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}
          
          {stat.label === 'Accuracy' && (
            <motion.div
              className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsPanel;