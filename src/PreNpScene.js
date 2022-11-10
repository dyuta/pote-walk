
//import Phaser from 'phaser';
import PreloadScene from './PreloadScene';
import Model from './model';
import Constants from './constants';
//import WebFontFile from './files/WebFontFile'
import MediaManager from './util/mediaManager';

export default class PreNpScene extends PreloadScene {

  constructor() {
    super('PreNpScene');
  }

  preload() {
    this.consts = new Constants();

    // ToDo Show POTE NOPE

    this.showLoadProgressBar();

    this.load.image('groundNP', 'assets/NP/ground_NP.png');
    this.load.image('backMountainNP', 'assets/NP/mountain_back.png');
    this.load.image('backMountainNP', 'assets/NP/cactus_back.png');

    this.load.image('buildingNP01', 'assets/NP/building1_OJhome.png');
    this.load.image('buildingNP02', 'assets/NP/building2_Supermarket.png');
    this.load.image('buildingNP03', 'assets/NP/building3_Studio.png');
    this.load.image('buildingNP04', 'assets/NP/building4_jupepark.png');
    this.load.image('buildingNP05', 'assets/NP/building5_bloodyhome.png');
    this.load.image('buildingNP06', 'assets/NP/building6_smallhouse.png');

    /*
    this.load.image('bookstoreicon01', 'assets/bookstore_icon/05_nenoi.png');
    this.load.image('bookstoreicon02', 'assets/bookstore_icon/06_marginaria.png');
    this.load.image('bookstoreicon03', 'assets/bookstore_icon/03_shoshiyuyaketoumi.png');
    this.load.image('bookstoreicon04', 'assets/bookstore_icon/02_brewbooks.png');
    this.load.image('bookstoreicon05', 'assets/bookstore_icon/04_sanyodo.png');
    this.load.image('bookstoreicon06', 'assets/bookstore_icon/01_futago_lion.png');
    */

    this.load.image('goalNP', 'assets/NP/building7_Goal_Cowboy.png');
    this.load.image('outYonderNP', 'assets/NP/OutYonder.png');

    this.load.spritesheet('mantisNP', 'assets/NP/mantis.png',{frameWidth: 240, frameHeight: 240});
    
    // Obstacle Original NP
    this.load.image('alienKids', 'assets/NP/Enemy_smallAlien.png');
    this.load.image('monkey', 'assets/NP/Enemy_Monky.png');
    this.load.spritesheet('motorcycleNP', 'assets/NP/Motorcycle_low_spr_large.png',{frameWidth: 96, frameHeight: 108});
    this.load.spritesheet('kunekuneNP', 'assets/NP/Enemy_kunekune.png',{frameWidth: 48, frameHeight: 104});
    this.load.spritesheet('UFONP', 'assets/NP/UFO_NP.png',{frameWidth: 96, frameHeight: 72});


    /*
    this.load.image('obstacle-1', 'assets/cactuses_small_1.png')
    this.load.image('obstacle-2', 'assets/cactuses_small_2.png')
    this.load.image('obstacle-3', 'assets/cactuses_small_3.png')
    this.load.image('obstacle-4', 'assets/cactuses_big_1.png')
    this.load.image('obstacle-5', 'assets/cactuses_big_2.png')
    this.load.image('obstacle-6', 'assets/cactuses_big_3.png')
    */

  }

  create() {
    this.model = new Model(this.consts);
    this.model.mediaManager = new MediaManager({scene:this});
    this.model.gameMode = this.consts.gameModes[2];

    this.scene.start('PlayScene',{model: this.model});
    
  }
}
