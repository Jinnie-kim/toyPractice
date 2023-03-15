import './style.css';

const $startScreen = document.querySelector('#start-screen') as HTMLFormElement;
const $gameMenu = document.querySelector('#game-menu') as HTMLFormElement;
const $battleMenu = document.querySelector('#battle-menu') as HTMLFormElement;
const $heroName = document.querySelector('#hero-name') as HTMLSpanElement;

$startScreen.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const name: string = (event.target as HTMLFormElement)['name-input'].value;
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  $heroName.textContent = name;
});
