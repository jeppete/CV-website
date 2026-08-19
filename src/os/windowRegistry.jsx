import Terminal from '../terminal/Terminal'
import AboutApp from '../apps/AboutApp'
import ExperienceApp from '../apps/ExperienceApp'
import EducationApp from '../apps/EducationApp'
import SkillsApp from '../apps/SkillsApp'
import VolunteerApp from '../apps/VolunteerApp'
import ContactApp from '../apps/ContactApp'

export const windowRegistry = {
  terminal: Terminal,
  about: AboutApp,
  experience: ExperienceApp,
  education: EducationApp,
  skills: SkillsApp,
  volunteer: VolunteerApp,
  contact: ContactApp,
}
