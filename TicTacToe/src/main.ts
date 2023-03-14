import './style.css';

const { body } = document as Document;

const $table = document.createElement('table') as HTMLTableElement;
const $result = document.createElement('div') as HTMLDivElement;

let turn = '😼';
const rows: HTMLTableCellElement[][] = [];

function checkFilledBlock(event: Event) {
  // 칸에 글자가 있나?
  if ((event.target as HTMLTableCellElement).textContent) {
    alert('이미 선택된 칸입니다.');
    return;
  }
  (event.target as HTMLTableCellElement).textContent = turn;
  // 차례 넘기기
  turn = turn === '😼' ? '🐶' : '😼';
}

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr') as HTMLTableRowElement;
  const cells = [];

  for (let k = 0; k < 3; k++) {
    const $td = document.createElement('td') as HTMLTableCellElement;
    cells.push($td);
    // 이벤트 버블링을 막고 싶다면
    // $td.addEventListener('click', (event: Event) => {
    //   event.stopPropagation();
    // });
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}

$table.addEventListener('click', checkFilledBlock);
body.append($table);
body.append($result);
