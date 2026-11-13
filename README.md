# Shillong Diaries

A romantic trip diary and monthly anniversary site, built with React and Vite.

## Run it on your computer
You need Node.js 18 or newer (https://nodejs.org).

    npm install
    npm run dev

Open the address it prints (usually http://localhost:5173). Tap the envelope seal to start.

## Deploy on Vercel
Option A, from GitHub (easiest):
1. Create a GitHub repository and push this folder to it.
2. On vercel.com choose Add New, Project, and import the repository.
3. Vercel detects Vite by itself. Leave the defaults (build command `npm run build`, output `dist`) and press Deploy.

Option B, from your computer:

    npm install -g vercel
    vercel

Accept the defaults when asked. Run `vercel --prod` to publish the final link.

## Make a production build yourself

    npm run build

The finished static site is in `dist/`. You can upload that folder to any host.

## Change things
- src/config.js          her name, your name, first anniversary date, song list
- src/data/content.js    chapters, photo captions, quiz, coupons, monthly notes, letter
- public/img             photos
- public/audio           until-i-find-you.mp3 and tum-se-hi.mp3 (keep these file names)
- src/styles.css         all styling

To show "this is our month N" on the home page, set startDate in src/config.js, for example "2026-03-15".

## Structure
- src/App.jsx                  page layout, music, lightbox, hidden-heart state
- src/FxLayer.jsx, src/fx/     falling petals, bursts and confetti on a canvas
- src/hooks/                   useMusic (two songs, mute), useCountdown
- src/components/              Gate, TopBar, Hero, Letter, Chapters, Games (games/), Cake, Months, Finale
