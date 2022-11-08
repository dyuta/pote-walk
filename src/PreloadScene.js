
import Phaser from 'phaser';
import Model from './model';
import Constants from './constants';
import WebFontFile from './files/WebFontFile'
import MediaManager from './util/mediaManager';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.consts = new Constants();

    this.showLoadProgressBar();

    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    this.load.audio('mainbgm', 'assets/PW_01_Play_2022-11-06.mp3');
    this.load.audio('bookSound', 'assets/PW_02_Book_2022-11-05.mp3');
    this.load.audio('jumpSound', 'assets/PW_03_Jump_2022-11-05.mp3');
    this.load.audio('damageSound', 'assets/PW_04_Damage_2022-11-05.mp3');
    this.load.audio('coinSound', 'assets/PW_05_Coin_2022-11-05.mp3');
    this.load.audio('clearbgm', 'assets/PM_07_ED_2022-05-08.mp3');

    this.load.image('ground', 'assets/ground.png');
    //this.load.image('dino-idle', 'assets/dino-idle.png');
    //this.load.image('dino-hurt', 'assets/dino-hurt.png');
    this.load.image('restart', 'assets/restart.png');
    //this.load.image('game-over', 'assets/game-over.png');
    this.load.image('cloud', 'assets/cloud.png');

    this.load.image('pote-idle', 'assets/pote04_idle2.png');
    this.load.image('pote-hurt', 'assets/pote05_hurt2.png');
    
    this.load.image('bookstore01', 'assets/shop_1_Nenoi.png');
    this.load.image('bookstore02', 'assets/shop_3_Marginalia.png');
    this.load.image('bookstore03', 'assets/shop_4_ShoshiYuYaketoUmi.png');
    this.load.image('bookstore04', 'assets/shop_5_BrewBooks.png');
    this.load.image('bookstore05', 'assets/shop_6_Sanyodo.png');
    this.load.image('bookstore06', 'assets/shop_2_Futago.png');

    this.load.image('bookstoreicon01', 'assets/bookstore_icon/05_nenoi.png');
    this.load.image('bookstoreicon02', 'assets/bookstore_icon/06_marginaria.png');
    this.load.image('bookstoreicon03', 'assets/bookstore_icon/03_shoshiyuyaketoumi.png');
    this.load.image('bookstoreicon04', 'assets/bookstore_icon/02_brewbooks.png');
    this.load.image('bookstoreicon05', 'assets/bookstore_icon/04_sanyodo.png');
    this.load.image('bookstoreicon06', 'assets/bookstore_icon/01_futago_lion.png');

    this.load.image('potehome', 'assets/home_tmp.png');
    this.load.image('homeInside', 'assets/HomeInside2.png');
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

    this.load.spritesheet('coinBookIcon', 'assets/Coin_Book_icon.png', {
      frameWidth: 32, frameHeight: 32
    });

    this.load.spritesheet('star', 'assets/stars.png', {
      frameWidth: 9, frameHeight: 9
    });

    this.load.spritesheet('moon', 'assets/moon.png', {
      frameWidth: 20, frameHeight: 40
    });

    /*
    this.load.spritesheet('dino', 'assets/dino-run.png', {
      frameWidth: 88,
      frameHeight: 94
    })

    this.load.spritesheet('dino-down', 'assets/dino-down.png', {
      frameWidth: 118,
      frameHeight: 94
    })
    */

    this.load.spritesheet('enemy-bird', 'assets/bird_pigeon.png', {
      frameWidth: 96,
      frameHeight: 72
    })

    this.load.spritesheet('UFO-X', 'assets/UFO_alienX.png', {
      frameWidth: 96,
      frameHeight: 72
    })
    
    this.load.spritesheet('pote', 'assets/pote03_run2.png', {
      frameWidth: 88,
      frameHeight: 94
    })

    this.load.spritesheet('coin', 'assets/coin01_gold01_spriteSheet.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    // Obstacle Original
    this.load.spritesheet('obstacleOrg-1', 'assets/Bicycle_low_spr_large.png', {
      frameWidth: 96,
      frameHeight: 108
    })

    this.load.image('obstacle-1', 'assets/cactuses_small_1.png')
    this.load.image('obstacle-2', 'assets/Plant_2_small_small.png')
    this.load.image('obstacle-3', 'assets/Plant_3_small_tall.png')
    this.load.image('obstacle-4', 'assets/Plant_4_middle_small.png')
    this.load.image('obstacle-5', 'assets/Plant_3_small_tall.png')
    //this.load.image('obstacle-5', 'assets/Plant_5_middle_tall2.png')
    this.load.image('obstacle-6', 'assets/Plant_6_wide_tall.png')

    /*
    this.load.image('obstacle-1', 'assets/cactuses_small_1.png')
    this.load.image('obstacle-2', 'assets/cactuses_small_2.png')
    this.load.image('obstacle-3', 'assets/cactuses_small_3.png')
    this.load.image('obstacle-4', 'assets/cactuses_big_1.png')
    this.load.image('obstacle-5', 'assets/cactuses_big_2.png')
    this.load.image('obstacle-6', 'assets/cactuses_big_3.png')
    */

    // font loader
    this.load.addFile(new WebFontFile(this.load, 
      ['Concert One','Roboto','Zen Maru Gothic','Noto Sans JP','Sawarabi Gothic'
      //,'Mulish','Open Sans','Comfortaa','Staatliches','Press Start 2P','Maven Pro'
      ]
      ))
  }

  showLoadProgressBar(){
    let progressBar = this.add.graphics();
    let width = this.game.config.width;
    let height = this.game.config.height;
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let loadingText = this.make.text({
        x: width / 2,
        y: height / 4 + 30,
        text: 'Loading...',
        style: this.consts.fontoConf.counter
      });
    loadingText.setOrigin(0.5, 0.5);

    let loadingfileText = this.make.text({
        x: width / 2,
        y: height / 4 + 50,
        text: 'files',
        style: this.consts.fontoConf.counter
      });
    loadingfileText.setOrigin(0.5, 0.5);
        
    this.load.on('progress', function (value) {
      //console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
      });
                    
    this.load.on('fileprogress', function (file) {
        console.log(file.src);
        loadingfileText.setText(file.src);
      });
    this.load.on('complete', function () {
        console.log('complete');
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
      });
  }

  create() {
    this.model = new Model(this.consts);
    this.model.mediaManager = new MediaManager({scene:this});

    //this.scene.start('PlayScene',{model: this.model});

    // for result Scene debug
    
    this.model.result.book =11;
    this.model.result.coin =12;
    this.model.result.coinGen =14;
    this.scene.start('ResultScene',{model: this.model});
    
  }
}

export default PreloadScene;
