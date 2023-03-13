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

let startTime: Date;
let endTime: Date;
let timeDiffRecords: number;
let timeoutId: number;

const recordsArray: number[] = [];

screen.addEventListener('click', (event: Event) => {
  if (
    (event.currentTarget as HTMLDivElement).className === screenStatus.waiting
  ) {
    screenMessage = '초록색이 되면 클릭하세요';
    (event.currentTarget as HTMLDivElement).className = screenStatus.ready;

    // 파란 화면을 클릭하고 빨간 화면으로 전환된 후 바로 타이머가 실행되어야 한다.
    timeoutId = setTimeout(() => {
      if (screen.className === screenStatus.ready) {
        // 첫 시간 재기 (시작 시간)
        startTime = new Date();
        screenMessage = '클릭하세요!';
        screen.textContent = screenMessage;
        screen.className = screenStatus.now;
      }
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (
    (event.currentTarget as HTMLDivElement).className === screenStatus.ready
  ) {
    clearTimeout(timeoutId);
    screenMessage = '아직 초록색 아니자나여';
    (event.currentTarget as HTMLDivElement).className = screenStatus.waiting;
  } else if (
    (event.currentTarget as HTMLDivElement).classList.contains(screenStatus.now)
  ) {
    // 사용자가 클릭한 후 끝 시간 빼기
    endTime = new Date();
    // 시간 차이 저장하기
    timeDiffRecords = (endTime.getTime() - startTime.getTime()) / 1000;
    recordsArray.push(timeDiffRecords);

    let timeDiffRecordsAverage = recordsArray.reduce(
      (a, b, _, array) => (a + b) / array.length
    );
    result.textContent = `현재: ${timeDiffRecords}s, 평균 기록: ${timeDiffRecordsAverage}`;

    // 초기화를 안해줘도 되지만 혹시나 버그가 날 상황을 방지하기위해 초기화 처리를 해준다.
    // startTime = null;
    // endTime = null;
    screenMessage = '클릭해서 시작하세요';
    (event.currentTarget as HTMLDivElement).className = screenStatus.waiting;
  }
  screen.textContent = screenMessage;
});
