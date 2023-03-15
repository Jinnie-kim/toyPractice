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
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
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

let monster = null;

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
