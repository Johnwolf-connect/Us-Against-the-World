# Us Against the World — mobile game prototype

Next.js App Router prototype for the physical-War + digital challenge-card game.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` on a phone-sized browser window.

## Current gameplay wired

- Team setup + random persistent team icons
- Physical War winner selection (the app never deals or scores playing cards)
- Man / Woman challenge choice
- Independent non-repeating challenge decks
- Turn-based challenges with ACCEPT / TAKE A SHOT
- Active challenges tracked on the team/player and automatically removed after their turn count
- Special-condition owner-win challenges supported
- Random IT'S A SECRET interruption after a team has already won once (15% eligible roll, 3-hand global cooldown)
- Eight Safe From Taking a Shot artworks mixed into normal card selection, maximum 2 stored per team
- Saved Safe cards can be spent when the team is about to take a shot
- Thirteen random shot-consequence artworks
- PLAY THE NEXT HAND artwork returns to WHO WON THE HAND

Players remain responsible for judging performances and enforcing drinks.

## Verification note

Source JSX and helper JavaScript were syntax-parsed successfully in the build environment. Full `next build` could not be run here because package installation timed out on external package-network access.
