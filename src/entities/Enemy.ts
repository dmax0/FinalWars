import { EnemyInfo } from "@/data/enemy";
import Entity from "./Entity";

export class Enemy extends Entity {
  scene: Phaser.Scene;
  enemyInfo: EnemyInfo;
  health: number;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    enemyInfo: EnemyInfo,
    frame: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.enemyInfo = {
      ...enemyInfo,
    };
    this.health = this.enemyInfo.health;
    this.setScale(this.enemyInfo.scale);
    this.move("down");
    this.setDepth(1)
  }

  move(direction: string) {
    switch (direction) {
      case "left":
        this.setVelocityX(-this.enemyInfo.speed);
        break;
      case "right":
        this.setVelocityX(this.enemyInfo.speed);
        break;
      case "up":
        this.setVelocityY(-this.enemyInfo.speed);
        break;
      case "down":
        this.setVelocityY(this.enemyInfo.speed);
        break;
    }
  }
  
  
}
