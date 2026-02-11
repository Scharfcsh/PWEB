import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  personal,
  about,
  techStack,
  projects,
  professionalWork,
  webProjects,
  stats,
  amsLabs,
} from "./constants/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animated counter component
const Counter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Section header component for consistent styling
const SectionHeader = ({ number, title, badge }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="text-neutral-500 text-xs font-medium tracking-wider">
      {number}
    </span>
    <div className="h-px flex-1 bg-neutral-800" />
    <h2 className="text-neutral-300 text-sm font-medium tracking-wide uppercase">
      {title}
    </h2>
    {badge && (
      <span className="text-emerald-400 text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

// Icons as inline SVG components
const Icons = {
  arrow: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.579 9.521 21.269 9.521 21.004C9.521 20.769 9.513 20.14 9.508 19.307C6.726 19.91 6.139 17.966 6.139 17.966C5.685 16.812 5.029 16.504 5.029 16.504C4.121 15.882 5.098 15.895 5.098 15.895C6.101 15.965 6.629 16.926 6.629 16.926C7.521 18.451 8.97 18.013 9.539 17.758C9.631 17.111 9.889 16.674 10.175 16.42C7.954 16.163 5.62 15.31 5.62 11.477C5.62 10.386 6.01 9.494 6.649 8.794C6.546 8.536 6.203 7.524 6.747 6.148C6.747 6.148 7.587 5.874 9.497 7.163C10.295 6.936 11.15 6.823 12 6.819C12.85 6.823 13.705 6.936 14.505 7.163C16.413 5.874 17.251 6.148 17.251 6.148C17.797 7.524 17.454 8.536 17.351 8.794C17.991 9.494 18.378 10.386 18.378 11.477C18.378 15.32 16.04 16.16 13.813 16.411C14.172 16.722 14.491 17.337 14.491 18.272C14.491 19.602 14.479 20.672 14.479 21.004C14.479 21.271 14.659 21.584 15.167 21.488C19.138 20.163 22 16.417 22 12C22 6.477 17.523 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  external: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// Status indicator component
const StatusDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
  </span>
);

// Project Card Component
const ProjectCard = ({ project, featured = false }) => (
  <motion.a
    href={project.link || project.github}
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeIn}
    whileHover={{ y: -2 }}
    className={`group block p-5 rounded border transition-all duration-200 ${
      featured
        ? "bg-neutral-900/50 border-emerald-500/20 hover:border-emerald-500/40"
        : "bg-neutral-900/30 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50"
    }`}
  >
    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-neutral-100 font-medium text-base group-hover:text-white transition-colors">
        {project.name}
      </h3>
      <div className="flex items-center gap-2 shrink-0">
        {project.github && (
          <span className="text-neutral-500 hover:text-neutral-300 transition-colors">
            {Icons.github}
          </span>
        )}
        {project.link && (
          <span className="text-neutral-500 group-hover:text-emerald-400 transition-colors">
            {Icons.external}
          </span>
        )}
      </div>
    </div>
    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {project.tech.map((t, j) => (
        <span
          key={j}
          className="text-neutral-500 text-xs px-2 py-1 bg-neutral-800/50 rounded"
        >
          {t}
        </span>
      ))}
    </div>
  </motion.a>
);

function Portfolio() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/20 selection:text-emerald-200">
      {/* Navigation */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-neutral-100 font-semibold tracking-tight">
            {personal.name.split(" ")[0].toLowerCase()}
          </span>
          <div className="flex items-center gap-6">
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              {Icons.github}
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              {Icons.linkedin}
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm px-4 py-2 bg-neutral-100 text-neutral-900 rounded font-medium hover:bg-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav> */}

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="space-y-32"
        >
          {/* Hero Section */}
          <motion.header variants={fadeIn} className="space-y-8">
            <div className="flex items-center gap-3">
              <StatusDot />
              <span className="text-emerald-400 text-sm font-medium">
                Available for work
              </span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                {personal.name}
              </h1>
              <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
                I build and ship production software that real businesses depend on. 
                End-to-end ownership — from scalable backend systems to polished user experiences.
              </p>
            </div>

            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{personal.location}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-800">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-bold text-white">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-neutral-500 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.header>

          {/* Tech Stack */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="01" title="Tech Stack" />
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="text-neutral-300 text-sm px-4 py-2 bg-neutral-900 border border-neutral-800 rounded hover:border-neutral-700 hover:bg-neutral-800/50 transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Studio Labs */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="02" title="Studio" badge="Active" />
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-8 rounded bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {amsLabs.name}
                  </h3>
                  <p className="text-emerald-400 text-sm font-medium">
                    {amsLabs.tagline}
                  </p>
                </div>
                <a
                  href={amsLabs.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-900 bg-white rounded hover:bg-neutral-100 transition-colors shrink-0"
                >
                  Visit Site {Icons.arrow}
                </a>
              </div>
              <p className="text-neutral-400 text-base leading-relaxed mb-6">
                {amsLabs.description}
              </p>
              <ul className="space-y-3">
                {amsLabs.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                    <span className="w-1.5 h-1.5 mt-2 bg-emerald-400 rounded-full shrink-0"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.section>

          {/* Professional Work */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="03" title="Professional Work" badge="Production" />
            <div className="grid gap-4 sm:grid-cols-2">
              {professionalWork.map((project, i) => (
                <ProjectCard key={i} project={project} featured={project.highlight} />
              ))}
            </div>
          </motion.section>

          {/* Web Projects */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="04" title="Web Projects" />
            <div className="grid gap-4 sm:grid-cols-2">
              {webProjects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </motion.section>

          {/* Engineering Projects */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="05" title="Engineering" />
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="06" title="Get in Touch" />
            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <p className="text-neutral-400 text-lg mb-6 max-w-xl">
                Interested in working together or have a project in mind? Let's connect.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-900 bg-white rounded hover:bg-neutral-100 transition-colors"
                >
                  {Icons.mail} Send Email
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-300 bg-neutral-800 rounded border border-neutral-700 hover:bg-neutral-700 transition-colors"
                >
                  {Icons.github} GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-300 bg-neutral-800 rounded border border-neutral-700 hover:bg-neutral-700 transition-colors"
                >
                  {Icons.linkedin} LinkedIn
                </a>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer variants={fadeIn} className="pt-12 border-t border-neutral-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-sm">
              <p>© {new Date().getFullYear()} {personal.name}</p>
              <p>Built with React & Motion</p>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
}

export default Portfolio;
