import './style.css';

const $wrapper = document.querySelector('#wrapper') as HTMLDivElement;

const total: number = 12;
const colors: string[] = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
let colorCopy: string[] = colors.concat(colors); // 2쌍의 배열을 만든다.
let shuffled: string[] = [];

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

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    $wrapper.appendChild(card);
  }
}

startGame();
