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

// computer.style.background = `url(${IMG_URL}) 0 0`; // background position으로 이미지의 가로위치 조정 바위: -220px, 보: -440px
// computer.style.backgroundSize = 'auto 200px'; // 높이 200px에 맞춰서 알아서 비율 조정(auto)

let computerChoice = 'scissor';

function changeComputerHand() {
  if (computerChoice === 'scissor') {
    // 가위인 경우
    computerChoice = 'rock';
  } else if (computerChoice === 'rock') {
    // 바위인 경우
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'scissor';
  }

  // rspX.computerChoice -> 문자열 'computerChoice'를 찾고있기 때문에 틀린 코드
  computer.style.background = `url(${IMG_URL}) ${
    rspX[computerChoice as keyof rspXCoord]
  } 0`;
  computer.style.backgroundSize = 'auto 200px';
}

setInterval(changeComputerHand, 50); // setTimeout을 이용하여 재귀함수로 구현할 수도 있다.
