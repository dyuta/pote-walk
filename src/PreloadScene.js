
import Phaser from 'phaser';
import Model from './model';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    this.load.image('ground', 'assets/ground.png');
    this.load.image('dino-idle', 'assets/dino-idle.png');
    this.load.image('dino-hurt', 'assets/dino-hurt.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.image('game-over', 'assets/game-over.png');
    this.load.image('cloud', 'assets/cloud.png');

    this.load.image('pote-idle', 'assets/pote_idle2.png');
    this.load.image('pote-hurt', 'assets/pote_hurt.png');

    this.load.image('bookstore01', 'assets/bookstore_01temp.png');
    this.load.image('potehome', 'assets/home_tmp.png');

    this.load.spritesheet('star', 'assets/stars.png', {
      frameWidth: 9, frameHeight: 9
    });

    this.load.spritesheet('moon', 'assets/moon.png', {
      frameWidth: 20, frameHeight: 40
    });

    this.load.spritesheet('dino', 'assets/dino-run.png', {
      frameWidth: 88,
      frameHeight: 94
    })

    this.load.spritesheet('dino-down', 'assets/dino-down.png', {
      frameWidth: 118,
      frameHeight: 94
    })

    this.load.spritesheet('enemy-bird', 'assets/enemy-bird.png', {
      frameWidth: 92,
      frameHeight: 77
    })
    
    this.load.spritesheet('pote', 'assets/pote_run2.png', {
      frameWidth: 88,
      frameHeight: 94
    })

    this.load.image('obstacle-1', 'assets/cactuses_small_1.png')
    this.load.image('obstacle-2', 'assets/cactuses_small_2.png')
    this.load.image('obstacle-3', 'assets/cactuses_small_3.png')
    this.load.image('obstacle-4', 'assets/cactuses_big_1.png')
    this.load.image('obstacle-5', 'assets/cactuses_big_2.png')
    this.load.image('obstacle-6', 'assets/cactuses_big_3.png')
  }

  create() {
    this.model = new Model();
    this.scene.start('PlayScene',{model: this.model});
  }
}

export default PreloadScene;