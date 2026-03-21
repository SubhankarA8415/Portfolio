// App.jsx — Retro Neon Futuristic AI Portfolio — Subhankar Pandit
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import profileFrame from "./assets/profile-frame2.jpg";

/* ─── Google Fonts injected at runtime ─── */
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@400;600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

/* ─── Global styles injected once ─── */
const style = document.createElement("style");
style.textContent = `
  :root {
    --neon-cyan: #00f5ff;
    --neon-purple: #bf00ff;
    --neon-pink: #ff00aa;
    --neon-blue: #0080ff;
    --neon-green: #00ff88;
    --bg-deep: #050510;
    --bg-card: rgba(8, 8, 28, 0.85);
    --bg-glass: rgba(15, 15, 40, 0.6);
    --border-glow: rgba(0, 245, 255, 0.3);
    --text-primary: #e8f4ff;
    --text-muted: #8899bb;
  }

  /* ── Light mode overrides ── */
  .light-mode {
    --bg-deep: #f0f4ff;
    --bg-card: rgba(255, 255, 255, 0.82);
    --bg-glass: rgba(240, 244, 255, 0.75);
    --border-glow: rgba(0, 120, 200, 0.25);
    --text-primary: #0a0a2e;
    --text-muted: #445577;
    --neon-cyan: #007acc;
    --neon-purple: #7700cc;
    --neon-pink: #cc0077;
    --neon-blue: #0055cc;
    --neon-green: #007744;
  }
  .light-mode body,
  .light-mode {
    background: var(--bg-deep);
    color: var(--text-primary);
  }
  .light-mode .grid-bg {
    background-image:
      linear-gradient(rgba(0,100,200,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,100,200,0.06) 1px, transparent 1px);
  }
  .light-mode .glow-blob-1 { background: radial-gradient(circle, rgba(119,0,204,0.08) 0%, transparent 70%); }
  .light-mode .glow-blob-2 { background: radial-gradient(circle, rgba(0,122,204,0.07) 0%, transparent 70%); }
  .light-mode .glow-blob-3 { background: radial-gradient(circle, rgba(204,0,119,0.05) 0%, transparent 70%); }
  .light-mode .glass-card {
    background: rgba(255,255,255,0.82);
    border-color: rgba(0,120,200,0.2);
    box-shadow: 0 4px 24px rgba(0,80,180,0.08);
  }
  .light-mode .glass-card:hover {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 20px rgba(0,122,204,0.2), 0 8px 32px rgba(0,80,180,0.12);
  }
  .light-mode .navbar {
    background: rgba(240,244,255,0.88);
    border-color: rgba(0,120,200,0.2);
    box-shadow: 0 4px 24px rgba(0,80,180,0.1);
  }
  .light-mode .mobile-menu {
    background: rgba(240,244,255,0.97);
  }
  .light-mode ::-webkit-scrollbar-track { background: #f0f4ff; }
  .light-mode .skill-badge {
    background: rgba(0,122,204,0.06);
    border-color: rgba(0,122,204,0.2);
  }
  .light-mode .tech-pill {
    background: rgba(119,0,204,0.06);
    border-color: rgba(119,0,204,0.2);
    color: #7700cc;
  }
  .light-mode .neon-btn-cyan {
    background: rgba(0,122,204,0.06);
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
  }
  .light-mode .neon-btn-green {
    background: rgba(0,119,68,0.06);
    border-color: var(--neon-green);
    color: var(--neon-green);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg-deep);
    color: var(--text-primary);
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #050510; }
  ::-webkit-scrollbar-thumb { background: var(--neon-cyan); border-radius: 3px; }

  /* Scroll progress bar */
  #scroll-progress {
    position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 9999;
    background: linear-gradient(90deg, var(--neon-purple), var(--neon-cyan), var(--neon-pink));
    transform-origin: left;
  }

  /* Animated grid background */
  .grid-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }

  /* Radial glow blobs */
  .glow-blob {
    position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0;
    animation: blobFloat 12s ease-in-out infinite;
  }
  .glow-blob-1 { width: 600px; height: 600px; top: -150px; left: -200px; background: radial-gradient(circle, rgba(191,0,255,0.12) 0%, transparent 70%); animation-delay: 0s; }
  .glow-blob-2 { width: 500px; height: 500px; top: 40%; right: -100px; background: radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%); animation-delay: -4s; }
  .glow-blob-3 { width: 400px; height: 400px; bottom: -100px; left: 30%; background: radial-gradient(circle, rgba(255,0,170,0.08) 0%, transparent 70%); animation-delay: -8s; }

  @keyframes blobFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-40px) scale(1.05); }
  }

  /* Glass card */
  .glass-card {
    background: var(--bg-card);
    border: 1px solid var(--border-glow);
    border-radius: 12px;
    backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .glass-card::before {
    content: '';
    position: absolute; inset: 0; border-radius: 12px;
    background: linear-gradient(135deg, rgba(0,245,255,0.05) 0%, transparent 50%, rgba(191,0,255,0.05) 100%);
    pointer-events: none;
  }
  .glass-card:hover {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 20px rgba(0,245,255,0.2), 0 0 60px rgba(0,245,255,0.05), inset 0 0 20px rgba(0,245,255,0.03);
    transform: translateY(-6px) scale(1.01);
  }

  /* Neon heading */
  .neon-heading {
    font-family: 'Orbitron', monospace;
    font-weight: 900;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 20px rgba(0,245,255,0.4));
  }

  /* Section label */
  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    color: var(--neon-cyan);
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  /* Section title */
  .section-title {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  /* Glowing divider */
  .neon-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-purple), transparent);
    margin: 0.75rem 0 2.5rem;
    border: none;
  }

  /* Skill badge */
  .skill-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(0,245,255,0.25);
    background: rgba(0,245,255,0.05);
    color: var(--neon-cyan);
    transition: all 0.25s;
    cursor: default;
    white-space: nowrap;
  }
  .skill-badge:hover {
    background: rgba(0,245,255,0.15);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 12px rgba(0,245,255,0.4);
    color: #fff;
    transform: translateY(-2px);
  }

  /* Tech pill on project card */
  .tech-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid rgba(191,0,255,0.35);
    background: rgba(191,0,255,0.08);
    color: #cc88ff;
  }

  /* Neon button */
  .neon-btn {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    padding: 6px 16px;
    border-radius: 6px;
    border: 1px solid;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.25s;
    font-weight: 600;
  }
  .neon-btn-cyan {
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
    background: rgba(0,245,255,0.05);
  }
  .neon-btn-cyan:hover {
    background: rgba(0,245,255,0.15);
    box-shadow: 0 0 16px rgba(0,245,255,0.5);
  }
  .neon-btn-green {
    border-color: var(--neon-green);
    color: var(--neon-green);
    background: rgba(0,255,136,0.05);
  }
  .neon-btn-green:hover {
    background: rgba(0,255,136,0.15);
    box-shadow: 0 0 16px rgba(0,255,136,0.5);
  }

  /* Navbar */
  .navbar {
    position: fixed; top: 12px; left: 50%; transform: translateX(-50%);
    z-index: 1000;
    background: rgba(5,5,20,0.75);
    border: 1px solid rgba(0,245,255,0.18);
    backdrop-filter: blur(24px);
    border-radius: 40px;
    padding: 10px 28px;
    display: flex;
    align-items: center;
    gap: 28px;
    box-shadow: 0 0 30px rgba(0,245,255,0.06);
    max-width: 90vw;
  }

  .nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    text-transform: uppercase;
    background: none; border: none; cursor: pointer;
    padding: 4px 0;
    position: relative;
    transition: color 0.25s;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0; height: 1px;
    background: var(--neon-cyan);
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .nav-link:hover, .nav-link.active { color: var(--neon-cyan); }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }

  /* Logo */
  .logo {
    font-family: 'Orbitron', monospace;
    font-weight: 900;
    font-size: 0.9rem;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Profile image glow */
  .profile-glow {
    position: relative;
    display: inline-block;
  }
  .profile-glow::before {
    content: '';
    position: absolute; inset: -6px;
    border-radius: 20px;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink), var(--neon-blue));
    z-index: -1;
    animation: profileRotate 4s linear infinite;
    filter: blur(3px);
  }
  .profile-glow::after {
    content: '';
    position: absolute; inset: -12px;
    border-radius: 24px;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
    z-index: -2;
    opacity: 0.3;
    animation: profileRotate 4s linear infinite reverse;
    filter: blur(12px);
  }
  @keyframes profileRotate {
    0% { filter: blur(3px) hue-rotate(0deg); }
    100% { filter: blur(3px) hue-rotate(360deg); }
  }

  /* Typing cursor */
  .cursor {
    display: inline-block;
    width: 2px; height: 1em;
    background: var(--neon-cyan);
    margin-left: 4px;
    animation: blink 0.8s step-end infinite;
    vertical-align: middle;
  }
  @keyframes blink { 50% { opacity: 0; } }

  /* Floating particles */
  .particle {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: particleFloat linear infinite;
  }
  @keyframes particleFloat {
    0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.6; }
    100% { transform: translateY(-10vh) translateX(var(--drift)) scale(1); opacity: 0; }
  }

  /* Experience desc reveal */
  .exp-desc {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.5s ease, opacity 0.4s ease;
  }
  .glass-card:hover .exp-desc {
    max-height: 200px; opacity: 1;
  }

  /* Project desc reveal */
  .proj-desc {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.5s ease, opacity 0.4s ease;
  }
  .glass-card:hover .proj-desc {
    max-height: 200px; opacity: 1;
  }

  /* Mobile menu */
  .mobile-menu {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(5,5,20,0.96);
    backdrop-filter: blur(24px);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 28px;
  }
  .mobile-nav-link {
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    background: none; border: none; cursor: pointer;
    transition: color 0.2s;
  }
  .mobile-nav-link:hover { color: var(--neon-cyan); }

  /* Contact icons */
  .contact-icon {
    width: 52px; height: 52px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    border: 1px solid rgba(0,245,255,0.3);
    background: rgba(0,245,255,0.05);
    color: var(--neon-cyan);
    transition: all 0.3s;
    text-decoration: none;
  }
  .contact-icon:hover {
    background: rgba(0,245,255,0.15);
    box-shadow: 0 0 20px rgba(0,245,255,0.5);
    transform: scale(1.1);
  }

  /* Cert card */
  .cert-link {
    color: var(--neon-cyan);
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    transition: color 0.2s;
  }
  .cert-link:hover { color: var(--neon-pink); text-decoration: underline; }

  section { position: relative; z-index: 1; }

  /* Education meta - right on desktop, left on mobile */
  .edu-meta { text-align: right; }

  /* Responsive max-width container */
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Section padding */
  .section-wrap {
    padding: 80px 0;
  }

  @media (max-width: 768px) {
    .navbar { display: none !important; }
    .section-wrap { padding: 60px 0; }
    .edu-meta { text-align: left !important; }
  }
`;
document.head.appendChild(style);

