// src/pages/HomePage.jsx
import HomeSection from '../sections/HomeSection';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ContactSection from '../sections/ContactSection';

function HomePage() {
  return (
    <div className="overflow-y-auto">
      <HomeSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;