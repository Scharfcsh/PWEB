// Portfolio Data
export const personal = {
  name: "Aman Adhikari",
  role: "Full-Stack Developer",
  location: "Based in India",
  email: "amanadhikari2003@gmail.com",
  github: "https://github.com/Scharfcsh",
  linkedin: "https://linkedin.com/in/aman-adhikari",
  resume: "/resume.pdf",
};

export const about = [
  "I love building and owning products end-to-end, not just writing code for tickets.",
  "I enjoy designing systems that people actually use in real life and iterating on them based on real feedback.",
  "I care deeply about clean architecture, performance, and reliability because production systems always find your mistakes.",
  "I’m most comfortable owning features from idea to deployment, debugging failures, and improving things over time.",
];

export const techStack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js (App Router)",
  "Node.js",
  "Express",
  "WebSockets / Socket.IO",
  "MongoDB (Mongoose v7+)",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "Tailwind CSS",
  "Python",
  "Docker",
  "Nginx",
];

export const stats = [
  { value: 5, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "+", label: "Years Coding" },
  { value: 100, suffix: "+", label: "GitHub Commits" },
];

export const projects = [
  {
    name: "WebRTC Room",
    description: "Peer-to-peer video/audio chat with ICE/SDP signaling over WebSockets.",
    tech: ["Electron.js", "WebRTC", "WebSocket", "Node.js"],
    github: "https://github.com/Scharfcsh/WebRTC-Room",
    link: null,
  },
  {
    name: "RealTime Messaging",
    description: "Web-based real-time messaging platform with 70ms latency.",
    tech: ["React", "Express", "Socket.io", "Zustand", "MongoDB"],
    github: "https://github.com/Scharfcsh/RealTime-Messaging",
    link: null,
  },
  {
    name: "Smart EHR System",
    description: "Electronic Health Record system with NFC tap check-in and real-time broadcasting.",
    tech: ["Next.js", "JavaScript", "WebSocket"],
    github: "https://github.com/Scharfcsh/Smart-EHR",
    link: null,
  },
  {
    name: "Amsid",
    description: "NPM package for collision-resistant short IDs using hardware randomization.",
    tech: ["TypeScript", "Node.js"],
    github: "https://github.com/Scharfcsh/Amsid",
    link: "https://www.npmjs.com/package/amsid",
  },
  {
    name: "Chirple",
    description: "Real-time chat application with persistent WebSocket connections.",
    tech: ["React", "Node.js", "WebSockets", "Express", "MongoDB"],
    github: "https://github.com/Scharfcsh/Chirple",
    link: "https://chirple-client.vercel.app",
  },
];
