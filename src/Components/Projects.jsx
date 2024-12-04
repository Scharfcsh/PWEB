import Cards from "./Cards";
import { projectData } from "../constants/projects.js";

const Projects = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full p-4 gap-4">
            {projectData.map((project, index) => (
                <Cards key={index} project={project} />
            ))}
        </div>
    );
};

export default Projects;