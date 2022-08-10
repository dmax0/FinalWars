import Tom from "@/assets/images/players/tom.png";
import Bullet1 from "@/assets/images/bullets/bullet1.png"
import Shoot1 from "@/assets/sounds/bullets/shoot1.mp3"
import { State } from "@/entities/State";

export interface PlayerInfo {
    id: string;
    name: string;
    appearance: string;
    bulletAppearance: string;
    shootSound: string;
    shootSpeed: number;
    fireRate: number;
    state: State;
    scale: number;
    damage: number;
}
export const playerInfo: PlayerInfo = {
    id: "10001",
    name: "Tom",
    appearance: Tom,
    bulletAppearance: Bullet1,
    shootSound: Shoot1,
    shootSpeed: 400,
    fireRate: 0.15,
    state: State.ACTIVE,
    scale: 0.8,
    damage: 10,
}