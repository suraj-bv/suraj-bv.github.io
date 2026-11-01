import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) { _id, category, icon, color, skills }`;

const COLOR_CYCLE = ["green", "blue", "purple", "coral"];

function mapColor(sanityColor, index) {
  const mapping = {
    coral: "coral",
    peach: "coral",
    gold: "gold",
    sage: "green",
    green: "green",
    blue: "blue",
    purple: "purple",
  };
  return mapping[sanityColor] || COLOR_CYCLE[index % COLOR_CYCLE.length];
}

const Skills = () => {
  const sectionRef = useRef(null);
  const jsonRef = useRef(null);
  const cardsRef = useRef(null);
  const { data: skillCategories, loading } = useSanity(SKILLS_QUERY);

  useEffect(() => {
    if (!skillCategories?.length) return;

    const ctx = gsap.context(() => {
      // Animate JSON lines
      gsap.fromTo(
        ".skills-json-line",
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: jsonRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate terminal cards
      gsap.fromTo(
        ".skills-term-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate skill tags inside each card
      skillCategories.forEach((_, i) => {
        gsap.fromTo(
          `.skills-term-card:nth-child(${i + 1}) .skill-tag`,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: `.skills-term-card:nth-child(${i + 1})`,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animate progress bar fills
      gsap.fromTo(
        ".progress-fill",
        { width: "0%" },
        {
          width: "100%",
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [skillCategories]);

  if (loading && !skillCategories) return null;

  // Build the JSON dependency representation
  const buildJsonLines = () => {
    if (!skillCategories?.length) return null;

    const lines = [];
    lines.push(
      <div key="open" className="skills-json-line">
        <span className="json-brace">{"{"}</span>
      </div>
    );
    lines.push(
      <div key="deps" className="skills-json-line" style={{ paddingLeft: "1.5rem" }}>
        <span className="json-key">&quot;dependencies&quot;</span>
        <span className="json-brace">: {"{"}</span>
      </div>
    );

    skillCategories.forEach((group, groupIndex) => {
      const isLast = groupIndex === skillCategories.length - 1;
      const skillNames = group.skills?.map((s) => s.name) || [];

      lines.push(
        <div
          key={`cat-${group._id}`}
          className="skills-json-line"
          style={{ paddingLeft: "3rem" }}
        >
          <span className="json-key">&quot;{group.category}&quot;</span>
          <span className="json-brace">: </span>
          <span className="json-bracket">[</span>
          {skillNames.map((name, i) => (
            <span key={name}>
              <span className="json-string">&quot;{name}&quot;</span>
              {i < skillNames.length - 1 && (
                <span className="json-comma">, </span>
              )}
            </span>
          ))}
          <span className="json-bracket">]</span>
          {!isLast && <span className="json-comma">,</span>}
        </div>
      );
    });

    lines.push(
      <div key="deps-close" className="skills-json-line" style={{ paddingLeft: "1.5rem" }}>
        <span className="json-brace">{"}"}</span>
      </div>
    );
    lines.push(
      <div key="close" className="skills-json-line">
        <span className="json-brace">{"}"}</span>
      </div>
    );

    return lines;
  };

  return (
    <section ref={sectionRef} className="skills-terminal" id="skills">
      {/* Section Header */}
      <div className="skills-header">
        <div className="skills-header-comment">{"// skills.config"}</div>
        <h2 className="skills-header-title">
          <span className="prompt-symbol">$</span> cat skills.json
          <span className="skills-cursor" />
        </h2>
        <div className="skills-header-path">
          ~/portfolio/<span>src/data</span>/skills.json
        </div>
      </div>

      {/* JSON dependency block */}
      <div ref={jsonRef} className="skills-json-block">
        <div className="skills-json-titlebar">
          <div className="skills-json-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="skills-json-filename">skills.json</span>
        </div>
        <div className="skills-json-content">{buildJsonLines()}</div>
      </div>

      {/* Terminal cards grid */}
      <div ref={cardsRef} className="skills-cards-grid">
        {skillCategories?.map((group, index) => {
          const color = mapColor(group.color, index);
          const skillCount = group.skills?.length || 0;

          return (
            <div
              key={group._id}
              className="skills-term-card"
              data-color={color}
            >
              {/* Titlebar */}
              <div className="skills-term-titlebar">
                <div className="skills-term-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="skills-term-title">
                  <span className="term-icon">
                    <FontAwesomeIcon icon={getIcon(group.icon)} />
                  </span>
                  <span className="term-label">
                    {group.category.toLowerCase().replace(/\s+/g, "-")} &mdash; ~/{group.category.toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="skills-term-body">
                <div className="skills-term-prompt">
                  <span className="prompt-arrow">&#10095;</span>
                  <span className="prompt-dir">~/{group.category.toLowerCase()}</span>
                  <span className="prompt-cmd">ls --installed</span>
                </div>

                <div className="skills-term-tags">
                  {group.skills?.map((skill) => (
                    <span key={skill._key} className="skill-tag">
                      <span className="tag-icon">
                        <FontAwesomeIcon icon={getIcon(skill.icon)} />
                      </span>
                      <span className="tag-name">{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="skills-term-progress">
                <div className="progress-line">
                  <span>{skillCount} packages</span>
                  <div className="progress-bar">
                    <div className="progress-fill" />
                  </div>
                  <span className="progress-label">OK</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
