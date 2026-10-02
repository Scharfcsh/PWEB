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
import { Link } from "react-router-dom";
import { Icons } from "./Components/icons";
import { SectionHeader, StatusDot } from "./Components/ui";
import PostCard from "./Components/blog/PostCard";
import { getAllPosts } from "./lib/blog";
import { homeSeo } from "./lib/seo";
import { useSeo } from "./hooks/useSeo";

const latestPosts = getAllPosts().slice(0, 2);

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
  useSeo(homeSeo());

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

          {/* Writing */}
          {latestPosts.length > 0 && (
            <motion.section variants={fadeIn}>
              <SectionHeader number="06" title="Writing" />
              <div className="grid gap-4 sm:grid-cols-2">
                {latestPosts.map((post) => (
                  <PostCard key={post.slug} post={post} headingLevel={3} showCover={false} />
                ))}
              </div>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
              >
                View all posts {Icons.arrowRight}
              </Link>
            </motion.section>
          )}

          {/* Contact */}
          <motion.section variants={fadeIn}>
            <SectionHeader number="07" title="Get in Touch" />
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
