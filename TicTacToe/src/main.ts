import './style.css';

const { body } = document as Document;

const $table = document.createElement('table') as HTMLTableElement;
const $result = document.createElement('div') as HTMLDivElement;

let turn = '😼';
const rows: HTMLTableCellElement[][] = [];

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr') as HTMLTableRowElement;
  const cells = [];

  for (let k = 0; k < 3; k++) {
    const $td = document.createElement('td') as HTMLTableCellElement;
    cells.push($td);
    $td.addEventListener('click', (event: Event) => {
      // 칸에 글자가 있나?
      if ((event.currentTarget as HTMLTableCellElement).textContent) {
        alert('이미 선택된 칸입니다.');
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
  rows.push(cells);
  $table.append($tr);
}

body.append($table);
body.append($result);
