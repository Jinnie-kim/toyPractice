const computer = document.querySelector('#computer') as HTMLDivElement;
const score = document.querySelector('#score') as HTMLDivElement;
const scissor = document.querySelector('#sicssor') as HTMLButtonElement;
const rock = document.querySelector('#rock') as HTMLButtonElement;
const paper = document.querySelector('#paper') as HTMLButtonElement;
const IMG_URL = './src/rsp.png';

computer.style.background = `url(${IMG_URL}) 0 0`;
computer.style.backgroundSize = 'auto 200px';
