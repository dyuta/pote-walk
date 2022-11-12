
import PreloadScene from './PreloadScene';
import Model from './model';
import Constants from './constants';
import MediaManager from './util/mediaManager';

export default class PreNpScene extends PreloadScene {

  constructor(sceneName ='PreNpScene') {
    super(sceneName );
  }

  preload() {
    this.consts = new Constants();
    console.log("preLoadNPResources");

    //this.showLoadProgressBar();

    this.load.image('groundNP', 'assets/NP/ground_NP.png');
    this.load.image('backMountainNP', 'assets/NP/mountain_back.png');
    this.load.image('backMountainNP', 'assets/NP/cactus_back.png');

    this.load.image('buildingNP01', 'assets/NP/building1_OJhome.png');
    this.load.image('buildingNP02', 'assets/NP/building2_Supermarket.png');
    this.load.image('buildingNP03', 'assets/NP/building3_Studio.png');
    this.load.image('buildingNP04', 'assets/NP/building4_jupepark.png');
    this.load.image('buildingNP05', 'assets/NP/building5_bloodyhome.png');
    this.load.image('buildingNP06', 'assets/NP/building6_smallhouse.png');

    this.load.image('goalNP', 'assets/NP/building7_Goal_Cowboy.png');
    this.load.image('outYonderNP', 'assets/NP/OutYonder.png');

    this.load.spritesheet('mantisNP', 'assets/NP/mantis.png',{frameWidth: 240, frameHeight: 240});
    
    // Obstacle Original NP
    this.load.image('alienKids', 'assets/NP/Enemy_smallAlien.png');
    this.load.image('monkey', 'assets/NP/Enemy_Monky.png');
    this.load.spritesheet('motorcycleNP', 'assets/NP/Motorcycle_low_spr_large.png',{frameWidth: 96, frameHeight: 108});
    this.load.spritesheet('kunekuneNP', 'assets/NP/Enemy_kunekune.png',{frameWidth: 48, frameHeight: 104});
    this.load.spritesheet('UFONP', 'assets/NP/UFO_NP.png',{frameWidth: 96, frameHeight: 72});

  }

  create() {
    this.model = new Model(this.consts);
    this.model.mediaManager = new MediaManager({scene:this});
    this.model.gameMode = this.consts.gameModes[2];
    console.log("mode: "+this.model.gameMode);

    this.scene.start('PlayNPScene',{model: this.model});
    
  }
}
