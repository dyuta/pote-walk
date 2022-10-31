import Phaser from 'phaser';
import Constants from './constants';
import Model from './model';

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
    this.PassedTime=0;

    //debug text
    this.debugText = this.add.text(10, 10, 'for debug', { fill: '#00ffff' });

    this.groundInitwidth = 100;
    this.jumpVelocity = -1250;
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    //this.bgLayer = this.add.layer();
    this.startTrigger = this.physics.add.sprite(width * 1/3, groundHeight).setOrigin(0, 1).setImmovable();
    this.startTrigger.setBodySize(80,20);
    this.poteGround = this.physics.add.image(width * 1/3, groundHeight+26).setSize(width,20).setOrigin(0, 1).setImmovable();
    // this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    
    this.pote = this.physics.add.sprite(width * 1/3, groundHeight, 'pote-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;

    // restart button
    this.gameClearScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(0)
    //this.gameClearText = this.add.image(0, 0, 'game-over');
    this.GameClearStr ="Clear!";
    this.gameClearText = this.add.text(0, 0, this.GameClearStr, this.consts.fontoConf.resultTitle);
    this.restart = this.add.image(0, 80, 'restart').setInteractive();
    this.gameClearScreen.add([
      this.gameClearText,  this.restart
    ])
    
    this.initColliders();
    this.initAnims();    
    this.initStartTrigger();
    this.handleInputs();
  }

  initColliders(){
    // ground
    this.physics.add.collider(this.pote, this.poteGround);
  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{
      console.log('overlap');
      this.pote.x +=1;
      this.pote.play('pote-run',1);     
      //this.startTrigger.disableBody(true, true);
      
      /*const startEvent = this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callbackScope: this,
        callback: () => {
          //this.pote.setVelocityX(80);
          Phaser.Actions.IncX(this.pote,4);
          this.pote.play('pote-run',1);
        }
      

      })*/
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
    // set default value
    this.model = new Model();
    this.scene.start('PlayScene',{model: this.model});
  }

  update(time, delta) {
    const {height, width} = this.game.config;
    this.PassedTime += delta;
    this.debugText.setText('PassedTime: ' + this.PassedTime);
    if(this.pote.x > width * 1/3 + 30){
      this.gameClearScreen.setAlpha(1);
    }

    if(this.PassedTime > 10000){
      this.restartGame();
    }

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
