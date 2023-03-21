import './style.css';

const $table = document.getElementById('table') as HTMLTableElement;
const $score = document.getElementById('score') as HTMLDivElement;
let data: number[][] = [];

// $table -> $fragment -> $tr -> $td
function startGame() {
  const $fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    const rowData: number[] = [];
    data.push(rowData); // 2차원 배열
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0); // 각 칸의 숫자를 처음에는 모두 0으로 넣는다.
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell();
  draw();
}

function put2ToRandomCell() {
  const emptyCells: number[][] = []; // 빈 칸들의 정보를 모은다
  data.forEach(function (rowData, i) {
    // i = 몇 번째 줄 ?
    rowData.forEach(function (cellData, j) {
      // j = 몇 번째 칸 ?
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  });
  // randomCell === [i, j]
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j];
      if (cellData > 0) {
        $target.textContent = `${cellData}`;
        $target.className = 'color-' + cellData;
      } else {
        $target.textContent = '';
        $target.className = '';
      }
    });
  });
}

startGame();
