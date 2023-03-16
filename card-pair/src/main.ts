import './style.css';

const $wrapper = document.querySelector('#wrapper') as HTMLDivElement;

const total: number = parseInt(prompt('카드 개수를 짝수로 입력하세요(최대 20).')!);
const colors: string[] = ['red', 'orange', 'yellow', 'green', 'white', 'pink', 'cyan', 'violet', 'gray', 'black'];
let colorSlice = colors.slice(0, total / 2);
let colorCopy: string[] = colorSlice.concat(colorSlice); // 2쌍의 배열을 만든다.
let shuffled: string[] = [];
let gameStartTime: Date;
let gameEndTime: Date;
let timeDiffRecords: number;

function shuffle() {
  // 피셔-예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i: number) {
  // div.card > div.card-inner > (div.card-front + div.card-back)
  const card = document.createElement('div');
  card.className = 'card'; // .card 태그 생성
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner'; // .card-inner 태그 생성
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front'; // .card-front 태그 생성
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back'; // .card-back 태그 생성
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

let flippedCardArray: HTMLDivElement[] = [];
let matchedCardArray: HTMLDivElement[] = [];
let clicked: boolean = false;

function cardFlipped(this: any) {
  if (!clicked || matchedCardArray.includes(this) || flippedCardArray[0] === this) return;
  this.classList.toggle('flipped');

  flippedCardArray.push(this);

  if (flippedCardArray.length !== 2) return;

  const firstBackColor = ((flippedCardArray[0] as HTMLDivElement).querySelector('.card-back') as HTMLElement).style.backgroundColor;
  const secondBackColor = ((flippedCardArray[1] as HTMLDivElement).querySelector('.card-back') as HTMLElement).style.backgroundColor;

  if (firstBackColor === secondBackColor) {
    // 두 카드가 같은 경우
    console.log('같은 카드네여');
    matchedCardArray = matchedCardArray.concat(flippedCardArray);
    flippedCardArray = [];
    if (matchedCardArray.length !== total) return;
    console.log('다 맞추셨네여');
    gameEndTime = new Date();
    timeDiffRecords = (gameEndTime.getTime() - gameStartTime.getTime()) / 1000;
    setTimeout(() => {
      alert(`🤩축하합니다. 기억력이 좋으시네요!😽 걸린 시간: ${timeDiffRecords}`);
      resetGame();
    }, 500);
  } else {
    console.log('다른 카드네여');
    clicked = false;
    setTimeout(() => {
      (flippedCardArray[0] as HTMLDivElement).classList.remove('flipped');
      (flippedCardArray[1] as HTMLDivElement).classList.remove('flipped');
      flippedCardArray = [];
      clicked = true;
    }, 1000);
  }
}

function startGame() {
  clicked = false;
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', cardFlipped);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll('.card').forEach((card, index) => {
    // 처음 카드 공개
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clicked = true;
    gameStartTime = new Date();
  }, 5000);
}

startGame();

function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colors.concat(colors);
  shuffled = [];
  matchedCardArray = [];
  startGame();
}
