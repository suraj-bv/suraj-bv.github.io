import { useEffect, useRef } from "react";
import { useSanity } from "../../lib/useSanity";
import { urlFor } from "../../lib/sanity";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_QUERY = `*[_type == "about"][0]{ bio, photos, highlights }`;

const About = () => {
  const sectionRef = useRef(null);
  const { data: about, loading } = useSanity(ABOUT_QUERY);

  const aboutPhotos = about?.photos?.length
    ? about.photos.map((photo, i) => ({
        url: urlFor(photo).width(600).url(),
        alt: photo.alt || `Photo ${i + 1}`,
      }))
    : [];

  useEffect(() => {
    if (!about) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-terminal__header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".about-code-block", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".about-photo-frame", {
        scrollTrigger: {
          trigger: ".about-photos",
          start: "top 75%",
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".about-json-block", {
        scrollTrigger: {
          trigger: ".about-json-block",
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [about]);

  if (loading && !about) {
    return (
      <section className="about" id="about">
        <div className="container">
          <div className="section-loading">Loading...</div>
        </div>
      </section>
    );
  }

  // Split bio into lines for line-numbered display
  const bioLines = about?.bio
    ? about.bio.match(/.{1,72}(?:\s|$)/g) || [about.bio]
    : [];

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="container about-terminal">
        {/* Terminal header */}
        <div className="about-terminal__header">
          <div className="about-terminal__dots">
            <span className="about-terminal__dot about-terminal__dot--red" />
            <span className="about-terminal__dot about-terminal__dot--yellow" />
            <span className="about-terminal__dot about-terminal__dot--green" />
          </div>
          <span className="about-terminal__title">
            ~/about.config.js
          </span>
          <div className="about-terminal__dots about-terminal__dots--hidden">
            <span className="about-terminal__dot" />
            <span className="about-terminal__dot" />
            <span className="about-terminal__dot" />
          </div>
        </div>

        {/* Comment header */}
        <div className="about-code-block">
          <div className="about-code__comment">
            <span className="about-line-num">1</span>
            <span className="about-syntax--muted">
              {"/* ========================================= */"}
            </span>
          </div>
          <div className="about-code__comment">
            <span className="about-line-num">2</span>
            <span className="about-syntax--muted">
              {"/*              About Me                     */"}
            </span>
          </div>
          <div className="about-code__comment">
            <span className="about-line-num">3</span>
            <span className="about-syntax--muted">
              {"/* ========================================= */"}
            </span>
          </div>
          <div className="about-code__line">
            <span className="about-line-num">4</span>
            <span>&nbsp;</span>
          </div>

          {/* Bio as a const string */}
          <div className="about-code__line">
            <span className="about-line-num">5</span>
            <span className="about-syntax--purple">const</span>{" "}
            <span className="about-syntax--blue">bio</span>{" "}
            <span className="about-syntax--muted">=</span>{" "}
            <span className="about-syntax--green">{"`"}</span>
          </div>
          {bioLines.map((line, i) => (
            <div className="about-code__line" key={i}>
              <span className="about-line-num">{6 + i}</span>
              <span className="about-syntax--green about-bio-text">
                {"  "}{line.trim()}
              </span>
            </div>
          ))}
          <div className="about-code__line">
            <span className="about-line-num">{6 + bioLines.length}</span>
            <span className="about-syntax--green">{"`"}</span>
            <span className="about-syntax--muted">;</span>
          </div>
        </div>

        {/* Photos row */}
        {aboutPhotos.length > 0 && (
          <div className="about-photos">
            {aboutPhotos.map((photo, i) => (
              <div className="about-photo-frame" key={i}>
                <div className="about-photo-frame__tab">
                  <span className="about-syntax--muted">&#9679;</span>{" "}
                  photo_{i + 1}.jpg
                </div>
                <div className="about-photo-frame__img-wrap">
                  <img src={photo.url} alt={photo.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Highlights as JSON object */}
        {about?.highlights?.length > 0 && (
          <div className="about-json-block">
            <div className="about-code__line">
              <span className="about-line-num">
                {7 + bioLines.length}
              </span>
              <span>&nbsp;</span>
            </div>
            <div className="about-code__line">
              <span className="about-line-num">
                {8 + bioLines.length}
              </span>
              <span className="about-syntax--purple">const</span>{" "}
              <span className="about-syntax--blue">profile</span>{" "}
              <span className="about-syntax--muted">=</span>{" "}
              <span className="about-syntax--text">{"{"}</span>
            </div>

            {about.highlights.map((group, gIdx) => {
              const key = group.heading
                ? group.heading
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "_")
                    .replace(/^_|_$/g, "")
                : `group_${gIdx}`;

              const items = group.items || [];
              const baseLineNum = 9 + bioLines.length + gIdx * (items.length + 2);

              return (
                <div key={group._key || gIdx} className="about-json-group">
                  <div className="about-code__line">
                    <span className="about-line-num">{baseLineNum}</span>
                    {"  "}
                    <span className="about-syntax--blue">{key}</span>
                    <span className="about-syntax--muted">:</span>{" "}
                    <span className="about-syntax--text">[</span>
                  </div>
                  {items.map((item, iIdx) => {
                    const text = typeof item === "string" ? item : item.text;
                    const isLast = iIdx === items.length - 1;
                    return (
                      <div className="about-code__line about-json-item" key={iIdx}>
                        <span className="about-line-num">
                          {baseLineNum + 1 + iIdx}
                        </span>
                        {"    "}
                        <span className="about-syntax--green">
                          {'"'}{text}{'"'}
                        </span>
                        {!isLast && (
                          <span className="about-syntax--muted">,</span>
                        )}
                      </div>
                    );
                  })}
                  <div className="about-code__line">
                    <span className="about-line-num">
                      {baseLineNum + items.length + 1}
                    </span>
                    {"  "}
                    <span className="about-syntax--text">]</span>
                    {gIdx < about.highlights.length - 1 && (
                      <span className="about-syntax--muted">,</span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="about-code__line">
              <span className="about-line-num">
                {9 +
                  bioLines.length +
                  about.highlights.reduce(
                    (sum, g) => sum + (g.items?.length || 0) + 2,
                    0
                  )}
              </span>
              <span className="about-syntax--text">{"}"}</span>
              <span className="about-syntax--muted">;</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
