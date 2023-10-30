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


const crossCircleWidth = 56;
const crossCircleHeight = 56;
let currentPlayer = 'cross';


function init(){
    render();
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
    }
}

// Alternative Schreibweise für die cellClick() IF / ELSE Schreibweise; Die Zeile 4 dieser Funktion sagt das gleiche aus wie eine IF / ELSE Funktion

// function cellClick(index) {
//     if (fields[index] === null) {
//         fields[index] = currentPlayer;
//         currentPlayer = (currentPlayer === 'cross') ? 'circle' : 'cross';
//         renderCell(index);
//     }
// }


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