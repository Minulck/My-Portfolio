const Contact = () => {
  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-4 px-[12vw] md:px-[17vw] lg:px-[20vw]"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">Contact Me</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 text-lg mt-4 font-semibold">
          If you would like to get in touch with me, feel free to reach out
          through any of the platforms below:
        </p>
      </div>
    </section>
  );
};

export default Contact;
