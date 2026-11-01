import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";

// Color palette for language/tech dots, deterministic per tag name
const TAG_COLORS = [
  "#f1e05a", // JavaScript yellow
  "#3178c6", // TypeScript blue
  "#e34c26", // HTML orange
  "#563d7c", // CSS purple
  "#3fb950", // green
  "#f97583", // pink/red
  "#79c0ff", // light blue
  "#d2a8ff", // lavender
  "#ffa657", // orange
  "#7ee787", // mint
  "#ff7b72", // coral
  "#a5d6ff", // sky
];

function getTagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.015,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const primaryLink = project.live || project.github || "#";

  return (
    <div ref={cardRef} className="project-card">
      {/* Header: repo icon + title + visibility badge */}
      <div className="project-card-header">
        <FontAwesomeIcon
          icon={project.icon || faBookBookmark}
          className="project-card-repo-icon"
        />
        <h3 className="project-card-title">
          <a href={primaryLink} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>
        <span className="project-card-visibility">Public</span>
      </div>

      {/* Description */}
      <p className="project-card-description">{project.description}</p>

      {/* Footer: tags + links */}
      <div className="project-card-footer">
        {/* Language tags with colored dots */}
        <div className="project-card-tags">
          {project.tags?.map((tag, idx) => (
            <span key={idx} className="project-tag">
              <span
                className="project-tag-dot"
                style={{ backgroundColor: getTagColor(tag) }}
              />
              {tag}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="project-card-links">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              title="Live Demo"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              title="Source Code"
            >
              <FontAwesomeIcon icon={faGithub} />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
