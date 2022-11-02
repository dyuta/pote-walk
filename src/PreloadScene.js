
import Phaser from 'phaser';
import Model from './model';
import WebFontFile from './files/WebFontFile'

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

    this.load.image('bookstore01', 'assets/shop_1_Nenoi.png');
    this.load.image('bookstore02', 'assets/shop_2_Futago.png');
    this.load.image('bookstore03', 'assets/shop_3_Marginalia.png');
    this.load.image('bookstore04', 'assets/shop_4_ShoshiYuYaketoUmi.png');
    this.load.image('bookstore05', 'assets/shop_5_BrewBooks.png');
    this.load.image('bookstore06', 'assets/shop_6_Sanyodo.png');

    this.load.image('potehome', 'assets/home_tmp.png');
    this.load.image('homeInside', 'assets/HomeInside.png');
    this.load.image('endingBook', 'assets/endingBook.png');
    this.load.image('endingBook0', 'assets/endingBook0.png');
    this.load.image('endingBook1', 'assets/endingBook1.png');
    this.load.image('endingBook2', 'assets/endingBook2.png');
    this.load.image('endingBook3', 'assets/endingBook3.png');
    this.load.image('endingBook4', 'assets/endingBook4.png');
    this.load.image('endingBook5', 'assets/endingBook5.png');
    this.load.image('endingBook6', 'assets/endingBook6.png');
    this.load.image('endingBook7', 'assets/endingBook7.png');
    this.load.image('endingBook8', 'assets/endingBook8.png');
    this.load.image('endingBook9', 'assets/endingBook9.png');
    this.load.image('endingBook10', 'assets/endingBook10.png');
    this.load.image('endingBook11', 'assets/endingBook11.png');
    this.load.image('endingBook12', 'assets/endingBook12.png');
    this.load.image('endingBook13', 'assets/endingBook13.png');
    this.load.image('endingBook14', 'assets/endingBook14.png');
    this.load.image('endingBook15', 'assets/endingBook15.png');
    this.load.image('endingBook16', 'assets/endingBook16.png');
    this.load.image('endingBook17', 'assets/endingBook17.png');
    this.load.image('endingBook18', 'assets/endingBook18.png');

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

    this.load.spritesheet('coin', 'assets/coin01_gold01_spriteSheet.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.image('obstacle-1', 'assets/cactuses_small_1.png')
    this.load.image('obstacle-2', 'assets/cactuses_small_2.png')
    this.load.image('obstacle-3', 'assets/cactuses_small_3.png')
    this.load.image('obstacle-4', 'assets/cactuses_big_1.png')
    this.load.image('obstacle-5', 'assets/cactuses_big_2.png')
    this.load.image('obstacle-6', 'assets/cactuses_big_3.png')

    // font loader
    this.load.addFile(new WebFontFile(this.load, 
      ['Concert One','Roboto','Zen Maru Gothic','Noto Sans JP','Sawarabi Gothic'
      //,'Mulish','Open Sans','Comfortaa','Staatliches','Press Start 2P','Maven Pro'
      ]
      ))
  }

  create() {
    this.model = new Model();
    this.scene.start('PlayScene',{model: this.model});

    // for debug
    //this.scene.start('ResultScene',{model: this.model});
  }
}

export default PreloadScene;
