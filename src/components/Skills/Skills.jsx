import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill cards on scroll
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillsData = [
    {
      category: "Frontend",
      icon: "🎨",
      color: "coral",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "TypeScript", icon: "📘" },
        { name: "CSS/Tailwind", icon: "🎨" },
        { name: "Vue.js", icon: "💚" },
      ],
    },
    {
      category: "Backend",
      icon: "⚙️",
      color: "peach",
      skills: [
        { name: "Node.js", icon: "🟢" },
        { name: "Python", icon: "🐍" },
        { name: "Express", icon: "🚂" },
        { name: "FastAPI", icon: "⚡" },
      ],
    },
    {
      category: "Mobile",
      icon: "📱",
      color: "gold",
      skills: [
        { name: "Flutter", icon: "🎯" },
        { name: "React Native", icon: "⚛️" },
        { name: "iOS/Swift", icon: "🍎" },
        { name: "Android", icon: "🤖" },
      ],
    },
    {
      category: "AI/ML",
      icon: "🧠",
      color: "sage",
      skills: [
        { name: "TensorFlow", icon: "🔢" },
        { name: "PyTorch", icon: "🔥" },
        { name: "NLP", icon: "💬" },
        { name: "Computer Vision", icon: "👁️" },
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
                <span className="skill-icon">{skillGroup.icon}</span>
                <h3 className="skill-category">{skillGroup.category}</h3>
              </div>

              <ul className="skill-list">
                {skillGroup.skills.map((skill, i) => (
                  <li key={i} className="skill-item">
                    <span className="skill-emoji">{skill.icon}</span>
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
