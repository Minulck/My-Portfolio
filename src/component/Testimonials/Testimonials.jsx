import { useState } from 'react';
import { testimonials } from '../../constants';
import { FaChevronLeft, FaChevronRight, FaLinkedin } from 'react-icons/fa';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id='testimonials' className='bg-[#050414] text-white py-12 sm:py-20 px-4'>
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-white">Testimonials</h2>
                <div className="w-24 sm:w-32 h-1 bg-[#8245ec] mx-auto mt-4"></div>
                <p className="text-gray-400 text-sm sm:text-lg mt-4 font-semibold px-4">
                    Testimonials from mentors, and industry professionals who have mentored me during projects
                </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Testimonial Card */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-8 mx-4 sm:mx-8 lg:mx-16 shadow-2xl">
                    <div className="text-center">
                        {/* Quote Icon */}
                        <div className="mb-4 sm:mb-6">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-[#8245ec]/60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                        </div>

                        {/* Feedback */}
                        <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 italic px-2">
                            "{testimonials[currentIndex].feedback}"
                        </p>

                        {/* Profile Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Profile Picture */}
                            <div className="relative flex-shrink-0">
                                <img 
                                    src={testimonials[currentIndex].profilePic} 
                                    alt={testimonials[currentIndex].name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-[#8245ec]/30 shadow-lg"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#8245ec]/20 to-transparent"></div>
                                
                                {/* LinkedIn Badge */}
                                {testimonials[currentIndex].linkedinUrl && (
                                    <a
                                        href={testimonials[currentIndex].linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-[#0077B5] hover:bg-[#005885] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                                        aria-label={`View ${testimonials[currentIndex].name}'s LinkedIn profile`}
                                    >
                                        <FaLinkedin className="text-white text-xs" />
                                    </a>
                                )}
                            </div>

                            {/* Name and Position */}
                            <div className="text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start space-x-2">
                                    <h4 className="text-white font-semibold text-base sm:text-lg">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                </div>
                                <p className="text-[#8245ec] font-medium text-sm">
                                    {testimonials[currentIndex].pos}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    {testimonials[currentIndex].company || "Company Name"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows - Hidden on mobile, shown on larger screens */}
                <button
                    onClick={prevTestimonial}
                    className="hidden sm:flex absolute left-2 lg:left-1 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gray-900/80 hover:bg-[#8245ec]/20 border border-gray-700 hover:border-[#8245ec] rounded-full items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous testimonial"
                >
                    <FaChevronLeft className="text-gray-400 hover:text-[#8245ec] transition-colors duration-300" size={16} />
                </button>

                <button
                    onClick={nextTestimonial}
                    className="hidden sm:flex absolute right-2 lg:right-1 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gray-900/80 hover:bg-[#8245ec]/20 border border-gray-700 hover:border-[#8245ec] rounded-full items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next testimonial"
                >
                    <FaChevronRight className="text-gray-400 hover:text-[#8245ec] transition-colors duration-300" size={16} />
                </button>

                {/* Mobile Navigation Buttons */}
                <div className="flex sm:hidden justify-center space-x-4 mt-6">
                    <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 bg-gray-900/80 hover:bg-[#8245ec]/20 border border-gray-700 hover:border-[#8245ec] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                        aria-label="Previous testimonial"
                    >
                        <FaChevronLeft className="text-gray-400 hover:text-[#8245ec] transition-colors duration-300" size={14} />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 bg-gray-900/80 hover:bg-[#8245ec]/20 border border-gray-700 hover:border-[#8245ec] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                        aria-label="Next testimonial"
                    >
                        <FaChevronRight className="text-gray-400 hover:text-[#8245ec] transition-colors duration-300" size={14} />
                    </button>
                </div>



                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-[#8245ec] scale-125' 
                                    : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Counter */}
                <div className="text-center mt-3 sm:mt-4">
                    <p className="text-gray-500 text-xs sm:text-sm">
                        {currentIndex + 1} of {testimonials.length}
                    </p>
                </div>
            </div>
        </section>
    )

 }

 export default Testimonials;