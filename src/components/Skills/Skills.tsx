import React, { useState, useEffect } from 'react';
import './Skills.css';
import { useTranslation } from 'react-i18next';
import skillsData from '../../assets/data/skills.json';
import {
  FaNodeJs,
  FaPython,
  FaReact,
  FaGit,
} from 'react-icons/fa';
import {
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiPowerbi,
  SiPostman,
  SiSqlite,
  SiSqlalchemy,
  SiMicrosoftsqlserver,
} from 'react-icons/si';

const Skills: React.FC = () => {
  const { t } = useTranslation('global');
  const [filter, setFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  // Escuchar cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const iconMap: Record<string, JSX.Element> = {
    Node: <FaNodeJs />,
    Python: <FaPython />,
    Express: <SiExpress />,
    'SQL Server': <SiMicrosoftsqlserver />,
    MySQL: <SiMysql />,
    PostgreSQL: <SiPostgresql />,
    SQLite: <SiSqlite />,
    SQLAlchemy: <SiSqlalchemy />,
    React: <FaReact />,
    TypeScript: <SiTypescript />,
    Tailwind: <SiTailwindcss />,
    Bootstrap: <SiBootstrap />,
    Git: <FaGit />,
    Postman: <SiPostman />,
    PowerBI: <SiPowerbi />,
  };

  const filteredSkills = skillsData.filter(
    (skill) => filter === 'all' || skill.filter === filter
  );

  const handleFilterClick = (newFilter: string, index: number) => {
    setFilter(newFilter);
    setActiveIndex(index);
  };

  return (
    <section className="skills container" id="skills">
      <h3>{t('navbar.skills')}</h3>
      <div className="filter-buttons">
        <a
          onClick={() => handleFilterClick('all', 0)}
          className={activeIndex === 0 ? 'active' : ''}
        >
          {t('skills.all')}
        </a>
        <a
          onClick={() => handleFilterClick('back', 1)}
          className={activeIndex === 1 ? 'active' : ''}
        >
          Backend
        </a>
        <a
          onClick={() => handleFilterClick('front', 2)}
          className={activeIndex === 2 ? 'active' : ''}
        >
          Frontend
        </a>
        <a
          onClick={() => handleFilterClick('other', 3)}
          className={activeIndex === 3 ? 'active' : ''}
        >
          {t('skills.other')}
        </a>
        {/* Renderiza el estilo dinámico según la resolución */}
        <span
          style={{
            left: `${activeIndex * (isMobile ? 80 : 100)}px`,
          }}
        ></span>
      </div>

      <div className="content">
        {filteredSkills.map((skill) => (
          <div className="row" key={skill.id}>
            <div className="card-wrapper">
              <div className="card">
                <div className="image">{iconMap[skill.name]}</div>
                <div className="skill-name">{skill.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;