/* ─── Data (unchanged) ─── */
const skills = [
  "JavaScript","Python","Java","C","C++",
  "React.js","Node.js","Express.js","MongoDB","Django","HTML","CSS","EJS",
  "MySQL","SQLite",
  "Vercel","Render","Firebase","Cloudinary",
  "TensorFlow","Keras","Scikit-Learn","Pandas","NumPy","Matplotlib","Seaborn",
  "OpenCV","Media pipe","Streamlit","Flask","AWS",
  "Git","GitHub","REST APIs","Payment Gateways","Postman","VS Code","Insomnia","IntelliJ",
  "SMS Gatway","Anaconda","Google Colab","Maps","OAuth","Authentication","Authorization","Tailwind",
  "Terminal","Prompt Engineering"
];

const skillCategories = [
  { label: "Programming", color: "var(--neon-cyan)", items: ["JavaScript","Python","Java","C","C++"] },
  { label: "Frontend & Backend", color: "var(--neon-purple)", items: ["React.js","Node.js","Express.js","MongoDB","Django","HTML","CSS","EJS","MySQL","SQLite","Flask","Tailwind"] },
  { label: "AI / ML / DL", color: "var(--neon-pink)", items: ["TensorFlow","Keras","Scikit-Learn","Pandas","NumPy","Matplotlib","Seaborn","OpenCV","Media pipe","Streamlit","Prompt Engineering"] },
  { label: "Cloud & DevOps", color: "var(--neon-green)", items: ["AWS","Vercel","Render","Firebase","Cloudinary","Anaconda","Google Colab"] },
  { label: "Tools & Platforms", color: "#ff9900", items: ["Git","GitHub","REST APIs","Payment Gateways","Postman","VS Code","Insomnia","IntelliJ","SMS Gatway","Maps","OAuth","Authentication","Authorization","Terminal"] },
];

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "ITER, SOA University, Bhubaneswar",
    duration: "2022 – 2026",
    cgpa: "CGPA: 9.3"
  },
  {
    degree: "12th Science",
    institution: "Kendriya Vidyalaya, Berhampur",
    duration: "2020 – 2021",
    cgpa: "Percentage: 93.66%"
  },
  {
    degree: "10th Grade",
    institution: "Kendriya Vidyalaya, Berhampur",
    duration: "2018 – 2019",
    cgpa: "Percentage: 93.8%"
  }
];

