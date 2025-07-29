import { create } from 'zustand';

export interface Player {
  id: string;
  name: string;
  wpm: number;
  accuracy: number;
  progress: number;
  isFinished: boolean;
  avatar: string;
}

export interface GameState {
  // Game state
  isPlaying: boolean;
  isFinished: boolean;
  currentText: string;
  currentIndex: number;
  startTime: number | null;
  endTime: number | null;
  
  // Stats
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  
  // Multiplayer
  players: Player[];
  currentPlayer: Player | null;
  roomId: string | null;
  isMultiplayer: boolean;
  
  // UI
  showResults: boolean;
  theme: 'neon' | 'matrix' | 'cyberpunk';
  difficulty: 'easy' | 'medium' | 'hard' | 'code';
  
  // Actions
  startGame: (text: string) => void;
  endGame: () => void;
  updateProgress: (index: number, isCorrect: boolean) => void;
  resetGame: () => void;
  setTheme: (theme: 'neon' | 'matrix' | 'cyberpunk') => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard' | 'code') => void;
  joinRoom: (roomId: string, playerName: string) => void;
  updatePlayer: (playerId: string, data: Partial<Player>) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  isPlaying: false,
  isFinished: false,
  currentText: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  
  wpm: 0,
  accuracy: 100,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  
  players: [],
  currentPlayer: null,
  roomId: null,
  isMultiplayer: false,
  
  showResults: false,
  theme: 'neon',
  difficulty: 'medium',
  
  // Actions
  startGame: (text: string) => {
    set({
      isPlaying: true,
      isFinished: false,
      currentText: text,
      currentIndex: 0,
      startTime: Date.now(),
      endTime: null,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      wpm: 0,
      accuracy: 100,
      showResults: false,
    });
  },
  
  endGame: () => {
    const state = get();
    const endTime = Date.now();
    const timeInMinutes = (endTime - (state.startTime || 0)) / 60000;
    const wpm = Math.round((state.correctChars / 5) / timeInMinutes) || 0;
    const accuracy = Math.round((state.correctChars / (state.correctChars + state.incorrectChars)) * 100) || 100;
    
    set({
      isPlaying: false,
      isFinished: true,
      endTime,
      wpm,
      accuracy,
      showResults: true,
    });
  },
  
  updateProgress: (index: number, isCorrect: boolean) => {
    const state = get();
    const newCorrectChars = isCorrect ? state.correctChars + 1 : state.correctChars;
    const newIncorrectChars = isCorrect ? state.incorrectChars : state.incorrectChars + 1;
    const totalChars = newCorrectChars + newIncorrectChars;
    
    // Calculate real-time WPM and accuracy
    const timeElapsed = (Date.now() - (state.startTime || 0)) / 60000;
    const wpm = timeElapsed > 0 ? Math.round((newCorrectChars / 5) / timeElapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((newCorrectChars / totalChars) * 100) : 100;
    
    set({
      currentIndex: index,
      correctChars: newCorrectChars,
      incorrectChars: newIncorrectChars,
      totalChars,
      wpm,
      accuracy,
    });
    
    // Check if game is finished
    if (index >= state.currentText.length) {
      get().endGame();
    }
  },
  
  resetGame: () => {
    set({
      isPlaying: false,
      isFinished: false,
      currentText: '',
      currentIndex: 0,
      startTime: null,
      endTime: null,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      wpm: 0,
      accuracy: 100,
      showResults: false,
    });
  },
  
  setTheme: (theme) => set({ theme }),
  setDifficulty: (difficulty) => set({ difficulty }),
  
  joinRoom: (roomId: string, playerName: string) => {
    const newPlayer: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name: playerName,
      wpm: 0,
      accuracy: 100,
      progress: 0,
      isFinished: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${playerName}`,
    };
    
    set({
      roomId,
      isMultiplayer: true,
      currentPlayer: newPlayer,
      players: [newPlayer],
    });
  },
  
  updatePlayer: (playerId: string, data: Partial<Player>) => {
    set((state) => ({
      players: state.players.map(player =>
        player.id === playerId ? { ...player, ...data } : player
      ),
    }));
  },
  
  addPlayer: (player: Player) => {
    set((state) => ({
      players: [...state.players, player],
    }));
  },
  
  removePlayer: (playerId: string) => {
    set((state) => ({
      players: state.players.filter(player => player.id !== playerId),
    }));
  },
}));