import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import Signature from "./components/ui/signature";
import "./App.css";

const Hero = lazy(() => import("./components/Hero/Hero"));
const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Achievements = lazy(
  () => import("./components/Achievements/Achievements"),
);
const Experience = lazy(() => import("./components/Experience/Experience"));
const Contact = lazy(() => import("./components/Contact/Contact"));

const NAV_ITEMS = [
  { id: "hero", label: "~/home" },
  { id: "about", label: "~/about" },
  { id: "skills", label: "~/skills" },
  { id: "projects", label: "~/projects" },
  { id: "experience", label: "~/experience" },
  { id: "achievements", label: "~/achievements" },
  { id: "contact", label: "~/contact" },
];

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set dark theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = "hero";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((e, sectionId) => {
    setActiveSection(sectionId);
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Terminal Tab Bar Navigation */}
      <nav className="terminal-nav" role="navigation" aria-label="Main">
        <div className="terminal-nav__inner">
          <div className="terminal-nav__logo">
            <span className="terminal-nav__prompt">$</span>
            <span className="terminal-nav__name">suraj-bv</span>
          </div>

          <button
            className="terminal-nav__hamburger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span>{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>

          <ul
            className={`terminal-nav__tabs ${mobileMenuOpen ? "is-open" : ""}`}
            role="tablist"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id} role="presentation">
                <a
                  href={`#${item.id}`}
                  role="tab"
                  className={`terminal-nav__tab ${activeSection === item.id ? "is-active" : ""}`}
                  aria-selected={activeSection === item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content" id="main-content">
        <Suspense
          fallback={
            <div className="section-loading">
              <span className="terminal-cursor" aria-hidden="true">
                _
              </span>
              <span>Loading...</span>
            </div>
          }
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </Suspense>
      </main>

      {/* Terminal Footer */}
      <Signature />
    </div>
  );
}

export default App;
