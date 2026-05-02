import { useEffect, useRef } from "react";
import {
  faFingerprint,
  faHouse,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    const cards = sectionRef.current?.querySelectorAll(".project-card");
    cards?.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const projectsData = [
    {
      title: "Crimetrace AI",
      description:
        "AI-driven criminal face recognition system with real-time identification. Engineered Django backend for authentication, integrated OpenCV & FaceNet for video processing, and built interactive Streamlit UI with optimized low-latency performance.",
      tags: ["Django", "OpenCV", "FaceNet", "Python", "Streamlit"],
      github: "https://github.com/surajbv/crimetrace-ai",
      live: "https://crimetrace.surajbv.me",
      icon: faFingerprint,
    },
    {
      title: "WanderMate",
      description:
        "Travel mate finding platform connecting users based on calculated compatibility scores. Integrated TalkJS API for real-time chat, managed full development lifecycle with clean GitHub version control, delivering a complete functional webpage.",
      tags: ["React", "TalkJS", "MongoDB", "Node.js"],
      github: "https://github.com/surajbv/wandermate",
      live: "https://wandermate.surajbv.me",
      icon: faPlaneDeparture,
    },
    {
      title: "QuickRent",
      description:
        "Rental application with responsive Java Swing UI and real-time application logic using JDBC. Designed complete system with MySQL persistence, applied OOP principles for maintainability and scalability.",
      tags: ["Java", "Swing", "JDBC", "MySQL", "OOP"],
      github: "https://github.com/surajbv/quickrent",
      live: "#",
      icon: faHouse,
    },
  ];

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
