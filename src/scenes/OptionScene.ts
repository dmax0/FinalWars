import left from "@/assets/images/buttons/left.png";
import right from "@/assets/images/buttons/right.png";
import ok from "@/assets/images/buttons/ok.png";
import {
  changePlayerInfo,
  mike,
  PlayerInfo,
  playerInfo,
  tom,
} from "@/data/player";
import { handleButtonEvent } from "@/utils/event";
export class OptionScene extends Phaser.Scene {
  Text: Phaser.GameObjects.Text;
  Plane: Phaser.GameObjects.Image;
  OK: Phaser.GameObjects.Image;
  Left: Phaser.GameObjects.Image;
  Right: Phaser.GameObjects.Image;
  playerInfo: PlayerInfo;
  planeInfoArray: PlayerInfo[] = [mike, tom];
  current: number = 1;
  constructor() {
    super("OptonScene");
  }
  preload() {
    this.load.image("left", left);
    this.load.image("right", right);
    this.load.image("Tom", tom.appearance);
    this.load.image("Mike", mike.appearance);
    this.load.image("ok", ok);
  }
  create() {
    this.playerInfo = { ...mike };
    this.Plane = this.add.image(400, 300, this.playerInfo.name);
    this.Text = this.add.text(
      this.sys.game.config.width / 2 - 100,
      50,
      "选择你的战机",
      {
        font: "34px ",
        fill: "#ffff00",
        padding: { x: 10, y: 10 },
        fontStyle: "bold",
      }
    );
    this.Left = this.add.image(
      this.sys.game.config.width / 2 - 150,
      this.sys.game.config.height / 2,
      "left"
    );
    this.Right = this.add.image(
      this.sys.game.config.width / 2 + 150,
      this.sys.game.config.height / 2,
      "right"
    );
    this.OK = this.add.image(400, 500, "ok");

    this.Left.setInteractive();
    this.Right.setInteractive();
    this.OK.setInteractive();
    this.Left.on("pointerover", () => {
      this.Left.setScale(1.1);
      this.input.setDefaultCursor("pointer");
    })
      .on("pointerout", () => {
        this.Left.setScale(1);
        this.input.setDefaultCursor("default");
      })
      .on("pointerdown", () => {
        this.handleLeft();
      });
    this.Right.on("pointerover", () => {
      this.Right.setScale(1.1);
      this.input.setDefaultCursor("pointer");
    })
      .on("pointerout", () => {
        this.Right.setScale(1);
        this.input.setDefaultCursor("default");
      })
      .on("pointerdown", () => {
        this.handlerRight();
      });
    this.OK.on("pointerover", () => {
      this.OK.setScale(1.1);
      this.input.setDefaultCursor("pointer");
    })
      .on("pointerout", () => {
        this.OK.setScale(1);
        this.input.setDefaultCursor("default");
      })
      .on("pointerdown", () => {
        this.scene.start("GameScene", this.playerInfo);
        this.input.setDefaultCursor("default");
      });
  }

  update(time: number, delta: number): void {}
  // 切换战机动画
  changePlaneAnimation() {}
  handleLeft() {
    // this.changePlaneAnimation();

    this.playerInfo = this.planeInfoArray[this.current];
    this.current = (this.current + 1) % this.planeInfoArray.length;
    this.Plane.setTexture(this.playerInfo.name);
    // console.log(this.playerInfo);
  }

  handlerRight() {
    // this.changePlaneAnimation();

    this.playerInfo = this.planeInfoArray[this.current];
    this.current = (this.current + 1) % this.planeInfoArray.length;
    this.Plane.setTexture(this.playerInfo.name);
  }
}
