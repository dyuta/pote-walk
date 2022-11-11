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
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;
    
    this.initProperties();

    this.openingDialogue =this.add.text(
      100, 170, "そうだ、本屋に行こう！",this.consts.fontoConf.openingDialogue
    ).setOrigin(0,0);

    this.destinationTxt = this.add.text(
      20, 10, `行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`,
      this.consts.fontoConf.storeinfo01
    ).setAlpha(0);

    /*
    this.gameSpeed = this.consts.gameSpeedNormal;
    this.groundInitwidth = 100;

    this.obsRespawnTime = 0;
    this.coinRespawnTime = 0;
    this.storeRespawnTime = 0;
    
    this.counterStr = "coins:0    books:0";
    this.coinCnt=0;
    //this.coinSpent=0;
    this.bookCnt=0;
    //this.coinCntTimer=0;    
    this.storePlacedCnt = 0;
    */

    // add hidden objects
    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.poteGround = this.physics.add.image(0, groundHeight+26).setSize(250,20).setOrigin(0, 1).setImmovable();

    // add visible background objects
    this.backBuildings = this.add.tileSprite(0, groundHeight-20, width, 112, 'backBuildings').setOrigin(0, 1).setScale(1.2).setAlpha(0);
    this.ground = this.add.tileSprite(0, groundHeight+22, this.groundInitwidth, 48, 'ground').setOrigin(0, 1);
    

    this.envLayer = this.add.layer();
    this.environment = this.add.group();
    this.initEnvObjects(height, width,this.environment,this.envLayer);

    this.bookStoreLayer = this.add.layer();
    this.objLayer = this.add.layer();
    this.coinLayer = this.add.layer();
    this.poteHomeLayer = this.add.layer();

    this.counterIcons = this.add.group();
    const counterPositionX = width - 300;
    this.counterIcons.addMultiple([
      this.add.sprite(counterPositionX, 28, 'coinBookIcon',0).setScale(2),
      this.add.sprite(counterPositionX+140, 28, 'coinBookIcon',1).setScale(2)
    ]);
    this.counterIcons.setAlpha(0);

    //this.counterText = this.add.text(width - 300, 10, this.counterStr, this.consts.fontoConf.counter)
    //  .setAlpha(0);
    this.coinCounterText = this.add.text(counterPositionX+20, 11, "0", this.consts.fontoConf.counter)
      .setAlpha(0);
    this.bookCounterText = this.add.text(counterPositionX+160, 11, "0", this.consts.fontoConf.counter)
      .setAlpha(0);

    const storeicon_span = 120;
    this.bookStoreIcons = this.add.group();

    this.bookStoreIcons.addMultiple([
      this.add.image(80                   , groundHeight + 80, 'bookstoreicon01'),
      this.add.image(80 +storeicon_span *1, groundHeight + 80, 'bookstoreicon02'),
      this.add.image(80 +storeicon_span *2, groundHeight + 80, 'bookstoreicon03'),
      this.add.image(80 +storeicon_span *3, groundHeight + 80, 'bookstoreicon04'),
      this.add.image(80 +storeicon_span *4, groundHeight + 80, 'bookstoreicon05'),
      this.add.image(80 +storeicon_span *5, groundHeight + 80, 'bookstoreicon06')
    ]);
    this.bookStoreIcons.setAlpha(0);

    
    this.pote = this.physics.add.sprite(0, groundHeight, 'pote-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;

    this.bookParticle = this.add.particles('coinBookIcon');
    this.coinParticle = this.add.particles('coinBookIcon');
    
    this.obstacles = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.bookStores = this.physics.add.group();
    this.poteHomeGrp = this.physics.add.group();
    
    this.initAnims();
    this.initBookParticle();
    this.initCoinParticle();
    this.initColliders();
    
    this.initStartTrigger();
    this.handleInputs();

  }
  initProperties(){
    this.isGamerunning = false;
    this.gameSpeed = this.consts.gameSpeedNormal;
    this.groundInitwidth = 100;

    this.obsRespawnTime = 0;
    this.coinRespawnTime = 0;
    this.storeRespawnTime = 0;
    
    this.counterStr = "coins:0    books:0";
    this.coinCnt=0;
    //this.coinSpent=0;
    this.bookCnt=0;
    //this.coinCntTimer=0;    
    this.storePlacedCnt = 0;
  }

  initEnvObjects(height, width,group,layer){
    // nope
    this.stayingCloud = this.add.image(width * 0.8, 100, 'cloudNope').setAlpha(0).setScale(1);
    layer.add(this.stayingCloud);

    group.addMultiple([
      this.add.image(width * 0.25, 170, 'cloud'),
      this.add.image(width * 0.62, 80, 'cloud'),
      this.add.image((width * 0.9), 120, 'cloud')
    ]);
  
    group.setAlpha(0);
    layer.add(group.getChildren());

    
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

        // set icon visible
        this.bookStoreIcons.getChildren()[this.model.result.visited].setAlpha(1);

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

        //this.model.mediaManager.playSound('bookSound',this.consts.volumeSound*20);
        for (let i =0; i < this.bookBoughtNow; i++) {
          this.timerOneShot = this.time.delayedCall(
            140*i, ()=>{
              this.model.mediaManager.playSound('bookSound',this.consts.volumeSound*20);
              this.bookParticle.emitParticleAt(p.x + 30,p.y - 100);
            }, this
          );
          
        }

        if(this.model.result.visited == 3){
          this.gameSpeed = this.consts.gameSpeedFast;
        }
        
      }
    }, null, this);

    // obstacle overlap
    // added when game mode is other than Sampo
    if(this.model.gameMode !== this.consts.gameModes[1]){
      this.physics.add.overlap(this.pote, this.obstacles, (p, obstacle) => {
        // execute once on collision
        if(!obstacle.hitFlg){
          console.log("hit");
          obstacle.hitFlg = true;
          this.model.result.miss ++;
          //console.log("miss "+this.model.result.miss);
          if(this.coinCnt >0){
            this.coinCnt --;
            this.coinParticle.emitParticleAt(p.x + 10,p.y - 70);
          }
          
          // set hurt status
          this.model.mediaManager.playSound('damageSound',this.consts.volumeSound*0.8);
  
          if(!this.pote.hitPose){
            this.pote.hitPose = true;
            console.log("hit-pose");
            
            this.timerOneShot = this.time.delayedCall(
              300, ()=>{this.pote.hitPose = false}, this
            );
          }
        }
      }, null, this)
    }
    
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
    this.physics.add.overlap(this.pote, this.poteHomeGrp,(p, home) =>{
      //
      if(!home.hitFlg){
        home.hitFlg = true;
        this.isGamerunning = false;

        this.model.mediaManager.stopBGM();
        this.model.mediaManager.playSound('goalSound',this.consts.volumeSound*0.2);
        
        this.pote.play('pote-happy',1);
  
        this.timerOneShot = this.time.delayedCall(
          2800, ()=>{this.goClearScene()}, this
        );
      }
    }, null, this);


  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{

      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, groundHeight);
        this.model.mediaManager.setBGM('mainbgm');
        this.openingDialogue.setAlpha(0);
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
            this.destinationTxt.setAlpha(1);
            this.backBuildings.setAlpha(0.8);
            this.counterIcons.setAlpha(1);
            this.coinCounterText.setAlpha(1);
            this.bookCounterText.setAlpha(1);
            // nope
            //this.stayingCloud.setAlpha(1);

            this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh);
            startEvent.remove();
          }

        }

      })
    }
    , null, this);
  }

  callbackStartEvent(){

  }

  initAnims() {
    this.anims.create({
      key: 'pote-run',
      frames: this.anims.generateFrameNumbers('pote', {start: 1, end: 2}),
      //frameRate: 9,
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'pote-happy',
      frames: this.anims.generateFrameNumbers('potehappy', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-bird-fly',
      frames: this.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'UFO-X-fly',
      frames: this.anims.generateFrameNumbers('UFO-X', {start: 0, end: 1}),
      frameRate: 5,
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

  initBookParticle(){
    this.bookParticle.createEmitter({
      frame: 1,
      angle: { min: 240, max: 250 },
      speed: { min: 300, max: 400 },
      quantity: 1,//{ min: 2, max: 10 },
      lifespan: 400,
      alpha: { start: 1, end: 0.5 },
      scale: 2,//{ min: 0.05, max: 0.4 },
      //rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
      gravityY: 800,
      on: false
    });
  }

  initCoinParticle(){
    this.coinParticle.createEmitter({
      frame: 0,
      angle: { min: 240, max: 250 },
      speed: { min: 100, max: 150 },
      quantity: 1,//{ min: 2, max: 10 },
      lifespan: 400,
      alpha: { start: 1, end: 0 },
      scale: 2,//{ min: 0.05, max: 0.4 },
      //rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
      gravityY: 800,
      on: false
    });
  }

  handleInputs() {
    this.input.on("pointerdown", () => {
      if (!this.pote.body.onFloor()){ return; }
      this.pote.setVelocityY(this.consts.jumpVelocity);
      this.model.mediaManager.playSound('jumpSound',this.consts.volumeSound*0.8);

    }, this);

    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.pote.body.onFloor()){ return; }
      this.pote.setVelocityY(this.consts.jumpVelocity);
      this.model.mediaManager.playSound('jumpSound',this.consts.volumeSound*0.8);

    }, this);
    
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
      const enemyHeight = [40, 120];
      const enemyType = ['enemy-bird-fly','UFO-X-fly'];
      
      obstacle = this.obstacles
      .create(width + obstacleDistance, groundHeight - enemyHeight[Math.floor(Math.random() * 2)],'enemy-bird');
      //obstacle.play('enemy-bird-fly', 1);
      obstacle.play(enemyType[Math.floor(Math.random() * 2)], 1);      
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
      .create(width + Distance, groundHeight + 28,'potehome')
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

    this.coinCounterText.setText(`: ${this.coinCnt}`);
    this.bookCounterText.setText(`: ${this.bookCnt}`);

    // scroll
    this.ground.tilePositionX += this.gameSpeed*this.consts.worldScroll;
    this.backBuildings.tilePositionX += this.gameSpeed*this.consts.worldScroll*0.4;
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
      //this.pote.play('pote-happy',true);
    }

  }
}

export default PlayScene;
