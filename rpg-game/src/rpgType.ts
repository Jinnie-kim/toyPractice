export interface HeroStat {
  name: string;
  lev: number;
  maxHp: number;
  hp: number;
  xp: number;
  att: number;
  attack: (monster: MonsterStat) => void;
  heal: (monster: MonsterStat) => void;
  getXp: (monsterxp: number) => void;
}

export interface MonsterStat {
  name: string;
  hp: number;
  att: number;
  xp: number;
  maxHp?: number;
  attack?: (hero: HeroStat) => void;
}
