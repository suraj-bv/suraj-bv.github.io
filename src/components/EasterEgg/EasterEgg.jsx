import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./EasterEgg.css";

const EasterEgg = ({ onToggleTheme, currentTheme }) => {
  const toggleRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (toggleRef.current) {
        // Dramatic rotation animation
        gsap.to(toggleRef.current, {
          rotation: 360,
          duration: 0.8,
          ease: "back.out",
          clearProps: "rotation",
        });

        // Glow effect
        gsap.from(toggleRef.current, {
          boxShadow: "0 0 40px currentColor",
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Animate sun and moon
      if (currentTheme === "dark" && sunRef.current) {
        gsap.to(sunRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        });
        gsap.to(moonRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
        });
      } else if (currentTheme === "light" && moonRef.current) {
        gsap.to(moonRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        });
        gsap.to(sunRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
        });
      }

      onToggleTheme();
    };

    const toggle = toggleRef.current;
    if (toggle) {
      toggle.addEventListener("click", handleClick);
    }

    return () => {
      if (toggle) {
        toggle.removeEventListener("click", handleClick);
      }
    };
  }, [currentTheme, onToggleTheme]);

  return (
    <div className="easter-egg">
      <button
        ref={toggleRef}
        className="theme-toggle"
        aria-label="Toggle dark/light theme"
        title="Click for dramatic theme change ✨"
      >
        <span
          ref={sunRef}
          className="icon sun"
          style={{ opacity: currentTheme === "light" ? 1 : 0 }}
        >
          ☀️
        </span>
        <span
          ref={moonRef}
          className="icon moon"
          style={{ opacity: currentTheme === "dark" ? 1 : 0 }}
        >
          🌙
        </span>
      </button>
    </div>
  );
};

export default EasterEgg;
