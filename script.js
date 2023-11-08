let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const crossCircleWidth = 56;
const crossCircleHeight = 56;
let currentPlayer = 'cross';


function init(){
    render();
}


function checkGameEnd() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Das Spiel ist beendet, es gibt einen Gewinner
            drawWinningLine(combination);
            return true;
        }
    }
    // Überprüfen, ob es ein Unentschieden gibt
    if (!fields.includes(null)) {
        // Das Spiel endet unentschieden
        return true;
    }
    return false;
}


function render() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Leeren des Inhalts des "content" Elements

    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            tableHTML += '<td onclick="cellClick(' + (i * 3 + j) + ')">';
            const index = i * 3 + j;
            if (fields[index] === 'cross') {
                tableHTML += generateCrossSVG();
            } else if (fields[index] === 'circle') {
                tableHTML += generateCircleSVG();
            }
            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table';

    content.innerHTML = tableHTML;
}


function cellClick(index) {
    if (fields[index] === null) {
        if (currentPlayer === 'cross') {
            fields[index] = 'cross';
            currentPlayer = 'circle';
        } else {
            fields[index] = 'circle';
            currentPlayer = 'cross';
        }
        renderCell(index);

        // Nach jedem Zug überprüfen, ob das Spiel vorbei ist
        if (checkGameEnd()) {
            // Hier kannst du weitere Aktionen ausführen, z.B. das Spiel neu starten oder eine Meldung anzeigen
            console.log('Das Spiel ist beendet.');
        }
    }
}


function renderCell(index) {
    const cell = document.getElementsByTagName('td')[index];

    if (fields[index] === 'cross') {
        cell.innerHTML = generateCrossSVG();
    } else if (fields[index] === 'circle') {
        cell.innerHTML = generateCircleSVG();
    }
    
    // Entferne das onclick-Attribut, um weitere Klicks zu verhindern
    cell.removeAttribute('onclick');
}


function generateCrossSVG() {
    const color = '#FFC000';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${crossCircleWidth}" height="${crossCircleHeight}" viewBox="0 0 56 56">
    <line x1="0" y1="0" x2="56" y2="56" stroke="${color}" stroke-width="4">
      <animate attributeName="stroke-dasharray" from="0" to="224" dur="1s" begin="0s" fill="freeze" />
    </line>
    <line x1="56" y1="0" x2="0" y2="56" stroke="${color}" stroke-width="4">
      <animate attributeName="stroke-dasharray" from="0" to="224" dur="1s" begin="0s" fill="freeze" />
    </line>
  </svg>`;
}


function generateCircleSVG() {
    const color = '#00B0EF';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${crossCircleWidth}" height="${crossCircleHeight}" viewBox="0 0 56 56">
    <circle cx="28" cy="28" r="25" fill="transparent" stroke="${color}" stroke-width="5">
      <animate attributeName="r" from="0" to="25" dur="250ms" begin="0s" fill="freeze" />
      <animate attributeName="stroke-dasharray" from="0 157" to="157 157" dur="250ms" begin="0s" fill="freeze" />
    </circle>
  </svg>`;
}


function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);

    const tdElements = document.querySelectorAll('td');
    for (const td of tdElements) {
        td.removeAttribute('onclick');
    }
}


function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    render();
}