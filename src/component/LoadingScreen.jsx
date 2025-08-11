import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);
    const [stars, setStars] = useState([]);
    const [galaxyElements, setGalaxyElements] = useState([]);
    const fullText = " < MinulCK />";

    // Optimize for mobile: reduce stars/galaxy elements and effects
    useEffect(() => {
        const isMobile = window.innerWidth < 640;
        const starCount = isMobile ? 30 : 100;
        const galaxyCount = isMobile ? 2 : 6;
        const newStars = [];
        for (let i = 0; i < starCount; i++) {
            newStars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                delay: Math.random() * 2,
                type: Math.random() > 0.7 ? 'bright' : 'normal',
            });
        }
        setStars(newStars);
        const newElements = [];
        for (let i = 0; i < galaxyCount; i++) {
            newElements.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * (isMobile ? 120 : 200) + 80,
                opacity: Math.random() * (isMobile ? 0.2 : 0.3) + 0.08,
                rotation: Math.random() * 360,
                color: Math.random() > 0.5 ? 'purple' : 'blue',
            });
        }
        setGalaxyElements(newElements);
    }, []);

    // Optimized completion handler using useCallback
    const handleComplete = useCallback(() => {
        setTimeout(() => {
            onComplete();
        }, 500);
    }, [onComplete]);

    useEffect(() => {
        // Prevent scrolling when loading screen is active
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        
        let index = 0;
        let progressValue = 0;
        
        // Typing animation
        const typingInterval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            
            if (index > fullText.length) {
                clearInterval(typingInterval);
                // Delay before completing
                setTimeout(() => {
                    handleComplete();
                }, 1000);
            }
        }, 100);

        // Smooth progress bar animation
        const progressInterval = setInterval(() => {
            progressValue += 1;
            setProgress(progressValue);
            
            if (progressValue >= 100) {
                clearInterval(progressInterval);
            }
        }, 30);

        return () => {
            clearInterval(typingInterval);
            clearInterval(progressInterval);
            // Restore scrolling when component unmounts
            document.body.style.overflow = 'unset';
        };
    }, [fullText, handleComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#050414] via-black to-gray-950 text-gray-100 flex flex-col items-center justify-center overflow-hidden">
            {/* Galaxy Background for Loading */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Galaxy nebula elements */}
                {galaxyElements.map((element) => (
                    <div
                        key={`loading-galaxy-${element.id}`}
                        className="absolute rounded-full galaxy-loading"
                        style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            width: `${element.size}px`,
                            height: `${element.size}px`,
                            opacity: element.opacity,
                            background: element.color === 'purple' 
                                ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)'
                                : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 100%)',
                            transform: `translateZ(0) rotate(${element.rotation}deg)`,
                            willChange: 'transform, opacity',
                            animationDelay: `${element.id * 0.5}s`,
                        }}
                    />
                ))}

                {/* Loading stars */}
                {stars.map((star) => (
                    <div
                        key={`loading-star-${star.id}`}
                        className={`absolute rounded-full ${star.type === 'bright' ? 'star-formation' : 'star-twinkle'}`}
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            background: star.type === 'bright'
                                ? `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(168, 85, 247, 0.4) 70%, transparent 100%)`
                                : `radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(168, 85, 247, 0.2) 70%, transparent 100%)`,
                            boxShadow: star.type === 'bright' 
                                ? `0 0 ${star.size * 2}px rgba(168, 85, 247, 0.5)`
                                : `0 0 ${star.size * 1}px rgba(255, 255, 255, 0.2)`,
                            willChange: 'transform, opacity',
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}

                {/* Shooting stars for loading */}
                <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full shooting-star opacity-70"></div>
                <div className="absolute top-32 right-20 w-1 h-1 bg-purple-200 rounded-full shooting-star opacity-60" style={{animationDelay: '2s'}}></div>
                
                {/* Cosmic background gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-blue-900/10 opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-900/5 to-transparent opacity-30"></div>
            </div>

            {/* Loading Content */}
            <div className="text-center space-y-8 z-10 relative">
                {/* Logo/Name with enhanced galaxy styling */}
                <div className="mb-8">
                    <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-[#8245ec] via-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent filter drop-shadow-lg">
                        {text}
                        <span className="animate-blink ml-1 text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">|</span>
                    </div>
                    <div className="text-sm text-gray-300 mt-2 font-light tracking-wider">
                        Full Stack Developer
                    </div>
                    <div className="text-xs text-purple-400 mt-1 opacity-70">
                        Exploring the digital galaxy...
                    </div>
                </div>

                {/* Enhanced Progress Bar with Galaxy Theme */}
                <div className="w-[320px] mx-auto">
                    <div className="w-full h-[4px] bg-gray-800/50 rounded-full relative overflow-hidden shadow-inner backdrop-blur-sm border border-purple-500/20">
                        <div 
                            className="h-full bg-gradient-to-r from-[#8245ec] via-[#a855f7] to-[#3b82f6] shadow-[0_0_20px_#8245ec] transition-all duration-300 ease-out rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                            <div className="absolute -top-1 -bottom-1 right-0 w-2 bg-white rounded-full opacity-80 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-3">
                        <span className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                            Initializing...
                        </span>
                        <span className="font-mono text-purple-300">{progress}%</span>
                    </div>
                </div>


                {/* Galaxy formation effect */}
                <div className="flex justify-center mt-8">
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-purple-500/30 rounded-full animate-spin">
                            <div className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
                            <div className="absolute left-0 top-1/2 w-1 h-1 bg-pink-400 rounded-full transform -translate-y-1/2"></div>
                            <div className="absolute right-0 top-1/2 w-1 h-1 bg-purple-300 rounded-full transform -translate-y-1/2"></div>
                        </div>
                        <div className="absolute inset-0 w-16 h-16 border border-purple-400/20 rounded-full animate-ping"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoadingScreen.propTypes = {
    onComplete: PropTypes.func.isRequired,
};

export default LoadingScreen;