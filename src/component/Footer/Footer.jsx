import {FaFacebook,FaTwitter,FaInstagram,FaLinkedin} from "react-icons/fa"

const Footer = () => {

const handleScroll = (id) => {
  if (id === "about") {
    // Scroll to top of page for About section
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  } else {
    // Normal scroll behavior for other sections
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

  return (
    <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      {/* Separation line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8"></div>
      
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold text-purple-500">
          Minul Chathumal
        </h2>
        <div className="flex justify-center flex-wrap space-x-4 sm:space-x-6 mt-4">
          {[
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Work", id: "work" },
            { name: "Education", id: "education" },
            { name: "Experience", id: "experience" },
            { name: "Contact", id: "contact" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleScroll(item.id)}
              className="hover:text-purple-500 text-sm sm:text-base my-1"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          {[
            {icon: <FaFacebook size={20} />, link:"https://www.facebook.com/minulchathumal"},
            {icon: <FaTwitter size={20} />, link:"https://twitter.com/minulck"},
            {icon: <FaInstagram size={20} />, link:"https://www.instagram.com/minul_ck"},
            {icon: <FaLinkedin size={20} />, link:"https://www.linkedin.com/in/minul-chathumal"}
          ].map((item, index) => (
            <div key={index} className="text-gray-300 hover:text-purple-500 transition-colors">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.icon}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Minul Chathumal. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
