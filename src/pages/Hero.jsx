import React from "react";
import { Rightpane } from "./Rightpane";
import LeftPane from "./LeftPane";

const Hero = () => {
  return (
    <div className="absolute z-20 bg-transparent top-0 w-full h-screen   flex justify-center items-center gap-5">
      
        <LeftPane />
      
      <Rightpane />
    </div>
  );
}; 

export default Hero;
