import enemy1 from "@/assets/images/enemies/enemy1.png";
import enemy1Bullet from "@/assets/images/enemies/enemy1Bullet.png";
import enemy1Boom from "@/assets/images/enemies/enemy1Boom.png";
import hit1 from "@/assets/sounds/hits/hit1.mp3";
import explosion1 from "@/assets/sounds/explosions/explosion1.mp3";
import cxk from "@/assets/images/enemies/cxk.png";
export interface EnemyInfo {
  id: string;
  name: string;
  appearance: string;
  speed: number;
  health: number;
  damage: number;
  score: number;
  bulletAppearance?: string;
  boomAppearance?: string;
  hitSound?: string;
  deathSound?: string;
  scale?: number;
}

export const enemy1Info: EnemyInfo = {
  id: "20001",
  name: "Enemy1",
  appearance: enemy1,
  speed: 100,
  health: 100,
  damage: 10,
  score: 0.4,
  bulletAppearance: enemy1Bullet,
  boomAppearance: enemy1Boom,
  hitSound: hit1,
  deathSound: explosion1,
  scale: 0.5,
};

// 蔡徐坤
export const enemy2Info: EnemyInfo = {
  id: "250",
  name: "cxk",
  appearance: cxk,
  speed: 100,
  health: 100,
  damage: 10,
  score: 0.25,
  bulletAppearance: enemy1Bullet,
  boomAppearance: enemy1Boom,
  hitSound: hit1,
  deathSound: explosion1,
  scale: 0.75,
};
