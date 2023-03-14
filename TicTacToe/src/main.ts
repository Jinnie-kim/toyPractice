import './style.css';

const { body, createElement } = document as Document;

const $table = document.createElement('table') as HTMLTableElement;
const $result = document.createElement('div') as HTMLDivElement;

let turn = '😼';
const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]);
}

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr') as HTMLTableRowElement;
  for (let k = 0; k < 3; k++) {
    const $td = document.createElement('td') as HTMLTableCellElement;
    $td.addEventListener('click', (event: Event) => {
      // 칸에 글자가 있나?
      if ((event.currentTarget as HTMLTableCellElement).textContent) {
        return;
      } else {
        (event.currentTarget as HTMLTableCellElement).textContent = turn;
      }

      // 차례 넘기기
      if (turn === '😼') {
        turn = '🐶';
      } else if (turn === '🐶') {
        turn = '😼';
      }
    });
    $tr.append($td);
  }
  $table.append($tr);
}

body.append($table);
body.append($result);
