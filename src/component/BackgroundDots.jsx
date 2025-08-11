import { useEffect, useState } from 'react';

const BackgroundDots = () => {
  const [stars, setStars] = useState([]);
  const [galaxyElements, setGalaxyElements] = useState([]);
  const [constellations, setConstellations] = useState([]);

  useEffect(() => {
    // Optimize for mobile: reduce stars/galaxy/constellations
    const isMobile = window.innerWidth < 640;
    const starCount = isMobile ? 40 : 200;
    const galaxyCount = isMobile ? 3 : 12;
    const constellationCount = isMobile ? 1 : 5;
    // Generate stars with different types
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      const starType = Math.random();
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 1.5 : 3) + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleDelay: Math.random() * 3,
        brightness: Math.random() * 0.6 + 0.2,
        type: starType > 0.8 ? 'bright' : starType > 0.6 ? 'medium' : 'dim',
        color: starType > 0.9 ? 'blue' : starType > 0.7 ? 'purple' : 'white',
      });
    }
    setStars(newStars);
    // Generate enhanced galaxy elements
    const newElements = [];
    for (let i = 0; i < galaxyCount; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 120 : 300) + 60,
        opacity: Math.random() * (isMobile ? 0.12 : 0.2) + 0.05,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 + 1,
        color: Math.random() > 0.6 ? 'purple' : Math.random() > 0.3 ? 'blue' : 'pink',
      });
    }
    setGalaxyElements(newElements);
    // Generate constellation connections
    const newConstellations = [];
    for (let i = 0; i < constellationCount; i++) {
      const points = [];
      const numPoints = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < numPoints; j++) {
        points.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
        });
      }
      newConstellations.push({
        id: i,
        points,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }
    setConstellations(newConstellations);
  }, []);

  const getStarStyle = (star) => {
    const baseColors = {
      white: 'rgba(255, 255, 255, ',
      blue: 'rgba(59, 130, 246, ',
      purple: 'rgba(168, 85, 247, ',
    };

    return {
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      opacity: star.opacity,
      background: `radial-gradient(circle, ${baseColors[star.color]}${star.brightness}) 0%, ${baseColors[star.color]}0.4) 70%, transparent 100%)`,
      boxShadow: star.type === 'bright' 
        ? `0 0 ${star.size * 4}px ${baseColors[star.color]}0.8), 0 0 ${star.size * 8}px ${baseColors[star.color]}0.4)`
        : `0 0 ${star.size * 2}px ${baseColors[star.color]}0.5)`,
      animationDelay: `${star.twinkleDelay}s`,
      animationDuration: star.type === 'bright' ? '2s' : '4s',
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Enhanced Galaxy nebula background */}
      {galaxyElements.map((element) => (
        <div
          key={`galaxy-${element.id}`}
          className="absolute rounded-full blur-3xl galaxy-nebula"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            background: element.color === 'purple' 
              ? 'radial-gradient(ellipse, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.2) 30%, rgba(168, 85, 247, 0.1) 60%, transparent 100%)'
              : element.color === 'blue'
              ? 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, rgba(99, 102, 241, 0.2) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 100%)'
              : 'radial-gradient(ellipse, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 100%)',
            transform: `rotate(${element.rotation}deg)`,
            animation: `galaxyFloat ${20 + element.rotationSpeed * 5}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Constellation lines */}
      {constellations.map((constellation) => (
        <svg
          key={`constellation-${constellation.id}`}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: constellation.opacity }}
        >
          {constellation.points.map((point, index) => {
            if (index === constellation.points.length - 1) return null;
            const nextPoint = constellation.points[index + 1];
            return (
              <line
                key={`line-${index}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${nextPoint.x}%`}
                y2={`${nextPoint.y}%`}
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="0.5"
                className="constellation-line"
              />
            );
          })}
        </svg>
      ))}

      {/* Enhanced Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`absolute rounded-full ${
            star.type === 'bright' ? 'star-bright' : 'star-twinkle'
          }`}
          style={getStarStyle(star)}
        />
      ))}
      
      {/* Enhanced Milky way effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/8 to-blue-900/8 opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-900/5 to-transparent opacity-30"></div>
      
      {/* More shooting stars */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full shooting-star opacity-70"></div>
      <div className="absolute top-60 right-32 w-1 h-1 bg-blue-200 rounded-full shooting-star opacity-50" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-purple-200 rounded-full shooting-star opacity-60" style={{animationDelay: '7s'}}></div>
      
      {/* Cosmic dust effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-32 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-2xl transform -rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-24 bg-gradient-to-l from-transparent via-blue-500/10 to-transparent blur-2xl transform rotate-12"></div>
      </div>
    </div>
  );
};

export default BackgroundDots;