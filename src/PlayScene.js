import Phaser from 'phaser';
import Constants from './constants';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }
  init(data){
    this.model = data.model;
    
  }

  create() {
    this.consts = new Constants();
    this.isGamerunning = false;
    
    this.gameSpeed = 10;
    this.obsRespawnTime = 0;
    this.storeRespawnTime = 0;
    this.groundInitwidth = 100;
    this.jumpVelocity = -1250;
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;
    

    //this.bgLayer = this.add.layer();
    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.poteGround = this.physics.add.image(0, groundHeight+26).setSize(250,20).setOrigin(0, 1).setImmovable();
    this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    this.objLayer = this.add.layer();
    this.bookStoreLayer = this.add.layer();
    this.pote = this.physics.add.sprite(0, groundHeight, 'pote-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;
    
    this.obstacles = this.physics.add.group();
    this.bookStores = this.physics.add.group();
    
    this.initAnims();
    this.initColliders();
    
    this.initStartTrigger();
    this.handleInputs();

  }

  initColliders(){
    // ground
    this.physics.add.collider(this.pote, this.poteGround);
    // bookstore overlap
    this.physics.add.overlap(this.pote, this.bookStores, (p, bookstore) => {
      // execute once on collision
      if(!bookstore.hitFlg){
        console.log("enter store");
        bookstore.hitFlg = true;

        // set store visit status
        // #ToDo move to model
        this.model.storeVisit[`store${bookstore.bookStoreNum}`] = true;
        // this.storeVisit[`store${bookstore.bookStoreNum}`] = true;
        console.log(this.model.storeVisit["store1"]);
      }
    }, null, this);

    // obstacle overlap
    this.physics.add.overlap(this.pote, this.obstacles, (p, obstacle) => {
      // execute once on collision
      if(!obstacle.hitFlg){
        console.log("hit");
        obstacle.hitFlg = true;  
        // set hurt status
        if(!this.pote.hitPose){
          this.pote.hitPose = true;
          console.log("hit-pose");
          
          this.timerOneShot = this.time.delayedCall(
            300, ()=>{this.pote.hitPose = false}, this
          );
        }
      }

    }, null, this)
    // item

  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{

      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, groundHeight);
        return;
      }
      
      this.startTrigger.disableBody(true, true);
      
      const startEvent = this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callbackScope: this,
        callback: () => {
          this.pote.setVelocityX(80);
          this.pote.play('pote-run',1);

          if (this.ground.width < width ) {
            this.ground.width += 17 *2;
          } else {
            this.ground.width = width;
            this.isGamerunning = true;
            this.pote.setVelocityX(0);
            startEvent.remove();
          }

        }

      })
    }
    , null, this);
  }

  initAnims() {
    this.anims.create({
      key: 'pote-run',
      frames: this.anims.generateFrameNumbers('pote', {start: 1, end: 2}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-bird-fly',
      frames: this.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })

  }

  handleInputs() {
    this.input.on("pointerdown", () => {
      if (!this.pote.body.onFloor()){ return; }
      this.pote.setVelocityY(this.jumpVelocity);

    }, this)
  }

  placeObstacle(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;
    const obstacleNum = Math.floor(Math.random() * 7) + 1;
    //const obstacleNum = 7;
    const obstacleDistance = Phaser.Math.Between(500, 750);

    let obstacle;
    console.log(obstacleNum);

    if(obstacleNum > 6) {
      console.log('bird');
      const enemyHeight = [22, 50];
      obstacle = this.obstacles
      .create(width + obstacleDistance, groundHeight - enemyHeight[Math.floor(Math.random() * 2)],'enemy-bird');
      obstacle.play('enemy-bird-fly', 1);
      obstacle.body.height = obstacle.body.height / 1.5;
    } else {
      obstacle = this.obstacles
      .create(width + obstacleDistance, groundHeight, `obstacle-${obstacleNum}`);
      obstacle.body.offset.y = +5;
    }

    obstacle
    .setOrigin(0, 1)
    .setImmovable();
    obstacle.hitFlg=false;
    
    this.objLayer.add(obstacle);
  }

  placeBookstore(bookStoreNum){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;

    //const obstacleNum = 7;
    const bookStoreDistance = 400;

    let bookStore;
    console.log(bookStoreNum);

    if(bookStoreNum == 1) {
      console.log('bookStore01');
      bookStore = this.bookStores
      .create(width + bookStoreDistance, groundHeight,'bookstore01');
    } else {

    }

    bookStore
    .setOrigin(0, 1)
    .setImmovable();
    bookStore.hitFlg=false;
    bookStore.bookStoreNum=bookStoreNum;
    
    this.bookStoreLayer.add(bookStore);
  }

  update(time, delta) {
    if (!this.isGamerunning) { return; }
    const obsRespawnInterval = this.consts.obsRespawnInterval;
    const storeRespawnInterval = this.consts.storeRespawnInterval;

    // ground scroll
    this.ground.tilePositionX += this.gameSpeed;
    // obstacle scroll
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
    // bookstore scroll
    Phaser.Actions.IncX(this.bookStores.getChildren(), -this.gameSpeed*0.3);

    this.obsRespawnTime += delta * this.gameSpeed * 0.08;
    this.storeRespawnTime += delta * this.gameSpeed * 0.08;

    // place obstacle every 1.5seconds
    if (this.obsRespawnTime >= obsRespawnInterval){
      this.placeObstacle();
      this.obsRespawnTime = 0;
    }

    // place bookstore
    if (this.storeRespawnTime >= storeRespawnInterval){
      this.placeBookstore(1);
      this.storeRespawnTime = 0;
    }

    // remove obstacles
    this.obstacles.getChildren().forEach(obstacle => {
      if (obstacle.getBounds().right < 0) {
        this.obstacles.killAndHide(obstacle);
      }
    })

    // player potato effect
    if (this.pote.hitPose){
      this.pote.setTexture("pote-hurt");
    } else if (!this.pote.body.onFloor() >0 ) {
      this.pote.anims.stop();
      this.pote.setTexture('pote');

    } else {
      this.pote.play('pote-run',true);
    }

  }
}

export default PlayScene;
