import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline items from left/right alternately
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -100 : 100),
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate timeline dots
      gsap.from(".timeline-dot", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        scale: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experienceData = [
    {
      company: "TechVision AI",
      role: "Senior Full-Stack Engineer",
      duration: "Jan 2024 - Present",
      location: "San Francisco, CA",
      icon: "🚀",
      color: "coral",
      achievements: [
        "Led migration of monolithic architecture to microservices, improving performance by 45%",
        "Architected real-time data pipeline processing 2M+ events/day",
        "Mentored 5 junior developers, improving team velocity by 30%",
      ],
    },
    {
      company: "DataFlow Systems",
      role: "Full-Stack Developer",
      duration: "Jun 2022 - Dec 2023",
      location: "Austin, TX",
      icon: "📊",
      color: "peach",
      achievements: [
        "Built end-to-end analytics platform using React, Node.js, and PostgreSQL",
        "Reduced API response time from 800ms to 120ms through optimization",
        "Implemented comprehensive testing suite achieving 92% code coverage",
      ],
    },
    {
      company: "StartupX",
      role: "Full-Stack Engineer",
      duration: "Mar 2021 - May 2022",
      location: "Remote",
      icon: "⚡",
      color: "gold",
      achievements: [
        "Developed MVP from scratch, launched to 10K users in 3 months",
        "Built mobile app using React Native, released on iOS & Android",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      company: "CloudTech Solutions",
      role: "Junior Full-Stack Developer",
      duration: "Aug 2020 - Feb 2021",
      location: "New York, NY",
      icon: "☁️",
      color: "sage",
      achievements: [
        "Contributed to Django REST API serving 50K+ requests/day",
        "Built responsive React components with Material-UI",
        "Participated in agile development cycle with 2-week sprints",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">
          Professional journey and key accomplishments
        </p>

        <div className="timeline">
          {experienceData.map((item, index) => (
            <div key={index} className={`timeline-item timeline-${item.color}`}>
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="company-info">
                    <span className="company-icon">{item.icon}</span>
                    <div className="company-details">
                      <h3 className="company-name">{item.company}</h3>
                      <p className="job-role">{item.role}</p>
                    </div>
                  </div>
                  <div className="timeline-meta">
                    <span className="duration">{item.duration}</span>
                    <span className="location">📍 {item.location}</span>
                  </div>
                </div>

                <ul className="achievements">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
