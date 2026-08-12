// Single source of truth for all CV content, in both locales.
// Every human-readable field is a { no, en } pair; structural fields are plain.

export const profile = {
  name: 'Jeppe Evensen Thy',
  age: 26, // update yearly (birth date not public in the CV)
  location: { no: 'København, Danmark', en: 'Copenhagen, Denmark' },
  title: {
    no: 'MSc-student i Computer Science ved DTU · CTO i Barcoa',
    en: 'MSc Computer Science student at DTU · CTO at Barcoa',
  },
  email: 'jeppethy@outlook.com',
  phone: '+47 467 81 510',
  phoneHref: 'tel:+4746781510',
  linkedin: 'https://www.linkedin.com/in/jeppe-thy/',
  github: 'https://github.com/jeppete',
  about: {
    no: [
      'Jeg har tatt en litt uvanlig vei inn i teknologien. Jeg startet med en bachelor på Politihøgskolen og jobbet som politibetjent, før jeg byttet spor og tok en bachelor i digital infrastruktur og cybersikkerhet ved NTNU. Ved siden av studiene jobbet jeg deltid som fengselsbetjent.',
      'Nå bor jeg i København, hvor jeg tar en master i Computer Science and Engineering ved DTU — ved siden av rollene som CTO i Barcoa og fullstack-utvikler i Legid.',
    ],
    en: [
      "I took an unusual route into tech. I started with a bachelor's degree at the Norwegian Police University College and worked as a police officer, before switching tracks to a BSc in digital infrastructure and cybersecurity at NTNU — working part-time as a prison officer alongside my studies.",
      'I now live in Copenhagen, pursuing an MSc in Computer Science and Engineering at DTU — alongside my roles as CTO at Barcoa and full-stack developer at Legid.',
    ],
  },
}

export const experience = [
  {
    id: 'barcoa',
    role: { no: 'CTO', en: 'CTO' },
    org: 'Barcoa',
    location: { no: 'København, Danmark', en: 'Copenhagen, Denmark' },
    start: '2025-10',
    end: null,
    summary: {
      no: 'Teknisk ansvarlig. Leder produktutviklingen og eier valg av arkitektur og teknologi.',
      en: 'Technical lead — driving product development and owning architecture and technology decisions.',
    },
    tags: ['leadership', 'architecture', 'fullstack'],
  },
  {
    id: 'legid',
    role: { no: 'Fullstack-utvikler, deltid', en: 'Full-stack developer, part-time' },
    org: 'Legid',
    location: { no: 'København, Danmark', en: 'Copenhagen, Denmark' },
    start: '2025-10',
    end: null,
    summary: {
      no: 'Utvikler et saksbehandlingssystem for et advokatfirma.',
      en: 'Building a case-management system for a law firm.',
    },
    tags: ['fullstack', 'web'],
  },
  {
    id: 'devotta',
    role: { no: 'Fullstack-utvikler', en: 'Full-stack developer' },
    org: 'DevOtta',
    location: { no: 'Oslo, Norge', en: 'Oslo, Norway' },
    start: '2025-06',
    end: '2025-08',
    summary: {
      no: 'Summer internship som konsulent innen webutvikling. Jobbet på et bestillingssystem for en stålprodusent.',
      en: 'Summer internship as a web development consultant, working on an ordering system for a steel manufacturer.',
    },
    tags: ['consulting', 'web'],
  },
  {
    id: 'politiets-it',
    role: { no: 'Fullstack-utvikler', en: 'Full-stack developer' },
    org: { no: 'Politiets IT-enhet', en: 'Norwegian Police IT Unit' },
    location: { no: 'Oslo, Norge', en: 'Oslo, Norway' },
    start: '2024-06',
    end: '2024-08',
    summary: {
      no: 'Summer internship. Utviklet en nettapplikasjon for politiet.no som viser informasjon om nødvarsel på mobil.',
      en: 'Summer internship. Built a web application for politiet.no presenting information about mobile emergency alerts.',
    },
    tags: ['web', 'public-sector'],
  },
  {
    id: 'ntnu-kontakt',
    role: { no: 'Studentkontakt, deltid', en: 'Student liaison, part-time' },
    org: 'NTNU',
    location: { no: 'Trondheim, Norge', en: 'Trondheim, Norway' },
    start: '2024-01',
    end: '2025-06',
    summary: {
      no: 'Prosjektbasert stilling med ansvar for flere arrangementer hvert semester — blant annet akademiske konferanser og sosiale sammenkomster.',
      en: 'Project-based role with responsibility for several events each semester, including academic conferences and social gatherings.',
    },
    tags: ['events', 'project-management'],
  },
  {
    id: 'kriminalomsorgen',
    role: { no: 'Fengselsbetjent, tilkallingsvakt', en: 'Prison officer, on-call' },
    org: { no: 'Kriminalomsorgen', en: 'Norwegian Correctional Service' },
    location: { no: 'Trondheim, Norge', en: 'Trondheim, Norway' },
    start: '2023-01',
    end: '2023-09',
    summary: {
      no: 'Tilkallingsvakt ved Trondheim fengsel, en institusjon med rundt 170 innsatte fordelt på ulike avdelinger.',
      en: 'On-call officer at Trondheim prison, an institution with around 170 inmates across multiple units.',
    },
    tags: ['public-sector'],
  },
  {
    id: 'politi-trysil',
    role: { no: 'Politibetjent 1', en: 'Police officer' },
    org: { no: 'Politiet', en: 'Norwegian Police Service' },
    location: { no: 'Trysil, Norge', en: 'Trysil, Norway' },
    start: '2022-06',
    end: '2022-08',
    summary: {
      no: 'Kombinert tjeneste som patruljebetjent og etterforsker.',
      en: 'Combined duty as a patrol officer and investigator.',
    },
    tags: ['police'],
  },
]

