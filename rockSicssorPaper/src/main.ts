const computer = document.querySelector('#computer') as HTMLDivElement;
const score = document.querySelector('#score') as HTMLDivElement;
const scissor = document.querySelector('#scissor') as HTMLButtonElement;
const rock = document.querySelector('#rock') as HTMLButtonElement;
const paper = document.querySelector('#paper') as HTMLButtonElement;
const IMG_URL =
  'https://github.com/Jinnie-kim/toyPractice/blob/main/rockSicssorPaper/src/rsp.png?raw=true';

const rspX = {
  scissor: '0',
  rock: '-220px',
  paper: '-440px',
};

computer.style.background = `url(${IMG_URL}) 0 0`; // background position으로 이미지의 가로위치 조정 바위: -220px, 보: -440px
computer.style.backgroundSize = 'auto 200px'; // 높이 200px에 맞춰서 알아서 비율 조정(auto)

setInterval(() => {
  computer.style.background = `url(${IMG_URL}) 0 0`;
  computer.style.backgroundSize = 'auto 200px';
}, 50);
