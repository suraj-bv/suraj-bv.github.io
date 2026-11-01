import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import ProjectCard from "./ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { _id, title, description, tags, github, live, icon }`;

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const { data: projectsData, loading } = useSanity(PROJECTS_QUERY);

  useEffect(() => {
    if (!projectsData?.length) return;

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from(".projects-header", {
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });

      // Stagger-animate each card
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projectsData]);

  if (loading && !projectsData) return null;

  return (
    <section ref={sectionRef} className="projects" id="projects">
      {/* GitHub-style pinned repos header */}
      <div className="projects-header">
        <div className="projects-header-top">
          <FontAwesomeIcon icon={faThumbtack} className="projects-pin-icon" />
          <h2 className="projects-header-title">Pinned</h2>
        </div>
        <p className="projects-terminal-prompt">
          <span className="prompt-symbol">$ </span>
          <span className="prompt-path">~/projects</span>
          <span className="prompt-command"> ls --pinned</span>
        </p>
      </div>

      <hr className="projects-separator" />

      {/* Repository cards grid */}
      <div className="projects-grid">
        {projectsData?.map((project, index) => (
          <div
            key={project._id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <ProjectCard
              project={{
                ...project,
                icon: getIcon(project.icon),
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
