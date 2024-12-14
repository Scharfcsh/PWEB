import React from "react";
import Technologies from "./Technologies";
import { myTechStack } from "../constants/projects.js";
import { FaGithub } from "react-icons/fa6";
import { BsArrowUpRightCircle } from "react-icons/bs";
import photo from "../assets/photo.png";
const Cards = ({ project }) => {
    return (
      <div className="flex flex-col gap-4 border border-gray-400 rounded-xl p-4 h1over:rotate- hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <div
        className="h-48 w-full bg-cover bg-center rounded-t-xl transition-transform duration-300 hover:scale-110"
        style={{ backgroundImage: `url(${project.img})` }}
      ></div>
    
      <div className="h-56">3oP
        <h2 className="text-white font-bold">{project.projectName}</h2>
        <p className="text-gray-400">{project.description}</p>
        <Technologies techStack={project.technologies} />
      </div>
    
      <div className="flex justify-evenly">
        <a className="px-4 py-2 bg-[#ee91d5] rounded-xl flex gap-2 font-semibold hover:bg-pink-500 transition-colors duration-300 cursor-pointer" href={project.github} target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-2xl" />
        Github
        </a>
        <a className="px-4 py-2 bg-[#27ceb5] rounded-xl flex gap-2 font-semibold hover:bg-teal-500 transition-colors duration-300 cursor-pointer" href={project.link} target="_blank" rel="noopener noreferrer">
        <BsArrowUpRightCircle className="text-2xl" />
        Visit
        </a>
      </div>
      </div>
    );
  };
  
  export default Cards;
  
