import Phaser from 'phaser';
import Constants from './constants';
import MediaManager from './util/mediaManager';

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
    
    //debug text
    //this.debugText = this.add.text(10, 400, 'for debug', this.consts.fontoConf.counter);
    //this.debugText2 = this.add.text(10, 430, 'for debug', this.consts.fontoConf.counter);

    // Store Name
    this.destinationTxt = this.add.text(
      20, 10, `行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`,
      this.consts.fontoConf.storeinfo01
    ).setAlpha(0);

    this.gameSpeed = this.consts.gameSpeedNormal;
    this.obsRespawnTime = 0;
    this.coinRespawnTime = 0;
    this.storeRespawnTime = 0;
    this.groundInitwidth = 100;
    
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.counterStr = "coins:0    books:0";
    this.coinCnt=0;
    //this.coinSpent=0;
    this.bookCnt=0;
    //this.coinCntTimer=0;
    
    this.storePlacedCnt = 0;

    //this.bgLayer = this.add.layer();
    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.poteGround = this.physics.add.image(0, groundHeight+26).setSize(250,20).setOrigin(0, 1).setImmovable();
    this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    
    this.envLayer = this.add.layer();
    this.bookStoreLayer = this.add.layer();
    this.objLayer = this.add.layer();
    this.coinLayer = this.add.layer();
    this.poteHomeLayer = this.add.layer();
    this.counterText = this.add.text(width - 300, 10, this.counterStr, this.consts.fontoConf.counter)
      .setAlpha(0);
    
    this.environment = this.add.group();
      this.environment.addMultiple([
        this.add.image(width * 0.5, 170, 'cloud'),
        this.add.image(width * 0.70, 80, 'cloud'),
        this.add.image((width * 0.9), 100, 'cloud')
      ]);
    
    this.environment.setAlpha(0);
    this.envLayer.add(this.environment.getChildren());

    // nope
    this.stayingCloud = this.add.image(width * 0.8, 140, 'cloud').setAlpha(0);
    this.envLayer.add(this.stayingCloud);

    this.pote = this.physics.add.sprite(0, groundHeight, 'pote-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;
    
    this.obstacles = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.bookStores = this.physics.add.group();
    this.poteHomeGrp = this.physics.add.group();
    
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
      // for Debug
      //this.goClearScene();

      // execute once on collision
      if(!bookstore.hitFlg){
        console.log("enter store");
        bookstore.hitFlg = true;

        // set store visit status
        this.model.storeVisit[`store${bookstore.bookStoreNum}`] = true;
        this.model.result.visited ++;

        //update destination
        if(this.model.result.visited < this.consts.numberOfStores){
          this.destinationTxt.setText(`行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`);
        } else {
          this.destinationTxt.setText(`行先: 自宅`);
        }

        //buying books
        this.bookCnt += this.coinCnt;
        this.bookBoughtNow = this.coinCnt;
        this.coinCnt = 0;
        this.model.result.book = this.bookCnt;

        this.model.mediaManager.playSound('bookSound');
        for (let i =0; i < this.bookBoughtNow; i++) {
          this.timerOneShot = this.time.delayedCall(
            300, ()=>{
              //this.model.mediaManager.playSound('bookSound')
              console.log("book count");
            }, this
          );
          
        }

        if(this.model.result.visited == 3){
          this.gameSpeed = this.consts.gameSpeedFast;
        }
        
      }
    }, null, this);

    // obstacle overlap
    this.physics.add.overlap(this.pote, this.obstacles, (p, obstacle) => {
      // execute once on collision
      if(!obstacle.hitFlg){
        console.log("hit");
        obstacle.hitFlg = true;
        this.model.result.miss ++;
        //console.log("miss "+this.model.result.miss);
        if(this.coinCnt >0){
          this.coinCnt --; 
        }
        
        // set hurt status
        this.model.mediaManager.playSound('damageSound');

        if(!this.pote.hitPose){
          this.pote.hitPose = true;
          console.log("hit-pose");
          
          this.timerOneShot = this.time.delayedCall(
            300, ()=>{this.pote.hitPose = false}, this
          );
        }
      }
    }, null, this)
    
    // coin overlap
    this.physics.add.overlap(this.pote, this.coins, (p, coin) => {
      // execute once on collision
      if(!coin.hitFlg){
        console.log("getcoin");
        coin.hitFlg = true;
        this.model.mediaManager.playSound('coinSound');
        
        // count coin
        this.coinCnt ++;
        this.model.result.coin ++;
        this.coins.killAndHide(coin);
      }
    }, null, this)

    // home overlap
    this.physics.add.overlap(this.pote, this.poteHomeGrp,() =>{
      //
      this.model.mediaManager.stopBGM();
      this.timerOneShot = this.time.delayedCall(
        300, ()=>{this.goClearScene()}, this
      );
    }, null, this);


  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{

      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, groundHeight);
        this.model.mediaManager.setBGM('mainbgm');
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
            this.environment.setAlpha(1);
            // nope
            //this.stayingCloud.setAlpha(1);
            this.destinationTxt.setAlpha(1);
            this.counterText.setAlpha(1);
            this.cameras.main.setBackgroundColor(this.consts.colors.bg);
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
    
    this.anims.create({
      key: 'bicyclelow-ride',
      frames: this.anims.generateFrameNumbers('obstacleOrg-1', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'coin-rotate',
      frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 5}),
      frameRate: 6,
      repeat: -1
    })

  }

  handleInputs() {
    this.input.on("pointerdown", () => {
      if (!this.pote.body.onFloor()){ return; }
      this.pote.setVelocityY(this.consts.jumpVelocity);
      this.model.mediaManager.playSound('jumpSound');

    }, this)
  }

  placeObstacle(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;
    const obstacleNum = Math.floor(Math.random() * 7) + 1;
    //const obstacleNum = 7;
    const obstacleDistance =
      Phaser.Math.Between(this.consts.distances.obstacleFrom, this.consts.distances.obstacleTo);

    let obstacle;
    console.log(obstacleNum);

    if(obstacleNum > 6) {
      console.log('bird');
      const enemyHeight = [22, 50];
      obstacle = this.obstacles
      .create(width + obstacleDistance, groundHeight - enemyHeight[Math.floor(Math.random() * 2)],'enemy-bird');
      obstacle.play('enemy-bird-fly', 1);
      obstacle.body.height = obstacle.body.height / 1.5;
    }else if(obstacleNum == 1){
      console.log('org1');
      obstacle = this.obstacles
      .create(width + obstacleDistance, groundHeight,'obstacleOrg-${obstacleNum}');
      obstacle.play('bicyclelow-ride', 1);
      //obstacle.body.height = obstacle.body.height / 1.5;      
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

  placeCoin(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;
    let coinDistance = Phaser.Math.Between(850, 950);
    let coinHeight = 22;
    const distancePre = [Phaser.Math.Between(100, 350), Phaser.Math.Between(850, 950)]; 
    const coinHeightPre = [22, 70, 100];

    // hight randomizer Lv>2
    if(this.storePlacedCnt > 1){
      coinHeight = coinHeightPre[Math.floor(Math.random() * 3)];
    }    
    
    // distance randomizer Lv>3
    if(this.storePlacedCnt > 2){
      // coin appears avoiding obstacle
      coinDistance = distancePre[Math.floor(Math.random() * 2)];
    }

    let coin;
    
    console.log('coin');
    
    coin = this.coins
    .create(width + coinDistance, groundHeight - coinHeight,'coin');
    coin.play('coin-rotate', 0);
    coin.scale = coin.scale*2;
    //coin.body.height = coin.body.height / 3;
    //coin.body.width = coin.body.width / 2;

    coin
    .setOrigin(0, 1)
    .setImmovable();
    coin.hitFlg=false;
    this.model.result.coinGen++;
    
    this.coinLayer.add(coin);
  }

  placeBookstore(bookStoreNum){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;

    //const obstacleNum = 7;
    const bookStoreDistance = 200;

    let bookStore;
    console.log(bookStoreNum);

    const bookstoreName = `bookstore0${bookStoreNum}`

    console.log(bookstoreName);
    bookStore = this.bookStores
    .create(width + bookStoreDistance, groundHeight,bookstoreName);
    
    bookStore
    .setOrigin(0, 1)
    .setImmovable();
    bookStore.hitFlg=false;
    bookStore.bookStoreNum=bookStoreNum;
    
    this.bookStoreLayer.add(bookStore);
  }

  placePoteHome(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;

    //const obstacleNum = 7;
    const Distance = 200;


    console.log('potehome');
    this.poteHome = this.poteHomeGrp
      .create(width + Distance, groundHeight + 20,'potehome')
      .setOrigin(0, 1).setImmovable();
    
      this.poteHome.hitFlg=false;
    
    this.poteHomeLayer.add(this.poteHome);
  }

  goClearScene(){
    this.scene.start('ResultScene',{model: this.model});
  }

  update(time, delta) {
    if (!this.isGamerunning) { return; }
    // for debug
    //this.debugText.setText('sec: ' + Math.floor(time/1000));
    //this.debugText2.setText('spd: ' + this.gameSpeed);

    const obsRespawnInterval = this.consts.obsRespawnInterval;
    const storeRespawnInterval = this.consts.storeRespawnInterval;
    const coinRespawnInterval = this.consts.coinRespawnInterval;

    // coin and books count
    /*
    if(this.coinSpent == 0 ){
      this.coinCntTimer = 0;
    } else {
      this.coinCntTimer +=delta;
      if(this.coinCntTimer > this.consts.coinCntInterval){
        console.log("coinSpent calc" +this.coinSpent);
        
        this.coinSpent-=1;
        this.coinCnt-=1;
        this.bookCnt+=1;
        this.coinCntTimer = 0;
      }
    }
    */

    this.counterText.setText(`coins:${this.coinCnt}    books:${this.bookCnt}`);

    // scroll
    this.ground.tilePositionX += this.gameSpeed*this.consts.worldScroll;
    Phaser.Actions.IncX(this.environment.getChildren(), - 0.5);
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.coins.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.bookStores.getChildren(), -this.gameSpeed*this.consts.worldScroll);
    Phaser.Actions.IncX(this.poteHomeGrp.getChildren(), -this.gameSpeed*this.consts.worldScroll);

    this.obsRespawnTime += delta * this.gameSpeed * 0.08;
    this.coinRespawnTime += delta * this.gameSpeed * 0.08;
    this.storeRespawnTime += delta * this.gameSpeed * 0.08;
    this.homeTime += delta * this.gameSpeed * 0.08;

    // place obstacle every 1.5seconds
    if (this.obsRespawnTime >= obsRespawnInterval){
      this.placeObstacle();
      this.obsRespawnTime = 0;
    }

    // place coin every XXseconds
    if (this.storePlacedCnt < this.consts.numberOfStores 
      && this.coinRespawnTime >= coinRespawnInterval){
      this.placeCoin();
      this.coinRespawnTime = 0;
    }

    // place bookstore or home
    if (this.storeRespawnTime >= storeRespawnInterval){
      if(this.storePlacedCnt < this.consts.numberOfStores){

        this.placeBookstore(this.storePlacedCnt+1);
        this.storeRespawnTime = 0;
        this.storePlacedCnt ++;
      } else {
        // place home
        this.placePoteHome();
        this.storeRespawnTime = 0;
      }
    }

    // remove obstacles
    this.obstacles.getChildren().forEach(obstacle => {
      if (obstacle.getBounds().right < 0) {
        this.obstacles.killAndHide(obstacle);
      }
    })
    // remove coins
    this.coins.getChildren().forEach(coin => {
      if (coin.getBounds().right < 0) {
        this.coins.killAndHide(coin);
      }
    })
    // remove bookstore
    this.bookStores.getChildren().forEach(bookStore => {
      if (bookStore.getBounds().right < 0) {
        this.bookStores.killAndHide(bookStore);
      }
    })

    // recycle clouds
    this.environment.getChildren().forEach(env => {
      if (env.getBounds().right < 0) {
        env.x = this.game.config.width + 30;
      }
    })

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

export default PlayScene;
