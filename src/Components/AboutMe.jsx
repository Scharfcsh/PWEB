import { services,qualifications,certifications, accomplishments } from "../constants/aboutme.js";
export default function AboutMe() {

  return (
    <div className="min-h-screen bg-transparent text-white py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* What I Do Section */}
        <div className="text-gray-100 py-6 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-teal-400">
              What I Do
            </h2>
            <p className="mt-3 sm:mt-4 text-center text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
              Leveraging expertise in backend, frontend, and UI/UX design to
              craft digital solutions that deliver results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-10">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="shadow-md border border-gray-400 rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-lg hover:scale-105 hover:border-gray-300 transition-all duration-300 ease-in-out bg-gray-900/30 backdrop-blur-sm"
                >
                  <div
                    className="h-20 sm:h-24 lg:h-28 w-full bg-cover bg-center rounded-lg transition-transform duration-300 hover:scale-105"
                    style={{ backgroundImage: `url(${service.icon})` }}
                  ></div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 mt-3 sm:mt-4 lg:mt-6 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="#contact"
                className="bg-[#ee91d5] text-gray-900 px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#dfacd2] transition duration-300"
              >
                Let’s Build Something Great!
              </a>
            </div>
          </div>
        </div>

        {/* Qualifications
        <div className=" shadow-md rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">
              Qualifications
            </h2>
          </div>
          <div className="border-t border-gray-700">
            <dl>
              {qualifications.map((qual) => (
                <div
                  key={qual.id}
                  className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt className="text-lg font-bold text-white">{qual.title}</dt>
                  <dd className="mt-1 text-lg text-gray-300 sm:mt-0 sm:col-span-2">
                    {qual.institution}, {qual.year}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div> */}
        {/* Qualifications Subsection */}
        <div className="text-gray-100 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-400 mb-4 sm:mb-6 text-center sm:text-left">
              Qualifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {qualifications.map((qual) => (
                <div
                  key={qual.id}
                  className="border border-gray-400 rounded-xl p-3 sm:p-4 lg:p-5 hover:shadow-lg hover:scale-105 hover:border-gray-300 transition-all duration-300 ease-in-out bg-gray-900/30 backdrop-blur-sm"
                >
                  <h4 className="text-base sm:text-lg font-medium text-gray-200 mb-2">
                    {qual.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">{qual.institution}</p>
                  <span className="text-xs sm:text-sm text-gray-500">{qual.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        {/* <div className="shadow-md rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">
              Certifications
            </h2>
          </div>
          <div className="border-t border-gray-700">
            <ul>
              {certifications.map((cert) => (
                <li key={cert.id} className="px-4 py-4">
                  <p className="text-lg font-medium text-white">{cert.title}</p>
                  <p className="text-sm text-gray-400">
                    {cert.issuer}, {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* Accomplishments */}
        {/* <div className="shadow-md rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">
              Accomplishments
            </h2>
          </div>
          <div className="border-t border-gray-700">
            <ol>
              {accomplishments.map((accomp) => (
                <li key={accomp.id} className="px-4 py-4">
                  <p className="text-md text-teal-400">{accomp.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div> */}

        {/* Certifications Section */}
        <div className="text-gray-100 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-400 mb-4 sm:mb-6 text-center sm:text-left">
              Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="border border-gray-400 rounded-xl p-3 sm:p-4 lg:p-5 hover:shadow-lg hover:scale-105 hover:border-gray-300 transition-all duration-300 ease-in-out bg-gray-900/30 backdrop-blur-sm"
                >
                  <h4 className="text-base sm:text-lg font-medium text-gray-200 mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">{cert.issuer}</p>
                  <span className="text-xs sm:text-sm text-gray-500">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accomplishments Section */}
        {/* <div className="text-gray-100 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-400 mb-4 sm:mb-6 text-center sm:text-left">
              Accomplishments
            </h3>
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-400 rounded-xl p-4 sm:p-6 lg:p-8">
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-400">
                {accomplishments.map((accomp) => (
                  <li key={accomp.id} className="text-sm sm:text-base leading-relaxed">
                    {accomp.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
