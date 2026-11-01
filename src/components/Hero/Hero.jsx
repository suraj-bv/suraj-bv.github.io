import { useEffect, useRef, useState } from "react";
import { useSanity } from "../../lib/useSanity";
import "./Hero.css";

const HERO_QUERY = `*[_type == "hero"][0]{ name, tagline, techStack, subtitle, ctaText }`;

const Hero = () => {
  const { data: hero } = useSanity(HERO_QUERY);
  const heroRef = useRef(null);
  const [lineIndex, setLineIndex] = useState(-1);
  const [charIndex, setCharIndex] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  const name = hero?.name || "Suraj B V";
  const tagline = hero?.tagline || "Software Engineer | Full-Stack Developer";
  const techStack = hero?.techStack || "React • Node.js • Convex";

  const lines = [
    { cls: "line-cmd", text: "$ whoami" },
    { cls: "line-out", text: `> ${name}` },
    { cls: "line-cmd", text: "$ cat role.txt" },
    { cls: "line-out", text: `> ${tagline}` },
    { cls: "line-cmd", text: "$ echo $TECH_STACK" },
    { cls: "line-out", text: `> ${techStack}` },
  ];

  useEffect(() => {
    if (!hero) return;
    const timer = setTimeout(() => setLineIndex(0), 500);
    return () => clearTimeout(timer);
  }, [hero]);

  useEffect(() => {
    if (lineIndex < 0 || lineIndex >= lines.length) return;

    const currentText = lines[lineIndex].text;
    if (charIndex < currentText.length) {
      const speed = lines[lineIndex].cls === "line-cmd" ? 45 : 25;
      const timer = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }

    const pause = lines[lineIndex].cls === "line-out" ? 400 : 200;
    const timer = setTimeout(() => {
      if (lineIndex < lines.length - 1) {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      } else {
        setShowCursor(true);
        setTimeout(() => setShowCta(true), 300);
      }
    }, pause);
    return () => clearTimeout(timer);
  }, [lineIndex, charIndex, lines]);

  const scrollToWork = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-content">
        <div className="terminal-window">
          <div className="terminal-chrome">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot--red" />
              <span className="terminal-dot terminal-dot--yellow" />
              <span className="terminal-dot terminal-dot--green" />
            </div>
            <span className="terminal-title">suraj@portfolio:~</span>
            <div className="terminal-dots-spacer" />
          </div>

          <div className="terminal-body">
            {lines.map((line, i) => {
              if (i > lineIndex) return null;
              const text = i < lineIndex ? line.text : line.text.slice(0, charIndex);
              const isTyping = i === lineIndex && charIndex < line.text.length;
              return (
                <div key={i} className={`terminal-line ${line.cls}`}>
                  {text}
                  {isTyping && <span className="typing-cursor">▋</span>}
                </div>
              );
            })}
            {showCursor && (
              <div className="terminal-cursor-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>

        {showCta && (
          <button
            className="hero-cta hero-cta--visible"
            onClick={scrollToWork}
            aria-label="Scroll to see my work"
          >
            <span className="hero-cta-prompt">$</span>
            <span className="hero-cta-text">cd ./projects</span>
            <span className="hero-cta-enter">⏎</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
