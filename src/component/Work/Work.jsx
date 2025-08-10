import { projects } from "../../constants";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleModalClick = (e) => {
    // Close modal if clicking on the backdrop
    if (e.target === e.currentTarget) {
      handleCloseProject();
    }
  };

  // Handle touch events for swipe-to-close on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -150; // Swipe down threshold
    
    if (isDownSwipe) {
      handleCloseProject();
    }
  };



  return (
    <>
      <section
        id="work"
        className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] relative"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Projects</h2>
          <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 text-lg font-semibold">
            Here are some of the projects I have worked on, showcasing my skills
            in web development and design.
          </p>
        </div>

        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 
              hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback for missing images */}
                <div className="hidden w-full h-48 bg-gray-800 rounded-xl items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    Image not available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-500 pt-5 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-[#251f38] text-purple-500 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-2 sm:p-4"
          onClick={handleModalClick}
        >
          <div 
            className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative mx-2 sm:mx-0 modal-content modal-scroll"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Swipe indicator for mobile */}
            <div className="flex justify-center pt-2 pb-1 sm:hidden">
              <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
            </div>
            
            {/* Close button */}
            <div className="sticky top-0 bg-gray-900 z-10 flex justify-end p-3 sm:p-4 pb-0 rounded-t-xl">
              <button
                className="text-white text-2xl sm:text-3xl font-bold hover:text-purple-500 transition-colors duration-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-800 active:bg-gray-700 modal-close-btn"
                onClick={handleCloseProject}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal content */}
            <div className="p-3 sm:p-6 pt-2">
              {/* Project image */}
              <div className="w-full flex justify-center mb-4 sm:mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-w-full sm:max-w-2xl object-contain rounded-lg sm:rounded-xl shadow-2xl max-h-48 sm:max-h-80"
                />
              </div>

              {/* Project details */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 px-2">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 px-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#251f38] text-purple-400 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons if needed */}
                {(selectedProject.webapp || selectedProject.github || selectedProject.frontend || selectedProject.backend) && (
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
                    {selectedProject.webapp && (
                      <a
                        href={selectedProject.webapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-3 sm:px-4 py-2 sm:py-1.5 rounded-md font-medium transition-colors duration-200 text-xs sm:text-sm min-h-[44px] sm:min-h-[36px] flex items-center justify-center modal-button w-full sm:w-auto"
                      >
                        View Live
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-1.5 rounded-md font-medium transition-colors duration-200 text-xs sm:text-sm min-h-[44px] sm:min-h-[36px] flex items-center justify-center modal-button w-full sm:w-auto"
                      >
                        View Code
                      </a>
                    )}
                    {selectedProject.frontend && (
                      <a
                        href={selectedProject.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-1.5 rounded-md font-medium transition-colors duration-200 text-xs sm:text-sm min-h-[44px] sm:min-h-[36px] flex items-center justify-center modal-button w-full sm:w-auto"
                      >
                        Frontend Code
                      </a>
                    )}
                    {selectedProject.backend && (
                      <a
                        href={selectedProject.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-1.5 rounded-md font-medium transition-colors duration-200 text-xs sm:text-sm min-h-[44px] sm:min-h-[36px] flex items-center justify-center modal-button w-full sm:w-auto"
                      >
                        Backend Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Work;
