import "./Home.css";
import profileImage from "../../assets/webp/IaraPhoto2.webp";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const Home = () => {
  const { t, i18n } = useTranslation('global');
  const language = i18n.language;

  const cvFilename = language === 'en' ? 'iara-etchart-cv-en.pdf' : 'iara-etchart-cv-es.pdf';
  const cvLink = `/pdf/${cvFilename}`;

  return (
    <section className="home container" id="home">
      <div className="home-content">
        <h1>
          {t("home.greeting")}
          <span>Iara</span>
        </h1>
        <h2 className="text-animation">
          {t("home.position")}
          <span></span>
        </h2>
        <p>{t("home.description")}</p>

        <div className="social-icons">
          <a href="https://linkedin.com/in/iara-etchart/" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/iaraetchart" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
        </div>

        <div className="btn-group">
          <a className="btn btn-fill" href={cvLink} download={`iara-etchart-cv-${language}.pdf`}>
          {t('home.button-cv')}
          </a>
          <a href="#contact" className="btn">
            {t('navbar.contact')}
          </a>
        </div>
      </div>

      <div className="home-img">
        <img src={profileImage} alt="Iara's Profile" />
      </div>
    </section>
  );
};

export default Home;
