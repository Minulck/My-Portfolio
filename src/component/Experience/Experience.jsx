import { useState, useRef } from 'react';
import { experienceOrganizations } from '../../constants';
import { FaCalendarAlt, FaBriefcase, FaUsers, FaTrophy, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Experience = () => {
    const [selectedOrg, setSelectedOrg] = useState(null);
    const scrollContainerRef = useRef(null);

    const handleOrgClick = (orgId) => {
        setSelectedOrg(selectedOrg === orgId ? null : orgId);
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id='experience' className='bg-[#050414] text-white py-12 sm:py-20 px-4'>
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-white">My Experience</h2>
                <div className="w-24 sm:w-32 h-1 bg-[#8245ec] mx-auto mt-4"></div>
                <p className="text-gray-400 text-sm sm:text-lg mt-4 font-semibold px-4">
                    Leadership roles and positions in clubs, organizations, and community service
                </p>
            </div>

            <div className="max-w-7xl mx-auto ">
                {/* Organizations Overview - Horizontal Scrollable */}
                <div className="relative mb-12">
                    {/* Navigation Buttons - Hidden on mobile */}
                    <button
                        onClick={scrollLeft}
                        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gray-900/80 hover:bg-[#8245ec]/20 border border-gray-700 hover:border-[#8245ec] rounded-full items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft className="text-gray-400 hover:text-[#8245ec] transition-colors duration-300" size={16} />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gray-900/80 hover:bg-[#8245ec]/20 border border-gray-700 hover:border-[#8245ec] rounded-full items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                        aria-label="Scroll right"
                    >
                        <FaChevronRight className="text-gray-400 hover:text-[#8245ec] transition-colors duration-300" size={16} />
                    </button>

                    {/* Scrollable Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:px-16 px-4 py-2"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {/* Hide scrollbar for webkit browsers */}
                        <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        
                        {experienceOrganizations.map((org) => (
                            <div
                                key={org.id}
                                onClick={() => handleOrgClick(org.id)}
                                className="flex-none w-full md:w-80 lg:w-96 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl hover:border-[#8245ec]/50 transition-all duration-300 hover:scale-105 cursor-pointer group snap-center"
                            >
                                {/* Organization Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-16 h-16 bg-[#8245ec]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <img 
                                            src={org.logo} 
                                            alt={`${org.name} logo`}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </div>
                                    <div className="text-[#8245ec] group-hover:scale-110 transition-transform duration-300">
                                        {selectedOrg === org.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>

                                {/* Organization Info */}
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#8245ec] transition-colors duration-300">
                                    {org.name}
                                </h3>
                                <p className="text-[#8245ec] font-semibold text-sm mb-2">
                                    {org.type}
                                </p>
                                <div className="flex items-center space-x-2 mb-3">
                                    <FaCalendarAlt className="text-gray-400 text-sm" />
                                    <span className="text-gray-400 text-sm">
                                        {org.duration}
                                    </span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {org.description}
                                </p>

                                {/* Positions Count */}
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaBriefcase className="text-[#8245ec] text-sm" />
                                        <span className="text-gray-400 text-sm">
                                            {org.positions.length} Position{org.positions.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        Click to expand
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Navigation Dots */}
                    <div className="flex md:hidden justify-center mt-6 space-x-2">
                        {experienceOrganizations.map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 bg-gray-600 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Mobile Scroll Hint */}
                    <div className="md:hidden text-center mt-4">
                        <p className="text-gray-500 text-xs">
                            Swipe left or right to browse organizations
                        </p>
                    </div>
                </div>

                {/* Detailed Positions Timeline */}
                {selectedOrg !== null && (
                    <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
                        <div className="text-center mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                {experienceOrganizations[selectedOrg].name} - Positions & Achievements
                            </h3>
                            <div className="w-16 h-1 bg-[#8245ec] mx-auto"></div>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#8245ec] to-gray-700 h-full"></div>
                            
                            {experienceOrganizations[selectedOrg].positions.map((position, index) => (
                                <div key={position.id} className="relative mb-8 sm:mb-12">
                                    {/* Timeline Dot */}
                                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#8245ec] rounded-full border-4 border-[#050414] z-10"></div>
                                    
                                    {/* Position Card */}
                                    <div className={`flex flex-col md:flex-row items-center ${
                                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}>
                                        <div className={`w-full md:w-5/12 ${
                                            index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                                        }`}>
                                            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 shadow-xl">
                                                {/* Position Header */}
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <div className="w-10 h-10 bg-[#8245ec]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FaBriefcase className="text-[#8245ec] text-sm" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white">
                                                            {position.title}
                                                        </h4>
                                                        <div className="flex items-center space-x-2">
                                                            <FaCalendarAlt className="text-gray-400 text-xs" />
                                                            <span className="text-gray-400 text-sm">
                                                                {position.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                                    {position.description}
                                                </p>

                                                {/* Achievements */}
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <FaTrophy className="text-[#8245ec] text-sm" />
                                                        <h5 className="text-white font-semibold text-sm">
                                                            Key Achievements:
                                                        </h5>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {position.achievements.map((achievement, achIndex) => (
                                                            <li key={achIndex} className="flex items-start space-x-2">
                                                                <div className="w-1.5 h-1.5 bg-[#8245ec] rounded-full mt-2 flex-shrink-0"></div>
                                                                <span className="text-gray-400 text-xs leading-relaxed">
                                                                    {achievement}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Spacer for desktop */}
                                        <div className="hidden md:block w-2/12"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Experience;
