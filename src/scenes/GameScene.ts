import PlayerPlane from "@/entities/PlayerPlane";
import { backgroundInfo } from "@/data/background";
import { playerInfo } from "@/data/player";
import Background from "@/entities/Background";
import MouseController from "@/wtf/mouse";
import HealthBar from "@/entities/HealthBar";
import { Enemy } from "@/entities/Enemy";
import { enemy1Info, enemy2Info, EnemyInfo } from "@/data/enemy";
import { EnemyGenerator } from "@/wtf/Generator";
import { BulletCollide } from "@/wtf/TouchManager";

export default class GameScene extends Phaser.Scene {
  playerPlane: PlayerPlane;
  background: Background;
  isGameOver: boolean = false;
  mouseController: MouseController;
  playerHealthBar: HealthBar;
  enemyInfo: EnemyInfo[];
  enemies: Enemy[];
  enemyGenerators: EnemyGenerator[];
  bulletCollide: BulletCollide[];
  constructor() {
    super("GameScene");
    this.enemies = [];
    this.enemyInfo = [];
    this.bulletCollide = [];
    this.enemyGenerators = [];
  }
  preload() {
    this.load.image(playerInfo.name, playerInfo.appearance);
    this.load.image(backgroundInfo.name, backgroundInfo.appearance);
    this.load.image(playerInfo.bulletAppearance, playerInfo.bulletAppearance);
    this.load.audio(playerInfo.shootSound, playerInfo.shootSound);
    this.load.image(playerInfo.boomAnimation, playerInfo.boomAnimation);

    this.load.image(enemy1Info.name, enemy1Info.appearance);
    this.load.image(enemy1Info.boomAppearance, enemy1Info.boomAppearance);
    this.load.audio(enemy1Info.hitSound, enemy1Info.hitSound);
    this.load.audio(enemy1Info.deathSound, enemy1Info.deathSound);

    this.load.image(enemy2Info.name, enemy2Info.appearance);
    this.load.image(enemy2Info.boomAppearance, enemy2Info.boomAppearance);
    this.load.audio(enemy2Info.hitSound, enemy2Info.hitSound);
    this.load.audio(enemy2Info.deathSound, enemy2Info.deathSound);
  }

  create() {
    this.background = new Background(this, 0, 0, 0, 0, backgroundInfo.name);
    this.playerPlane = new PlayerPlane(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      playerInfo.name,
      playerInfo
    );
    this.mouseController = new MouseController(
      this.playerPlane,
      this.input,
      this
    );
    this.playerHealthBar = new HealthBar(this, 20, 20, 10, 150);
    this.enemyGenerators.push(new EnemyGenerator(
      this,
      this.time,
      700,
      true,
      enemy2Info
    ));

    this.enemyGenerators.push(new EnemyGenerator(
      this,
      this.time,
      1000,
      true,
      enemy1Info
    ));
    !this.isGameOver && this.playerPlane.fire();

  }

  update() {
    
    this.playerPlane.bulletsGroup.getChildren().forEach((bullet) => {
      if (bullet.active && bullet.y < -bullet.height) {
        this.playerPlane.bulletsGroup.killAndHide(bullet);
      }
    });

    this.enemyGenerators.forEach((generator) => {
      generator.monitor();
    });

    if (this.isGameOver === true) {
      // 清除所有物体
      this.playerPlane.bulletsGroup.clear(true, true);
      this.enemies.forEach((enemy) => {
        enemy.destroy();
      }
      );
      this.enemyGenerators.forEach((generator) => {
        generator.destroy();
      });
      this.scene.start("GameOverScene");
    } else {
      this.background.scroll();
    }
  }
}
