import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <h2>About Me</h2>
      <p>
        I'm a Full-Stack Developer passionate about creating beautiful,
        functional experiences.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <div>
          <h3>Things I Love</h3>
          <ul>
            <li>✨ Building elegant solutions</li>
            <li>🚀 Scaling systems</li>
            <li>🎨 Design</li>
          </ul>
        </div>
        <div>
          <h3>Things I Tolerate</h3>
          <ul>
            <li>💤 Debugging at 3 AM</li>
            <li>🎭 Estimating timelines</li>
            <li>📞 Meetings</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
