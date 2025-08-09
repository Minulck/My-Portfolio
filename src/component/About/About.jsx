import { useState, useEffect, useMemo, useCallback } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile_round.png'; 

const About = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [visibleElements, setVisibleElements] = useState({
        image: false,
        name: false,
        role: false,
        about: false,
        resume: false
    });

    // Optimized code lines with reduced delays and grouped triggers
    const codeLines = useMemo(() => [
        { code: "const developer = {", delay: 500, triggers: [] },
        { code: "  name: 'Minul Chathumal',", delay: 800, triggers: ['name'] },
        { code: "  image: './profile.jpg',", delay: 600, triggers: ['image'] },
        { code: "  role: 'Full Stack Developer',", delay: 800, triggers: ['role'] },
        { code: "  passion: 'Building Amazing UIs',", delay: 600, triggers: [] },
        { code: "  skills: ['React', 'Spring Boot', 'Ballerina'],", delay: 700, triggers: [] },
        { code: "  experience: '3+ years',", delay: 600, triggers: [] },
        { code: "  about: `Passionate developer who", delay: 700, triggers: ['about'] },
        { code: "    loves creating innovative", delay: 500, triggers: [] },
        { code: "    solutions and learning new", delay: 500, triggers: [] },
        { code: "    technologies every day.`,", delay: 600, triggers: [] },
        { code: "  resume: 'available',", delay: 600, triggers: ['resume'] },
        { code: "};", delay: 400, triggers: [] },
        { code: "", delay: 300, triggers: [] },
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

    useEffect(() => {
        let timeouts = [];
        let totalDelay = 0;

        codeLines.forEach((line, index) => {
            totalDelay += line.delay;
            const timeout = setTimeout(() => {
                setCurrentLine(index + 1);
                if (line.triggers.length > 0) {
                    setTimeout(() => handleTriggers(line.triggers), 150);
                }
            }, totalDelay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [codeLines, handleTriggers]);

    // Optimized syntax highlighting function
    const renderCodeLine = useCallback((line, index) => {
        const { code } = line;
        
        return (
            <div key={index} className="flex">
                <span className="text-gray-500 w-6 text-right mr-4 select-none">
                    {index + 1}
                </span>
                <span className="text-gray-300">
                    {code.includes('const') && (
                        <>
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> developer = </span>
                            <span className="text-yellow-400">{'{'}</span>
                        </>
                    )}
                    {code.includes('name:') && (
                        <>
                            <span className="text-blue-300">  name</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">'Minul Chathumal'</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('image:') && (
                        <>
                            <span className="text-blue-300">  image</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">'./profile.jpg'</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('role:') && (
                        <>
                            <span className="text-blue-300">  role</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">'Full Stack Developer'</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('passion:') && (
                        <>
                            <span className="text-blue-300">  passion</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">'Building Amazing UIs'</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('skills:') && (
                        <>
                            <span className="text-blue-300">  skills</span>
                            <span className="text-white">: </span>
                            <span className="text-yellow-400">[</span>
                            <span className="text-green-300">'React', 'Ballerina', 'Spring Boot'</span>
                            <span className="text-yellow-400">]</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('experience:') && (
                        <>
                            <span className="text-blue-300">  experience</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">'3+ years'</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('about:') && (
                        <>
                            <span className="text-blue-300">  about</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">`Passionate developer who</span>
                        </>
                    )}
                    {code.includes('loves creating') && (
                        <span className="text-green-300">    loves creating innovative</span>
                    )}
                    {code.includes('solutions and') && (
                        <span className="text-green-300">    solutions and learning new</span>
                    )}
                    {code.includes('technologies') && (
                        <>
                            <span className="text-green-300">    technologies every day.</span>
                            <span className="text-green-300">`</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code.includes('resume:') && (
                        <>
                            <span className="text-blue-300">  resume</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">'available'</span>
                            <span className="text-white">,</span>
                        </>
                    )}
                    {code === '};' && (
                        <span className="text-yellow-400">{'};'}</span>
                    )}
                    {code.includes('//') && (
                        <span className="text-gray-500">{code}</span>
                    )}
                    {code === '' && <span>&nbsp;</span>}
                </span>
            </div>
        );
    }, []);

    return (
        <section id="about" className="px-[5vw] md:px-[7vw] lg:px-[10vw] font-sans mt-16 md:mt-24 lg:mt-12 mb-32">
            <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
                
                {/* Left Section - Terminal */}
                <div className="lg:w-1/2">
                    <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-2xl h-full min-h-[500px]">
                        {/* Terminal Header */}
                        <div className="bg-[#2d2d30] px-4 py-3 rounded-t-lg flex items-center gap-2 border-b border-gray-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-300 text-sm ml-4">About.jsx</span>
                        </div>
                        
                        {/* Terminal Content */}
                        <div className="p-6 font-mono text-sm">
                            <div className="text-gray-500 mb-4">
                                <span className="text-green-400">minul@portfolio</span>
                                <span className="text-white">:</span>
                                <span className="text-blue-400">~/about</span>
                                <span className="text-white">$ </span>
                                <span className="text-white">node about.js</span>
                            </div>
                            
                            {/* Code Lines */}
                            <div className="space-y-1">
                                {codeLines.slice(0, currentLine).map(renderCodeLine)}
                                {currentLine < codeLines.length && (
                                    <div className="flex">
                                        <span className="text-gray-500 w-6 text-right mr-4 select-none">
                                            {currentLine + 1}
                                        </span>
                                        <span className="text-white animate-blink">|</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Details */}
                <div className="lg:w-1/2 flex flex-col justify-center space-y-8">
                    
                    {/* Profile Image */}
                    <div className={`flex justify-center transition-all duration-1000 ${visibleElements.image ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {visibleElements.image && (
                            <Tilt 
                                className='w-48 h-48 md:w-56 md:h-56'
                                tiltMaxAngleX={15}
                                tiltMaxAngleY={15}
                                perspective={1000}
                                transitionSpeed={1000}
                                scale={1.05}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec] to-[#a855f7] rounded-full animate-pulse opacity-75"></div>
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className='w-full h-full rounded-full object-cover border-4 border-[#8245ec] relative z-10'
                                        loading="lazy"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#050414] z-20"></div>
                                </div>
                            </Tilt>
                        )}
                    </div>

                    {/* Name */}
                    <div className={`text-center transition-all duration-1000 delay-300 ${visibleElements.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {visibleElements.name && (
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#8245ec] to-[#a855f7] bg-clip-text text-transparent">
                                Minul Chathumal
                            </h1>
                        )}
                    </div>

                    {/* Role with Typing Effect */}
                    <div className={`text-center transition-all duration-1000 delay-500 ${visibleElements.role ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {visibleElements.role && (
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
                                <TypeAnimation
                                    sequence={[
                                        'Full Stack Developer',
                                        2000,
                                        'Problem Solver',
                                        2000,
                                        'Tech Enthusiast',
                                        2000,
                                        'Code Artist',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </h2>
                        )}
                    </div>

                    {/* About Text */}
                    <div className={`text-center transition-all duration-1000 delay-700 ${visibleElements.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {visibleElements.about && (
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                                Passionate developer who loves creating innovative solutions and learning new technologies every day. 
                                I transform ideas into beautiful, functional digital experiences.
                            </p>
                        )}
                    </div>

                    {/* Resume Button */}
                    <div className={`text-center transition-all duration-1000 delay-1000 ${visibleElements.resume ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {visibleElements.resume && (
                            <a 
                                href=""
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group relative inline-flex items-center gap-3 text-white py-4 px-8 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 overflow-hidden'
                                style={{ 
                                    background: 'linear-gradient(90deg, #8245ec, #a855f7)',
                                    boxShadow: '0 0 30px rgba(130, 69, 236, 0.5)'
                                }}
                            >
                                <span className="relative z-10">Download Resume</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#8245ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
