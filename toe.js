const XcLASS = 'playerX';
const OcLASS = 'playerO';
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//console.log(winningCombos)

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningMessageElement = document.getElementById('winning-message');
let winningMessage = document.querySelector('[data-message]');
let OtURN;
launchGame()

restartButton.addEventListener('click', launchGame)

function launchGame() {
    OtURN = false;
    cellElements.forEach(cell => {
        cell.classList.remove(XcLASS);
        cell.classList.remove(OcLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
};

function handleClick(e) {
    const cell = e.target;
    const currentClass = OtURN ? OcLASS : XcLASS;
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        finishGame(false);
    } else if (isDraw()) {
        finishGame(true);
    } else {
        switchTurns();
        setBoardHoverClass()
    }

}

function finishGame(draw) {
    if (draw) {
        winningMessage.textContent = 'Draw!'
    } else {
        winningMessage.textContent = `${OtURN ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(XcLASS) || cell.classList.contains(OcLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    OtURN = !OtURN
}

function setBoardHoverClass() {
    board.classList.remove(XcLASS);
    board.classList.remove(OcLASS);

    OtURN ? board.classList.add(OcLASS) : board.classList.add(XcLASS);
}

function checkWin(currentClass) {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}