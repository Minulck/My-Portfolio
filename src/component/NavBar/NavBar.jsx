import React, { useEffect } from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "work", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const handleMenuItemClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-4 sm:px-6 md:px-[7vw] lg:px-[20vw] ${
        isScrolled
          ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="text-white py-4 sm:py-5 flex justify-between items-center">
        <div className="text-base sm:text-lg font-semibold cursor-pointer">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">Minul</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-white ">Chathumal</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-300 ">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-[#8245ec] ${
                activeSection === item.id ? "text-[#8245ec]" : ""
              }`}
            >
              <button onClick={() => handleMenuItemClick(item.id)}>
                {item.label}
              </button>
            </li> 
          ))}
        </ul>

          <div className="hidden md:flex space-x-4">
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-colors"
            >
              <FaGithub size={30}/>
            </a>
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-colors"
            >
              <FaLinkedin size={30} />
            </a>
          </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          {isMenuOpen ? (
            <FiX className="text-2xl sm:text-3xl text-[#8245ec] cursor-pointer" 
            onClick={() => setIsMenuOpen(false)}/>
          ) : (
            <FiMenu className="text-2xl sm:text-3xl text-[#8245ec] cursor-pointer" 
            onClick={() => setIsMenuOpen(true)}/>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 w-full bg-[rgba(5,4,20,0.95)] backdrop-blur-lg shadow-lg md:hidden">
            <ul className="flex flex-col items-center space-y-4 text-gray-300 p-6">
              {menuItems.map((item) => (
                <li key={item.id} className={`cursor-pointer hover:text-white w-full text-center py-2 ${activeSection === item.id ? "text-[#8245ec] bg-[#050414]/60 rounded-lg" : ""}`}>
                  <button className="w-full py-2"
                  onClick={() => handleMenuItemClick(item.id)}>
                    {item.label}
                  </button>
                </li>
              ))}
              <div className="flex space-x-6 pt-4">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaLinkedin size={20} />
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
