import React, { useState } from "react";
import ProjectSection from "../Components/ProjectSection";
import Navbar from "../Components/Navbar";

export const Rightpane = () => {
  const [active, setActive] = useState("projects");
  return (
    <div className="rightpane w-5/6 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] h-[95%] p-1 my-14 rounded-lg md:w-3/5 mt-32 overflow-y-scroll scroll-m-0 ">
      
      <Navbar active={active} setActive={setActive}/>
      <ProjectSection active={active} />
    </div>
  );
};

<div class="absolute top-0 z-[-2] h-screen w-screen "></div>