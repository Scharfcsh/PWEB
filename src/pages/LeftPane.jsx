import React from "react";
import photo from '../assets/photo.png'
import Technologies from "../Components/Technologies.jsx";
import { myTechStack } from "../constants/projects.js";
import Download from "../Components/Download.jsx";
import { FaGithub, FaLinkedin, FaTwitter, FaCalendarCheck   } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlEnvolope } from "react-icons/sl";


const LeftPane = () => {
  return (
    <div className="w-1/5 bg-[#121924] h-[95%] my-14 rounded-lg hidden xl:block ">
      <div className="bg-[#18212b] h-auto rounded-t-lg  flex flex-col items-center gap-2">
        <div className=" rounded-full  h-34 w-34 mt-8 border-blue-400 border">
          <img src={photo} alt="photo" className="rounded-full object-cover h-32 w-32 " />
        </div>
        <h1 className="font-bold text-xl text-center mt-4 text-white">
          Aman Adhikari
        </h1>
        <p className="text-center font-semibold text-gray-400">
          Full Stack Developer <br />
          Designer
        </p>

        <Technologies techStack= {myTechStack}/>
      </div> 

      <Download /> 
      
      <div className="flex flex-col p-4 gap-3 ">

      <h2 className="text-xl text-white font-bold ">Contact Info</h2>
      <div  className="flex gap-3 items-center px-4">
        <FaLocationDot className="text-white text-2xl"/>
        <span className="text-gray-300">India</span>
      </div>
      <div className="flex gap-3 items-center px-4">
        <SlEnvolope className="text-white text-2xl"/>
        <span className="text-gray-300">amanadhikari2003@gmail.com</span>
      </div>
      <div className="flex gap-3 items-center px-4">
        <FaCalendarCheck className="text-white text-2xl"/>
        <span className="text-gray-300">Available for Hire</span>
      </div>
      </div>


      <div className="flex flex-col p-4 gap-3  ">
        <h2 className="text-xl text-white font-bold">Socials</h2>
        <div className="flex text-2xl text-white gap-8 justify-center">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Scharfcsh"><FaGithub/></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/amanadhikari/"><FaLinkedin/></a>
          <a target="_blank" rel="noopener noreferrer" href="https://x.com/amanadhikari49"><FaTwitter /></a>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
