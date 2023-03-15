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
const $message = document.querySelector('#message') as HTMLDivElement;

// Game을 총괄하는 클래스
class Game {
  monster: MonsterStat | null;
  hero: HeroStat | null;
  monsterList: MonsterStat[];

  constructor(name: string) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
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
    this.start(name);
  }

  start(name: string) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }
  changeScreen(screen: string) {
    if (screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (event: Event) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement)['menu-input'].value;
    if (input === '1') {
      // 모험
      this.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === '2') {
      // 휴식
      if (this.hero === null) return;
      this.hero.hp = this.hero.maxHp;
      this.updateHeroStat();
      this.showMessage('충분한 휴식을 취했다.');
    } else if (input === '3') {
      // 종료
      this.showMessage(' ');
      this.quit();
    }
  };

  onBattleMenuInput = (event: Event) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement)['battle-input'].value;
    if (input === '1') {
      // 공격
      const { hero, monster } = this;
      if (hero === null || monster === null) return;
      hero.attack(monster);
      monster.attack!(hero);

      if (hero.hp <= 0) {
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else {
        // 전투 진행 중
        this.showMessage(
          `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
        );
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') {
      // 회복
    } else if (input === '3') {
      // 도망
      this.changeScreen('game');
    }
  };

  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }

  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }

  showMessage(text: string) {
    $message.textContent = text;
  }

  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
}

class Unit {
  game;
  name;
  maxHp;
  hp;
  xp;
  att;
  constructor(game: Game, name: string, hp: number, att: number, xp: number) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }

  attack(target: HeroStat | MonsterStat) {
    target.hp -= this.att;
  }
}

class Hero extends Unit {
  lev: number;

  constructor(game: Game, name: string) {
    super(game, name, 100, 10, 0);
    //this.game = game; // game과 hero를 엮어주기 위해서

    this.lev = 1;

    // this.game.updateHeroStat(); Hero안에서 게임 클래스에 접근해서 업데이트를 해도 된다.
  }

  // attack(target: MonsterStat) {
  //   target.hp -= this.att;
  // }
  heal(monster: MonsterStat) {
    this.hp += 20;
    this.hp -= monster.att;
  }

  getXp(xp: number) {
    this.xp += xp;
    if (this.xp >= this.lev * 15) {
      // 경험치를 다 채우면
      this.xp -= this.lev * 15; // 남은 경험치 표시
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
    }
  }
}

class Monster extends Unit {
  maxHp: number;

  constructor(game: Game, name: string, hp: number, att: number, xp: number) {
    super(game, name, hp, att, xp);

    this.maxHp = hp;
  }
  // attack(target: HeroStat) {
  //   target.hp -= this.att;
  // }
}

let game = null;

$startScreen.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const name = (event.target as HTMLFormElement)['name-input'].value;
  game = new Game(name);
});
