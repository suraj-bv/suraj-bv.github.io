import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

// Initialize Email.js
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "");

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const submitTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".contact-info", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const validateField = (name, value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "This field is required.";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return "Please enter a valid email address.";
      }
    }

    if (name === "message" && trimmed.length < 20) {
      return "Message should be at least 20 characters.";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {
      name: validateField("name", formState.name),
      email: validateField("email", formState.email),
      message: validateField("message", formState.message),
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      message: formState.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    const animateSend = () => {
      gsap.to(formRef.current, {
        scale: 0.95,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });

      submitTimeoutRef.current = setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        setFormState({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });

        gsap.to(formRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        // Reset success message after 3 seconds
        resetTimeoutRef.current = setTimeout(() => setSubmitted(false), 3000);
      }, 500);
    };

    // Send email using Email.js
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: payload.name,
          email: payload.email,
          message: payload.message,
          time: new Date().toLocaleString(),
          title: payload.name,
        },
      )
      .then(() => {
        animateSend();
      })
      .catch((err) => {
        console.error("Email send error:", err);
        setSubmitError(
          "Failed to send message. Please check the configuration and try again.",
        );
        setIsSubmitting(false);
      });
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/suraj-bv",
      icon: faGithub,
      label: "Open GitHub profile",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/suraj-bv/",
      icon: faLinkedin,
      label: "Open LinkedIn profile",
    },
    {
      name: "X",
      url: "https://x.com/Suraj_bv_",
      icon: faXTwitter,
      label: "Open X profile",
    },
    {
      name: "Email",
      url: "mailto:surajbv5566@gmail.com",
      icon: faEnvelope,
      label: "Send an email",
    },
  ];

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-subtitle">
          Got an idea, role, or wild build in mind? I am in.
        </p>

        <div className="contact-wrapper">
          <div className="contact-form-container" ref={formRef}>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="field-error" role="alert">
                    {errors.name}
                  </p>
                )}
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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="field-error" role="alert">
                    {errors.email}
                  </p>
                )}
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
                  maxLength="800"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? "message-error message-help"
                      : "message-help"
                  }
                />
                <p id="message-help" className="field-help">
                  {formState.message.trim().length}/800 characters
                </p>
                {errors.message && (
                  <p id="message-error" className="field-error" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                  </>
                )}
              </button>

              {submitted && (
                <div className="success-message" role="status">
                  <FontAwesomeIcon icon={faCircleCheck} /> Thanks for reaching
                  out! I'll get back to you soon.
                </div>
              )}
              {submitError && (
                <div className="error-message" role="alert">
                  {submitError}
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
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  <span className="social-icon">
                    <FontAwesomeIcon icon={link.icon} />
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            <p className="closing-line">
              "Life is too short to write boring code." <br /> Let's make
              something amazing together!{" "}
              <FontAwesomeIcon icon={faPaperPlane} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
