/* Tic Tac Toe — vanilla JS game logic */
(function () {
    'use strict';

    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetBtn = document.getElementById('reset');
    const resetStatsBtn = document.getElementById('resetStats');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const scoreD = document.getElementById('scoreD');
    const modeHumanBtn = document.getElementById('modeHuman');
    const modeAiBtn = document.getElementById('modeAi');
    const difficultyEl = document.getElementById('difficulty');
    const diffBtns = document.querySelectorAll('.diff-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let vsComputer = false;
    let difficulty = 'easy';
    let scores = { X: 0, O: 0, D: 0 };

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const statusText = (player) => `Player <span class="turn-${player.toLowerCase()}">${player}'s</span> Turn`;

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedIndex = parseInt(clickedCell.getAttribute('data-index'), 10);

        if (gameBoard[clickedIndex] !== '' || !gameActive) return;

        updateCell(clickedCell, clickedIndex);
        checkResult();
    }

    function updateCell(cell, index) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.disabled = true;
    }

    function checkResult() {
        let roundWon = false;
        let winningCombo = null;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') continue;
            if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                roundWon = true;
                winningCombo = winningConditions[i];
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = `Player <strong>${currentPlayer}</strong> Wins!`;
            statusDisplay.classList.add('winner');
            gameActive = false;
            highlightWinningCombo(winningCombo);
            incrementScore(currentPlayer);
            disableAllCells();
            return;
        }

        if (!gameBoard.includes('')) {
            statusDisplay.textContent = "It's a Draw!";
            gameActive = false;
            incrementScore('D');
            return;
        }

        changePlayer();

        if (vsComputer && gameActive && currentPlayer === 'O') {
            setTimeout(computerMove, 450);
        }
    }

    function highlightWinningCombo(combo) {
        combo.forEach((i) => cells[i].classList.add('win'));
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = statusText(currentPlayer);
    }

    function disableAllCells() {
        cells.forEach((cell) => (cell.disabled = true));
    }

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        statusDisplay.innerHTML = statusText('X');
        statusDisplay.classList.remove('winner');

        cells.forEach((cell) => {
            cell.textContent = '';
            cell.disabled = false;
            cell.classList.remove('x', 'o', 'win');
        });
    }

    function incrementScore(winner) {
        if (winner === 'X') { scores.X++; scoreX.textContent = scores.X; }
        else if (winner === 'O') { scores.O++; scoreO.textContent = scores.O; }
        else { scores.D++; scoreD.textContent = scores.D; }
    }

    function resetStats() {
        scores = { X: 0, O: 0, D: 0 };
        scoreX.textContent = '0';
        scoreO.textContent = '0';
        scoreD.textContent = '0';
        resetGame();
    }

    /* ---- Computer opponent ---- */
    function computerMove() {
        const move = chooseMove();
        if (move === null) return;
        updateCell(cells[move], move);
        checkResult();
    }

    function chooseMove() {
        const empty = gameBoard
            .map((v, i) => (v === '' ? i : null))
            .filter((v) => v !== null);

        if (empty.length === 0) return null;

        if (difficulty === 'easy') {
            return empty[Math.floor(Math.random() * empty.length)];
        }

        if (difficulty === 'medium') {
            // 50% chance to play a winning move, otherwise random
            const win = findWinningMove('O');
            if (win !== null && Math.random() < 0.5) return win;
            return empty[Math.floor(Math.random() * empty.length)];
        }

        // Hard: minimax, block X, otherwise win
        const win = findWinningMove('O');
        if (win !== null) return win;
        const block = findWinningMove('X');
        if (block !== null) return block;
        return empty[Math.floor(Math.random() * empty.length)];
    }

    function findWinningMove(player) {
        for (const combo of winningConditions) {
            const [a, b, c] = combo;
            const vals = [gameBoard[a], gameBoard[b], gameBoard[c]];
            const emptyIdx = vals.indexOf('');
            if (emptyIdx === -1) continue;
            const others = vals.filter((v) => v !== '');
            if (others.length === 2 && others.every((v) => v === player)) {
                return combo[emptyIdx];
            }
        }
        return null;
    }

    /* ---- Mode / difficulty UI ---- */
    function setMode(mode) {
        vsComputer = mode === 'ai';
        modeHumanBtn.classList.toggle('active', !vsComputer);
        modeAiBtn.classList.toggle('active', vsComputer);
        difficultyEl.hidden = !vsComputer;
        diffBtns.forEach((b) => b.classList.toggle('active', b.dataset.level === difficulty));
        resetGame();
    }

    function setDifficulty(level) {
        difficulty = level;
        diffBtns.forEach((b) => b.classList.toggle('active', b.dataset.level === level));
    }

    /* ---- Events ---- */
    cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
    resetStatsBtn.addEventListener('click', resetStats);
    modeHumanBtn.addEventListener('click', () => setMode('human'));
    modeAiBtn.addEventListener('click', () => setMode('ai'));
    diffBtns.forEach((b) => b.addEventListener('click', () => setDifficulty(b.dataset.level)));

    statusDisplay.innerHTML = statusText('X');
})();