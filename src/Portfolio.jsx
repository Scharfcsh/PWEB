import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { personal, about, techStack, projects, stats } from "./constants/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
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

  return <span ref={ref}>{count}{suffix}</span>;
};

// Infinite scrolling marquee component
const Marquee = ({ items, direction = "left", speed = 30 }) => {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[#555] text-sm hover:text-[#888] transition-colors duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Subtle icons as inline SVG components
const Icons = {
  arrow: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  mail: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.579 9.521 21.269 9.521 21.004C9.521 20.769 9.513 20.14 9.508 19.307C6.726 19.91 6.139 17.966 6.139 17.966C5.685 16.812 5.029 16.504 5.029 16.504C4.121 15.882 5.098 15.895 5.098 15.895C6.101 15.965 6.629 16.926 6.629 16.926C7.521 18.451 8.97 18.013 9.539 17.758C9.631 17.111 9.889 16.674 10.175 16.42C7.954 16.163 5.62 15.31 5.62 11.477C5.62 10.386 6.01 9.494 6.649 8.794C6.546 8.536 6.203 7.524 6.747 6.148C6.747 6.148 7.587 5.874 9.497 7.163C10.295 6.936 11.15 6.823 12 6.819C12.85 6.823 13.705 6.936 14.505 7.163C16.413 5.874 17.251 6.148 17.251 6.148C17.797 7.524 17.454 8.536 17.351 8.794C17.991 9.494 18.378 10.386 18.378 11.477C18.378 15.32 16.04 16.16 13.813 16.411C14.172 16.722 14.491 17.337 14.491 18.272C14.491 19.602 14.479 20.672 14.479 21.004C14.479 21.271 14.659 21.584 15.167 21.488C19.138 20.163 22 16.417 22 12C22 6.477 17.523 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  file: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  code: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  terminal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M4 17L10 11L4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 19H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  location: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// Pulsing green dot component
const LiveDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/40"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500/80"></span>
  </span>
);

function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono selection:bg-emerald-500/20 selection:text-emerald-200">
      <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="space-y-24"
        >
          {/* Hero */}
          <motion.header variants={fadeIn} className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-sm">
              <LiveDot />
              <span className="text-emerald-500/70 text-xs tracking-wide">Available for work</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {personal.name}
            </h1>
            <p className="text-[#777] text-xl">{personal.role}</p>
            <div className="flex items-center gap-2 text-[#555] text-sm">
              <span>{Icons.location}</span>
              <span>{personal.location}</span>
            </div>
          </motion.header>

          {/* Stats Section */}
          <motion.section variants={fadeIn}>
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-[#1a1a1a]">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-[#e5e5e5]">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#555] text-xs mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* About */}
          <motion.section variants={fadeIn} className="space-y-6">
            <h2 className="text-[#555] text-xs uppercase tracking-widest flex items-center gap-2">
              <span>{Icons.terminal}</span>
              About
            </h2>
            <div className="space-y-3">
              {about.map((line, i) => (
                <p key={i} className="text-[#999] text-lg leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack Marquee */}
          <motion.section variants={fadeIn} className="space-y-6">
            <h2 className="text-[#555] text-xs uppercase tracking-widest flex items-center gap-2">
              <span>{Icons.code}</span>
              Technologies
            </h2>
            <Marquee items={techStack} speed={25} />
          </motion.section>

          {/* Projects */}
          <motion.section variants={fadeIn} className="space-y-8">
            <h2 className="text-[#555] text-xs uppercase tracking-widest flex items-center gap-2">
              <span>{Icons.file}</span>
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group p-4 -mx-4 rounded-lg hover:bg-[#111] transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[#e5e5e5] font-medium text-lg">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-400/80 transition-colors duration-200"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#444] hover:text-[#888] transition-colors duration-200"
                        >
                          {Icons.github}
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#444] hover:text-emerald-500/70 transition-colors duration-200"
                        >
                          {Icons.arrow}
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[#777] text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span
                        key={j}
                        className="text-[#555] text-xs px-2 py-1 bg-[#151515] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section variants={fadeIn} className="space-y-6">
            <h2 className="text-[#555] text-xs uppercase tracking-widest flex items-center gap-2">
              <span>{Icons.mail}</span>
              Contact
            </h2>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Icons.mail, label: "Email", href: `mailto:${personal.email}` },
                { icon: Icons.github, label: "GitHub", href: personal.github },
                { icon: Icons.linkedin, label: "LinkedIn", href: personal.linkedin },
                { icon: Icons.file, label: "Resume", href: personal.resume },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#777] bg-[#111] rounded-lg border border-[#1a1a1a] hover:border-[#333] hover:text-[#e5e5e5] transition-all duration-200"
                >
                  <span className="text-[#555]">{link.icon}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer variants={fadeIn} className="pt-12 border-t border-[#1a1a1a]">
            <div className="flex items-center justify-between text-[#444] text-xs">
              <p>© {new Date().getFullYear()} {personal.name}</p>
              <p className="text-[#333]">Built with React & Motion</p>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
}

export default Portfolio;
