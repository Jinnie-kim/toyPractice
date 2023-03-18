import './style.css';
import { CodeType } from './mineType';

const $tbody = document.querySelector('#table tbody') as HTMLTableElement;
const $result = document.querySelector('#result') as HTMLDivElement;
const $timer = document.querySelector('#timer') as HTMLDivElement;
const $form = document.querySelector('#form') as HTMLFormElement;

let row: number; // 줄
let cell: number; // 칸
let mine: number;
let openCount: number = 0;
let startTime: Date;
let interval: number;

function customMineSetFormSubmit(event: Event) {
  event.preventDefault();
  row = parseInt((event.target as HTMLFormElement).row.value);
  cell = parseInt((event.target as HTMLFormElement).cell.value);
  mine = parseInt((event.target as HTMLFormElement).mine.value);
  $tbody.innerHTML = '';
  $result.textContent = '';
  openCount = 0;
  normalCellFound = false;
  searched = null;
  firstClick = true;
  drawTable();
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    $timer.textContent = `${time}초`;
  }, 1000);
}

$form.addEventListener('submit', customMineSetFormSubmit);

const CODE: CodeType = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, // 0 이상이면 모두 열린 칸
};

let data: number[][];

function plantMine() {
  const candidate = Array(row * cell)
    .fill('') // 타입에러나서 일단 '' 빈 문자열 전달
    .map((_, i) => {
      return i;
    });

  const shuffle = []; // 지뢰 넣을 배열 인덱스 저장
  // 이게 머지? -> 지뢰를 10개 뽑는 공식이네, splice하면 지뢰 뽑힌 것만큼 candidate 배열도 줄어드니까
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data: number[][] = [];

  for (let i = 0; i < row; i++) {
    const rowData: number[] = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL); // 그려진 10 * 10 테이블에 닫힌 칸으로 채워주기
    }
  }

  // shuffle = [85, 19, 93]
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // vertical 85 / 10 = 8번째 줄
    const hor = shuffle[k] % cell; // horizontal 85 % 10 = 5번째 칸
    data[ver][hor] = CODE.MINE;
  }

  return data;
}

function onRightClick(event: Event) {
  event.preventDefault();
  const target = event.target as HTMLTableCellElement;
  const rowIndex = (target.parentNode as HTMLTableRowElement).rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];

  if (cellData === CODE.MINE) {
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로 변경
    target.className = 'question';
    target.textContent = '❓';
  } else if (cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로 변경
    target.className = 'flag';
    target.textContent = '❕';
  } else if (cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로 변경
    target.className = '';
    // target.textContent = '❕'; // 개발 편의를 위해
  } else if (cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = 'question';
    target.textContent = '❓';
  } else if (cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = 'flag';
    target.textContent = '❕';
  } else if (cellData === CODE.FLAG) {
    data[rowIndex][cellIndex] = CODE.NORMAL;
    target.className = '';
    target.textContent = '';
  }
}

function countMine(rowIndex: number, cellIndex: number) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;

  return i;
}

function open(rowIndex: number, cellIndex: number) {
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; // 한 번 열었던 칸은 다시 열지 않도록 방지
  const target = $tbody.children[rowIndex]?.children[cellIndex];
  if (!target) {
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  target.textContent = `${count === 0 ? '' : count}` || '';
  target.className = 'opended';
  data[rowIndex][cellIndex] = count;
  openCount++;
  if (openCount === row * cell - mine) {
    const time = (new Date().getTime() - startTime.getTime()) / 1000;
    clearInterval(interval);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert(`승리했습니다. ${time}초가 걸렸습니다.`);
    }, 500);
    clearInterval(interval);
  }
  return count;
}

function openAround(rI: number, cI: number) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}

let normalCellFound = false;
let searched: boolean[][] | null;
let firstClick = true;

function transferMine(rI: number, cI: number) {
  if (normalCellFound) return; // 이미 빈칸을 찾았으면 종료
  if (rI < 0 || rI > row || cI < 0 || cI >= cell) return;
  if (searched !== null && searched[rI][cI]) return; // 이미 찾은 칸이면 종료
  if (data[rI][cI] === CODE.NORMAL) {
    // 빈칸인 경우
    normalCellFound = true;
    data[rI][cI] = CODE.MINE;
  } else {
    // 지뢰 칸인 경우 8방향 탐색
    if (searched === null) return;
    searched[rI][cI] = true;
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
    transferMine(rI + 1, cI + 1);
  }
}

function showMines() {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) $tbody.children[rowIndex].children[cellIndex].textContent = '❕';
    });
  });
}

function onLeftClick(event: Event) {
  const target = event.target as HTMLTableCellElement;
  const rowIndex = (target.parentNode as HTMLTableRowElement).rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];

  if (firstClick) {
    firstClick = false;
    searched = Array(row)
      .fill('')
      .map(() => []);
    if (cellData === CODE.MINE) {
      // 첫 클릭이 지뢰면
      transferMine(rowIndex, cellIndex);
      data[rowIndex][cellIndex] = CODE.NORMAL;
      cellData = CODE.NORMAL;
    }
  }

  if (cellData === CODE.NORMAL) {
    openAround(rowIndex, cellIndex);
    // const count = countMine(rowIndex, cellIndex);
    // target.textContent = `${count}` || '';
    // target.className = 'opended';
    // data[rowIndex][cellIndex] = count;
  } else if (cellData === CODE.MINE) {
    // 지뢰
    showMines();
    target.textContent = '💥';
    target.className = 'opended';
    $result.textContent = '지뢰를 밟았습니다.';
    clearInterval(interval);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    clearInterval(interval);
  }
  // 나머지는 무시
}

function drawTable() {
  data = plantMine();

  // 이차원 배열 만들기
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        // $td.textContent = '❕'; // 개발 편의를 위해, production에서는 지우거나 주석처리
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}
