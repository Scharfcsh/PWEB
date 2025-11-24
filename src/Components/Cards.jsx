import React from "react";
import Technologies from "./Technologies";
import { myTechStack } from "../constants/projects.js";
import { FaGithub } from "react-icons/fa6";
import { BsArrowUpRightCircle } from "react-icons/bs";
import photo from "../assets/photo.png";

const Cards = ({ project }) => {
    return (
      <div className="flex flex-col w-full mx-auto gap-3 sm:gap-4 border border-gray-400 rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-lg hover:border-gray-500 transition-transform duration-300 ease-in-out bg-gray-900/50 backdrop-blur-sm">
        <div
          className="h-40 sm:h-48 lg:h-56 w-full bg-cover bg-center rounded-lg transition-transform duration-300 hover:scale-101"
          style={{ backgroundImage: `url(${project.img})` }}
        ></div>
      
        <div className="flex flex-col gap-2 sm:gap-3 flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
            <h2 className="text-white font-bold text-lg sm:text-xl lg:text-2xl line-clamp-2">
              {project.projectName}
            </h2>
            {/* {project.date && (
              <span className="text-gray-500 text-xs sm:text-sm font-medium">
                {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short'
                })}
              </span>
            )} */}
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
            {project.description}
          </p>
          <Technologies techStack={project.technologies} />
        </div>
      
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mt-auto">
          <a 
            className="flex-1 px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-3 bg-[#ee91d5] rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-semibold text-sm sm:text-base hover:bg-pink-500 transition-colors duration-300 cursor-pointer" 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub className="text-lg sm:text-xl lg:text-2xl" />
            <span className="hidden xs:inline">GitHub</span>
            <span className="xs:hidden">Code</span>
          </a>
          {project.link && (
            <a 
              className="flex-1 px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-3 bg-[#27ceb5] rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-semibold text-sm sm:text-base hover:bg-teal-500 transition-colors duration-300 cursor-pointer" 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <BsArrowUpRightCircle className="text-lg sm:text-xl lg:text-2xl" />
              <span className="hidden xs:inline">Visit</span>
              <span className="xs:hidden">Demo</span>
            </a>
          )}
        </div>
      </div>
    );
  };
  
  export default Cards;
  
