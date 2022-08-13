import Tom from "@/assets/images/players/tom.png";
import Bullet1 from "@/assets/images/bullets/bullet1.png";
import Shoot1 from "@/assets/sounds/bullets/shoot1.mp3";
import TomBoom from "@/assets/images/players/tomBoom.png";
import { State } from "@/entities/State";

import Mike from "@/assets/images/players/mike.png";
import Bullet2 from "@/assets/images/bullets/bullet2.png";
import MikeSkill from "@/assets/images/skills/mike.png";
import TomSkill from "@/assets/images/skills/tom.png";
export interface PlayerInfo {
  id: string;
  name: string;
  appearance: string;
  bulletAppearance: string;
  shootSound: string;
  shootSpeed: number;
  fireRate: number;
  state: State;
  scale: number;
  bulletScale: number;
  damage: number;
  health: number;
  boomAnimation: string;
  skillAppearance: string;
}
export class Player {
  constructor(playerInfo: PlayerInfo) {
    this.playerInfo = {...playerInfo};
  }
  setPlayerInfo(playerInfo: PlayerInfo) {
    this.playerInfo = {...playerInfo};
  }
}
export const mike: PlayerInfo = {
  id: "10002",
  name: "Mike",
  appearance: Mike,
  bulletAppearance: Bullet2,
  shootSound: Shoot1,
  shootSpeed: 450,
  fireRate: 0.1,
  state: State.ACTIVE,
  scale: 0.8,
  bulletScale: 0.7,
  damage: 10,
  health: 80,
  boomAnimation: TomBoom,
  skillAppearance: MikeSkill,
};
export const tom: PlayerInfo = {
  id: "10001",
  name: "Tom",
  appearance: Tom,
  bulletAppearance: Bullet1,
  shootSound: Shoot1,
  shootSpeed: 400,
  fireRate: 0.15,
  state: State.ACTIVE,
  scale: 0.8,
  bulletScale: 1,
  damage: 20,
  health: 100,
  boomAnimation: TomBoom,
  skillAppearance: TomSkill,
};
export const playerInfo: PlayerInfo = { ...tom };
// export const changePlayerInfo = (playerInfo: PlayerInfo) => {
//     this.playerInfo = {...playerInfo}
// }
