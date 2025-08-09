import { useEffect, useState, useCallback } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const fullText = " < MinulCK /> ";

    // Optimized completion handler using useCallback
    const handleComplete = useCallback(() => {
        setTimeout(() => {
            onComplete();
        }, 500); // Reduced from 1000ms to 500ms
    }, [onComplete]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            
            if (index > fullText.length) {
                clearInterval(interval);
                handleComplete();
            }
        }, 80); // Reduced from 100ms to 80ms for faster typing

        return () => clearInterval(interval);
    }, [fullText, handleComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
            <div className="mb-4 text-4xl font-mono font-bold">
                {text} <span className="animate-blink ml-1"> | </span>
            </div>
            <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
                <div className="w-[60%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar">
                    {" "}
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;