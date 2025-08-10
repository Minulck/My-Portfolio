import { education } from "../../constants";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-4 md:px-[7vw] lg:px-[16vw] bg-skills-gradient clip-path-custom-3"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">My Education</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 text-lg mt-4 font-semibold max-w-2xl mx-auto">
          I have a solid educational background that has equipped me with the
          skills and knowledge necessary to excel in the field of web
          development. Here are some highlights of my academic journey:
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-white h-full "></div>
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={`flex flex-col md:flex-row items-center mb-12 md:mb-16 ${
              index % 2 === 0 ? "md:justify-start" : "md:justify-end"
            }`}
          >
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 bg-white border-4 border-[#8245ec] w-12 h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center z-10">
              <img
                src={edu.img}
                alt={edu.school}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div
              className={`w-full md:max-w-[43%] max-w-[300px] p-3 md:p-6 rounded-2xl shadow-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0,0.20px,1px,rgba(130,69,236,0.5)] ${
                index % 2 === 0 ? "md:mr-auto md:ml-12" : "md:ml-auto md:mr-12"
              } mt-12 md:mt-0 transform transition-transform duration-500 md:hover:scale-105`}
            >
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={edu.img}
                    alt={edu.school}
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <h4 className="text-sm md:text-base text-gray-300">
                      {edu.school}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-2">{edu.date}</p>
                </div>
              </div>
              <p className="text-white mt-3 md:mt-4 text-sm md:text-base">
                Grade: <span className="text-purple-500">{edu.grade}</span>
              </p>
              <p className="mt-3 md:mt-4 text-gray-400 text-sm md:text-base">{edu.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;