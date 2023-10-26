let fields = [
    null,
    'cross',
    'circle',
    null,
    null,
    null,
    null,
    null,
    null
];


function init(){
    render();
}


// function render() {
//     const content = document.getElementById('content');
//     const table = document.createElement('table');

//     for (let i = 0; i < 3; i++) {
//         const row = document.createElement('tr');
//         for (let j = 0; j < 3; j++) {
//             const cell = document.createElement('td');
//             const index = i * 3 + j;
//             if (fields[index] === 'cross') {
//                 cell.textContent = 'x';
//             } else if (fields[index] === 'circle') {
//                 cell.textContent = 'o';
//             }
//             row.appendChild(cell);
//         }
//         table.appendChild(row);
//     }

//     content.innerHTML = '';
//     content.appendChild(table);
// }


function render() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Leeren des Inhalts des "content" Elements

    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            tableHTML += '<td>';
            const index = i * 3 + j;
            if (fields[index] === 'cross') {
                tableHTML += 'x';
            } else if (fields[index] === 'circle') {
                tableHTML += 'o';
            }
            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    content.innerHTML = tableHTML;
}