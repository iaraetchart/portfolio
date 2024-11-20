import { useState } from "react";
import "./About.css";
import illustration from "../../assets/webp/illustration.webp";
import { FaPaintBrush, FaMusic } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { BiSolidJoystick } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const About = () => {
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null);
  const { t } = useTranslation("global");
  return (
    <section className="about" id="about">
      <div className="container">
      <div className="about-img">
        <img src={illustration} alt="illustration" />
      </div>
      <div className="about-content">
        <p>
          {t("about.greeting")} <span>Iara Etchart</span>
          {t("about.presentation")}
        </p>
        <div className="about-wrapper">
          <div className="about-info">
          <h4>{t("about.about")}</h4>
            <p>{t("about.info")}</p>
          </div>
          <div className="about-hobbies">
            <h4>Hobbies</h4>
            <div className="social-icons">
              <a
                href="#Games"
                aria-label="Games"
                onMouseEnter={() => setHoveredHobby("Games")}
                onMouseLeave={() => setHoveredHobby(null)}
              >
                <BiSolidJoystick size={28} />
                {hoveredHobby === "Games" && (
                  <div className="tooltip">{t("about.games")}</div>
                )}
              </a>
              <a
                href="#Movie"
                aria-label="Movies"
                onMouseEnter={() => setHoveredHobby("Movies")}
                onMouseLeave={() => setHoveredHobby(null)}
              >
                <RiMovie2Fill size={24} />
                {hoveredHobby === "Movies" && (
                  <div className="tooltip">{t("about.movies")}</div>
                )}
              </a>
              <a
                href="#Drawing"
                aria-label="Drawing"
                onMouseEnter={() => setHoveredHobby("Drawing")}
                onMouseLeave={() => setHoveredHobby(null)}
              >
                <FaPaintBrush size={22} />
                {hoveredHobby === "Drawing" && (
                  <div className="tooltip">{t("about.drawing")}</div>
                )}
              </a>
              <a
                href="#music"
                aria-label="Music"
                onMouseEnter={() => setHoveredHobby("Music")}
                onMouseLeave={() => setHoveredHobby(null)}
              >
                <FaMusic size={20} />
                {hoveredHobby === "Music" && (
                  <div className="tooltip">{t("about.music")}</div>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default About;