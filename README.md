# Rule Guessing Game

A small party-game web app: draw a random secret rule to follow (talk in a new accent every time your name is called, stop speaking English, and so on) while the others try to guess it. Built with Node.js, Express and EJS.

## Features
- 29 rules, each with optional flavour text
- Filter by how you're playing: in person or on a voice call
- Reroll button for a new rule
- Rules are written in `rules-entry.js` and compiled to `data/rules.json` when the app starts

## Tech
Node.js, Express 5, EJS, Tailwind CSS (browser build)

## Run it
Requires Node.js 18 or newer.

```bash
git clone https://github.com/Aoof/rules-guessing-game.git
cd rules-guessing-game
npm install
npm start
```

Open http://localhost:3032.

For development, `npm run dev` restarts the server with nodemon when files change.

## Add your own rules
Add a line to `rules-entry.js`:

```js
rules.push(new Rule("You can only answer questions with another question", ["in-person", "voice-only"]));
```

Tags decide which mode a rule appears in: `in-person`, `voice-only`, and `non-constant` for rules that only apply at certain moments. Restart the app to rebuild `data/rules.json`.

## API
`GET /get-rule?tags=in-person,voice-only` returns a random rule that has every listed tag.

## Author
Abdulrahman (Aoof) Mousa · [aoof.ca](https://aoof.ca)