const experience = [
  {
    title: "Code for Good 2025 – JPMorgan Chase & Co.",
    duration: "June 2025",
    desc: "Worked as a Full-Stack Developer in Team 27, building an agri-tech platform for NGO CML. Led backend development using Node.js, Express.js, role-based auth, Google OAuth, and OTP login. Integrated modules like Razorpay, Cloudinary, real-time chat, chatbot, dashboards, and SMS alerts. Also contributed to the frontend using React.js and Tailwind CSS, along with Excel data processing."
  },
  {
    title: "Adobe & NITI Aayog – Student Mentorship Program",
    duration: "September 2020",
    desc: "Selected for a 3-week remote mentorship under Atal Innovation Mission. Worked with Adobe Spark and Adobe XD. Designed UI/UX wireframes and digital posters as part of the program."
  }
];

const projects = [
  {
  title: "Bitcoin Price Forecasting (BitPredict) 📈",
  desc: "Developed a deep learning-based time series forecasting system to predict Bitcoin prices using historical data, implementing models like LSTM, CNN, Dense networks, and ensemble methods with proper data preprocessing and evaluation.",
  tech: ["Python", "TensorFlow", "Pandas", "NumPy", "Matplotlib", "yFinance"],
  github: "https://github.com/SubhankarA8415/Time_Series"
  }, 
   {
    title: "Virtual Air Painter 🎨",
    desc: "Developed a real-time virtual air drawing application using OpenCV and MediaPipe, enabling gesture-based drawing, color selection, and eraser functionality through hand tracking.",
    tech: ["OpenCV","MediaPipe"],
    github: "https://github.com/SubhankarA8415/Virtual-Painter-Computer-Vision"
  },
  {
    title: "Food Vision 101",
    desc: "Built a food image classifier using EfficientNetB0 with transfer learning, comparing Adam and Lion optimizers. Achieved ~75% test accuracy with Adam and ~79% with Lion through feature extraction and fine-tuning.",
    tech: ["TensorFlow","Keras","NumPy","Matplotlib"],
    github: "https://github.com/SubhankarA8415/Food_Vision_101"
  },
  {
    title: "Random Forest Regressor — Local ML Deployment",
    desc: "Developed an end-to-end regression model with comprehensive EDA, feature engineering, and evaluation. Deployed the trained Random Forest Regressor using a Flask API to enable real-time, JSON-based predictions.",
    tech: ["Scikit-Learn","Pandas","NumPy","Flask","Joblib","Matplotlib","Seaborn"],
    github: "https://github.com/SubhankarA8415/Data-Science-and-Machine-Learning"
  },
  {
    title: "Voice-Enabled Gov. Scheme Agent (Agentic AI)",
    desc: "Built a voice-based AI assistant that collects user details through a confirmation-driven flow and recommends eligible government welfare schemes. Implemented a Planner–Executor–Evaluator agent architecture combining LLM-guided decision-making with rule-based eligibility logic.",
    tech: ["Python","Google Gemini API","faster-whisper","gTTS","NumPy"],
    github: "https://github.com/SubhankarA8415/Voice-Agent"
  },
  {
    title: "LLM Fine-Tuning for Academic QA",
    desc: "Implemented supervised fine-tuning and instruction tuning of large language models on a custom academic dataset. Compared DistilGPT-2 and FLAN-T5 Base, focusing on stable training, proper data validation, and generating consistent, textbook-style question answering outputs.",
    tech: ["Python","PyTorch","Hugging Face Transformers","Hugging Face Datasets","Accelerate","Matplotlib"],
    github: "https://github.com/SubhankarA8415/Fine-Tunning-LLM"
  },
  {
    title: "Code for Good 2025 – JPMorgan Chase & Co.",
    desc: "Developed a real-world agri-tech platform for NGO CML to digitize operations, support farmer onboarding, enable donations, and run a crop marketplace. Built a secure backend with role-based access, OTP login, real-time chat, chatbot, Razorpay payments, and SMS alerts. Enabled production tracking, dashboards, and data visualizations.",
    tech: ["MongoDB","Express.js","Node.js","React.js","Tailwind CSS","Cloudinary","Razorpay","SMS API","Google OAuth"],
    github: "https://github.com/SubhankarA8415/CFG-HYD-2025-JPMC",
    live: "https://cfg-hyd-2025-jpmc.vercel.app/"
  },
  {
    title: "Yelp-Camp",
    desc: "Developed a Yelp-like full-stack platform where users can browse, review, and post campgrounds. Implemented full CRUD operations, user authentication with Passport.js, and integrated Cloudinary for image uploads.",
    tech: ["MongoDB","Express.js","Node.js","Cloudinary","Passport.js"],
    github: "https://github.com/SubhankarA8415/Web_Dev_Yelp-camp",
    live: "https://web-dev-yelp-camp.onrender.com/"
  },
  {
    title: "Django Mini Projects",
    desc: "Built a blog, weather app, and chatbot showcasing Django backend, API integration, and dynamic frontend development.",
    tech: ["Django","HTML/CSS","JavaScript","SQLite"],
    github: "https://github.com/SubhankarA8415/Django",
  },
  {
    title: "Java Projects",
    desc: "Developed a console-based banking system for transactions and account management. Also implemented algorithms like affine cipher, CPU scheduling (FCFS, RR), and a basic employee database using Java and OOP principles.",
    tech: ["Java","OOP","File Handling"],
    github: "https://github.com/SubhankarA8415/Java"
  },
  {
    title: "Python Projects",
    desc: "Built a hotel booking system, inventory management for Gift Mart, and 4 interactive Python games using GUI. Implemented encryption algorithms including Vigenère, Playfair, RSA, and Diffie-Hellman using Python and MySQL.",
    tech: ["Python","MySQL","Encryption","GUI"],
    github: "https://github.com/SubhankarA8415/Python"
  }
];

