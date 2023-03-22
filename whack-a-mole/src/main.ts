import './style.css';

const $timer = document.querySelector('#timer') as HTMLSpanElement;
const $score = document.querySelector('#score') as HTMLSpanElement;
const $game = document.querySelector('#game') as HTMLDivElement;
const $start = document.querySelector('#start') as HTMLButtonElement;
const $$cells = document.querySelectorAll('.cell');

// setTimeout timer id들이 저장되고 있음
// 두더지나 폭탄을 잡았을 때 timer를 취소해주기 위해서 id를 저장한다.
const holes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started: boolean = false; // flag 변수
let score: number = 0;

$start.addEventListener('click', () => {
  if (started) return; // 이미 시작했으면 무시
  started = true;
  console.log('시작');
  const tickId = setInterval(tick, 1000);
  tick();
});

let gopherPercent: number = 0.3;
let bombPercent: number = 0.5; // 누적확률

function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const randomValue = Math.random();
    if (Math.random() < gopherPercent) {
      const $gopher = $$cells[index].querySelector('.gopher') as HTMLDivElement;
      // 그 다음 실행
      holes[index] = setTimeout(() => {
        $gopher.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove('hidden'); // 이게 먼저 실행
    } else if (Math.random() < bombPercent) {
      const $bomb = $$cells[index].querySelector('.bomb') as HTMLDivElement;
      holes[index] = setTimeout(() => {
        $bomb.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove('hidden');
    }
  });
}

$$cells.forEach(($cell, index) => {
  ($cell.querySelector('.gopher') as HTMLDivElement).addEventListener('click', (event: Event) => {
    if (!(event.target as HTMLDivElement).classList.contains('dead')) {
      score += 1;
      $score.textContent = `${score}`;
    }
    (event.target as HTMLDivElement).classList.add('dead');
    (event.target as HTMLDivElement).classList.add('hidden');
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거 (클릭하는 즉시 두더지가 내려가도록)
    setTimeout(() => {
      holes[index] = 0;
      (event.target as HTMLDivElement).classList.remove('dead');
    }, 1000);
  });

  ($cell.querySelector('.bomb') as HTMLDivElement).addEventListener('click', (event: Event) => {
    (event.target as HTMLDivElement).classList.add('boom');
    (event.target as HTMLDivElement).classList.add('hidden');
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      (event.target as HTMLDivElement).classList.remove('boom');
    }, 1000);
  });
});
