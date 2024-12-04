import React, { useState } from "react";
import ProjectSection from "../Components/ProjectSection";
import Navbar from "../Components/Navbar";

export const Rightpane = () => {
  const [active, setActive] = useState("projects");
  return (
    <div className="rightpane w-4/5 bg-[#0f141c]/100 h-[95%] my-14 rounded-lg md:w-3/5 overflow-y-scroll scroll-m-0 ">
      
      <Navbar active={active} setActive={setActive}/>
      <ProjectSection active={active} />
    </div>
  );
};
