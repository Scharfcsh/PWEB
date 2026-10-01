/* global __SITE_URL__ */
import { personal } from "./data";

export const SITE_URL = __SITE_URL__;
export const SITE_NAME = `${personal.name} — Developer`;
export const SITE_DESCRIPTION =
  "Aman Adhikari — Full-Stack Developer based in India. Building scalable web applications with modern JavaScript.";

export const BLOG_TITLE = "Blog";
export const BLOG_DESCRIPTION =
  "Practical write-ups on full-stack development — Node.js, React, authentication, real-time systems and shipping software to production.";

// Authors are referenced from a post's frontmatter by key (e.g. `author: aman-adhikari`).
export const authors = {
  "aman-adhikari": {
    name: personal.name,
    role: personal.role,
    bio: "Founder of AMS Labs. I build and ship production software end to end — from backend systems and real-time infrastructure to polished user interfaces.",
    url: SITE_URL,
    github: personal.github,
    linkedin: personal.linkedin,
  },
};

export const DEFAULT_AUTHOR = "aman-adhikari";
