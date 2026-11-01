import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import "./Skills.css";

const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) { _id, category, icon, color, skills }`;

const Skills = () => {
  const sectionRef = useRef(null);
  const { data: skillsData, loading } = useSanity(SKILLS_QUERY);

  useEffect(() => {
    if (!skillsData?.length) return;

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

    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [skillsData]);

  if (loading && !skillsData) return null;

  return (
    <section ref={sectionRef} className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>

        <div className="skills-grid">
          {skillsData?.map((skillGroup) => (
            <div
              key={skillGroup._id}
              className={`skill-card skill-${skillGroup.color}`}
            >
              <div className="skill-header">
                <span className="skill-icon">
                  <FontAwesomeIcon icon={getIcon(skillGroup.icon)} />
                </span>
                <h3 className="skill-category">{skillGroup.category}</h3>
              </div>

              <ul className="skill-list">
                {skillGroup.skills?.map((skill) => (
                  <li key={skill._key} className="skill-item">
                    <span className="skill-emoji">
                      <FontAwesomeIcon icon={getIcon(skill.icon)} />
                    </span>
                    <span className="skill-name">{skill.name}</span>
                  </li>
                ))}
              </ul>

              <div className="skill-bar"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
