import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import "./Achievements.css";

const ACHIEVEMENTS_QUERY = `*[_type == "achievement"] | order(order asc) { _id, title, subtitle, date, icon, color, description }`;

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

    const cards = sectionRef.current?.querySelectorAll(".achievement-card");
    cards?.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [achievementsData]);

  if (loading && !achievementsData) return null;

  return (
    <section ref={sectionRef} className="achievements" id="achievements">
      <div className="container">
        <h2 className="section-title">Achievements & Recognition</h2>
        <p className="section-subtitle">
          Milestones and accomplishments that drive my continuous growth
        </p>

        <div className="achievements-grid">
          {achievementsData?.map((achievement) => (
            <div
              key={achievement._id}
              className={`achievement-card achievement-${achievement.color}`}
            >
              <div className="achievement-icon">
                <FontAwesomeIcon icon={getIcon(achievement.icon)} />
              </div>

              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-subtitle">{achievement.subtitle}</p>
                <p className="achievement-date">{achievement.date}</p>
                <p className="achievement-description">
                  {achievement.description}
                </p>
              </div>

              <div className="achievement-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
