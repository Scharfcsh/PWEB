export default function AboutMe() {
  const qualifications = [
    { id: 1, title: "Bachelor's Degree in Computer Science", institution: "Parul University", year: "2026" },
    { id: 2, title: "Senior Secondary School", institution: "Hermann Gmeiner School", year: "2022" },
  ];

  const progressItems = [
    { id: 1, skill: "React Development", percentage: 85 },
    { id: 2, skill: "Node.js", percentage: 75 },
    { id: 3, skill: "Typescript", percentage: 56 },
  ];

  const certifications = [
    { id: 1, title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2021" },
    { id: 2, title: "Google Cloud Professional Developer", issuer: "Google Cloud", year: "2022" },
  ];

  const accomplishments = [
    { id: 1, title: "Led a team of 5 developers to deliver an e-commerce platform" },
    { id: 2, title: "Contributed to open-source projects having over 1000+ stars on GitHub." },
    { id: 3, title: "Solved 100+ Data Structure and Algorithm Problems on Leetcode." },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      

        {/* Qualifications */}
        <div className="bg-gray-800 shadow-md rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">Qualifications</h2>
          </div>
          <div className="border-t border-gray-700">
            <dl>
              {qualifications.map((qual) => (
                <div key={qual.id} className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-bold text-white">{qual.title}</dt>
                  <dd className="mt-1 text-lg text-gray-300 sm:mt-0 sm:col-span-2">
                    {qual.institution}, {qual.year}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-800 shadow-md rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">Progress</h2>
          </div>
          <div className="border-t border-gray-700">
            <ul>
              {progressItems.map((item) => (
                <li key={item.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-white">{item.skill}</p>
                    <p className="text-lg ">{item.percentage}%</p>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-pink-300 h-2.5 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-800 shadow-md rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">Certifications</h2>
          </div>
          <div className="border-t border-gray-700">
            <ul>
              {certifications.map((cert) => (
                <li key={cert.id} className="px-4 py-4">
                  <p className="text-lg font-medium text-white">{cert.title}</p>
                  <p className="text-sm text-gray-400">{cert.issuer}, {cert.year}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accomplishments */}
        <div className="bg-gray-800 shadow-md rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-teal-400">Accomplishments</h2>
          </div>
          <div className="border-t border-gray-700">
            <ol>
              {accomplishments.map((accomp) => (
                <li key={accomp.id} className="px-4 py-4">
                  <p className="text-md text-gray-300">{accomp.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
