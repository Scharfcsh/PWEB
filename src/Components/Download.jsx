import React from 'react'
import resume from '../assets/AmanAdhikariResume.pdf'

const Download = () => {
  return (
    <div  className="wrap m-4 text-center">~
        <a
          rel="noreferrer"
          className="btn-slide relative inline-block h-[60px] w-4/5 leading-10 p-0 rounded-full bg-[#0F141C] duration-75 hover:bg-[#FF759C]"
          href="https://docs.google.com/document/d/1eUuz0oZ3sQkDFHLQPLh1lRRK0q9KeROko-bzpwFMSaw/edit?usp=sharing"
          
          target="_blank"
          // download
        >
          <span className="circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                className="download-svg"
                d="M13 12H16L12 16L8 12H11V8H13V12ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"
                fill="white"
              ></path>
            </svg>
          </span>
          <span className="title">Resume</span>
          <span className="title-hover">Download</span>
        </a>
      </div>
  )
}

export default Download