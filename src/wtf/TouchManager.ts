import { EnemyInfo } from "@/data/enemy";
import { PlayerInfo } from "@/data/player";
import { Enemy } from "@/entities/Enemy";
import PlayerPlane from "@/entities/PlayerPlane";
import { State } from "@/entities/State";

type ArcadeObject =
  | Phaser.Physics.Arcade.Sprite
  | Phaser.Physics.Arcade.Sprite[]
  | Phaser.Physics.Arcade.Group
  | Phaser.Physics.Arcade.Group[];

export class TouchManager {
  scene: Phaser.Scene;
  collider: Phaser.Physics.Arcade.Collider;
  object1: ArcadeObject;
  object2: ArcadeObject;
  collideCallback: Function;
  constructor(
    scene: Phaser.Scene,
    object1: Object,
    object2: Object,
    collideCallback?: Function
  ) {
    this.scene = scene;
    this.object1 = object1;
    this.object2 = object2;
  }
  setCollideCallback(callback: Function) {
    this.collideCallback = callback;
  }
}

// 敌机与我机相撞
export class EnemyPlaneCollide extends TouchManager {
  constructor(
    scene: Phaser.Scene,
    object1: Phaser.Physics.Arcade.Sprite,
    object2: Phaser.Physics.Arcade.Sprite
  ) {
    super(scene, object1, object2);
    this.start();
  }

  enemyPlaneCollidePlayer(enemy: Enemy, player: PlayerPlane) {
    const rate = 100 / player.health;
    if (player.health > 0) {
      // 0.3s内我机只能受到一次伤害
      if (player.lastDamageTime + 300 > this.scene.time.now) {
        return;
      }
      player.lastDamageTime = this.scene.time.now;
      player.health -= enemy.enemyInfo.damage;

      const decreases = enemy.enemyInfo.damage * rate;
      this.scene.playerHealthBar.decrease(decreases);

      // enemy.destroy();
    } else {
      this.scene.playerPlane.State = State.DEAD;
      this.scene.playerPlane.boom();
      setTimeout(() => {
        this.scene.isGameOver = true;
      }, 300);
    }
  }
  start() {
    this.collider = this.scene.physics.add.overlap(
      this.object1,
      this.object2,
      this.enemyPlaneCollidePlayer,
      undefined,
      this
    );
  }
}

export class BulletCollide extends TouchManager {
  enemyInfo: EnemyInfo;
  playerPlane: PlayerPlane;
  sounds: {
    hit: Phaser.Sound.BaseSound;
    death: Phaser.Sound.BaseSound;
  };
  constructor(
    scene: Phaser.Scene,
    object1: ArcadeObject,
    object2: ArcadeObject,
    playerPlane: PlayerPlane,
    enemyInfo: EnemyInfo
  ) {
    super(scene, object1, object2);
    this.playerPlane = playerPlane;
    this.enemyInfo = enemyInfo;
    this.sounds = {};
    this.loadData();
    this.start();
  }

  bulletCollideEnemy(enemy: Enemy, bullet: ArcadeObject) {
    if (bullet.active && enemy.active) {
      enemy.setAlpha(0.5);
      enemy.health -= this.playerPlane.playerInfo.damage;
      setTimeout(() => {
        enemy.clearAlpha();
      }, 300);

      if (enemy.health > 0) {
        this.sounds.hit.play();
      }
      if (enemy.health >= 0) {
        this.playerPlane.bulletsGroup.killAndHide(bullet);
      }

      if (enemy.health <= 0) {
        this.sounds.death.play();

        enemy.anims.play("explode", true);
        this.scene.Score += this.enemyInfo.score;
        this.scene.ScoreText.changeText("Score:" + Math.round(this.scene.Score));
        enemy.on("animationcomplete", () => {
          enemy.destroy();
        });
      }
    }
  }

  loadData() {
    this.sounds.death = this.scene.sound.add(this.enemyInfo.deathSound, {
      volume: 0.2,
    });
    this.sounds.hit = this.scene.sound.add(this.enemyInfo.hitSound, {
      volume: 0.2,
    });
    this.scene.anims.create({
      key: "explode",
      frames: [
        {
          key: this.enemyInfo.boomAppearance,
          frame: 0,
        },
      ],
      frameRate: 10,
    });
  }

  start() {
    this.collider = this.scene.physics.add.overlap(
      this.object1,
      this.object2,
      this.bulletCollideEnemy,
      undefined,
      this
    );
  }
}
