# Tic Tac Toe

A simple, polished Tic Tac Toe game built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Features

- **Two-player mode** — play against a friend on the same device
- **Computer opponent** — three difficulty levels: Easy, Medium, Hard
- **Win detection** — highlights the winning line when a player wins
- **Scoreboard** — tracks wins for X, O, and draws across games
- **Responsive design** — looks good on mobile and desktop
- **Keyboard-friendly** — all controls are buttons with hover/active states

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — modern styling, animations, transitions
- **Vanilla JavaScript (ES6)** — game logic, no dependencies

## How to Run

1. Clone or download the repository
2. Open `index.html` in any modern web browser

Or run a local server (optional):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project Structure

```
tictactoe/
├── index.html      # Main HTML structure
├── css/
│   └── style.css   # All styling
├── js/
│   └── game.js     # Game logic and AI opponent
└── README.md
```

## Controls

- Click any empty cell to place your mark
- **New Game** — reset the board and start a fresh match
- **Reset Stats** — clear the scoreboard
- **Vs Friend / Vs Computer** — switch game mode
- **Difficulty** — only shown when playing the computer

## License

This project is open source. Feel free to fork it and make your own improvements.