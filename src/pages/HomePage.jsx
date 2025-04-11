// src/pages/HomePage.jsx
import HomeSection from '../sections/HomeSection';
import AboutSection from '../sections/AboutSection';
import WorkExperienceSection from '../sections/WorkExperienceSection';
import EducationSection from '../sections/EducationSection';
import VoluntaryWorkSection from '../sections/VoluntaryWorkSection';
import SkillsSection from '../sections/SkillsSection';
import DemoSection from '../sections/DemoSection';
import ContactSection from '../sections/ContactSection';

function HomePage() {
  return (
    <div className="overflow-y-auto">
      <HomeSection />
      <AboutSection />
      <WorkExperienceSection />
      <EducationSection />
      <VoluntaryWorkSection />
      <SkillsSection />
      <DemoSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;