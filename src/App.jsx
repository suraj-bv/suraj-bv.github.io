import { useState, useEffect, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import Hero from "./components/Hero/Hero";
import EasterEgg from "./components/EasterEgg/EasterEgg";
import "./App.css";

const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Achievements = lazy(
  () => import("./components/Achievements/Achievements"),
);
const Experience = lazy(() => import("./components/Experience/Experience"));
const Contact = lazy(() => import("./components/Contact/Contact"));

function App() {
  const [theme, setTheme] = useState("dark");

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme function (for dark mode toggle easter egg)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="app" data-theme={theme}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Easter Egg Component - Dark Mode Toggle */}
      <EasterEgg onToggleTheme={toggleTheme} currentTheme={theme} />

      {/* Main Content */}
      <main className="main-content" id="main-content">
        <Hero />
        <Suspense
          fallback={<div className="section-loading">Loading sections...</div>}
        >
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Experience />
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="text-center text-muted">
            © 2026 Suraj | Built with React, Passion & a splash of retro vibes
            <FontAwesomeIcon icon={faWandSparkles} />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
