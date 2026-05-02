import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "../ParticleBackground/ParticleBackground";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const techStackRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline for hero entrance
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Animate title with scale and fade
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 1.2,
        },
        0,
      )
        // Animate tagline
        .from(
          taglineRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          0.3,
        )
        .from(
          techStackRef.current,
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
          },
          0.45,
        )
        // Animate subtitle
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          0.5,
        )
        // Animate CTA button with scale
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.8,
          },
          0.7,
        );

      // Parallax effect on scroll
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          markers: false,
        },
        y: 100,
        opacity: 0.5,
        duration: 1,
      });

      // Floating animation for title
      gsap.to(titleRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Glow pulse effect on subtitle
      gsap.to(subtitleRef.current, {
        textShadow:
          "0 0 20px rgba(255, 123, 84, 0.5), 0 0 40px rgba(255, 185, 151, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // CTA button hover animations
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const handleMouseEnter = () => {
      gsap.to(cta, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cta, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    cta.addEventListener("mouseenter", handleMouseEnter);
    cta.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cta.removeEventListener("mouseenter", handleMouseEnter);
      cta.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToWork = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero" ref={heroRef} id="hero">
      <ParticleBackground />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-text-wrapper">
          <h1 ref={titleRef} className="hero-title">
            Suraj B V
          </h1>

          <p ref={taglineRef} className="hero-tagline">
            Full-Stack Developer | AI Enthusiast 
          </p>

          <p ref={techStackRef} className="hero-tech-stack">
            React • Node.js • AI/ML
          </p>

          <p ref={subtitleRef} className="hero-subtitle">
            I build beautiful, performant applications that make people smile
          </p>
        </div>

        <button
          ref={ctaRef}
          className="btn btn-primary hero-cta"
          onClick={scrollToWork}
          aria-label="Scroll to see my work"
        >
          See My Work ↓
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span className="scroll-text">Scroll</span>
      </div>

      {/* Decorative elements */}
      <div className="hero-decoration hero-decoration-1"></div>
      <div className="hero-decoration hero-decoration-2"></div>
    </section>
  );
};

export default Hero;
