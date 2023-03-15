export interface HeroStat {
  name: string;
  lev: number;
  maxHp: number;
  hp: number;
  xp: number;
  att: number;
}

export interface MonsterStat {
  name: string;
  hp: number;
  att: number;
  xp: number;
  maxHp?: number;
}
