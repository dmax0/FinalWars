import { Scene } from "phaser";
import { State } from "@/entities/State";
import Entity from "./Entity";
import { playerInfo, PlayerInfo } from "@/data/player";
import { set } from "@/utils/set";

export default class PlayerPlane extends Entity {
  scene: Phaser.Scene;

  bulletsGroup: Phaser.Physics.Arcade.Group;
  timer: Phaser.Time.TimerEvent;
  sound: Phaser.Sound.BaseSound;
  playerinfo: PlayerInfo;
  private bulletsLevel: number = 3;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    playerInfo: PlayerInfo
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.playerInfo = {
      ...playerInfo,
    };
    this.sound = this.scene.sound.add(this.playerInfo.shootSound, {
      volume: 0.2,
    });
    this.setScale(this.playerInfo.scale);
    this.setInteractive();
    this.initBullets();
    this.setDepth(1);
  }

  initBullets() {
    this.bulletsGroup = this.scene.physics.add.group();
  }
  createBulletAt() {
    const X: number[] = [];
    const Y: number[] = [];
    let sign = 1;
    const bulletCount = this.bulletsLevel;
  
    if (bulletCount % 2 === 0) {
      for (let i = 1; i <= bulletCount; ++i) {
        X.push(this.x + sign * (this.width / 4));
        Y.push(this.y - this.height / 2.5);
        sign *= -1;
      }
    } else {
      let isMid = 0;
      sign = -1;
      for (let i = 1; i <= bulletCount; ++i) {
        if (isMid === 0) {
          X.push(this.x);
          Y.push(this.y - this.height / 2);
          isMid = 1;
          continue;
        }
        X.push(this.x + sign * (this.width / 4  ) );
        Y.push(this.y - this.height / 2.8);
        sign *= -1;
    }
  }
    return { X, Y };
  }
  fire() {
    const fireRate = this.playerInfo.fireRate * 1000;
    const where: { X: number[]; Y: number[] } = this.createBulletAt();
    this.timer = this.scene.time.addEvent({
      delay: fireRate,
      callback: () => {
        this.start();
      },
      callbackScope: this,
      loop: true,
    });
  }
  start() {
    const where: { X: number[]; Y: number[] } = this.createBulletAt();
    where.X.forEach((x, i) => {
      const bullet = this.bulletsGroup.get(
        x,
        where.Y[i],
        this.playerInfo.bulletAppearance
      );
      bullet.setVelocityY(-this.playerInfo.shootSpeed);
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setScale(this.playerInfo.scale);
    });
    this.sound.play();
  }
  set bulletsLevel(level: number) {
    this.bulletsLevel = level;
  }

  get bulletsLevel() {
    return this.bulletsLevel;
  }
}
