// App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaBars } from "react-icons/fa";
import profileFrame from "./assets/profile-frame.jpg";
import "@fontsource/raleway";
import "@fontsource/lora";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 }
  })
};

const skills = [
  "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB",
  "Django", "Python", "Java", "C", "C++", "MySQL",
  "REST APIs", "Git", "GitHub", "Postman", "VS Code"
];

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "ITER, SOA University, Bhubaneswar",
    duration: "2022 – 2026",
    cgpa: "CGPA: 9.35"
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
    title: "Adobe & NITI Aayog – Student Mentorship Program",
    duration: "September 2020",
    desc: "Selected for a 3-week remote mentorship under Atal Innovation Mission. Worked with Adobe Spark and Adobe XD. Designed UI/UX wireframes and digital posters as part of the program."
  }
];

const projects = [
  {
    title: "Yelp-Camp",
    desc: "Developed a Yelp-like full-stack platform where users can browse, review, and post campgrounds. Implemented full CRUD operations, user authentication with Passport.js, and integrated Cloudinary for image uploads.",
    tech: ["MongoDB", "Express.js", "Node.js", "Cloudinary", "Passport.js"],
    github: "https://github.com/SubhankarA8415/Web_Dev_Yelp-camp",
    live: "https://web-dev-yelp-camp.onrender.com/"
  },
  {
    title: "Java Projects",
    desc: "Developed a console-based banking system for transactions and account management. Also implemented algorithms like affine cipher, CPU scheduling (FCFS, RR), and a basic employee database using Java and OOP principles.",
    tech: ["Java", "OOP", "File Handling"],
    github: "https://github.com/SubhankarA8415/Java/tree/main/atm_project/src"
  },
  {
    title: "Python Projects",
    desc: "Built a hotel booking system, inventory management for Gift Mart, and 4 interactive Python games using GUI. Implemented encryption algorithms including Vigenère, Playfair, RSA, and Diffie-Hellman using Python and MySQL.",
    tech: ["Python", "MySQL", "Encryption", "GUI"],
    github: "https://github.com/SubhankarA8415/Python"
  }
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "education", "skills", "experience", "projects", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "home";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = id;
            break;
          }
        }
      }

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-900"} font-[Raleway]`}>
      {/* Header */}
      <header className="p-4 shadow sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide font-[Lora] text-purple-600 dark:text-purple-300">
            Subhankar Pandit
          </h1>
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-xl text-gray-800 dark:text-white">
              <FaBars />
            </button>
          </div>
          <nav className="hidden md:flex space-x-6 text-lg">
            {["education", "skills", "experience", "projects", "contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`${active === id ? 'text-purple-600 dark:text-purple-400 font-bold' : 'hover:text-purple-500'}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <button onClick={() => setDark(!dark)} className="text-xl">
              {dark ? <FaSun /> : <FaMoon />}
            </button>
          </nav>
        </div>
        {open && (
          <div className="md:hidden mt-2 space-y-2">
            {["education", "skills", "experience", "projects", "contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left px-2 py-1 hover:bg-purple-100 dark:hover:bg-gray-700 capitalize">
                {id}
              </button>
            ))}
            <button onClick={() => setDark(!dark)} className="block w-full text-left px-2 py-1 hover:bg-purple-100 dark:hover:bg-gray-700">
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </header>

      {/* Home */}
      <motion.section id="home" className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <motion.img src={profileFrame} alt="Subhankar Pandit" className="w-56 h-72 rounded-xl shadow-xl mb-6 border-4 border-purple-500 object-cover"
          whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
        <motion.h2 className="text-4xl font-bold mb-4 text-purple-700 dark:text-purple-300">Full Stack Developer</motion.h2>
        <p className="max-w-xl text-gray-700 dark:text-gray-300">
          MERN Stack and Django developer passionate about backend engineering, AI/ML, cloud, and DevOps.
        </p>
      </motion.section>

      {/* Education */}
      <motion.section id="education" className="p-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-3xl font-semibold mb-4 font-[Lora]">Education</h3>
        <div className="grid gap-4">
          {education.map((edu, i) => (
            <motion.div key={i} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible"
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded shadow border dark:border-gray-700">
              <h4 className="text-xl font-bold">{edu.degree}</h4>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm">{edu.duration}</p>
              <p className="text-sm italic">{edu.cgpa}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section id="skills" className="p-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-3xl font-semibold mb-4 font-[Lora]">Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <motion.div key={skill} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible"
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded shadow text-center border dark:border-gray-700">
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section id="experience" className="p-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-3xl font-semibold mb-4 font-[Lora]">Experience</h3>
        <div className="grid md:grid-cols-1 gap-6">
          {experience.map(({ title, duration, desc }, i) => (
            <motion.div key={i} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible"
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 ease-in-out group">
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p className="text-sm mb-1">{duration}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section id="projects" className="p-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-3xl font-semibold mb-4 font-[Lora]">Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(({ title, desc, tech, github, live }, i) => (
            <motion.div key={title} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible"
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 ease-in-out group">
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
                {desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {tech.map(t => (
                  <span key={t} className="bg-purple-100 dark:bg-purple-700 text-sm px-2 py-1 rounded text-black dark:text-white">{t}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={github} className="text-purple-600 dark:text-purple-400" target="_blank">GitHub</a>
                {live && <a href={live} className="text-green-600 dark:text-green-400" target="_blank">Live</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section id="contact" className="p-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-3xl font-semibold mb-4 font-[Lora]">Contact</h3>
        <p>📍 Berhampur, Odisha</p>
        <p>📧 <a href="mailto:subhankar.pandit2002@gmail.com" className="text-purple-600 dark:text-purple-400">subhankar.pandit2002@gmail.com</a></p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a href="https://github.com/SubhankarA8415" target="_blank"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/subhankar-pandit-080449255" target="_blank"><FaLinkedin /></a>
          <a href="mailto:subhankar.pandit2002@gmail.com"><FaEnvelope /></a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center p-4 border-t bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-[Raleway]">
        &copy; {new Date().getFullYear()} Subhankar Pandit
      </footer>
    </div>
  );
}
