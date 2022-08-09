import Tom from "@/assets/images/players/tom.png";
import Bullet1 from "@/assets/images/bullets/bullet1.png"
import Shoot1 from "@/assets/sounds/bullets/shoot1.mp3"
export const player = {
    id: "10001",
    name: "Tom",
    appearance: Tom,
    bulletAppearance: Bullet1,
    shootSound: Shoot1,
    shootSpeed: 0.4,
    state: 'ALIVE',
    scale: 0.75
}