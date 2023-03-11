const computer = document.querySelector('#computer') as HTMLDivElement;
const score = document.querySelector('#score') as HTMLDivElement;
const scissor = document.querySelector('#scissor') as HTMLButtonElement;
const rock = document.querySelector('#rock') as HTMLButtonElement;
const paper = document.querySelector('#paper') as HTMLButtonElement;
const IMG_URL = './src/rsp.png';

interface rspXCoord {
  scissor: string;
  rock: string;
  paper: string;
}

const rspX: rspXCoord = {
  scissor: '0',
  rock: '-220px',
  paper: '-440px',
};

computer.style.background = `url(${IMG_URL}) 0 0`; // background position으로 이미지의 가로위치 조정 바위: -220px, 보: -440px
computer.style.backgroundSize = 'auto 200px'; // 높이 200px에 맞춰서 알아서 비율 조정(auto)

let coord = '0';
setInterval(() => {
  if (coord === rspX.scissor) {
    // 가위인 경우
    coord = rspX.rock;
    computer.style.background = `url(${IMG_URL}) ${rspX.rock} 0`;
    computer.style.backgroundSize = 'auto 200px';
  } else if (coord === rspX.rock) {
    // 바위인 경우
    coord = rspX.paper;
    computer.style.background = `url(${IMG_URL}) ${rspX.paper} 0`;
    computer.style.backgroundSize = 'auto 200px';
  } else if (coord === rspX.paper) {
    coord = rspX.scissor;
    computer.style.background = `url(${IMG_URL}) ${rspX.scissor} 0`;
    computer.style.backgroundSize = 'auto 200px';
  }
}, 100);
