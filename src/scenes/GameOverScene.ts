import GameOverLogo from "@/assets/images/gameOver.png";
import GameoverSound from "@/assets/sounds/gameOver.mp3";
import RestartButton from "@/assets/images/restartButton.png";
export default class GameOverScene extends Phaser.Scene {
    private restartGame: Phaser.GameObjects.Image;
  constructor() {
    super({
      key: "GameOverScene",
    });
    
  }
  preload() {
    this.load.image("gameOver", GameOverLogo);
    this.load.audio("gameOverSound", GameoverSound);
    this.load.image("restartButton", RestartButton);
  }
  create() {
    this.add.image(400, 300, "gameOver");
    this.restartGame = this.add.image(400, 400, "restartButton");
    // this.sound.add("gameOverSound");
    // this.sound.play("gameOverSound");
    this.handlestartEvent();
  }

  handlestartEvent() {
    this.restartGame.setInteractive(); // 让图片可交互
    // 鼠标移入事件
    this.restartGame.on("pointerover", () => {
      this.restartGame.setScale(1.25);
      this.input.setDefaultCursor("pointer");
    });

    //鼠标移出事件
    this.restartGame.on("pointerout", () => {
      this.restartGame.setScale(1.0);
      this.input.setDefaultCursor("default");
    });
    // 鼠标点击事件
    this.restartGame.on("pointerdown", () => {
      this.scene.start("PreloadScene");
      this.input.setDefaultCursor("default");
    });
  }
  
}