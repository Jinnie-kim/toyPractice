import './style.css';

const screen = document.querySelector('#screen') as HTMLDivElement;
const result = document.querySelector('#result') as HTMLDivElement;

interface ScreenStatus {
  waiting: string;
  ready: string;
  now: string;
}

// 굳이 html에도 있는 데이터를 자바스크립트에서 한 번더 관리해 줄 필요는 없다.
let screenStatus: ScreenStatus = {
  waiting: 'waiting',
  ready: 'ready',
  now: 'now',
};

let screenMessage: string;

screen.addEventListener('click', (event: Event) => {
  if (
    (event.currentTarget as HTMLDivElement).className === screenStatus.waiting
  ) {
    screenMessage = '초록색이 되면 클릭하세요';
    (event.currentTarget as HTMLDivElement).className = screenStatus.ready;
  } else if (
    (event.currentTarget as HTMLDivElement).className === screenStatus.ready
  ) {
    screenMessage = '클릭하세요!';
    (event.currentTarget as HTMLDivElement).className = screenStatus.now;
  } else if (
    (event.currentTarget as HTMLDivElement).classList.contains(screenStatus.now)
  ) {
    screenMessage = '클릭해서 시작하세요';
    (event.currentTarget as HTMLDivElement).className = screenStatus.waiting;
  }
  screen.textContent = screenMessage;
});
