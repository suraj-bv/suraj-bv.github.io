import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) { _id, company, role, duration, location, icon, color, achievements }`;

function generateHash() {
  const chars = "0123456789abcdef";
  let hash = "";
  for (let i = 0; i < 7; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

const colorMap = {
  coral: "var(--color-accent-coral)",
  peach: "var(--color-accent-coral)",
  green: "var(--color-accent-green)",
  blue: "var(--color-accent-blue)",
  purple: "var(--color-accent-purple)",
  gold: "var(--color-accent-gold)",
  sage: "var(--color-accent-green)",
};

function getCommitColor(colorName) {
  return colorMap[colorName] || "var(--color-accent-green)";
}

const Experience = () => {
  const sectionRef = useRef(null);
  const { data: experienceData, loading } = useSanity(EXPERIENCE_QUERY);
  const hashesRef = useRef([]);

  if (experienceData?.length && hashesRef.current.length === 0) {
    hashesRef.current = experienceData.map(() => generateHash());
  }

  useEffect(() => {
    if (!experienceData?.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".git-commit-entry", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".git-graph-node", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        scale: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.1,
      });

      gsap.from(".git-graph-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.15,
      });

      gsap.from(".git-branch-arm", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.3,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [experienceData]);

  if (loading && !experienceData) return null;

  return (
    <section ref={sectionRef} className="experience" id="experience">
      <div className="experience-container">
        <div className="term-titlebar">
          <div className="term-dots">
            <span /><span /><span />
          </div>
          <span className="term-filename">~/experience</span>
        </div>

        <div className="git-terminal-body">
          <div className="git-command-line">
            <span className="git-prompt">$</span>
            <span className="git-cmd">git log</span>
            <span className="git-flag">--oneline</span>
            <span className="git-flag">--graph</span>
            <span className="git-flag">--all</span>
          </div>

          <div className="git-log-output">
            {experienceData?.map((item, idx) => {
              const commitColor = getCommitColor(item.color);
              const hash = hashesRef.current[idx] || generateHash();
              const isFirst = idx === 0;
              const isLast = idx === (experienceData?.length || 0) - 1;

              return (
                <div key={item._id} className="git-commit-entry">
                  <div className="git-graph-col">
                    {!isFirst && (
                      <div
                        className="git-graph-line git-graph-line-top"
                        style={{ backgroundColor: commitColor }}
                      />
                    )}

                    <div
                      className="git-graph-node"
                      style={{
                        backgroundColor: commitColor,
                        boxShadow: `0 0 12px ${commitColor}66`,
                      }}
                    />

                    {!isLast && (
                      <div
                        className="git-graph-line git-graph-line-bottom"
                        style={{ backgroundColor: commitColor }}
                      />
                    )}

                    <div
                      className="git-branch-arm"
                      style={{ backgroundColor: commitColor }}
                    />
                  </div>

                  <div className="git-commit-content">
                    <div className="git-commit-header">
                      <span className="git-star" style={{ color: commitColor }}>
                        *
                      </span>
                      <span className="git-hash" style={{ color: commitColor }}>
                        {hash}
                      </span>
                      {isFirst && (
                        <span className="git-ref">
                          <span className="git-ref-paren">(</span>
                          <span className="git-head">HEAD -&gt;</span>
                          <span className="git-branch-name"> main</span>
                          <span className="git-ref-paren">)</span>
                        </span>
                      )}
                    </div>

                    <div className="git-commit-body">
                      <div className="git-meta-line">
                        <span className="git-label">Author:</span>
                        <span className="git-value">Suraj B V</span>
                        <span className="git-company-icon">
                          <FontAwesomeIcon icon={getIcon(item.icon)} />
                        </span>
                      </div>
                      <div className="git-meta-line">
                        <span className="git-label">Date:</span>
                        <span className="git-value git-date">
                          {item.duration}
                        </span>
                      </div>

                      <div className="git-message-block">
                        <div className="git-message-title">
                          <span className="git-role">{item.role}</span>
                          <span className="git-at">@</span>
                          <span
                            className="git-company"
                            style={{ color: commitColor }}
                          >
                            {item.company}
                          </span>
                        </div>
                        <div className="git-location">
                          Location: {item.location}
                        </div>
                      </div>

                      {item.achievements?.length > 0 && (
                        <ul className="git-diff-stats">
                          {item.achievements.map((achievement, aidx) => (
                            <li key={aidx} className="git-diff-line">
                              <span
                                className="git-diff-plus"
                                style={{ color: commitColor }}
                              >
                                +
                              </span>
                              <span className="git-diff-text">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="git-end-line">
            <span className="git-prompt">$</span>
            <span className="git-cursor">_</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
