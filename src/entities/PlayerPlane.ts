import { Scene } from "phaser";
import { State } from "@/entities/State";
import Entity from "./Entity";
import { playerInfo, PlayerInfo } from "@/data/player";
import { set } from "@/utils/set";

export default class PlayerPlane extends Entity {
  scene: Phaser.Scene;
  lastDamageTime: number;
  bulletsGroup: Phaser.Physics.Arcade.Group;
  timer: Phaser.Time.TimerEvent;
  sound: Phaser.Sound.BaseSound;
  playerInfo: PlayerInfo;
  skill: Phaser.GameObjects.Image;
  health: number;
  bulletInterval: number = 25;
  skillMask: Phaser.Display.Masks.BitmapMask;
  private bulletsLevel: number = 7;

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
    this.health = this.playerInfo.health;
    this.sound = this.scene.sound.add(this.playerInfo.shootSound, {
      volume: 0.2,
    });
    this.setScale(this.playerInfo.scale);
    this.setInteractive();
    this.loadData();
    this.initBullets();
    this.setDepth(1);
  }

  initBullets() {
    this.bulletsGroup = this.scene.physics.add.group();
  }
  createBulletAt() {
    const X: number[] = [];
    const Y: number[] = [];
    let sign = 1,
      idx = 1;
    if (this.bulletsLevel % 2 === 0) {
      for (let i = 1; i <= this.bulletsLevel; ++i) {
        if (i > 1 && i & (1 === 1)) idx++;
        X.push(this.x + sign * this.bulletInterval * idx);
        Y.push(this.y - this.height / 2.5);
        sign *= -1;
      }
    } else {
      X.push(this.x);
      Y.push(this.y - this.height / 2);
      for (let i = 1; i < this.bulletsLevel; ++i) {
        if (i > 1 && i & (1 === 1)) idx++;
        X.push(this.x + sign * this.bulletInterval * idx);
        Y.push(this.y - this.height / 3);
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
        !this.scene.isGameOver && this.start();
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
      bullet.setScale(this.playerInfo.bulletScale);
    });
    // this.sound.play();
  }
  boom() {
    this.anims.play(this.playerInfo.boomAnimation, true);
  }
  specialAttack() {
    // 闪现到开始位置
    this.setAlpha(0);
    this.scene.tweens.add({
      targets: this,
      x: this.scene.game.config.width / 2,
      y: this.scene.game.config.height / 2,
      duration: 100,
      ease: "Power1",
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }
  set bulletsLevel(level: number) {
    this.bulletsLevel = level;
  }

  get bulletsLevel() {
    return this.bulletsLevel;
  }

  loadData() {
    
    this.scene.anims.create({
      key: this.playerInfo.boomAnimation,
      frames: [
        {
          key: this.playerInfo.boomAnimation,
          frame: 0,
        },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.skillMask = new Phaser.Display.Masks.BitmapMask(this.scene, this.skill);
    this.skillMask.setBitmap(this.skill);
    this.skill = this.scene.add
      .image(
        // 右下角
        this.scene.game.config.width - this.width,
        this.scene.game.config.height - this.height,
        this.playerInfo.skillAppearance,
        this
      )
      .setInteractive()
      .setScale(0.5)
      .setMask(this.skillMask)
      .on("pointerover", () => {
        this.skill.setScale(0.6);
        this.scene.input.setDefaultCursor("pointer");
      })
      .on("pointerout", () => {
        this.skill.setScale(0.5);
        this.scene.input.setDefaultCursor("default");
      })
      .on("pointerdown", () => {
        this.skill.setScale(0.5);
        this.specialAttack();
        
      }).on("pointerup", () => {
        this.scene.input.setDefaultCursor("default");
      });
  }
}
