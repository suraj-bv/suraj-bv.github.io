import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./EasterEgg.css";

const EasterEgg = ({ onToggleTheme, currentTheme }) => {
  const toggleRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (!sunRef.current || !moonRef.current) return;

    gsap.to(sunRef.current, {
      autoAlpha: currentTheme === "light" ? 1 : 0,
      scale: currentTheme === "light" ? 1 : 0.55,
      rotate: currentTheme === "light" ? 0 : -20,
      y: currentTheme === "light" ? 0 : 6,
      duration: 0.45,
      ease: "power2.out",
    });

    gsap.to(moonRef.current, {
      autoAlpha: currentTheme === "dark" ? 1 : 0,
      scale: currentTheme === "dark" ? 1 : 0.55,
      rotate: currentTheme === "dark" ? 0 : 20,
      y: currentTheme === "dark" ? 0 : -6,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [currentTheme]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    if (toggleRef.current) {
      gsap
        .timeline()
        .to(toggleRef.current, {
          rotation: "+=210",
          scale: 0.9,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(toggleRef.current, {
          rotation: "+=150",
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.6)",
          clearProps: "rotation",
        });

      gsap.fromTo(
        toggleRef.current,
        { boxShadow: "0 0 0 rgba(255, 123, 84, 0)" },
        {
          boxShadow: "0 0 32px rgba(255, 123, 84, 0.7)",
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
      );
    }

    setIsFlashing(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsFlashing(false);
    }, 700);

    onToggleTheme();
  };

  const isDark = currentTheme === "dark";

  return (
    <div className={`easter-egg ${isFlashing ? "is-flashing" : ""}`}>
      <button
        ref={toggleRef}
        type="button"
        className="theme-toggle"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={handleToggle}
      >
        <span className="theme-halo" aria-hidden="true"></span>
        <span ref={sunRef} className="icon sun" aria-hidden="true">
          {"\u2600"}
        </span>
        <span ref={moonRef} className="icon moon" aria-hidden="true">
          {"\u263D"}
        </span>
      </button>

      <span className="theme-flash" aria-hidden="true"></span>
    </div>
  );
};

export default EasterEgg;
