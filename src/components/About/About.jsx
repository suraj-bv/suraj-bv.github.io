import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faBolt,
  faBookOpen,
  faLink,
  faTrophy,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { ThumbnailsCarousel } from "../ui/signature";
import "./About.css";
import profilePhoto1 from "../../../assets/1.jpeg";
import profilePhoto2 from "../../../assets/2.jpeg";
import profilePhoto3 from "../../../assets/3.jpeg";
import profilePhoto4 from "../../../assets/4.jpg";
import profilePhoto6 from "../../../assets/6.jpg";

const aboutPhotos = [
  {
    full: profilePhoto1,
    thumb: profilePhoto1,
    alt: "Portrait photo 1",
  },
  {
    full: profilePhoto2,
    thumb: profilePhoto2,
    alt: "Portrait photo 2",
  },
  {
    full: profilePhoto3,
    thumb: profilePhoto3,
    alt: "Portrait photo 3",
  },
  {
    full: profilePhoto4,
    thumb: profilePhoto4,
    alt: "Portrait photo 4",
  },
  {
    full: "/assets/5.heic",
    thumb: "/assets/5.heic",
    fallbackFull: profilePhoto4,
    fallbackThumb: profilePhoto4,
    alt: "Portrait photo 5",
  },
  {
    full: profilePhoto6,
    thumb: profilePhoto6,
    alt: "Portrait photo 6",
  },
];

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <div className="about__media">
          <ThumbnailsCarousel images={aboutPhotos} />
        </div>

        <div className="about__content">
          <h2>About Me</h2>
          <p>
            I'm a Computer Science student (BE ISE, CGPA 8.93) at Shridevi
            Institute of Engineering and Technology, passionate about AI/ML,
            full-stack development, and automation. Currently a Software
            Engineering Intern at Clean Fanatics, working with the Zoho
            ecosystem to build scalable business solutions.
          </p>

          <div className="about__highlights">
            <div>
              <h3>What I Love</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faBrain} /> Building AI/ML-driven
                  systems
                </li>
                <li>
                  <FontAwesomeIcon icon={faWrench} /> Automating workflows with
                  integrations
                </li>
                <li>
                  <FontAwesomeIcon icon={faBolt} /> Solving complex problems
                  with elegant code
                </li>
              </ul>
            </div>

            <div>
              <h3>My Strengths</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faBookOpen} /> Quick learner across
                  tech stacks
                </li>
                <li>
                  <FontAwesomeIcon icon={faTrophy} /> Hackathon winner &
                  Hack-2-Intern finalist
                </li>
                <li>
                  <FontAwesomeIcon icon={faLink} /> Full-stack development:
                  React, Python, Java, Zoho
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
