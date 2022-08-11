export default class MouseController {
  isPointerDown: boolean;
  sprite: Phaser.Physics.Arcade.Sprite;
  input: Phaser.Input.InputManager;
  scene: Phaser.Scene;
  combos: Phaser.Input.Keyboard.KeyCombo[] = [];
  constructor(
    sprite: Phaser.Physics.Arcade.Sprite,
    input: Phaser.Input.InputPlugin,
    scene: Phaser.Scene
  ) {
    this.input = input;
    this.sprite = sprite;
    this.scene = scene;
    this.onEvent();
    this.specialAttack();
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

  specialAttack() {
    // 组合键攻击
    const combo = this.scene.input.keyboard.createCombo("CA", {
      resetOnMatch: true,
    });
    this.scene.input.keyboard.on("keycombomatch", (event) => {
      this.scene.playerPlane.specialAttack();
      console.log("combo");
    })
    this.combos.push(combo);
  }
}
