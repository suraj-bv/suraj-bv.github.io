import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faMedal,
  faStar,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import "./Achievements.css";

const Achievements = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
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
  }, []);

  const achievementsData = [
    {
      title: "Hack-2-Intern Winner",
      subtitle: "VTU, Mysore",
      date: "Dec 2024",
      icon: faTrophy,
      color: "coral",
      description:
        "1st Candidate shortlisted for paid internship among 200+ participants. Demonstrated exceptional problem-solving and innovation skills.",
    },
    {
      title: "Hackathon Champion",
      subtitle: "Shridevi Institute & VTU",
      date: "Oct & Dec 2024",
      icon: faMedal,
      color: "peach",
      description:
        "Led team to develop innovative solution website within 24 hours. Showcased leadership and rapid prototyping capabilities.",
    },
    {
      title: "Merit Scholarship",
      subtitle: "Excellence in Academics",
      date: "2022-2024",
      icon: faGraduationCap,
      color: "gold",
      description:
        "Consistently maintained CGPA of 8.5 or higher throughout the course. Recognized for academic excellence and dedication.",
    },
    {
      title: "HackerRank 5-Star",
      subtitle: "Python Proficiency",
      date: "2022-Present",
      icon: faStar,
      color: "sage",
      description:
        "Earned 5-Star Rating in Python on HackerRank, demonstrating strong coding proficiency on global competitive platform.",
    },
  ];

  return (
    <section ref={sectionRef} className="achievements" id="achievements">
      <div className="container">
        <h2 className="section-title">Achievements & Recognition</h2>
        <p className="section-subtitle">
          Milestones and accomplishments that drive my continuous growth
        </p>

        <div className="achievements-grid">
          {achievementsData.map((achievement, idx) => (
            <div
              key={idx}
              className={`achievement-card achievement-${achievement.color}`}
            >
              <div className="achievement-icon">
                <FontAwesomeIcon icon={achievement.icon} />
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
