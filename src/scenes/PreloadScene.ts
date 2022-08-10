import FinalWar from "@/assets/images/bg1.png";
import startButton from "@/assets/images/startButton.png";
export default class PreloadScene extends Phaser.Scene {
    private homeSceneWidth: number;
  private homeSceneHeight: number;
  private startGame: Phaser.GameObjects.Image;
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.homeSceneWidth = this.sys.game.config.width as number;
    this.homeSceneHeight = this.sys.game.config.height as number;
    this.load.image("startButton", startButton);
    this.load.image("FinalWar", FinalWar, {
      width: this.homeSceneWidth,
      height: this.homeSceneHeight,
    });
  }
  create() {
    this.createBackground();
    this.createTitle();
    this.createStartButton();
    this.handlestartEvent();
  }
  update() {}

  createBackground() {
    const background = this.add.image(
      this.homeSceneWidth / 2,
      this.homeSceneHeight / 2,
      "FinalWar"
    );
    background.setScale(2)
  }

  createTitle() {
    const { homeSceneHeight, homeSceneWidth } = this;
    const title = this.add.text(
      homeSceneWidth / 3,
      homeSceneHeight / 4,
      "FinalWar",
      {
        font: "64px ",
        fill: "#ffff00",
        padding: { x: 10, y: 10 },
        fontStyle: "bold",
        testString: "FinalWar",
        shadow: {
            offsetX: 4,
            offsetY: 4,
            color: "#000000",
            blur: 2,
            stroke: true,
            fill: true,
        },
      }
    );
  }
  createStartButton() {
    const { homeSceneHeight, homeSceneWidth } = this;
    this.startGame = this.add.image(
      homeSceneWidth / 2,
      homeSceneHeight / 1.25,
      "startButton"
    );
  }

  handlestartEvent() {
    this.startGame.setInteractive(); // 让图片可交互
    // 鼠标移入事件
    this.startGame.on("pointerover", () => {
      this.startGame.setScale(1.25);
      this.input.setDefaultCursor("pointer");
    });

    //鼠标移出事件
    this.startGame.on("pointerout", () => {
      this.startGame.setScale(1.0);
      this.input.setDefaultCursor("default");
    });
    // 鼠标点击事件
    this.startGame.on("pointerdown", () => {
      this.scene.start("GameScene");
      this.input.setDefaultCursor("default");
    });
  }
}