import React from 'react';
import './Projects.css';
import { useTranslation } from 'react-i18next';
import projects_en from '../../assets/data/projects_en.json';
import projects_es from '../../assets/data/projects_es.json';
import skills from '../../assets/data/skills.json'; 
import { IProject, ISkill } from './Project.types';
import { FaNodeJs, FaPython, FaReact, FaGit } from 'react-icons/fa';
import { SiExpress, SiMysql, SiPostgresql, SiTypescript, SiTailwindcss, SiBootstrap, SiPowerbi, SiPostman, SiSqlite, SiSqlalchemy } from 'react-icons/si';

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation('global');
  const projects: IProject[] = i18n.language === 'en' ? projects_en : projects_es;

  const skillsMap: Record<number, ISkill> = skills.reduce((map, skill) => {
    map[skill.id] = skill;
    return map;
  }, {} as Record<number, ISkill>);

  const iconMap: Record<string, JSX.Element> = {
    Node: <FaNodeJs />,
    Python: <FaPython />,
    Express: <SiExpress />,
    'SQL Server': <SiMysql />,
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

  return (
    <section className="projects container" id="projects">
      <h3>{t("navbar.projects")}</h3>
      <div className="projects-box">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.img} alt={project.name} />
            <div className="project-data">
              <h5>{project.name}</h5>
              <p>{project.description}</p>
              <div className="project-techs">
                {project.techs.map((techId) => {
                  const tech = skillsMap[techId];
                  return (
                    <div key={techId} className="tech-icon">
                      {iconMap[tech.name]}
                    </div>
                  );
                })}
              </div>
              <div className="btts">
                {project.urls.view && (
                  <a href={project.urls.view} target="_blank" rel="noopener noreferrer">
                    <button className="btn">
                      {t('projects.btn-view')}
                    </button>
                  </a>
                )}
                {project.urls.code && (
                  <a href={project.urls.code} target="_blank" rel="noopener noreferrer">
                    <button className="btn">
                      {t('projects.btn-code')}
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;