
import Phaser from 'phaser';
import PlayScene from './PlayScene';
import PreloadScene from './PreloadScene';
import ResultScene from './ResultScene';

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 680,
  /*scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 400,
      height: 170
    },
    max: {
      width: 1600,
      height: 680
    }
  },*/
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade'
    ,arcade: {debug: true}
  },
  scene: [PreloadScene, PlayScene, ResultScene]
};
new Phaser.Game(config);
