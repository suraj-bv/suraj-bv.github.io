import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSanity } from "../../lib/useSanity";
import "./Hero.css";

const HERO_QUERY = `*[_type == "hero"][0]{ name, tagline, techStack, subtitle, ctaText }`;

const Hero = () => {
  const { data: hero } = useSanity(HERO_QUERY);
  const heroRef = useRef(null);
  const [displayLines, setDisplayLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const animRef = useRef(null);

  const name = hero?.name || "Suraj B V";
  const tagline = hero?.tagline || "Software Engineer | Full-Stack Developer";
  const techStack = hero?.techStack || "React • Node.js • Convex";

  const lines = useMemo(() => [
    { cls: "line-cmd", text: "$ whoami" },
    { cls: "line-out", text: `> ${name}` },
    { cls: "line-cmd", text: "$ cat role.txt" },
    { cls: "line-out", text: `> ${tagline}` },
    { cls: "line-cmd", text: "$ echo $TECH_STACK" },
    { cls: "line-out", text: `> ${techStack}` },
  ], [name, tagline, techStack]);

  useEffect(() => {
    if (!hero || animRef.current) return;
    animRef.current = true;

    let cancelled = false;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const typeLine = async (text, speed) => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (cancelled) return;
        result += text[i];
        setCurrentLine(result);
        await sleep(speed);
      }
      return result;
    };

    const run = async () => {
      await sleep(400);
      const completed = [];

      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const line = lines[i];
        const speed = line.cls === "line-cmd" ? 35 : 18;
        setIsTyping(true);
        await typeLine(line.text, speed);
        setIsTyping(false);
        completed.push(line);
        setDisplayLines([...completed]);
        setCurrentLine("");
        await sleep(line.cls === "line-out" ? 250 : 120);
      }

      if (!cancelled) {
        setShowCursor(true);
        await sleep(300);
        setShowCta(true);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [hero, lines]);

  const scrollToWork = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-content">
        <div className="terminal-window term-window">
          <div className="term-titlebar">
            <div className="term-dots">
              <span /><span /><span />
            </div>
            <span className="term-filename">suraj@portfolio:~</span>
          </div>

          <div className="terminal-body">
            {displayLines.map((line, i) => (
              <div key={i} className={`terminal-line ${line.cls}`}>
                {line.text}
              </div>
            ))}
            {currentLine && (
              <div className={`terminal-line ${
                displayLines.length % 2 === 0 ? "line-cmd" : "line-out"
              }`}>
                {currentLine}
                {isTyping && <span className="typing-cursor">▋</span>}
              </div>
            )}
            {showCursor && (
              <div className="terminal-cursor-line">
                <span className="hero-prompt">$</span>
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
