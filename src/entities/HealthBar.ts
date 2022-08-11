export default class HealthBar {
  scene: Phaser.Scene;
  bar: Phaser.GameObjects.Graphics;
  value: number;

  width: number = 200;
  height: number = 10;

  x: number;
  y: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    height: number,
    width: number
  ) {
    this.scene = scene;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.value = 100;
    this.draw();
    scene.add.existing(this.bar);
  }
  fill() {
    this.bar.fillRect(
      this.x + 2,
      this.y + 2,
      this.width * (this.value / 100),
      this.height
    );
  }
  draw() {
    this.bar.clear();
    // Background
    this.bar.fillStyle(0x00000, 1);
    this.bar.fillRect(this.x, this.y, this.width, this.height);
    // HealthBar
    this.bar.fillStyle(0x00ff00, 1);
    this.fill();

    if (this.value < 30) {

      this.bar.fillStyle(0xff0000, 1);
      this.fill();
    } else if (this.value < 60) {

      this.bar.fillStyle(0xffff00, 1);
      this.fill();
    } else {

      this.bar.fillStyle(0x00ff00, 1);
    }
  }
  decrease(amount: number) {
    this.value -= amount;
    if (this.value < 0) {
      this.value = 0;
    }
    this.draw();
  }

  increase(amount: number) {
    this.value += amount;
    if (this.value > 100) {
      this.value = 100;
    }
    this.draw();
  }
}
