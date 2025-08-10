import { useEffect, useState } from 'react';

const BackgroundDots = () => {
  const [stars, setStars] = useState([]);
  const [galaxyElements, setGalaxyElements] = useState([]);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 4,
          brightness: Math.random() * 0.7 + 0.3,
        });
      }
      setStars(newStars);
    };

    // Generate galaxy elements (nebula-like effects)
    const generateGalaxyElements = () => {
      const newElements = [];
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 200 + 100,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * 360,
          color: Math.random() > 0.5 ? 'purple' : 'blue',
        });
      }
      setGalaxyElements(newElements);
    };

    generateStars();
    generateGalaxyElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Galaxy nebula background */}
      {galaxyElements.map((element) => (
        <div
          key={`galaxy-${element.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            background: element.color === 'purple' 
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)',
            transform: `rotate(${element.rotation}deg)`,
            animation: 'galaxyFloat 20s ease-in-out infinite',
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${star.brightness}) 0%, rgba(168, 85, 247, 0.4) 70%, transparent 100%)`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}
      
      {/* Milky way effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-blue-900/10 opacity-30"></div>
      
      {/* Shooting stars */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full shooting-star opacity-60"></div>
      <div className="absolute top-60 right-32 w-1 h-1 bg-white rounded-full shooting-star opacity-40" style={{animationDelay: '3s'}}></div>
    </div>
  );
};

export default BackgroundDots;