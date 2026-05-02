import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCircleCheck,
  faGraduationCap,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mui-timeline-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experienceData = [
    {
      company: "Clean Fanatics",
      role: "Software Engineering Intern",
      duration: "Nov 2025 - Present",
      location: "On-Site, Bengaluru",
      icon: faBuilding,
      color: "coral",
      achievements: [
        "Adapted quickly to Zoho ecosystem including Creator, CRM, Analytics, Flow, and REST API integrations",
        "Developed custom Deluge functions to automate business processes and translate requirements into scalable solutions",
        "Configured workflows and integrations to streamline operations and improve data flow between Zoho applications",
        "Gained hands-on experience across multiple Zoho platforms with deep understanding of business logic",
      ],
    },
    {
      company: "Shridevi Institute of Engineering and Technology",
      role: "Bachelor of Engineering (Information Science and Engineering)",
      duration: "Dec 2022 - May 2026",
      location: "Tumkur, Karnataka",
      icon: faGraduationCap,
      color: "peach",
      achievements: [
        "Graduating with CGPA 8.93/10 and consistently listed for merit scholarship",
        "Built strong foundations in programming, databases, and software engineering principles",
        "Applied classroom learning through projects in AI/ML, full-stack development, and Java applications",
        "Actively participated in hackathons and technical problem-solving competitions",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Experience & Education</h2>
        <p className="section-subtitle">
          Professional and academic journey with key accomplishments
        </p>

        <Timeline position="alternate-reverse">
          {experienceData.map((item, idx) => (
            <TimelineItem key={item.company} className="mui-timeline-item">
              <TimelineSeparator>
                <TimelineDot
                  className={`timeline-dot timeline-${item.color}`}
                />
                {idx < experienceData.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <div className={`timeline-content timeline-${item.color}`}>
                  <div className="timeline-header">
                    <div className="company-info">
                      <span className="company-icon">
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <div className="company-details">
                        <h3 className="company-name">{item.company}</h3>
                        <p className="job-role">{item.role}</p>
                      </div>
                    </div>
                    <div className="timeline-meta">
                      <span className="duration">{item.duration}</span>
                      <span className="location">
                        <FontAwesomeIcon icon={faLocationDot} /> {item.location}
                      </span>
                    </div>
                  </div>

                  <ul className="achievements">
                    {item.achievements.map((achievement, aidx) => (
                      <li key={`${item.company}-ach-${aidx}`}>
                        <span className="achievement-icon">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </span>
                        <span className="achievement-text">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
};

export default Experience;
