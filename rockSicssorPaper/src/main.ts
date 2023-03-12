const computer = document.querySelector('#computer') as HTMLDivElement;
let score = document.querySelector('#score') as HTMLDivElement;
const scissor = document.querySelector('#scissor') as HTMLButtonElement;
const rock = document.querySelector('#rock') as HTMLButtonElement;
const paper = document.querySelector('#paper') as HTMLButtonElement;
const IMG_URL = './src/rsp.png';

interface rspXCoord {
  scissor: string;
  rock: string;
  paper: string;
}

interface ScoreTable {
  scissor: number;
  rock: number;
  paper: number;
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

let computerChoiceTimeInterval = setInterval(changeComputerHand, 50); // setTimeout을 이용하여 재귀함수로 구현할 수도 있다.

// click버튼 5번 호출, 1번, 2번, 3번, 4번, 5번 인터벌 id가 생성되고 마지막 5번 인터벌 id가 저장된다.
// 그 다음 버튼을 클릭하면 5번 인터벌만 취소된다.
let positionClickable = true; // flag 변수
let userChoiceHand: string = '';
let scoreCount: number = 0;
let resultMessage: string = '';

let gameCount: number = 0;
let computerScore: number = 0;
let userScore: number = 0;

const scoreTable: ScoreTable = {
  scissor: 1,
  rock: 0,
  paper: -1,
};

function userClickPosition() {
  if (positionClickable) {
    clearInterval(computerChoiceTimeInterval);
    positionClickable = false;
    // 점수 계산 및 화면에 표시
    const userChoiceToNum = scoreTable[userChoiceHand as keyof ScoreTable];
    const computerChoiceToNum = scoreTable[computerChoice as keyof ScoreTable];
    const diffUserAndComputer = userChoiceToNum - computerChoiceToNum;

    // 2, -1은 승리조건, -2, 1은 패배조건
    if (diffUserAndComputer === 0) {
      resultMessage = '비겼습니다';
    } else if ([-2, 1].includes(diffUserAndComputer)) {
      resultMessage = '졌습니다';
      scoreCount--;
      computerScore++;
    } else if ([-1, 2].includes(diffUserAndComputer)) {
      resultMessage = '이겼습니다';
      scoreCount++;
      userScore++;
    }
    if (resultMessage !== '비겼습니다') gameCount++;
    if (gameCount === 5) {
      if (computerScore > userScore) {
        console.log(computerScore);
        console.log(userScore);
        resultMessage = '게임이 끝났습니다. 컴퓨터가 이겼습니다.';
      } else if (computerScore < userScore) {
        console.log(computerScore);
        console.log(userScore);
        resultMessage = '게임이 끝났습니다. 유저가 이겼습니다.';
      } else if (computerScore === userScore) {
        console.log(computerScore);
        console.log(userScore);
        resultMessage = '게임이 끝났습니다. 비겼습니다.';
      }
      score.textContent = `${resultMessage}`;
      return;
    } else if (gameCount < 5) {
      if (userScore === 3 || computerScore === 3) {
        if (userScore === 3) {
          resultMessage = '게임이 끝났습니다. 유저가 이겼습니다.';
          score.textContent = `${resultMessage}`;
          return;
        }
        if (computerScore === 3) {
          resultMessage = '게임이 끝났습니다. 컴퓨터가 이겼습니다.';
          score.textContent = `${resultMessage}`;
          return;
        }
      }
      console.log('computer score', computerScore);
      console.log('userScore', userScore);
      score.textContent = `${resultMessage}, 총 점수는 ${scoreCount}`;
    }
    console.log('gameCount', gameCount);

    setTimeout(() => {
      positionClickable = true;
      // interval 멈춘 후 1초 뒤에 다시 컴퓨터의 손 포지션 변경
      computerChoiceTimeInterval = setInterval(changeComputerHand, 50); // 타이머마다 id가 달라지기 때문에 매번 변수에 새로 저장해줘야한다.
    }, 1000);
  }
}

scissor.addEventListener('click', (e: Event) => {
  userChoiceHand = (e.currentTarget as HTMLButtonElement).id;
  userClickPosition();
});
rock.addEventListener('click', (e: Event) => {
  userChoiceHand = (e.currentTarget as HTMLButtonElement).id;
  userClickPosition();
});
paper.addEventListener('click', (e: Event) => {
  userChoiceHand = (e.currentTarget as HTMLButtonElement).id;
  userClickPosition();
});
