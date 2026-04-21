import { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import EasterEgg from "./components/EasterEgg/EasterEgg";
import Contact from "./components/Contact/Contact";
import "./App.css";

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
      {/* Easter Egg Component - Dark Mode Toggle */}
      <EasterEgg onToggleTheme={toggleTheme} currentTheme={theme} />

      {/* Main Content */}
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="text-center text-muted">
            © 2026 Suraj | Built with React, Passion & a splash of retro vibes
            ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
