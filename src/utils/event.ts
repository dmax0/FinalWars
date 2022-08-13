export const handleButtonEvent = (
  image: Phaser.GameObjects.Image,
  scene: Phaser.Scene,
  key: string,
  info: object,
  thisArg?: any
) => {
  image.setInteractive(); // 让图片可交互
  // 鼠标移入事件
  image.on("pointerover", () => {
    image.setScale(1.25);
    thisArg.input.setDefaultCursor("pointer");
  });

  //鼠标移出事件
  image.on("pointerout", () => {
    image.setScale(1.0);
    thisArg.input.setDefaultCursor("default");
  });
  // 鼠标点击事件
  image.on("pointerdown", () => {
    scene.start(key, {...info});
    thisArg.input.setDefaultCursor("default");
  });
};
