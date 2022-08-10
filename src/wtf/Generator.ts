import { EnemyInfo } from "@/data/enemy";
import { Enemy } from "@/entities/Enemy";
import { BulletCollide } from "./TouchManager";

export class EnemyGenerator {
  scene: Phaser.Scene;
  clock: Phaser.Time.Clock;
  time: number; /** 毫秒 */
  loop: boolean;
  enemies: Enemy[];
  info: EnemyInfo;
  x: number;
  y: number;
  bulletCollides: BulletCollide[];
  constructor(
    scene: Phaser.Scene,
    clock: Phaser.Time.Clock,
    time: number,
    loop: boolean = true,
    info: EnemyInfo,
    x: number,
    y: number = -10
  ) {
    this.scene = scene;
    this.clock = clock;
    this.time = time;
    this.loop = loop;
    this.info = info;
    this.x = x;
    this.y = y;
    this.enemies = [];
    this.bulletCollides = [];
    this.start();
  }

  start() {
    this.clock = this.scene.time.addEvent({
      delay: this.time,
      callback: () => {
        const enemy = new Enemy(
          this.scene,
          this.x = Phaser.Math.Between(10, this.scene.game.config.width - 10),
          this.y,
          this.info.name,
          this.info
        );
        this.enemies.push(enemy);
        const bulletCollide = new BulletCollide(
          this.scene,
          this.scene.playerPlane.bulletsGroup,
          enemy,
          this.scene.playerPlane,
          this.info
        );
        this.bulletCollides.push(bulletCollide);
        // console.log(this.scene.playerPlane);
      },
      callbackScope: this.scene,
      loop: this.loop
    });
  }

  monitor() {
    this.enemies.forEach((enemy) => {
        if (enemy.active && enemy.y > this.scene.game.config.height) {
          enemy.destroy();
        }
    })
    
  }
}
