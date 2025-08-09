import { useState, useEffect, useMemo, useCallback } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile_round.png'; 

const About = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [visibleElements, setVisibleElements] = useState({
        image: false,
        name: false,
        role: false,
        about: false,
        resume: false
    });

    // Optimized code lines with faster delays and better syntax
    const codeLines = useMemo(() => [
        { code: "const developer = {", delay: 300, triggers: [] },
        { code: "  name: 'Minul Chathumal',", delay: 400, triggers: ['name'] },
        { code: "  image: './profile.jpg',", delay: 300, triggers: ['image'] },
        { code: "  role: 'Full Stack Developer',", delay: 400, triggers: ['role'] },
        { code: "  passion: 'Building Amazing UIs',", delay: 300, triggers: [] },
        { code: "  skills: ['React', 'Spring Boot', 'Ballerina'],", delay: 350, triggers: [] },
        { code: "  experience: '3+ years',", delay: 300, triggers: [] },
        { code: "  about: `Passionate developer who", delay: 350, triggers: ['about'] },
        { code: "    loves creating innovative", delay: 250, triggers: [] },
        { code: "    solutions and learning new", delay: 250, triggers: [] },
        { code: "    technologies every day.`,", delay: 300, triggers: [] },
        { code: "  resume: 'available',", delay: 300, triggers: ['resume'] },
        { code: "};", delay: 200, triggers: [] },
        { code: "", delay: 150, triggers: [] },
        { code: "// Ready to collaborate! 🚀", delay: 0, triggers: [] }
    ], []);

    // Optimized trigger handler using useCallback
    const handleTriggers = useCallback((triggers) => {
        if (triggers.length > 0) {
            setVisibleElements(prev => {
                const newState = { ...prev };
                triggers.forEach(trigger => {
                    newState[trigger] = true;
                });
                return newState;
            });
        }
    }, []);

    // Faster typing animation with character-by-character effect
    useEffect(() => {
        let timeouts = [];
        let totalDelay = 0;

        codeLines.forEach((line, index) => {
            totalDelay += line.delay;
            const timeout = setTimeout(() => {
                setCurrentLine(index + 1);
                if (line.triggers.length > 0) {
                    // Reduced trigger delay for faster response
                    setTimeout(() => handleTriggers(line.triggers), 100);
                }
            }, totalDelay);
            timeouts.push(timeout);
        });

        // Mark typing as complete
        const completeTimeout = setTimeout(() => {
            setIsTypingComplete(true);
        }, totalDelay + 500);
        timeouts.push(completeTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [codeLines, handleTriggers]);

    // Enhanced syntax highlighting function with better colors and structure
    const renderCodeLine = useCallback((line, index) => {
        const { code } = line;
        
        const highlightSyntax = (text) => {
            // Handle different parts of the code with enhanced colors
            if (text.includes('const')) {
                return (
                    <>
                        <span className="text-purple-400 font-semibold">const</span>
                        <span className="text-white"> </span>
                        <span className="text-cyan-300">developer</span>
                        <span className="text-white"> = </span>
                        <span className="text-yellow-400">{'{'}</span>
                    </>
                );
            }
            
            if (text.includes('name:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  name</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">'Minul Chathumal'</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('image:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  image</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">'./profile.jpg'</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('role:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  role</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">'Full Stack Developer'</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('passion:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  passion</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">'Building Amazing UIs'</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('skills:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  skills</span>
                        <span className="text-white">: </span>
                        <span className="text-yellow-400">[</span>
                        <span className="text-green-300">'React'</span>
                        <span className="text-white">, </span>
                        <span className="text-green-300">'Spring Boot'</span>
                        <span className="text-white">, </span>
                        <span className="text-green-300">'Ballerina'</span>
                        <span className="text-yellow-400">]</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('experience:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  experience</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">'3+ years'</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('about:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  about</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">`Passionate developer who</span>
                    </>
                );
            }
            
            if (text.includes('loves creating')) {
                return <span className="text-green-300">    loves creating innovative</span>;
            }
            
            if (text.includes('solutions and')) {
                return <span className="text-green-300">    solutions and learning new</span>;
            }
            
            if (text.includes('technologies')) {
                return (
                    <>
                        <span className="text-green-300">    technologies every day.</span>
                        <span className="text-green-300">`</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text.includes('resume:')) {
                return (
                    <>
                        <span className="text-blue-300 font-medium">  resume</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">'available'</span>
                        <span className="text-white">,</span>
                    </>
                );
            }
            
            if (text === '};') {
                return <span className="text-yellow-400 font-semibold">{'};'}</span>;
            }
            
            if (text.includes('//')) {
                return <span className="text-gray-500 italic">{text}</span>;
            }
            
            if (text === '') {
                return <span>&nbsp;</span>;
            }
            
            return <span className="text-gray-300">{text}</span>;
        };
        
        return (
            <div key={index} className="flex items-center group hover:bg-gray-800/30 px-2 py-0.5 rounded transition-colors">
                <span className="text-gray-500 w-8 text-right mr-4 select-none text-xs font-mono">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="flex-1">
                    {highlightSyntax(code)}
                </div>
            </div>
        );
    }, []);

    return (
        <section id="about" className="px-[5vw] md:px-[7vw] lg:px-[10vw] font-sans mt-16 md:mt-24 lg:mt-12 mb-32">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[70vh]">
                
                {/* Left Section - Enhanced Terminal */}
                <div className="lg:w-1/2">
                    <div className="bg-[#1a1a1a] rounded-xl border border-gray-600 shadow-2xl h-full min-h-[500px] overflow-hidden group hover:border-gray-500 transition-all duration-300">
                        {/* Enhanced Terminal Header */}
                        <div className="bg-gradient-to-r from-[#2d2d30] to-[#363636] px-4 py-3 rounded-t-xl flex items-center gap-3 border-b border-gray-600">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm hover:bg-red-400 transition-colors cursor-pointer"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm hover:bg-green-400 transition-colors cursor-pointer"></div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <span className="text-gray-400 text-sm font-mono">📁</span>
                                <span className="text-gray-300 text-sm font-mono">About.jsx</span>
                                <span className="text-gray-500 text-xs">•</span>
                                <span className="text-green-400 text-xs">●</span>
                            </div>
                            <div className="ml-auto text-xs text-gray-500 font-mono">
                                Node.js
                            </div>
                        </div>
                        
                        {/* Enhanced Terminal Content */}
                        <div className="p-6 font-mono text-sm bg-gradient-to-br from-[#1a1a1a] to-[#1e1e1e] h-full">
                            {/* Terminal Prompt */}
                            <div className="text-gray-400 mb-4 flex items-center">
                                <span className="text-green-400 font-semibold">minul@portfolio</span>
                                <span className="text-white mx-1">:</span>
                                <span className="text-blue-400 font-medium">~/about</span>
                                <span className="text-white ml-1">$ </span>
                                <span className="text-white ml-1">node about.js</span>
                                <div className="ml-2 flex space-x-1">
                                    <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                                </div>
                            </div>
                            
                            {/* Enhanced Code Lines */}
                            <div className="space-y-1 bg-[#0f0f0f] rounded-lg p-4 border border-gray-700">
                                {codeLines.slice(0, currentLine).map(renderCodeLine)}
                                {currentLine < codeLines.length && (
                                    <div className="flex items-center group hover:bg-gray-800/30 px-2 py-0.5 rounded transition-colors">
                                        <span className="text-gray-500 w-8 text-right mr-4 select-none text-xs font-mono">
                                            {(currentLine + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-white animate-pulse">▊</span>
                                    </div>
                                )}
                                
                                {/* Terminal output simulation */}
                                {isTypingComplete && (
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="text-green-400 text-xs mb-2">✨ Object created successfully!</div>
                                        <div className="text-gray-500 text-xs">
                                            <span className="text-blue-400">developer</span>
                                            <span className="text-white"> {'=>'} </span>
                                            <span className="text-green-400">Ready for action! 🚀</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Enhanced Details */}
                <div className="lg:w-1/2 flex flex-col justify-center space-y-6 lg:space-y-8">
                    
                    {/* Enhanced Profile Image */}
                    <div className={`flex justify-center transition-all duration-700 ease-out ${visibleElements.image ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                        {visibleElements.image && (
                            <Tilt 
                                className='w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60'
                                tiltMaxAngleX={12}
                                tiltMaxAngleY={12}
                                perspective={1200}
                                transitionSpeed={800}
                                scale={1.08}
                                glareEnable={true}
                                glareMaxOpacity={0.3}
                                glareColor="#8245ec"
                                glarePosition="all"
                            >
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec] via-[#a855f7] to-[#8245ec] rounded-full animate-pulse opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec] to-[#a855f7] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
                                    <img
                                        src={profileImage}
                                        alt="Minul Chathumal - Full Stack Developer"
                                        className='w-full h-full rounded-full object-cover border-4 border-[#8245ec] relative z-10 transition-transform duration-300 group-hover:scale-105'
                                        loading="eager"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#050414] z-20 shadow-lg">
                                        <div className="absolute inset-1 bg-green-400 rounded-full animate-ping"></div>
                                    </div>
                                </div>
                            </Tilt>
                        )}
                    </div>

                    {/* Enhanced Name */}
                    <div className={`text-center transition-all duration-700 ease-out delay-200 ${visibleElements.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {visibleElements.name && (
                            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#8245ec] via-[#a855f7] to-[#8245ec] bg-clip-text text-transparent animate-gradient-x hover:scale-105 transition-transform duration-300 cursor-default">
                                Minul Chathumal
                            </h1>
                        )}
                    </div>

                    {/* Enhanced Role with Typing Effect */}
                    <div className={`text-center transition-all duration-700 ease-out delay-300 ${visibleElements.role ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {visibleElements.role && (
                            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-white">
                                <TypeAnimation
                                    sequence={[
                                        'Full Stack Developer',
                                        2500,
                                        'Problem Solver',
                                        2000,
                                        'Tech Enthusiast',
                                        2000,
                                        'Code Artist',
                                        2000,
                                        'Innovation Driver',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={60}
                                    repeat={Infinity}
                                    className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
                                />
                            </h2>
                        )}
                    </div>

                    {/* Enhanced About Text */}
                    <div className={`text-center transition-all duration-700 ease-out delay-500 ${visibleElements.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {visibleElements.about && (
                            <div className="relative">
                                <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mx-auto hover:text-gray-200 transition-colors duration-300">
                                    Passionate developer who loves creating innovative solutions and learning new technologies every day. 
                                    I transform ideas into beautiful, functional digital experiences with clean, efficient code.
                                </p>
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#8245ec]/10 to-[#a855f7]/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Resume Button */}
                    <div className={`text-center transition-all duration-700 ease-out delay-700 ${visibleElements.resume ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {visibleElements.resume && (
                            <a 
                                href="#"
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group relative inline-flex items-center gap-3 text-white py-4 px-8 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden shadow-lg hover:shadow-2xl'
                                style={{ 
                                    background: 'linear-gradient(135deg, #8245ec, #a855f7)',
                                    boxShadow: '0 10px 30px rgba(130, 69, 236, 0.4)'
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>Download Resume</span>
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#8245ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec] to-[#a855f7] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
