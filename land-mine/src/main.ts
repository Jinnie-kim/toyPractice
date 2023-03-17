import './style.css';
import { CodeType } from './mineType';

const $tbody = document.querySelector('#table tbody') as HTMLTableElement;
const $result = document.querySelector('#result') as HTMLDivElement;

const row = 10; // 줄
const cell = 10; // 칸
const mine = 10;

const CODE: CodeType = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, // 0 이상이면 모두 열린 칸
};

let data;

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

function drawTable() {
  data = plantMine();

  // 이차원 배열 만들기
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        $td.textContent = 'X'; // 개발 편의를 위해, production에서는 지우거나 주석처리
      }
      $tr.append($td);
    });
    $tbody.append($tr);
  });
}

drawTable();
