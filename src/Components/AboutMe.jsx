import { services,qualifications,certifications, accomplishments } from "../constants/aboutme.js";
export default function AboutMe() {

  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* What I Do Section */}
        <div className=" text-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
            <h2 className="text-4xl font-bold text-center text-teal-400">
              What I Do
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Leveraging expertise in backend, frontend, and UI/UX design to
              craft digital solutions that deliver results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 ">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="  shadow-md   border border-gray-400 rounded-xl p-4 h1over:rotate- hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div
                    className="h-28 w-full bg-cover bg-center rounded-t-xl transition-transform duration-300 "
                    style={{ backgroundImage: `url(${service.icon})` }}
                  ></div>
                  <h3 className="text-md font-semibold mb-2 mt-6">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
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
        <div className=" text-gray-100 py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-teal-400 mb-4">
              Qualifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {qualifications.map((qual) => (
                <div
                  key={qual.id}
                  className=" border border-gray-400 rounded-xl p-4 h1over:rotate- hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <h4 className="text-lg font-medium text-gray-200">
                    {qual.title}
                  </h4>
                  <p className="text-sm text-gray-400">{qual.institution}</p>
                  <span className="text-sm text-gray-500">{qual.year}</span>
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
        <div className=" text-gray-100 py-8 ">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-teal-400 mb-4">
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className=" border border-gray-400 rounded-xl p-4 h1over:rotate- hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <h4 className="text-lg font-medium text-gray-200">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                  <span className="text-sm text-gray-500">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accomplishments Section */}
        <div className=" text-gray-100 py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-teal-400 mb-4">
              Accomplishments
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-400">
              {accomplishments.map((accomp) => (
                <li key={accomp.id} className="text-md">
                  {accomp.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
