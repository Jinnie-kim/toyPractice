import './style.css';

const { body } = document as Document;

const $table = document.createElement('table') as HTMLTableElement;
const $result = document.createElement('div') as HTMLDivElement;

let turn = '😼';
const rows: HTMLTableCellElement[][] = [];

let rowIndex: number;
let cellIndex: number;

// [
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
// ]

function checkWinner(target: EventTarget) {
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  // 세칸 모두 채워졌는가?
  let hasWinner: boolean = false;

  console.log(rows[rowIndex][0]);
  console.log(rows[rowIndex][1]);
  console.log(rows[rowIndex][2]);

  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
}

function checkFilledBlock(event: Event) {
  // 칸에 글자가 있나?
  if ((event.target as HTMLTableCellElement).textContent) {
    alert('이미 선택된 칸입니다.');
    return;
  }
  (event.target as HTMLTableCellElement).textContent = turn;

  // 승부 판별하기
  if (checkWinner(event.target as HTMLTableCellElement)) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', checkFilledBlock);
    return;
  }
  // 무승부 검사
  let draw = true;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.textContent) {
        draw = false;
      }
    });
  });
  if (draw) {
    $result.textContent = '무승부';
    return;
  }
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
