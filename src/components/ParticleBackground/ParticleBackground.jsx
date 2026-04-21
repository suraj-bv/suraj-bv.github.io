import { useEffect } from "react";
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  useEffect(() => {
    const initParticles = async () => {
      await loadSlim(tsParticles);

      await tsParticles.load("tsparticles", {
        background: {
          color: {
            value: "transparent",
          },
        },
        fullScreen: false,
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "repulse",
            },
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 80,
                smooth: 10,
              },
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 0.8,
              },
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#FF7B54", "#FFB997", "#F7B801"],
          },
          links: {
            color: "#FFB997",
            distance: 180,
            enable: true,
            opacity: 0.4,
            width: 1.5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 100,
          },
          opacity: {
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
            },
            value: 0.6,
          },
          shape: {
            type: "circle",
          },
          size: {
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
            },
            random: true,
            value: {
              min: 1,
              max: 4,
            },
          },
        },
        detectRetina: true,
      });
    };

    initParticles();

    return () => {
      try {
        if (tsParticles?.engine?.plugins?.get("tsparticles")) {
          tsParticles.destroy("tsparticles");
        }
      } catch (e) {
        // Silently fail on cleanup
      }
    };
  }, []);

  return (
    <div
      id="tsparticles"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 3,
      }}
    />
  );
};

export default ParticleBackground;
