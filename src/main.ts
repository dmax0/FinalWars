import { TestScene } from "./scenes/TestScene";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
  physics: {
      default: "arcade",
      gravity: { y: 0 }
  },
  zoom: 0.999,
  audio: {
      disableWebAudio: false
  },
  scene: [TestScene],
  parent: "app",
}
const game = new Phaser.Game(config);

