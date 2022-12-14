import  GameScene  from "./scenes/GameScene";
import { TestScene } from "./scenes/TestScene";
import PreloadScene from "./scenes/PreloadScene";
import GameOverScene from "./scenes/GameOverScene";
import { OptionScene } from "./scenes/OptionScene";
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 650,
  physics: {
      default: "arcade",
      gravity: { y: 0 }
  },
  zoom: 1.0,
  audio: {
      disableWebAudio: false
  },
  scene: [PreloadScene, GameScene, GameOverScene, OptionScene],
  parent: "app",
}
const game = new Phaser.Game(config);

