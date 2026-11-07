import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useSanity } from "../../lib/useSanity";
import { getIcon } from "../../lib/iconMap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

// Initialize Email.js
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "");

const SOCIAL_QUERY = `*[_type == "socialLink"] | order(order asc) { _id, name, url, icon, label }`;

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const { data: socialLinks } = useSanity(SOCIAL_QUERY);
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
      gsap.from(".ct-form-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".ct-sidebar", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.15,
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

  /**
   * Extract a display path from a URL for the terminal-command style.
   * e.g. "https://github.com/suraj-bv" -> "github.com/suraj-bv"
   */
  const getDisplayPath = (url) => {
    try {
      const u = new URL(url);
      return u.hostname + u.pathname.replace(/\/$/, "");
    } catch {
      return url;
    }
  };

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="ct-container">
        <div className="ct-header">
          <span className="ct-header-prompt">
            <span className="ct-prompt-symbol">$</span> contact --interactive
          </span>
        </div>

        <div className="ct-wrapper">
          {/* Form */}
          <div className="ct-form-container" ref={formRef}>
            <div className="term-titlebar">
              <div className="term-dots">
                <span /><span /><span />
              </div>
              <span className="term-filename">message.sh</span>
            </div>

            <form onSubmit={handleSubmit} className="ct-form" noValidate>
              <div className="ct-field">
                <label htmlFor="name" className="ct-label">
                  <span className="ct-comment">{"//"} your name</span>
                </label>
                <div className="ct-input-row">
                  <span className="ct-input-prompt">&gt;</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="enter name..."
                    className="ct-input"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="ct-error" role="alert">
                    <span className="ct-error-prefix">ERR!</span> {errors.name}
                  </p>
                )}
              </div>

              <div className="ct-field">
                <label htmlFor="email" className="ct-label">
                  <span className="ct-comment">{"//"} your email</span>
                </label>
                <div className="ct-input-row">
                  <span className="ct-input-prompt">&gt;</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="ct-input"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="ct-error" role="alert">
                    <span className="ct-error-prefix">ERR!</span> {errors.email}
                  </p>
                )}
              </div>

              <div className="ct-field">
                <label htmlFor="message" className="ct-label">
                  <span className="ct-comment">{"//"} your message</span>
                </label>
                <div className="ct-input-row ct-input-row-textarea">
                  <span className="ct-input-prompt ct-input-prompt-top">
                    &gt;
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="tell me about your project..."
                    className="ct-input ct-textarea"
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
                </div>
                <p id="message-help" className="ct-char-count">
                  {formState.message.trim().length}/800
                </p>
                {errors.message && (
                  <p id="message-error" className="ct-error" role="alert">
                    <span className="ct-error-prefix">ERR!</span>{" "}
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="ct-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="ct-submit-loading">
                    <span className="ct-spinner" /> sending...
                  </span>
                ) : (
                  <>
                    <span className="ct-submit-symbol">$</span> send_message{" "}
                    <span className="ct-submit-enter">&#x21B5;</span>
                  </>
                )}
              </button>

              {submitted && (
                <div className="ct-success" role="status">
                  <FontAwesomeIcon icon={faCircleCheck} />{" "}
                  <span>Message sent successfully</span>
                </div>
              )}
              {submitError && (
                <div className="ct-fail" role="alert">
                  <span className="ct-error-prefix">ERR!</span> {submitError}
                </div>
              )}
            </form>
          </div>

          {/* Sidebar: social links */}
          <div className="ct-sidebar">
            <div className="ct-sidebar-header">
              <span className="ct-comment">{"//"} connect</span>
            </div>

            <div className="ct-social-list">
              {socialLinks?.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-social-link"
                  aria-label={link.label}
                >
                  <span className="ct-social-prompt">$</span>
                  <span className="ct-social-cmd">open</span>
                  <span className="ct-social-icon">
                    <FontAwesomeIcon icon={getIcon(link.icon)} />
                  </span>
                  <span className="ct-social-path">
                    {getDisplayPath(link.url)}
                  </span>
                </a>
              ))}
            </div>

            <div className="ct-sidebar-footer">
              <p className="ct-footer-text">
                <span className="ct-comment">
                  {"//"} open to opportunities &amp; collaborations
                </span>
              </p>
              <p className="ct-footer-status">
                <span className="ct-status-dot" /> available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