const certifications = [
  {
    title: "TensorFlow for Deep Learning Bootcamp – Udemy",
    date: "January 2026",
    link: "https://www.udemy.com/certificate/UC-0591170a-5393-44ab-8794-1ccaf6cc5a7d/"
  },
  {
    title: "Ultimate AWS Certified Developer Associate 2025 DVA-C02 – Udemy",
    date: "November 2025",
    link: "https://www.udemy.com/certificate/UC-1d19754c-28a4-4d69-a5c1-e4edbd1ebbd6/"
  },
  {
    title: "Python for Machine Learning & Data Science Masterclass 2025 – Udemy",
    date: "October 2025",
    link: "https://www.udemy.com/certificate/UC-b0ee345a-c8dd-49e3-a295-b66a1e731055/"
  },
  {
    title: "Code for Good 2025 – JPMorgan Chase & Co.",
    date: "June 2025",
    link: "https://www.dropbox.com/scl/fi/jdz19t5mkgzyhg3x7hilo/cfg_hyd_JPMC.jpg?rlkey=4h16id8yo5g48ifyu0j9x6eb4&st=lm4xfat5&dl=0"
  },
  {
    title: "Web Developer Bootcamp 2024 – Udemy",
    date: "September 2024",
    link: "https://www.udemy.com/certificate/UC-f18b2d39-1672-42bb-8e94-5930e8caabd5/"
  },
  {
    title: "Student Mentee – Adobe & NITI Aayog Mentorship Program",
    date: "September 2020",
    link: "https://www.dropbox.com/scl/fi/pcrcap83zruw2e5g727gy/Niti-aayog-adobe-mentorship.jpg?rlkey=24u09rpjk95zrk6bv463lv9ui&st=7zvxrcfa&dl=0"
  }
];

