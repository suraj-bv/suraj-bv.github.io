import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faChartSimple,
  faCode,
  faDatabase,
  faDna,
  faEye,
  faGear,
  faGlobe,
  faMobileScreenButton,
  faRobot,
  faServer,
  faCubes,
  faPalette,
  faClapperboard,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import "./Skills.css";

const Skills = () => {
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

    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const skillsData = [
    {
      category: "Programming Languages",
      icon: faCode,
      color: "coral",
      skills: [
        { name: "Python", icon: faDna },
        { name: "JavaScript", icon: faCode },
        { name: "Java", icon: faCode },
        { name: "Deluge", icon: faGear },
      ],
    },
    {
      category: "Web Development",
      icon: faGlobe,
      color: "peach",
      skills: [
        { name: "React", icon: faCode },
        { name: "HTML & CSS", icon: faCode },
        { name: "Convex", icon: faCubes },
        { name: "Django", icon: faServer },
      ],
    },
    {
      category: "Mobile & App Dev",
      icon: faMobileScreenButton,
      color: "gold",
      skills: [
        { name: "React Native", icon: faMobileScreenButton },
        { name: "Java Swings", icon: faCode },
        { name: "Streamlit", icon: faClapperboard },
        { name: "UI/UX Design", icon: faPalette },
      ],
    },
    {
      category: "AI/ML & Data",
      icon: faBrain,
      color: "sage",
      skills: [
        { name: "TensorFlow & PyTorch", icon: faDna },
        { name: "OpenCV & FaceNet", icon: faEye },
        { name: "Pandas & NumPy", icon: faChartSimple },
        { name: "Scikit-learn", icon: faRobot },
      ],
    },
    {
      category: "Databases & Tools",
      icon: faDatabase,
      color: "coral",
      skills: [
        { name: "MySQL", icon: faDatabase },
        { name: "MongoDB", icon: faLeaf },
        { name: "Git & GitHub", icon: faCode },
        { name: "Zoho Ecosystem", icon: faGear },
        { name: "n8n", icon: faGear },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>

        <div className="skills-grid">
          {skillsData.map((skillGroup, idx) => (
            <div key={idx} className={`skill-card skill-${skillGroup.color}`}>
              <div className="skill-header">
                <span className="skill-icon">
                  <FontAwesomeIcon icon={skillGroup.icon} />
                </span>
                <h3 className="skill-category">{skillGroup.category}</h3>
              </div>

              <ul className="skill-list">
                {skillGroup.skills.map((skill, i) => (
                  <li key={i} className="skill-item">
                    <span className="skill-emoji">
                      <FontAwesomeIcon icon={skill.icon} />
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
