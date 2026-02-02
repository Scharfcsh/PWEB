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
  "I take full ownership from system design to deployment, and I actually maintain what I ship. My code runs in production, handles real users, and I'm the one who gets paged when something breaks.",
  "I care about writing software that scales, stays maintainable, and solves actual business problems — not just technically impressive demos.",
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
  { value: 10, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "+", label: "Production Clients" },
  { value: 500, suffix: "+", label: "GitHub Commits" },
];

// AMS Labs - Founder & Solo Developer
export const amsLabs = {
  name: "AMS Labs",
  tagline: "Software Products % Engineering",
  description: "My development studio where I build and ship production-grade software for real clients. From enterprise HRMS systems to corporate websites — I handle everything from architecture to deployment.",
  link: "https://www.amslabs.in",
  highlights: [
    "Built and deployed full-stack HRMS with active paying clients",
    "Delivered corporate websites for international companies",
    "End-to-end ownership: design, development, deployment, support",
  ],
};

// Professional Work - Production systems with real clients
export const professionalWork = [
  {
    name: "Nexus HRMS",
    description: "Full-stack HR management system with attendance tracking, payroll processing, and audit trails. 1 active client in production.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    github: null,
    link: "https://hrcms.amslabs.in/",
    highlight: true,
  },
  {
    name: "Devloit Website",
    description: "Corporate website for DevloIT SDN BHD - IT services and recruitment company based in Malaysia.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: null,
    link: "https://www.devloit.com/",
  },
];

// Web Projects - Showcases and landing pages
export const webProjects = [
  {
    name: "Amsid",
    description: "NPM package for collision-resistant short IDs using hardware randomization.",
    tech: ["TypeScript", "Node.js"],
    github: "https://github.com/Scharfcsh/Amsid",
    link: "https://www.npmjs.com/package/amsid",
  },
  {
    name: "Voice-Enabled Task Tracker",
    description: "Kanban-style task management app with voice input and drag-and-drop functionality.",
    tech: ["React", "TypeScript", "Gemini", "Web Speech API"],
    github: 'https://github.com/Scharfcsh/aerchain',
    link: "https://aerchain-opal.vercel.app/",
  },
  {
    name: "SuperBall (WalnutUI)",
    description: "Landing page for a voice AI evaluation and observability platform with interactive dashboards.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Charts"],
    github: "https://github.com/Scharfcsh/walnut_xlient",
    link: "https://walnutui.amslabs.in/",
  },
  
  {
    name: "NoBank Landing Page",
    description: "Modern fintech landing page with gradient aesthetics and responsive design.",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: null,
    link: "https://banking-website-dusky.vercel.app/",
  },
];

// Engineering Projects - Open source and technical work
export const projects = [
  {
    name: "RTSP Livestream Web Overlay",
    description: "Full-stack app for streaming RTSP feeds with real-time draggable text/image overlays. HLS conversion via FFmpeg.",
    tech: ["React", "TypeScript", "Flask", "MongoDB", "FFmpeg", "Docker"],
    github: "https://github.com/Scharfcsh/RTSP_LIVESTREAM_WEB_OVERLAY",
    link: null,
  },
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
    name: "Chirple",
    description: "Real-time chat application with persistent WebSocket connections.",
    tech: ["React", "Node.js", "WebSockets", "Express", "MongoDB"],
    github: "https://github.com/Scharfcsh/Chirple",
    link: "https://chirple-client.vercel.app",
  },
];
