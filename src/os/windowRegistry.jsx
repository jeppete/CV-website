import Terminal from '../terminal/Terminal'
import AboutApp from '../apps/AboutApp'
import ExperienceApp from '../apps/ExperienceApp'
import EducationApp from '../apps/EducationApp'
import SkillsApp from '../apps/SkillsApp'
import VolunteerApp from '../apps/VolunteerApp'
import ContactApp from '../apps/ContactApp'
import ChatApp from '../apps/ChatApp'
import VaultApp from '../apps/VaultApp'

export const windowRegistry = {
  terminal: Terminal,
  about: AboutApp,
  experience: ExperienceApp,
  education: EducationApp,
  skills: SkillsApp,
  volunteer: VolunteerApp,
  contact: ContactApp,
  chat: ChatApp,
  vault: VaultApp,
}
