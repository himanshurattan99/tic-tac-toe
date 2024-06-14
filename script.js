const cells = document.getElementsByClassName('cell');
const cellValues = document.getElementsByClassName('cellValue');
const infoDiv = document.getElementById('info');
const resetButton = document.getElementById('resetButton');

let turn = 'X';

const checkWin = () => {
    const winStates = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < 8; i++) {
        const [a, b, c] = winStates[i];
        const [aValue, bValue, cValue] = [cellValues[a].innerHTML, cellValues[b].innerHTML, cellValues[c].innerHTML];

        if (aValue !== '' && aValue === bValue && bValue === cValue) {
            return true;
        }
    }

    return false;
}

const play = (event) => {
    infoDiv.innerHTML = `Play`;
    const index = Array.from(cells).indexOf(event.currentTarget);

    if (cellValues[index].innerHTML === '') {
        cellValues[index].innerHTML = turn;

        if (checkWin()) {
            infoDiv.innerHTML = `${turn} wins the game`;

            for (let i = 0; i < 9; i++) {
                cells[i].removeEventListener('click', play);
            }
        }

        turn = (turn === 'X') ? 'O' : 'X';
    }
    else {
        infoDiv.innerHTML = 'Spot Already Filled!!!';
    }
}

const start = () => {
    for (let i = 0; i < 9; i++) {
        cells[i].addEventListener('click', play);
    }
}

resetButton.addEventListener('click', () => {
    for (let i = 0; i < 9; i++) {
        cellValues[i].innerHTML = '';
    }

    infoDiv.innerHTML = 'Play';
    start();
});

start();