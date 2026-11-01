import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThumbnailsCarousel } from "../ui/signature";
import { useSanity } from "../../lib/useSanity";
import { urlFor } from "../../lib/sanity";
import { getIcon } from "../../lib/iconMap";
import "./About.css";

const ABOUT_QUERY = `*[_type == "about"][0]{ bio, photos, highlights }`;

const About = () => {
  const { data: about, loading } = useSanity(ABOUT_QUERY);

  // Build photo array from Sanity data with fallbacks
  const aboutPhotos = about?.photos?.length
    ? about.photos.map((photo, i) => {
        const url = urlFor(photo).width(600).url();
        return {
          full: url,
          thumb: urlFor(photo).width(150).url(),
          alt: photo.alt || `Portrait photo ${i + 1}`,
        };
      })
    : [];

  if (loading && !about) {
    return (
      <section className="about" id="about">
        <div className="container">
          <div className="section-loading">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <div className="about__media">
          {aboutPhotos.length > 0 && (
            <ThumbnailsCarousel images={aboutPhotos} />
          )}
        </div>

        <div className="about__content">
          <h2>About Me</h2>
          <p>{about?.bio}</p>

          <div className="about__highlights">
            {about?.highlights?.map((group) => (
              <div key={group._key}>
                <h3>{group.heading}</h3>
                <ul>
                  {group.items?.map((item) => (
                    <li key={item._key}>
                      <FontAwesomeIcon icon={getIcon(item.icon)} />{" "}
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
