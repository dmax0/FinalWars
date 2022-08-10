import { backgroundInfo } from "@/data/background";

export default class Background extends Phaser.GameObjects.TileSprite {
  name: string;
  appearance: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    textureKey: string,
    width: number,
    height: number,
    frameKey?: string | number
  ) {
    super(scene, x, y, textureKey, width, height, frameKey);
    this.name = backgroundInfo.name;
    this.appearance = backgroundInfo.image;
    this.setOrigin(0, 0);
    // this.setTileScale(1, 1);
    this.setDepth(-1);
    // this.setRotation(0);
    // this.toggleFlipY()
    // this.setScrollFactor(0.5, 0.5)
    scene.add.existing(this);
    
  }

  scroll() {
    // this.setScrollFactor(0,0)
    this.tilePositionY -= backgroundInfo.speed;
  }
}
