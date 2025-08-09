import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile_round.png'; 


const About = () => {
    return (
        <section id="about"
        className="px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32 mb-32">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-8">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
                        Hi, I am 
                    </h1>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-tight">
                        Minul Chathumal
                    </h2>
                     <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#8245ec] mb-4 leading-tight">
                        <span className="text-white">
                            I am a &nbsp;
                        </span>
                        <TypeAnimation
                            sequence={[
                                ' Full Stack Developer',
                                1000,
                                ' Passionate Coder',
                                1000,
                                ' Tech Enthusiast',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: 'inherit', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                     </h3>
                     <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
                         I have a strong background in web development, with a focus on creating dynamic and responsive user interfaces. My passion for coding drives me to continuously learn and adapt to new technologies, ensuring that I stay at the forefront of the industry.
                     </p>

                    <a href=""
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105'
                        style={{ background:'linear-gradient(90deg, #8245ec, #a855f7)',
                            boxShadow:'0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #a855f7'
                         }}
                    >
                        Download CV
                    </a>
                </div>
                
                <div className="md:w-1/2 flex justify-center md:justify-end ">
                   <Tilt className='w-64 w-48 sm:h-54 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full'
                        tiltMaxAngleX={20}
                        tiltMaxAngleY={20}
                        perspective={1000}
                        transitionSpeed={1000}
                        scale={1.05}
                       >
                     <img
                    src={profileImage}
                    alt="Profile"
                    className='w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]'
                    />
                   </Tilt>

                </div>

            </div>
        </section>
    );
}

export default About;
