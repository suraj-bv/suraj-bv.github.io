import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill out all fields");
      return;
    }

    // Simulate form submission
    gsap.to(formRef.current, {
      scale: 0.95,
      opacity: 0.5,
      duration: 0.3,
      ease: "power2.out",
    });

    setTimeout(() => {
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

      gsap.to(formRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com", icon: "💻" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "🔗" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "Email", url: "mailto:your-email@example.com", icon: "✉️" },
  ];

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Let's Connect</h2>

        <div className="contact-wrapper">
          <div className="contact-form-container" ref={formRef}>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your-email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your next project..."
                  required
                  rows="5"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Send Message 🚀
              </button>

              {submitted && (
                <div className="success-message">
                  ✨ Thanks for reaching out! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          <div className="contact-info">
            <h3>Connect With Me</h3>
            <p>
              I'm always interested in hearing about new projects and
              opportunities.
            </p>

            <div className="social-links">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-icon">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            <p className="closing-line">
              "Life is too short to write boring code." <br /> Let's make
              something amazing together! 🎨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
