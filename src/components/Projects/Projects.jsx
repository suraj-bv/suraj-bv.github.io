import { useEffect, useRef } from "react";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { _id, title, description, tags, github, live, icon }`;

const Projects = () => {
  const sectionRef = useRef(null);
  const { data: projectsData, loading } = useSanity(PROJECTS_QUERY);

  useEffect(() => {
    if (!projectsData?.length) return;

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
  }, [projectsData]);

  if (loading && !projectsData) return null;

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {projectsData?.map((project) => (
            <ProjectCard
              key={project._id}
              project={{
                ...project,
                icon: getIcon(project.icon),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
