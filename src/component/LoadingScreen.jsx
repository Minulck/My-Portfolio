import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);
    const fullText = " < MinulCK /> ";

    // Optimized completion handler using useCallback
    const handleComplete = useCallback(() => {
        setTimeout(() => {
            onComplete();
        }, 300); // Reduced from 500ms to 300ms
    }, [onComplete]);

    useEffect(() => {
        let index = 0;
        let progressValue = 0;
        
        // Faster typing animation
        const typingInterval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            
            if (index > fullText.length) {
                clearInterval(typingInterval);
                handleComplete();
            }
        }, 120); // Reduced from 80ms to 60ms for faster typing

        // Smooth progress bar animation
        const progressInterval = setInterval(() => {
            progressValue += 1;
            setProgress(progressValue);
            
            if (progressValue >= 100) {
                clearInterval(progressInterval);
            }
        },10 ); // Faster progress updates

        return () => {
            clearInterval(typingInterval);
            clearInterval(progressInterval);
        };
    }, [fullText, handleComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-black to-purple-800 text-gray-100 flex flex-col items-center justify-center">
            <div className="text-center space-y-8">
                {/* Logo/Name with enhanced styling */}
                <div className="mb-8">
                    <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-[#8245ec] to-[#a855f7] bg-clip-text text-transparent">
                        {text}
                        <span className="animate-blink ml-1 text-white"> | </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-2 font-light">
                        Full Stack Developer
                    </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="w-[280px] mx-auto">
                    <div className="w-full h-[3px] bg-gray-800 rounded-full relative overflow-hidden shadow-inner">
                        <div 
                            className="h-full bg-gradient-to-r from-[#8245ec] to-[#a855f7] shadow-[0_0_20px_#8245ec] transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Loading...</span>
                        <span>{progress}%</span>
                    </div>
                </div>

                {/* Loading dots animation */}
                <div className="flex space-x-2 justify-center">
                    <div className="w-2 h-2 bg-[#8245ec] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#a855f7] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#8245ec] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};

LoadingScreen.propTypes = {
    onComplete: PropTypes.func.isRequired,
};

export default LoadingScreen;