/* ─── Typing effect hook ─── */
const TITLES = [
  "AI/ML Developer",
  "Generative AI Explorer",
  "Backend Engineer",
  "MERN & Django Developer",
  "Deep Learning Enthusiast",
];

function useTyping() {
  const [text, setText] = useState("");
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setTitleIdx(t => (t + 1) % TITLES.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, titleIdx]);

  return text;
}

/* ─── Particles ─── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    duration: `${Math.random() * 15 + 10}s`,
    delay: `${Math.random() * 10}s`,
    drift: `${(Math.random() - 0.5) * 120}px`,
    color: ["var(--neon-cyan)","var(--neon-purple)","var(--neon-pink)","var(--neon-blue)"][Math.floor(Math.random()*4)],
  }));

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
            "--drift": p.drift,
          }}
        />
      ))}
    </>
  );
}

/* ─── Scroll progress ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div id="scroll-progress" style={{ scaleX }} />;
}

/* ─── Section wrapper ─── */
function Section({ id, children, style: s }) {
  return (
    <motion.section
      id={id}
      className="section-wrap"
      style={s}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
}

/* ─── Section heading ─── */
function SectionHead({ label, title }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className="section-label">// {label}</div>
      <h2 className="section-title">{title}</h2>
      <hr className="neon-divider" />
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(true);
  const typedText = useTyping();
  const navItems = ["education","skills & tools","experience","projects","certifications","contact"];

  useEffect(() => {
    const allIds = ["home", ...navItems];
    const handleScroll = () => {
      const sp = window.scrollY + window.innerHeight / 2;
      let cur = "home";
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el && sp >= el.offsetTop && sp < el.offsetTop + el.offsetHeight) {
          cur = id; break;
        }
      }
      setActive(cur);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className={dark ? "" : "light-mode"} style={{ background: "var(--bg-deep)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <ScrollProgress />
      <div className="grid-bg" />
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
      <div className="glow-blob glow-blob-3" />
      <Particles />

      {/* ── Desktop Floating Navbar ── */}
      <nav className="navbar" style={{ display: "flex" }}>
        <button className="logo" onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          SP
        </button>
        {/* Profile / top-of-page button */}
        <button
          className={`nav-link ${active === "home" ? "active" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Profile
        </button>
        {navItems.map(id => (
          <button
            key={id}
            className={`nav-link ${active === id ? "active" : ""}`}
            onClick={() => scrollTo(id)}
          >
            {id === "skills & tools" ? "Skills" : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            background: dark ? "rgba(0,245,255,0.08)" : "rgba(0,122,204,0.1)",
            border: `1px solid ${dark ? "rgba(0,245,255,0.3)" : "rgba(0,122,204,0.3)"}`,
            borderRadius: "50%",
            width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: dark ? "var(--neon-cyan)" : "var(--neon-cyan)",
            fontSize: "0.95rem",
            transition: "all 0.3s",
            flexShrink: 0,
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </nav>

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 1001,
          background: "rgba(5,5,20,0.8)", border: "1px solid rgba(0,245,255,0.3)",
          borderRadius: 8, padding: "10px 12px", cursor: "pointer", color: "var(--neon-cyan)",
          fontSize: "1.2rem", display: "none"
        }}
        className="mob-hamburger"
      >
        <FaBars />
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mob-hamburger { display: block !important; }
        }
      `}</style>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{ position: "absolute", top: 20, left: 20, background: "none", border: "1px solid rgba(0,245,255,0.25)", borderRadius: 8, padding: "8px 10px", color: "var(--neon-cyan)", fontSize: "1.2rem", cursor: "pointer" }}
            >
              <FaTimes />
            </button>
            <button className="logo" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem" }} onClick={() => scrollTo("home")}>
              Subhankar Pandit
            </button>
            <button className="mobile-nav-link" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }}>
              Profile
            </button>
            {navItems.map(id => (
              <button key={id} className="mobile-nav-link" onClick={() => scrollTo(id)}>
                {id === "skills & tools" ? "Skills & Tools" : id}
              </button>
            ))}
            {/* Theme toggle in mobile */}
            <button
              onClick={() => setDark(!dark)}
              style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: "none", border: "1px solid rgba(0,245,255,0.25)",
                borderRadius: 999, padding: "8px 20px", cursor: "pointer",
                color: "var(--neon-cyan)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                transition: "all 0.2s",
              }}
            >
              {dark ? <><FaSun /> Light Mode</> : <><FaMoon /> Dark Mode</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 1.5rem 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Radial hero glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        {/* Profile */}
        <motion.div
          className="profile-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          style={{ marginBottom: "2rem" }}
        >
          <img
            src={profileFrame}
            alt="Subhankar Pandit"
            style={{
              width: 200, height: 260,
              objectFit: "cover",
              borderRadius: 16,
              display: "block",
              border: "2px solid rgba(0,245,255,0.4)",
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 900,
            fontSize: "clamp(2rem, 6vw, 3.8rem)",
            background: "linear-gradient(90deg, #00f5ff, #bf00ff, #ff00aa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(0,245,255,0.5))",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
          }}
        >
          Subhankar Pandit
        </motion.h1>

        {/* Typing title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1rem, 3vw, 1.4rem)",
            color: "var(--neon-cyan)",
            marginBottom: "1.5rem",
            minHeight: "2em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>&gt; </span>
          <span style={{ marginLeft: 4 }}>{typedText}</span>
          <span className="cursor" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            maxWidth: 680,
            color: "var(--text-muted)",
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}
        >
          Final-year B.Tech Computer Science student with a growing interest in Artificial Intelligence, Machine
          Learning, and Generative AI, currently learning to build intelligent, data-driven applications. Familiar with
          Deep Learning and Computer Vision basics using TensorFlow, Keras, and OpenCV, and exploring LLM-based
          applications, chatbots, and agentic AI workflows. Experienced in backend development with Python, Node.js,
          Django, and Express.js, building scalable REST APIs and authentication systems. Familiar with AWS cloud
          fundamentals, experimenting with simple deployments and integrating early-stage AI models into applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="neon-btn neon-btn-cyan"
            style={{ fontSize: "0.85rem", padding: "10px 24px" }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="neon-btn neon-btn-green"
            style={{ fontSize: "0.85rem", padding: "10px 24px" }}
          >
            Contact Me
          </button>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          EDUCATION
      ══════════════════════════════════════ */}
      <Section id="education">
        <SectionHead label="background.edu" title="Education" />
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{ padding: "1.5rem 2rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h4 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "1rem", color: "var(--neon-cyan)", marginBottom: "0.25rem" }}>
                    {edu.degree}
                  </h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{edu.institution}</p>
                </div>
                <div className="edu-meta">
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: "var(--neon-purple)", marginBottom: "0.2rem" }}>{edu.duration}</p>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: "var(--neon-green)" }}>{edu.cgpa}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <Section id="skills & tools">
        <SectionHead label="tech.stack" title="Skills & Tools" />
        <div style={{ display: "grid", gap: "2rem" }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: cat.color,
                  padding: "3px 12px",
                  border: `1px solid ${cat.color}`,
                  borderRadius: 999,
                  background: `${cat.color}15`,
                }}>
                  {cat.label}
                </span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {cat.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="skill-badge"
                    style={{ borderColor: `${cat.color}40`, color: cat.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + si * 0.03, duration: 0.3 }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: `0 0 14px ${cat.color}60`,
                      borderColor: cat.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════ */}
      <Section id="experience">
        <SectionHead label="work.history" title="Work Experience" />
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {experience.map(({ title, duration, desc }, i) => (
            <motion.div
              key={i}
              className="glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              style={{ padding: "1.5rem 2rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <h4 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "0.95rem", color: "var(--neon-cyan)" }}>
                  {title}
                </h4>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "var(--neon-purple)", padding: "2px 10px", border: "1px solid rgba(191,0,255,0.35)", borderRadius: 999 }}>
                  {duration}
                </span>
              </div>
              <div className="exp-desc">
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
              </div>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "rgba(0,245,255,0.4)", marginTop: "0.5rem" }}>
                hover to expand ↓
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════ */}
      <Section id="projects">
        <SectionHead label="build.projects" title="Projects" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {projects.map(({ title, desc, tech, github, live }, i) => (
            <motion.div
              key={title}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{ padding: "1.5rem" }}
            >
              <h4 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
                lineHeight: 1.4,
              }}>
                {title}
              </h4>
              <div className="proj-desc" style={{ marginBottom: 0 }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {desc}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0.75rem 0" }}>
                {tech.map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                <a href={github} target="_blank" rel="noopener noreferrer" className="neon-btn neon-btn-cyan">
                  <FaGithub /> GitHub
                </a>
                {live && (
                  <a href={live} target="_blank" rel="noopener noreferrer" className="neon-btn neon-btn-green">
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════ */}
      <Section id="certifications">
        <SectionHead label="achievements.certs" title="Certifications" />
        <div style={{ display: "grid", gap: "1rem" }}>
          {certifications.map(({ title, date, link }, i) => (
            <motion.div
              key={i}
              className="glass-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              style={{ padding: "1.25rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}
            >
              <a href={link} target="_blank" rel="noopener noreferrer" className="cert-link" style={{ fontSize: "0.95rem" }}>
                {title}
              </a>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "var(--neon-purple)", padding: "2px 10px", border: "1px solid rgba(191,0,255,0.3)", borderRadius: 999, whiteSpace: "nowrap" }}>
                {date}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <Section id="contact">
        <SectionHead label="get.in_touch" title="Contact" />
        <motion.div
          className="glass-card"
          style={{ padding: "3rem 2rem", textAlign: "center", maxWidth: 560, margin: "0 auto" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
            {[
              { icon: "📍", text: "Berhampur, Odisha" },
              { icon: "📞", text: "+918917352745" },
            ].map((item, i) => (
              <p key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <span style={{ marginRight: 8 }}>{item.icon}</span>{item.text}
              </p>
            ))}
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.9rem" }}>
              <span style={{ marginRight: 8 }}>📧</span>
              <a href="mailto:subhankar.pandit2002@gmail.com" style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>
                subhankar.pandit2002@gmail.com
              </a>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <a href="https://github.com/SubhankarA8415" target="_blank" rel="noopener noreferrer" className="contact-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/subhankar-pandit-080449255" target="_blank" rel="noopener noreferrer" className="contact-icon" style={{ borderColor: "rgba(0,128,255,0.3)", color: "var(--neon-blue)", background: "rgba(0,128,255,0.05)" }}>
              <FaLinkedin />
            </a>
            <a href="mailto:subhankar.pandit2002@gmail.com" className="contact-icon" style={{ borderColor: "rgba(255,0,170,0.3)", color: "var(--neon-pink)", background: "rgba(255,0,170,0.05)" }}>
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </Section>

      {/* ── Footer ── */}
      <footer style={{
        textAlign: "center",
        padding: "1.5rem",
        borderTop: "1px solid rgba(0,245,255,0.1)",
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        position: "relative",
        zIndex: 1,
      }}>
        <span style={{ color: "var(--neon-cyan)" }}>&lt;</span>
        {" "}&copy; {new Date().getFullYear()} Subhankar Pandit{" "}
        <span style={{ color: "var(--neon-cyan)" }}>/&gt;</span>
      </footer>
    </div>
  );
}
