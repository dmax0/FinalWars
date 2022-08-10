export default class MouseController {
  isPointerDown: boolean;
  sprite: Phaser.Physics.Arcade.Sprite;
  input: Phaser.Input.InputManager;
  scene: Phaser.Scene;
  constructor(
    sprite: Phaser.Physics.Arcade.Sprite,
    input: Phaser.Input.InputPlugin,
    scene: Phaser.Scene
  ) {
    this.input = input;
    this.sprite = sprite;
    this.scene = scene;
    this.onEvent();
  }

  onEvent() {
    this.sprite
      .on("pointerdown", () => {
        this.isPointerDown = true;
        this.scene.x = this.sprite.x;
        this.scene.y = this.sprite.y;
      })
      .on("pointerup", () => {
        this.isPointerDown = false;
      })
    //   .on("pointerout", () => {
    //     this.isPointerDown = false;
    //   })

    this.input.on("pointermove", (pointer) => {
      if (this.isPointerDown) {
        this.sprite.setPosition(pointer.x, pointer.y);
      }
    });
  }
}
