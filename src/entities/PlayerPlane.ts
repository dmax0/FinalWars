import { Scene } from "phaser";
import { State } from "@/entities/State";
import { Entity } from "./Entity";
import { player } from "@/data/player";
import { set } from "@/utils/set";

export default class PlayerPlane extends Entity {
  id: string;
  name: string;
  appearance: string; /** 图片 */
  bulletAppearance: string;
  shootSound: string; /** 射击音效 */

  shootSpeed: number;
  state: State;
  scale?: number; /** 缩放比例 */

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ) {
    super(scene, x, y, texture);
    // set(this, player, this.setData);
  }
}
