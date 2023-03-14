import './style.css';

const { body } = document as Document;

const $table = document.createElement('table') as HTMLTableElement;
const $result = document.createElement('div') as HTMLDivElement;

let turn = '😼';
const rows: HTMLTableCellElement[][] = [];

// [
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
// ]

function checkWinner(target: EventTarget) {
  const rowBoxIndex = (
    (target as HTMLTableCellElement).parentNode as HTMLTableRowElement
  ).rowIndex;
  const cellBoxIndex = (target as HTMLTableCellElement).cellIndex;

  // 세칸 모두 채워졌는가?
  let hasWinner: boolean = false;

  // 가로줄 검사
  if (
    rows[rowBoxIndex][0].textContent === turn &&
    rows[rowBoxIndex][1].textContent === turn &&
    rows[rowBoxIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellBoxIndex].textContent === turn &&
    rows[1][cellBoxIndex].textContent === turn &&
    rows[2][cellBoxIndex].textContent === turn
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

function checkWinnerAndDraw(target: EventTarget) {
  const hasWinner = checkWinner(target);

  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', checkFilledBlock);
    return;
  }

  // 승자가 없으면
  // 무승부 검사 (2차원 배열을 1차원 배열로 변경)
  const draw = rows.flat().every((cell) => cell.textContent);

  // rows.forEach((row) => {
  //   row.forEach((cell) => {
  //     if (!cell.textContent) {
  //       draw = false;
  //     }
  //   });
  // });

  if (draw) {
    $result.textContent = '무승부';
    return;
  }

  // 차례 넘기기
  turn = turn === '😼' ? '🐶' : '😼';
}

function checkFilledBlock(event: Event) {
  // 칸에 글자가 있나?
  if ((event.target as HTMLTableCellElement).textContent) {
    alert('이미 선택된 칸입니다.');
    return;
  }
  (event.target as HTMLTableCellElement).textContent = turn;

  checkWinnerAndDraw(event.target as HTMLTableCellElement);

  if (turn === '🐶') {
    // 컴퓨터의 턴
    const emptyCells = rows.flat().filter((cell) => !cell.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    setTimeout(() => {
      randomCell.textContent = '🐶';
    }, 1000);

    checkWinnerAndDraw(randomCell);
  }
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
