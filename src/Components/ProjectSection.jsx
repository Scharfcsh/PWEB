import React from "react";
import Projects from "./Projects";
import Aboout from "./Aboout";
import Blog from "./Blog";


const ProjectSection = ({active}) => {
  return (
    <>
    {active === "projects" && <Projects/>}
    {active === "about" && <Aboout />}
    {active === "blog" && <Blog />}
    </>
  );
};

export default ProjectSection;
