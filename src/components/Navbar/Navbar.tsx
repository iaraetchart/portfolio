import React, { useState, FC } from "react";
import "./Navbar.css";
import { useTranslation } from 'react-i18next';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation('global');
  const [activeSection, setActiveSection] = useState<string>("home");
  const [language, setLanguage] = useState(i18n.language);

  const handleSetActive = (section: string) => {
    setActiveSection(section);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <header className="header">
      <div className="container">
      <a href="#home" className="logo">
        Iara <span>Etchart</span>
      </a>

      <i className="bx bx-menu" id="menu-icon"></i>

      <nav className="navbar">
        <div className="nav-links">
          <a
            href="#home"
            className={activeSection === "home" ? "active" : ""}
            onClick={() => handleSetActive("home")}
          >
            {t('navbar.home')}
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={() => handleSetActive("about")}
          >
            {t('navbar.about')}
          </a>
          <a
            href="#skills"
            className={activeSection === "skills" ? "active" : ""}
            onClick={() => handleSetActive("skills")}
          >
            {t('navbar.skills')}
          </a>
          <a
            href="#projects"
            className={activeSection === "projects" ? "active" : ""}
            onClick={() => handleSetActive("projects")}
          >
            {t('navbar.projects')}
          </a>
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => handleSetActive("contact")}
          >
            {t('navbar.contact')}
          </a>
        </div>
        <button className="btn language-toggle" onClick={toggleLanguage}>
          {language === 'en' ? 'ES' : 'EN'}
        </button>
      </nav>
      </div>
    </header>
  );
};

export default Navbar;