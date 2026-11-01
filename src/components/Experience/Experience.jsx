import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) { _id, company, role, duration, location, icon, color, achievements }`;

const Experience = () => {
  const sectionRef = useRef(null);
  const { data: experienceData, loading } = useSanity(EXPERIENCE_QUERY);

  useEffect(() => {
    if (!experienceData?.length) return;

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
  }, [experienceData]);

  if (loading && !experienceData) return null;

  return (
    <section ref={sectionRef} className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Experience & Education</h2>
        <p className="section-subtitle">
          Professional and academic journey with key accomplishments
        </p>

        <div className="timeline-shell">
          {experienceData?.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={item._id}
                className={`timeline-row mui-timeline-item ${
                  isLeft ? "timeline-left" : "timeline-right"
                }`}
              >
                <div className="timeline-side timeline-side-left">
                  {isLeft && (
                    <div className={`timeline-content timeline-${item.color}`}>
                      <div className="timeline-header">
                        <div className="company-info">
                          <span className="company-icon">
                            <FontAwesomeIcon icon={getIcon(item.icon)} />
                          </span>
                          <div className="company-details">
                            <h3 className="company-name">{item.company}</h3>
                            <p className="job-role">{item.role}</p>
                          </div>
                        </div>
                        <div className="timeline-meta">
                          <span className="duration">{item.duration}</span>
                          <span className="location">
                            <FontAwesomeIcon icon={faLocationDot} />{" "}
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <ul className="achievements">
                        {item.achievements?.map((achievement, aidx) => (
                          <li key={aidx}>
                            <span className="achievement-icon">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </span>
                            <span className="achievement-text">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="timeline-center" aria-hidden="true">
                  <span className={`timeline-dot timeline-${item.color}`} />
                </div>

                <div className="timeline-side timeline-side-right">
                  {!isLeft && (
                    <div className={`timeline-content timeline-${item.color}`}>
                      <div className="timeline-header">
                        <div className="company-info">
                          <span className="company-icon">
                            <FontAwesomeIcon icon={getIcon(item.icon)} />
                          </span>
                          <div className="company-details">
                            <h3 className="company-name">{item.company}</h3>
                            <p className="job-role">{item.role}</p>
                          </div>
                        </div>
                        <div className="timeline-meta">
                          <span className="duration">{item.duration}</span>
                          <span className="location">
                            <FontAwesomeIcon icon={faLocationDot} />{" "}
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <ul className="achievements">
                        {item.achievements?.map((achievement, aidx) => (
                          <li key={aidx}>
                            <span className="achievement-icon">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </span>
                            <span className="achievement-text">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
