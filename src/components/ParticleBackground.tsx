import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, isPlaying } = useGameStore();
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  
  const getThemeColors = () => {
    switch (theme) {
      case 'matrix':
        return ['#00ff00', '#00cc00', '#009900'];
      case 'cyberpunk':
        return ['#ff1493', '#bf00ff', '#ff6b6b'];
      default:
        return ['#00f5ff', '#0080ff', '#4169e1'];
    }
  };
  
  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const colors = getThemeColors();
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };
  
  const initParticles = (canvas: HTMLCanvasElement) => {
    const particleCount = isPlaying ? 150 : 100;
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }
  };
  
  const updateParticles = (canvas: HTMLCanvasElement) => {
    particlesRef.current.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      if (isPlaying) {
        particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
      }
    });
  };
  
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  };
  
  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const maxDistance = 100;
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = p1.color;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 5;
          ctx.shadowColor = p1.color;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          
          ctx.restore();
        }
      }
    }
  };
  
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updateParticles(canvas);
    drawConnections(ctx);
    drawParticles(ctx);
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initParticles(canvas);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    resizeCanvas();
    animate();
    
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, isPlaying]);
  
  return (
    <canvas
      ref={canvasRef}
      className="particles fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticleBackground;