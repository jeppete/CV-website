// Fictional system artifacts for the CTF easter egg.
// None of this is real log data — it exists only so curious visitors
// can `ls` and `cat` their way through the flag hunt.

export const fakeFiles = {
  'auth.log': [
    'Aug 12 02:47:13 jeppeos sshd[1187]: Failed password for root from 185.220.101.4 port 51334 ssh2',
    'Aug 12 02:47:19 jeppeos sshd[1187]: Failed password for root from 185.220.101.4 port 51338 ssh2',
    'Aug 12 02:48:02 jeppeos sshd[1201]: Failed password for admin from 185.220.101.4 port 51402 ssh2',
    'Aug 12 02:48:40 jeppeos sshd[1214]: Disconnected from invalid user admin 185.220.101.4 port 51477 [preauth]',
    'Aug 12 03:02:55 jeppeos sudo: jeppe : command not allowed ; TTY=pts/0 ; PWD=/home/jeppe ; COMMAND=/usr/bin/su',
    'Aug 12 03:15:01 jeppeos jsh[420]: DEBUG session_token=SkVQUEV7YjRzM182NF8xc19uMHRfM25jcnlwdDEwbn0=',
    'Aug 12 03:15:01 jeppeos jsh[420]: WARN debug logging left on in production',
    'Aug 12 03:20:17 jeppeos sshd[1256]: Failed password for root from 185.220.101.4 port 51660 ssh2',
  ],
  '.bash_history': [
    'ls',
    'cat auth.log',
    'curl jeppe.dev/robots.txt',
    'nano public/env.backup   # TODO: delete this before deploy!!',
    'sudo su',
    'hunter2',
    'scp dump.sql backup-db-01.jeppethy.no:/srv/backups/',
    'history -c',
    'exit',
  ],
}

export const fakeFileNames = Object.keys(fakeFiles)
