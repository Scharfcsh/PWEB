import React, { useState } from "react";
import photo from "../assets/photo.png";
import Technologies from "../Components/Technologies.jsx";
import { myTechStack } from "../constants/projects.js";
import Download from "../Components/Download.jsx";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCalendarCheck,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#18212b] rounded-md xl:hidden"
        onClick={toggleMenu}
      >
        {showMenu ? (
          <HiX className="text-white text-2xl" />
        ) : (
          <HiMenu className="text-white text-2xl" />
        )}
      </button>

      {/* Sidebar content */}
      <div
        className={`
          fixed top-0 left-0 w-3/5 h-screen bg-[#121924] z-40
          xl:relative xl:w-1/5 xl:my-14 xl:rounded-lg
           transition-transform duration-300 ease-in-out
          ${showMenu ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0 xl:block
        `}
      >
        <div className="bg-[#18212b] h-auto rounded-t-lg flex flex-col items-center gap-2 p-2">
          <div className="rounded-full h-24 w-24 mt-4 border-blue-400 border">
            <img
              src={photo}
              alt="photo"
              className="rounded-full object-cover h-full w-full"
            />
          </div>
          <h1 className="font-bold text-xl text-center mt-2 text-white">
            Aman Adhikari
          </h1>
          <p className="text-center font-semibold text-gray-400">
            Full Stack Developer <br />
            Designer
          </p>

          <Technologies techStack={myTechStack} />
        </div>

        <Download />

        <div className="flex flex-col p-3 gap-2">
          <h2 className="text-base text-white font-bold">Contact Info</h2>
          <div className="flex gap-3 items-center px-4">
            <FaLocationDot className="text-white text-lg" />
            <span className="text-gray-300 text-sm">India</span>
          </div>
          <div className="flex gap-3 items-center px-4">
            <IoMdMail className="text-white text-lg" />
            <span className="text-gray-300 text-sm">
              amanadhikari2003@gmail.com
            </span>
          </div>
          <div className="flex gap-3 items-center px-4">
            <FaCalendarCheck className="text-white text-lg" />
            <span className="text-gray-300 text-sm">Available for Hire</span>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-3">
          <h2 className="text-base text-white font-bold">Socials</h2>
          <div className="flex text-xl text-white gap-8 justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Scharfcsh"
            >
              <FaGithub />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/amanadhikari/"
            >
              <FaLinkedin />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/amanadhikari49"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

