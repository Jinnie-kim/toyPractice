import './style.css';
import { HeroStat, MonsterStat } from './rpgType';

const $startScreen = document.querySelector('#start-screen') as HTMLFormElement;
const $gameMenu = document.querySelector('#game-menu') as HTMLFormElement;
const $battleMenu = document.querySelector('#battle-menu') as HTMLFormElement;
// 주인공 stat
const $heroName = document.querySelector('#hero-name') as HTMLSpanElement;
const $heroLevel = document.querySelector('#hero-level') as HTMLSpanElement;
const $heroHp = document.querySelector('#hero-hp') as HTMLSpanElement;
const $heroXp = document.querySelector('#hero-xp') as HTMLSpanElement;
const $heroAtt = document.querySelector('#hero-att') as HTMLSpanElement;
// 몬스터 stat
const $monsterName = document.querySelector('#monster-name') as HTMLSpanElement;
const $monsterHp = document.querySelector('#monster-hp') as HTMLSpanElement;
const $monsterAtt = document.querySelector('#monster-att') as HTMLSpanElement;
// 게임 상황 메시지
const $message = document.querySelector('#message');

const hero: HeroStat = {
  name: '',
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
};

let monster: MonsterStat | null = null;

const monsterList: MonsterStat[] = [
  {
    name: '슬라임',
    hp: 25,
    att: 10,
    xp: 10,
  },
  {
    name: '스켈레톤',
    hp: 50,
    att: 15,
    xp: 20,
  },
  {
    name: '마왕',
    hp: 150,
    att: 35,
    xp: 50,
  },
];

$startScreen.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const name: string = (event.target as HTMLFormElement)['name-input'].value;
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  $heroName.textContent = name;
  $heroLevel.textContent = `${hero.lev}Lev`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;
});

$gameMenu.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const input = (event.target as HTMLFormElement)['menu-input'].value;
  if (input === '1') {
    $gameMenu.style.display = 'none';
    $battleMenu.style.display = 'block';
    monster = JSON.parse(
      JSON.stringify(
        monsterList[Math.floor(Math.random() * monsterList.length)]
      )
    );
    if (monster === null) return;
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  } else if (input === 2) {
  } else if (input === 3) {
  }
});

$battleMenu.addEventListener('submit', (event: Event) => {
  const input = (event.target as HTMLFormElement)['battle-menu'].value;
  if (input === '1') {
  } else if (input === '2') {
  } else if (input === '3') {
  }
});