export const education = [
  {
    id: 'dtu',
    org: { no: 'Danmarks Tekniske Universitet (DTU)', en: 'Technical University of Denmark (DTU)' },
    degree: {
      no: 'Master i Computer Science and Engineering',
      en: 'MSc in Computer Science and Engineering',
    },
    location: { no: 'København, Danmark', en: 'Copenhagen, Denmark' },
    start: '2025-08',
    end: null,
  },
  {
    id: 'ntnu',
    org: {
      no: 'Norges teknisk-naturvitenskapelige universitet (NTNU)',
      en: 'Norwegian University of Science and Technology (NTNU)',
    },
    degree: {
      no: 'Bachelor i digital infrastruktur og cybersikkerhet',
      en: 'BSc in Digital Infrastructure and Cybersecurity',
    },
    location: { no: 'Trondheim, Norge', en: 'Trondheim, Norway' },
    start: '2022-08',
    end: '2025-06',
  },
  {
    id: 'phs',
    org: { no: 'Politihøgskolen', en: 'Norwegian Police University College' },
    degree: { no: 'Bachelor', en: "Bachelor's degree" },
    location: { no: 'Stavern, Norge', en: 'Stavern, Norway' },
    start: '2019-08',
    end: '2022-06',
  },
]

export const volunteer = [
  {
    id: 'tihlde-leder',
    role: { no: 'Leder for Næringsliv og kurs', en: 'Head of Corporate Relations & Courses' },
    org: { no: 'Studentorganisasjonen TIHLDE', en: 'TIHLDE student organisation' },
    location: { no: 'Trondheim, Norge', en: 'Trondheim, Norway' },
    start: '2023-10',
    end: '2024-10',
    summary: {
      no: 'Ledet gruppen med ansvar for næringslivsrelasjoner og arrangementer. Satt også i hovedstyret til TIHLDE.',
      en: 'Led the group responsible for corporate relations and events. Also served on the TIHLDE executive board.',
    },
  },
  {
    id: 'uka23',
    role: { no: 'Næringslivsarbeider', en: 'Corporate events crew' },
    org: 'UKA-23',
    location: { no: 'Trondheim, Norge', en: 'Trondheim, Norway' },
    start: '2023-09',
    end: '2023-10',
    summary: {
      no: 'Jobbet med bedriftsarrangementer under studentfestivalen UKA.',
      en: 'Worked on corporate events during the UKA student festival.',
    },
  },
  {
    id: 'tihlde-medlem',
    role: { no: 'Medlem, Næringsliv og kurs', en: 'Member, Corporate Relations & Courses' },
    org: { no: 'Studentorganisasjonen TIHLDE', en: 'TIHLDE student organisation' },
    location: { no: 'Trondheim, Norge', en: 'Trondheim, Norway' },
    start: '2022-09',
    end: '2025-06',
    summary: {
      no: 'Del av gruppen med ansvar for næringslivsrelasjoner og arrangementer, før jeg tok over som leder.',
      en: 'Part of the corporate relations group before stepping up as its head.',
    },
  },
]

export const skills = [
  {
    id: 'languages',
    label: { no: 'Språk', en: 'Languages' },
    items: [
      { no: 'JavaScript / TypeScript', en: 'JavaScript / TypeScript' },
      { no: 'Python', en: 'Python' },
      { no: 'SQL', en: 'SQL' },
      { no: 'HTML & CSS', en: 'HTML & CSS' },
    ],
  },
  {
    id: 'web',
    label: { no: 'Web & fullstack', en: 'Web & full-stack' },
    items: [
      { no: 'React', en: 'React' },
      { no: 'Node.js', en: 'Node.js' },
      { no: 'REST-API-er', en: 'REST APIs' },
      { no: 'Git', en: 'Git' },
    ],
  },
  {
    id: 'infra',
    label: { no: 'Infrastruktur & sikkerhet', en: 'Infrastructure & security' },
    items: [
      { no: 'Linux', en: 'Linux' },
      { no: 'Docker', en: 'Docker' },
      { no: 'CI/CD', en: 'CI/CD' },
      { no: 'Nettverk', en: 'Networking' },
      { no: 'Cybersikkerhet', en: 'Cybersecurity' },
    ],
  },
  {
    id: 'professional',
    label: { no: 'Profesjonelt', en: 'Professional' },
    items: [
      { no: 'Ledelse', en: 'Leadership' },
      { no: 'Prosjektledelse', en: 'Project management' },
      { no: 'Formidling', en: 'Communication' },
    ],
  },
]

const MONTHS = {
  no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}
const NOW = { no: 'nå', en: 'now' }

function formatMonth(iso, locale) {
  const [year, month] = iso.split('-')
  return `${MONTHS[locale][Number(month) - 1]} ${year}`
}

export function formatRange(start, end, locale) {
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : NOW[locale]}`
}
