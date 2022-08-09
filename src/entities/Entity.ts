import Phaser from "phaser";
export class Entity extends Phaser.Physics.Arcade.Sprite {
    id: string;
    name: string;
    appearance: string;
    scale?: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string | Phaser.Textures.Texture,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}