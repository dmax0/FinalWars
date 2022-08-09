import PlayerPlane from "@/entities/PlayerPlane";
import { player } from "@/data/player";

export class TestScene extends Phaser.Scene {
  playerPlane: PlayerPlane;
  constructor() {
    super("TestScene");
  }
  preload() {
    this.load.image("tom", player.appearance);
  }

  create() {
    this.playerPlane = new PlayerPlane(this, 100, 200, "tom");
  }

  update() {}
}
