import React from 'react'

const Technologies = ({techStack}) => {
  return (
    <div className="flex flex-wrap justify-center bg-transparent p-1 rounded-lg">
      {techStack.map((tech, index) => (
        <div
          key={index}
          className="m-1 px-2 py-1 bg-white text-black font-bold text-sm rounded-xl shadow-md text-center hover:bg-teal-500"
        >
          {tech}
        </div>
      ))}
    </div>
  )
}

export default Technologies

