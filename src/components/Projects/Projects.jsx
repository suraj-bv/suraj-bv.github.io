import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      title: "WanderMate",
      description:
        "A collaborative travel planning platform where users can create trips, invite friends, and plan itineraries together in real-time.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/surajbv/wandermate",
      live: "https://wandermate.surajbv.me",
      icon: "✈️",
    },
    {
      title: "AI Image Generator",
      description:
        "A full-stack AI application that generates high-quality images from text prompts using DALL-E and Stable Diffusion APIs.",
      tags: ["Python", "FastAPI", "React", "TensorFlow"],
      github: "https://github.com/surajbv/ai-image-generator",
      live: "https://aigen.surajbv.me",
      icon: "🎨",
    },
    {
      title: "MusicFlow Mobile App",
      description:
        "Cross-platform music streaming app with offline mode, personalized playlists, and real-time lyrics sync.",
      tags: ["Flutter", "Firebase", "Dart", "REST APIs"],
      github: "https://github.com/surajbv/musicflow",
      live: "https://play.google.com/store/apps/details?id=com.musicflow",
      icon: "🎵",
    },
    {
      title: "Data Analytics Dashboard",
      description:
        "Interactive analytics dashboard with real-time data visualization, exportable reports, and machine learning predictions.",
      tags: ["React", "D3.js", "Python", "PostgreSQL"],
      github: "https://github.com/surajbv/analytics-dashboard",
      live: "https://dashboard.surajbv.me",
      icon: "📊",
    },
    {
      title: "NLP Sentiment Analyzer",
      description:
        "ML model that analyzes sentiment in social media posts with 94% accuracy using transformer-based NLP techniques.",
      tags: ["Python", "PyTorch", "Transformers", "Hugging Face"],
      github: "https://github.com/surajbv/sentiment-analyzer",
      live: "https://sentiment.surajbv.me",
      icon: "🧠",
    },
    {
      title: "E-commerce Platform",
      description:
        "Fully-featured e-commerce system with payment integration, inventory management, and admin dashboard.",
      tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/surajbv/ecommerce-platform",
      live: "https://shop.surajbv.me",
      icon: "🛒",
    },
  ];

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
