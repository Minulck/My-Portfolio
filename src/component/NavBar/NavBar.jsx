import React, { useEffect } from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = menuItems.map((item) => item.id);
      const navbarHeight = 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.pageYOffset - navbarHeight;
          const sectionBottom = sectionTop + rect.height;

          if (window.pageYOffset >= sectionTop - 100 && window.pageYOffset < sectionBottom - 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      if (window.pageYOffset < 100) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);

    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(id);
      if (section) {
        const navbarHeight = 80;
        const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-4 sm:px-6 md:px-[7vw] lg:px-[20vw] ${
        isScrolled ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="text-white py-3 sm:py-4 flex items-center justify-between md:justify-center">
        <div className="text-sm sm:text-base md:text-lg font-semibold cursor-pointer mr-auto md:mr-5">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">MinulCK</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu and Social Icons */}
        <div className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-10">
          <ul className="flex space-x-4 sm:space-x-6 lg:space-x-8 text-sm sm:text-base text-gray-300">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-[#8245ec] ${activeSection === item.id ? "text-[#8245ec]" : ""}`}
              >
                <button className="cursor-pointer" onClick={() => handleMenuItemClick(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex space-x-3 sm:space-x-4">
            <a
              href="https://github.com/Minulck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8245ec] transition-colors"
            >
              <FaGithub size={20} sm:size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/minul-chathumal-b2784725b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8245ec] transition-colors"
            >
              <FaLinkedin size={20} sm:size={24} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50 ml-auto">
          {isMenuOpen ? (
            <FiX
              className="text-xl sm:text-2xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-xl sm:text-2xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 w-full bg-[rgba(5,4,20,0.95)] backdrop-blur-lg shadow-lg md:hidden">
            <ul className="flex flex-col items-center space-y-3 sm:space-y-4 p-4 sm:p-6">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`cursor-pointer hover:text-white w-full text-center py-2 sm:py-3 ${
                    activeSection === item.id ? "text-[#8245ec] bg-[#050414]/60 rounded-lg" : ""
                  }`}
                >
                  <button className="w-full py-2 sm:py-3" onClick={() => handleMenuItemClick(item.id)}>
                    {item.label}
                  </button>
                </li>
              ))}
              <div className="flex justify-center space-x-4 pt-3 sm:pt-4">
                <a
                  href="https://github.com/Minulck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaGithub size={18} sm:size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/minul-chathumal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaLinkedin size={18} sm:size={20} />
                </a>
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;