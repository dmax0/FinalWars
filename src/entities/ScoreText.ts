export class ScoreText  {
    Text: Phaser.GameObjects.Text;
  style: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "Arial",
    fontSize: "20px",
    color: "#ffff00",
    align: "center",
    backgroundColor: "#000000",
    padding: {
        x: 10,
        y: 10,
    },
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
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.text = text;
    this.start();
  }
  start() {
    this.Text = this.scene.add.text(this.x, this.y, this.text, this.style);
  }

  setStyle(style: Phaser.Types.GameObjects.Text.TextStyle) {
    this.style = style;
  }
  changeText(text: string) {
    this.Text.setText(text);
  }
}
