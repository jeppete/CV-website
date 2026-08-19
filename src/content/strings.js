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

  // CTF easter egg
  'cmd.flags': { no: 'CTF: vis flaggjakt-fremdrift', en: 'CTF: show flag-hunt progress' },
  'cmd.capture': { no: 'lever et flagg: capture JEPPE{...}', en: 'submit a flag: capture JEPPE{...}' },

  'flags.header': { no: 'CAPTURE THE FLAG — %s flagg fanget', en: 'CAPTURE THE FLAG — %s flags captured' },
  'flags.resetDone': { no: 'Fremdriften er nullstilt.', en: 'Progress cleared.' },

  'flags.name.recon': { no: 'Rekognosering', en: 'Recon' },
  'flags.name.b64': { no: 'Koding ≠ kryptering', en: 'Encoding ≠ encryption' },
  'flags.name.storage': { no: 'Klientside-lagring', en: 'Client-side storage' },
  'flags.name.leak': { no: 'Lekkede påloggingsdetaljer', en: 'Leaked credentials' },
  'flags.name.root': { no: 'Rettighetseskalering', en: 'Privilege escalation' },

  'flags.quip.recon': { no: 'Robotene sladret.', en: 'The robots ratted it out.' },
  'flags.quip.b64': { no: 'Dekodet. atob() hilser.', en: 'Decoded. atob() sends its regards.' },
  'flags.quip.storage': { no: 'Den lå i nettleseren din hele tiden.', en: 'It was sitting in your browser the whole time.' },
  'flags.quip.leak': { no: 'TODO: slett før deploy. Det skjer aldri.', en: 'TODO: delete before deploy. They never do.' },
  'flags.quip.root': { no: 'hunter2. En klassiker.', en: 'hunter2. A classic.' },

  'capture.usage': { no: 'bruk: capture JEPPE{...}', en: 'usage: capture JEPPE{...}' },
  'capture.ok': { no: 'Flagg fanget! (%s)', en: 'Flag captured! (%s)' },
  'capture.dupe': { no: 'Allerede fanget.', en: 'Already captured.' },
  'capture.invalid': { no: 'Feil flagg. Grav videre.', en: 'Incorrect flag. Keep digging.' },
  'capture.alldone1': { no: 'ALLE 5 FLAGG FANGET.', en: 'ALL 5 FLAGS CAPTURED.' },

  'sudo.logged': { no: 'Hendelsen er loggført i auth.log.', en: 'This incident has been logged to auth.log.' },
  'sudo.passreq': { no: 'sudo: passord kreves (bruk: sudo su <passord>)', en: 'sudo: a password is required (usage: sudo su <password>)' },
  'sudo.wrongpass': { no: 'Beklager, prøv igjen.', en: 'Sorry, try again.' },
  'sudo.root1': { no: 'root@jeppeos:~# whoami → root', en: 'root@jeppeos:~# whoami → root' },
  'sudo.root2': { no: 'Alt jeg ser er *******.', en: 'All I see is *******.' },
  'sudo.root3': { no: 'Her er flagget ditt: %s', en: 'Here is your flag: %s' },

  'cat.webroot': {
    no: 'cat: %s serveres fra webroten — åpne den i nettleseren i stedet',
    en: 'cat: %s is served from the web root — open it in your browser instead',
  },
  'printenv.note': {
    no: '# lastet fra nettleserens localStorage (jeppeos.*) — alle kan lese dette',
    en: '# loaded from browser localStorage (jeppeos.*) — anyone can read this',
  },
}

export const bootLines = [
  { no: 'JeppeOS BIOS v1.0 — initialiserer …', en: 'JeppeOS BIOS v1.0 — initializing …' },
  { no: 'Minnetest: 640K OK (mer enn nok for en CV)', en: 'Memory check: 640K OK (plenty for a CV)' },
  { no: 'Laster kjerne: politi → cybersikkerhet', en: 'Loading kernel: police → cybersecurity' },
  { no: 'Monterer /erfaring … OK', en: 'Mounting /experience … OK' },
  { no: 'Monterer /utdanning … OK', en: 'Mounting /education … OK' },
  { no: 'Laster ctf-modul … 5 flagg gjemt', en: 'Loading ctf module … 5 flags hidden' },
  { no: 'Starter jsh …', en: 'Starting jsh …' },
]

export const asciiLogo = String.raw`     ██╗███████╗██████╗ ██████╗ ███████╗ ██████╗ ███████╗
     ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔════╝
     ██║█████╗  ██████╔╝██████╔╝█████╗  ██║   ██║███████╗
██   ██║██╔══╝  ██╔═══╝ ██╔═══╝ ██╔══╝  ██║   ██║╚════██║
╚█████╔╝███████╗██║     ██║     ███████╗╚██████╔╝███████║
 ╚════╝ ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝ ╚══════╝`
