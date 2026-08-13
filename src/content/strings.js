// UI strings in both locales, keyed flat. Content itself lives in cv.js.

export const strings = {
  'os.name': { no: 'JeppeOS', en: 'JeppeOS' },
  'os.version': { no: 'v1.0', en: 'v1.0' },

  'app.terminal': { no: 'Terminal', en: 'Terminal' },
  'app.about': { no: 'Om meg', en: 'About' },
  'app.experience': { no: 'Erfaring', en: 'Experience' },
  'app.education': { no: 'Utdanning', en: 'Education' },
  'app.skills': { no: 'Ferdigheter', en: 'Skills' },
  'app.volunteer': { no: 'Verv', en: 'Volunteer work' },
  'app.contact': { no: 'Kontakt', en: 'Contact' },
  'app.chat': { no: 'Spør Jeppe', en: 'Ask Jeppe' },

  'window.close': { no: 'Lukk vindu', en: 'Close window' },
  'dock.label': { no: 'Apper', en: 'Apps' },
  'lang.toggle': { no: 'Bytt språk', en: 'Switch language' },
  'theme.toggle': { no: 'Bytt tema', en: 'Switch theme' },
  'theme.dark': { no: 'mørk', en: 'dark' },
  'theme.light': { no: 'lys', en: 'light' },

  'term.welcome1': { no: 'Velkommen til JeppeOS 1.0 — CV til Jeppe Evensen Thy.', en: "Welcome to JeppeOS 1.0 — Jeppe Evensen Thy's CV." },
  'term.welcome2': { no: "Skriv 'help' for kommandoer, eller bruk dokken nederst.", en: "Type 'help' to list commands, or use the dock below." },
  'term.placeholder': { no: 'skriv en kommando …', en: 'type a command …' },
  'term.inputLabel': { no: 'Terminalkommando', en: 'Terminal command' },
  'term.notfound': { no: "jsh: kommando ikke funnet: %s — prøv 'help'", en: "jsh: command not found: %s — try 'help'" },
  'term.completions': { no: 'muligheter:', en: 'possibilities:' },

  'cmd.help': { no: 'vis denne hjelpen', en: 'show this help' },
  'cmd.whoami': { no: 'hvem er Jeppe?', en: 'who is Jeppe?' },
  'cmd.experience': { no: 'åpne arbeidserfaring', en: 'open work experience' },
  'cmd.education': { no: 'åpne utdanning', en: 'open education' },
  'cmd.skills': { no: 'åpne ferdigheter', en: 'open skills' },
  'cmd.volunteer': { no: 'åpne verv', en: 'open volunteer work' },
  'cmd.contact': { no: 'åpne kontaktinfo', en: 'open contact info' },
  'cmd.open': { no: 'åpne et vindu: open <app>', en: 'open a window: open <app>' },
  'cmd.ls': { no: 'list tilgjengelige apper', en: 'list available apps' },
  'cmd.lang': { no: 'bytt språk: lang no|en', en: 'switch language: lang no|en' },
  'cmd.neofetch': { no: 'systeminfo', en: 'system info' },
  'cmd.theme': { no: 'bytt tema: theme dark|light', en: 'switch theme: theme dark|light' },
  'cmd.chat': { no: 'spør AI-assistenten om Jeppe', en: 'ask the AI assistant about Jeppe' },
  'cmd.clear': { no: 'tøm terminalen', en: 'clear the terminal' },

  'lang.usage': { no: 'bruk: lang no | lang en (nå: %s)', en: 'usage: lang no | lang en (current: %s)' },
  'lang.set.no': { no: 'Språk satt til norsk.', en: 'Språk satt til norsk.' },
  'lang.set.en': { no: 'Language set to English.', en: 'Language set to English.' },

  'theme.usage': { no: 'bruk: theme dark | theme light (nå: %s)', en: 'usage: theme dark | theme light (current: %s)' },
  'theme.set.dark': { no: 'Tema: mørk CRT.', en: 'Theme: dark CRT.' },
  'theme.set.light': { no: 'Tema: lys papirmodus.', en: 'Theme: light paper mode.' },

  'open.usage': { no: 'bruk: open <app> — se \'ls\'', en: "usage: open <app> — see 'ls'" },
  'open.unknown': { no: 'fant ikke appen: %s', en: 'no such app: %s' },
  'open.opened': { no: 'åpner %s …', en: 'opening %s …' },

  'sudo.denied': {
    no: 'jeppe er ikke i sudoers-filen. Hendelsen blir rapportert.',
    en: 'jeppe is not in the sudoers file. This incident will be reported.',
  },
  'exit.denied': {
    no: 'Godt forsøk. Ingen slipper ut av JeppeOS.',
    en: 'Nice try. There is no escape from JeppeOS.',
  },

  'boot.skip': { no: 'trykk en tast for å hoppe over', en: 'press any key to skip' },
  'boot.enter': { no: 'Start JeppeOS', en: 'Boot JeppeOS' },

  'about.age': { no: 'Alder', en: 'Age' },
  'about.location': { no: 'Bosted', en: 'Based in' },
  'about.factsLabel': { no: 'Nøkkelinfo', en: 'Quick facts' },

  'contact.email': { no: 'E-post', en: 'Email' },
  'contact.location': { no: 'Sted', en: 'Location' },

  'chat.intro': {
    no: 'Hei! Jeg er JeppeOS-assistenten. Spør meg om Jeppes erfaring, utdanning eller ferdigheter — jeg svarer kun ut fra CV-en hans.',
    en: "Hi! I'm the JeppeOS assistant. Ask me about Jeppe's experience, education or skills — I only answer from his CV.",
  },
  'chat.disclaimer': {
    no: 'AI-assistent · svarer kun fra Jeppes CV',
    en: "AI assistant · answers only from Jeppe's CV",
  },
  'chat.placeholder': { no: 'skriv et spørsmål …', en: 'ask a question …' },
  'chat.inputLabel': { no: 'Melding til assistenten', en: 'Message to the assistant' },
  'chat.send': { no: 'Send', en: 'Send' },
  'chat.thinking': { no: 'tenker …', en: 'thinking …' },
  'chat.error': {
    no: 'Beklager, noe gikk galt. Prøv igjen.',
    en: 'Sorry, something went wrong. Please try again.',
  },
  'chat.retry': { no: 'Prøv igjen', en: 'Retry' },
  'chat.notConfigured': {
    no: 'Assistenten er ikke tilgjengelig i dette miljøet ennå.',
    en: "The assistant isn't available in this environment yet.",
  },
  'chat.suggest1': { no: 'Hva jobber Jeppe med nå?', en: 'What is Jeppe working on now?' },
  'chat.suggest2': { no: 'Fortell om utdanningen hans', en: 'Tell me about his education' },
  'chat.suggest3': { no: 'Hvilke ferdigheter har han?', en: 'What are his skills?' },

  'edu.thesisNow': { no: 'pågår', en: 'in progress' },

  'neofetch.os': { no: 'OS', en: 'OS' },
  'neofetch.host': { no: 'Vert', en: 'Host' },
  'neofetch.kernel': { no: 'Kjerne', en: 'Kernel' },
  'neofetch.kernelValue': { no: 'politi → cybersikkerhet', en: 'police → cybersecurity' },
  'neofetch.uptime': { no: 'Oppetid', en: 'Uptime' },
  'neofetch.uptimeValue': { no: '27 år', en: '27 years' },
  'neofetch.shell': { no: 'Skall', en: 'Shell' },
  'neofetch.locale': { no: 'Språk', en: 'Locale' },
  'neofetch.packages': { no: 'Pakker', en: 'Packages' },
  'neofetch.packagesValue': { no: 'fullstack, sikkerhet, ledelse', en: 'fullstack, security, leadership' },
}

export const bootLines = [
  { no: 'JeppeOS BIOS v1.0 — initialiserer …', en: 'JeppeOS BIOS v1.0 — initializing …' },
  { no: 'Minnetest: 640K OK (mer enn nok for en CV)', en: 'Memory check: 640K OK (plenty for a CV)' },
  { no: 'Laster kjerne: politi → cybersikkerhet', en: 'Loading kernel: police → cybersecurity' },
  { no: 'Monterer /erfaring … OK', en: 'Mounting /experience … OK' },
  { no: 'Monterer /utdanning … OK', en: 'Mounting /education … OK' },
  { no: 'Starter jsh …', en: 'Starting jsh …' },
]

export const asciiLogo = String.raw`     ██╗███████╗██████╗ ██████╗ ███████╗ ██████╗ ███████╗
     ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔════╝
     ██║█████╗  ██████╔╝██████╔╝█████╗  ██║   ██║███████╗
██   ██║██╔══╝  ██╔═══╝ ██╔═══╝ ██╔══╝  ██║   ██║╚════██║
╚█████╔╝███████╗██║     ██║     ███████╗╚██████╔╝███████║
 ╚════╝ ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝ ╚══════╝`
