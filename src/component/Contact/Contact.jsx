import {
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaFacebookMessenger,
} from "react-icons/fa";
import {useRef, useState} from 'react'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailJs from '@emailjs/browser'

const Contact = () => {

  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSent(true);

    emailJs.sendForm('service_bdmch9c', 'template_m41zaba', form.current, 'AmZJux4o5cxrrJKSS')
      .then((result) => {
          form.current.reset();
          toast.success("Message sent successfully!", {
            position: "top-left",
            autoClose: 3000,
            closeOnClick: true,
            theme: "dark"
          });
          // Reset the sent state after a delay
          setTimeout(() => setIsSent(false), 3000);
      }, (error) => {
          console.log(error.text);
          toast.error("Failed to send message.", {
            position: "top-left",
            autoClose: 3000,
            closeOnClick: true,
            theme: "dark"
          });
          setIsSent(false);
      });
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-4 px-[12vw] md:px-[17vw] lg:px-[20vw]"
    >
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">Contact Me</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 text-lg mt-4 font-semibold">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Feel free to reach out!
        </p>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-12 items-start">
        {/* Social Media Links */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
          <div className="space-y-4">
            <a 
              target="_blank"
              href="https://wa.me/752427449" 
              className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors duration-300 p-3 rounded-lg hover:bg-[#0d081f] border border-transparent hover:border-gray-700"
            >
              <FaWhatsapp size={24} />
              <span className="text-lg">+75 242 7449</span>
            </a>
            <a 
              target="_blank"
              href="https://t.me/MinulCK" 
              className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors duration-300 p-3 rounded-lg hover:bg-[#0d081f] border border-transparent hover:border-gray-700"
            >
              <FaTelegram size={24} />
              <span className="text-lg">+75 242 7449</span>
            </a>
            <a 
              target="_blank"
              href="https://m.me/minulchathumal" 
              className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors duration-300 p-3 rounded-lg hover:bg-[#0d081f] border border-transparent hover:border-gray-700"
            >
              <FaFacebookMessenger size={24} />
              <span className="text-lg">Minul Chathumal</span>
            </a>

          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#0d081f] p-8 rounded-xl shadow-2xl border border-gray-700">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">Send Message</h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">

            <input 
              name="from_name"
              className="w-full p-4 rounded-lg bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300" 
              type="text" 
              placeholder="Your Full Name"
              required 
            />

            <input 
              name="from_email"
              className="w-full p-4 rounded-lg bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300" 
              type="email" 
              placeholder="Your Email Address"
              required 
            />

            <input 
              name="subject"
              className="w-full p-4 rounded-lg bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300" 
              type="text"
              placeholder="Subject"
              required 
            />

            <textarea 
              name="message"
              className="w-full p-4 rounded-lg bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 min-h-[120px] resize-vertical" 
              placeholder="Your Message" 
              rows="5"
              required
            ></textarea>

            <button 
              type="submit" 
              disabled={isSent ? true : false}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSent ? 'Message Sent!' : 'Send Message'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
