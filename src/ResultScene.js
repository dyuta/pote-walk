import Phaser from 'phaser';
import Constants from './constants';
import Model from './model';
import MediaManager from './util/mediaManager';

class ResultScene extends Phaser.Scene {

  constructor() {
    super('ResultScene');
  }
  init(data){
    this.model = data.model;
    console.log('init result ');
  }

  create() {
    this.consts = new Constants();
    this.isGamerunning = false;
    this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh);
    this.PassedTime=0;
    
    this.model.mediaManager.setBGM('clearbgm',0.06);

    //debug text
    //this.debugText = this.add.text(10, 10, 'for debug', { fill: '#00ffff' });

    this.groundInitwidth = 100;
    this.jumpVelocity = -1250;
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.bgHome = this.add.image(280-220,28,"homeInside").setOrigin(0,0);
    const bookNum = Math.min(18,this.model.result.book);
    this.bookTower = this.add.image(560-220,124,`endingBook${bookNum}`).setOrigin(0,0).setAlpha(0);
    
    //this.add.image(630-220,124,"endingBookMask").setOrigin(0,0);


    //this.bgLayer = this.add.layer();
    this.startTrigger = this.physics.add.sprite(width * 1/10, groundHeight)
    .setBodySize(260,20).setOrigin(0, 1).setImmovable();

    this.resultTrigger = this.physics.add.sprite(width * 1/10 + 200, groundHeight)
    .setBodySize(20,20).setOrigin(0, 1).setImmovable();
    this.resultTrigger.hitflag = false;

    //this.startTrigger.setBodySize(200,20);
    this.poteGround = this.physics.add.image(width * 1/2, groundHeight+26).setSize(width,20).setOrigin(0, 1).setImmovable();
    // this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    
    this.pote = this.physics.add.sprite(width * 1/10, groundHeight, 'pote-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;

    // restart button
    this.gameClearScreen = this.add.container(width * 1/2 - 0, 130).setAlpha(0)
    //this.gameClearText = this.add.image(0, 0, 'game-over');
    
    if(this.model.result.miss == 0 &&
      this.model.result.coin == this.model.result.coinGen){
      this.GameClearStr ="Perfect!";
    } else {
      this.GameClearStr ="Clear!";
    }
    this.GameResultStr = 
    `book: ${this.model.result.book}\ncoin: ${this.model.result.coin} / ${this.model.result.coinGen}\nmiss: ${this.model.result.miss}`;

    this.gameClearText = this.add.text(0, 0, this.GameClearStr, this.consts.fontoConf.resultTitle)
      .setOrigin(0,0.5);
    this.gameClearText.setStroke('#ffffff', 8);
    this.gameResultText = this.add.text(0, 74, this.GameResultStr, this.consts.fontoConf.resultDetail)
      .setOrigin(0,0.5);
    this.gameResultText.setStroke('#ffffff', 5);
    this.restart = this.add.image(20, 160, 'restart').setInteractive()
      .setOrigin(0,0.5);
    this.gameClearScreen.add([
      this.gameClearText, this.gameResultText,  this.restart
    ])
    
    this.initColliders();
    this.initAnims();    
    this.initStartTrigger();
    this.handleInputs();
  }

  initColliders(){
    // ground
    this.physics.add.collider(this.pote, this.poteGround);

    // result trigger
    this.physics.add.overlap(this.resultTrigger, this.pote, (rslt, p) =>{
      if(rslt.hitflag == true){return;}
      console.log('show result');
      rslt.hitflag = true;
      // show books
      this.bookTower.setAlpha(1);

      // show results
      this.gameClearScreen.setAlpha(1);
    }
    , null, this);
  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{
      console.log('overlap');
      this.pote.x +=1;
      this.pote.play('pote-run',1);     

    }
    , null, this);
  }

  initAnims() {

    // #Todo replace with other animation
    this.anims.create({
      key: 'pote-run',
      frames: this.anims.generateFrameNumbers('pote', {start: 1, end: 2}),
      frameRate: 10,
      repeat: -1
    })

  }

  handleInputs() {
    this.restart.on('pointerdown', () => {
      this.restartGame();
    }, this)

    this.input.on("pointerdown", () => {
      if (!this.pote.body.onFloor()){ return; }
      this.pote.setVelocityY(this.jumpVelocity);

    }, this)
  }

  restartGame(){
    this.model.mediaManager.stopBGM();
    // set default value
    this.model = new Model();
    // ToDo move mediaManager from model
    this.model.mediaManager = new MediaManager({scene:this});
    this.scene.start('PlayScene',{model: this.model});
  }

  update(time, delta) {
    const {height, width} = this.game.config;
    //this.PassedTime += delta;
    //this.debugText.setText('PassedTime: ' + this.PassedTime);
    /*if(this.pote.x > width * 1/10 + 80){
      this.gameClearScreen.setAlpha(1);
    }*/

    /*if(this.PassedTime > 10000){
      this.restartGame();
    }*/

    // player potato effect
    if (this.pote.hitPose){
      this.pote.setTexture("pote-hurt");
    } else if (!this.pote.body.onFloor()) {
      this.pote.anims.stop();
      this.pote.setTexture('pote');

    } else {
      this.pote.play('pote-run',true);
    }

  }
}

export default ResultScene;
