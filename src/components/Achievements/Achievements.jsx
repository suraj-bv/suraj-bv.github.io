import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import "./Achievements.css";

const ACHIEVEMENTS_QUERY = `*[_type == "achievement"] | order(order asc) { _id, title, subtitle, date, icon, color, description }`;

const COLOR_MAP = {
  green: "var(--color-accent-green)",
  blue: "var(--color-accent-blue)",
  purple: "var(--color-accent-purple)",
  coral: "var(--color-accent-coral)",
  gold: "#e3b341",
  sage: "#7ee787",
  peach: "#ffa657",
};

const getColor = (color) => COLOR_MAP[color] || "var(--color-accent-green)";

const Achievements = () => {
  const sectionRef = useRef(null);
  const { data: achievementsData, loading } = useSanity(ACHIEVEMENTS_QUERY);

  useEffect(() => {
    if (!achievementsData?.length) return;

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

    const cards = sectionRef.current?.querySelectorAll(".ach-card");
    cards?.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [achievementsData]);

  if (loading && !achievementsData) return null;

  return (
    <section ref={sectionRef} className="achievements" id="achievements">
      <div className="ach-container">
        <div className="ach-header">
          <span className="ach-header-prompt">
            <span className="ach-prompt-symbol">$</span> cat achievements.log
          </span>
          <span className="ach-header-count">
            {achievementsData?.length || 0} entries
          </span>
        </div>

        <div className="ach-grid">
          {achievementsData?.map((achievement) => {
            const accentColor = getColor(achievement.color);
            return (
              <div
                key={achievement._id}
                className="ach-card"
                style={{ "--ach-accent": accentColor }}
              >
                <div className="ach-card-top">
                  <div
                    className="ach-badge"
                    style={{ backgroundColor: accentColor }}
                  >
                    <FontAwesomeIcon icon={getIcon(achievement.icon)} />
                  </div>
                  <span className="ach-date">{achievement.date}</span>
                </div>

                <h3 className="ach-title">{achievement.title}</h3>
                <p className="ach-subtitle">{achievement.subtitle}</p>
                <p className="ach-desc">{achievement.description}</p>

                <div className="ach-card-border-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
