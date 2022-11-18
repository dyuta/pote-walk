import Phaser from 'phaser';
import Constants from './constants';
import Model from './model';
import MediaManager from './util/mediaManager';
import PlayScene from './PlayScene';

export default class PlayNPScene extends PlayScene {

  constructor(sceneName ='PlayNPScene') {
    super(sceneName);
  }
  init(data){
    this.model = data.model;

  }

  create() {
    this.consts = new Constants();
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;
    console.log(this.model.skipTitleNP);
    
    this.initProperties();

    this.openingDialogue =this.add.text(
      width/2, height*0.22, "POTE",this.consts.fontoConf.titleNP
    ).setOrigin(0.5,0).setAlpha(0);
    this.openingDialogueNP =this.add.text(
      width/2, height*0.22, "NOPE",this.consts.fontoConf.titleNP
    ).setOrigin(0.5,0).setAlpha(0);

    this.destinationTxt = this.add.text(
      20, 10, `${this.consts.npscenetitleList[this.model.result.visited].name}`,
      this.consts.fontoConf.bodyNP
    ).setAlpha(0);

    // add hidden objects
    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.poteGround = this.physics.add.image(0, groundHeight+26).setSize(250,20).setOrigin(0, 1).setImmovable();

    // add visible background objects
    this.backMountains = this.add.tileSprite(0, groundHeight-50, width, 112, 'backMountainNP').setOrigin(0, 1).setScale(1.2).setAlpha(0);
    this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth-10, 26, 'groundNP').setOrigin(0, 1)
    .setVisible(false);
    

    this.envLayer = this.add.layer();
    this.environment = this.add.group();
    this.initEnvObjects(height, width,this.environment,this.envLayer);

    this.buildingLayer = this.add.layer();
    this.buildings = this.physics.add.group();

    this.objLayer = this.add.layer();
    this.obstacles = this.physics.add.group();

    this.coinLayer = this.add.layer();
    this.coins = this.physics.add.group();

    this.poteHomeLayer = this.add.layer();
    this.poteHomeGrp = this.physics.add.group();

    this.counterItems = this.add.group();
    const counterPositionX = width - 300;
    this.initCounters(counterPositionX,11,28,this.counterItems);

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
      .setGravityY(3000)
      .setVisible(false);
    this.pote.hitPose = false;

    this.gameOverScreen = this.add.container(width* 1/2 , height* 0.10).setAlpha(0);
    this.initGameOverScreen(this.gameOverScreen);

    this.initAnims();
    //this.initBookParticle();
    //this.initCoinParticle();
    this.initColliders();
    
    this.initStartEffect();
    //this.initStartTrigger();
    //this.handleInputs();

  }

  initProperties(){
    this.isGamerunning = false;
    this.cameras.main.setBackgroundColor(this.consts.colors.background);
    this.gameSpeed = this.consts.gameSpeedNP;
    this.groundInitwidth = 100;

    this.obsRespawnTime = 0;
    this.numberOfObstacleSet =0;
    this.coinRespawnTime = 0;
    this.storeRespawnTime = 0;
    this.npCloudIncAlphaIncTime = 0;
    
    this.counterStr = "coins:0";
    this.coinCnt=0;
    //this.coinSpent=0;
    //this.bookCnt=0;
    //this.coinCntTimer=0;    
    this.storePlacedCnt = 0;
  }

  initEnvObjects(height, width,group,layer){
    // nope
    this.stayingCloud = this.add.image(width * 0.8, 190, 'cloudNope').setAlpha(0).setScale(1);
    //.setInteractive();
    layer.add(this.stayingCloud);

    group.addMultiple([
      this.add.image(width * 0.25, 170, 'cloud'),
      this.add.image(width * 0.62, 80, 'cloud'),
      this.add.image((width * 0.9), 120, 'cloud')
    ]);
  
    group.setAlpha(0);
    layer.add(group.getChildren());    
  }

  initCounters(counterPositionX,textY,iconY,group){
    this.coinCounterText = this.add.text(counterPositionX+20, textY, "0", this.consts.fontoConf.counter);
    //this.bookCounterText = this.add.text(counterPositionX+160, textY, "0", this.consts.fontoConf.counter);
    group.addMultiple([
      this.add.sprite(counterPositionX, iconY, 'coinBookIcon',0).setScale(2),
      //this.add.sprite(counterPositionX+140, iconY, 'coinBookIcon',1).setScale(2),
      this.coinCounterText
      //,this.bookCounterText
    ]);
    group.setAlpha(0);

  }

  initGameOverScreen(container){
    const gameOverScreen = container;
    
    const gameOverText = this.add.text(0, 0, 'GAME OVER', this.consts.fontoConf.titleNP).setOrigin(0.5,0);
    const askingWalkorNopeText = this.add.text(0, 120, 'Give up?', this.consts.fontoConf.resultDetail)
    .setOrigin(0.5,0).setColor("#ffffff").setFontSize("64px");//.setFontSize("64px");
    this.retryNopeText = this.add.text(-20, 190, 'Nope!', this.consts.fontoConf.resultDetail)
    .setInteractive().setOrigin(1,0).setColor("#ffffff");
    this.retryWalkText = this.add.text(30, 190, 'Yup!', this.consts.fontoConf.resultDetail)
    .setInteractive().setOrigin(0,0).setColor("#ffffff");
    gameOverScreen.add([gameOverText,askingWalkorNopeText,this.retryNopeText,this.retryWalkText])
  }

  initColliders(){
    // ground
    this.physics.add.collider(this.pote, this.poteGround);

    // bookstore overlap
    this.physics.add.overlap(this.pote, this.buildings, (p, building) => {
      // execute once on collision
      if(!building.hitFlg){
        building.hitFlg = true;

        // set icon visible
        this.bookStoreIcons.getChildren()[this.model.result.visited].setAlpha(1);

        // set store visit status
        this.model.storeVisit[`store${building.buildingNum}`] = true;
        this.model.result.visited ++;

        //update destination
        if(this.model.result.visited <= this.consts.numberOfStores){
          this.destinationTxt.setText(`${this.consts.npscenetitleList[this.model.result.visited].name}`);
        } else {
          this.destinationTxt.setText(`NO`);
        }

        //buying books
        //this.bookCnt += this.coinCnt;
        //this.bookBoughtNow = this.coinCnt;
        //this.coinCnt = 0;
        //this.model.result.book = this.bookCnt;

        //this.model.mediaManager.playSound('bookSound',this.consts.volumeSound*20);
        /*
        for (let i =0; i < this.bookBoughtNow; i++) {
          this.timerOneShot = this.time.delayedCall(
            140*i, ()=>{
              this.model.mediaManager.playSound('bookSound',this.consts.volumeSound*20);
              this.bookParticle.emitParticleAt(p.x + 30,p.y - 100);
            }, this
          );
          
        }
        */
        //for debug
        /* jump to result scene
        if(this.model.result.visited==2){
          this.goClearScene();
        }
        */

        if(this.model.result.visited == 3){
          this.gameSpeed = this.consts.gameSpeedNPFast;
        }
        
      }
    }, null, this);

    // obstacle overlap
    // added when game mode is other than Sampo
    if(this.model.gameMode !== this.consts.gameModes[1]){
      this.obstacleCollider = this.physics.add.overlap(this.pote, this.obstacles, (p, obstacle) => {
        // execute once on collision
        if(!obstacle.hitFlg){
          obstacle.hitFlg = true;
          this.model.result.miss ++;
          //console.log("miss "+this.model.result.miss);
          if(this.coinCnt >0){
            this.coinCnt --;
            //this.coinParticle.emitParticleAt(p.x + 10,p.y - 70);
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

          // GAME OVER
          this.showGameOver();
        }
      }, null, this)
    }
    
    // coin overlap
    this.physics.add.overlap(this.pote, this.coins, (p, coin) => {
      // execute once on collision
      if(!coin.hitFlg){
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
        this.obstacleCollider.destroy();

        this.model.mediaManager.stopBGM();
        this.model.mediaManager.playSound('goalSound',this.consts.volumeSound*0.2);
        
        this.pote.play('pote-happy',1);
  
        this.timerOneShot = this.time.delayedCall(
          2800, ()=>{this.goClearScene()}, this
        );
      }
    }, null, this);

  }

  initStartEffect(){
    if(this.model.skipTitleNP){
      this.pote.setVisible(true);
      this.ground.setVisible(true);
      this.handleInputs();
      this.initStartTrigger();
      return;
    }
    //this.openingDialogue
    const tween = this.tweens.add({
      targets: this.openingDialogue,
      duration: 1400,
      hold: 300,
      yoyo:true,
      props: {
        alpha: 1,
        ease:Phaser.Math.Easing.Cubic.InOut
      }
    });

    const timerOneShot = this.time.delayedCall(
      3200, ()=>{
        //this.openingDialogueNP.setText("NOPE").setAlpha(0);
        const tween = this.tweens.add({
          targets: this.openingDialogueNP,
          duration: 4000,
          props: {
            alpha: 1,
            ease:Phaser.Math.Easing.Cubic.InOut
          }
        });
        const timerOneShot =this.time.delayedCall(
          3000,()=>{
          //
          //visible
          this.pote.setVisible(true);
          this.ground.setVisible(true);
          this.handleInputs();
          this.initStartTrigger();
          }, this
        );
      }, this
    );

  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{

      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, groundHeight);
        this.model.mediaManager.setBGM('windySound',0.3);
        this.openingDialogueNP.setVisible(false);
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
            this.backMountains.setAlpha(0.6);
            this.counterItems.setAlpha(1);
            this.coinCounterText.setAlpha(1);
            //this.bookCounterText.setAlpha(1);
            // nope
            this.stayingCloud.setAlpha(1);

            this.cameras.main.setBackgroundColor(this.consts.colors.backgroundNPPlay);
            startEvent.remove();
          }

        }

      })
    }
    , null, this);
  }

  initAnims() {
    // anims are gloval. no need to recreate in other scenes
    // #Todo move to preload
    this.anims.create({
      key: 'mantis-cling',
      frames: this.anims.generateFrameNumbers('mantisNP', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'bike-ride',
      frames: this.anims.generateFrameNumbers('motorcycleNP', {start: 0, end: 1}),
      frameRate: 4,
      repeat: -1
    })

    this.anims.create({
      key: 'kune-kune-red',
      frames: this.anims.generateFrameNumbers('kunekuneNP', {start: 0, end: 1}),
      //repeatDelay:50,
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'kune-kune-yellow',
      frames: this.anims.generateFrameNumbers('kunekuneYellowNP', {start: 0, end: 1}),
      //repeatDelay:50,
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'nope-rope',
      frames: this.anims.generateFrameNumbers('flagropeNP', {start: 0, end: 1}),
      frameRate: 4,
      repeat: -1
    })

    this.anims.create({
      key: 'UFO-NP-fly',
      frames: this.anims.generateFrameNumbers('UFONP', {start: 0, end: 1}),
      frameRate: 4,
      repeat: -1
    })
    
    this.anims.create({
      key: 'flyrods-fly',
      frames: this.anims.generateFrameNumbers('flyingrodsNP', {start: 0, end: 1}),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: 'monkey-angry',
      frames: this.anims.generateFrameNumbers('monkey', {start: 0, end: 1}),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'alienKids-look',
      frames: this.anims.generateFrameNumbers('alienKids', {start: 0, end: 1}),
      frameRate: 4,
      repeat: -1
    })

  }

  /*
  initBookParticle(){
    this.bookParticle = this.add.particles('coinBookIcon');
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
  */


  handleInputs() {
    super.handleInputs();
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

    this.retryNopeText.on('pointerdown', () => {
      this.prepareRestart();
      this.restartGame(this.consts.gameModes[2],this.consts.skipTitleNPTrue);
    }, this);

    this.retryWalkText.on('pointerdown', () => {
      this.prepareRestart();
      this.restartGame(this.consts.gameModes[0]);
    }, this)

    /*
    this.stayingCloud.on("pointerdown", () => {
      if (this.model.gameMode==this.consts.gameModes[2]){ return;}
      this.goModeNP();

    }, this)
    */
    
  }

  showGameOver(){
    this.isGamerunning = false;
    this.pote.setTexture("pote-hurt");
    this.physics.pause();
    this.anims.pauseAll();
    this.gameOverScreen.setAlpha(1);
  }

  prepareRestart(){
    this.physics.resume();
    this.isGamerunning = true;
    this.anims.resumeAll();
  }

  placeObstacle(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;
    const obstacleNum = Math.floor(Math.random() * 5) + 1;
    //const obstacleNum = 7;
    const obstacleDistance =
      Phaser.Math.Between(this.consts.distances.obstacleFrom, this.consts.distances.obstacleTo);

    let obstacle;
    console.log(obstacleNum);

    if(obstacleNum > 4) {
      const enemyHeight = [40, 120];
      obstacle = this.placeObstacleCore(width + obstacleDistance, groundHeight - enemyHeight[Math.floor(Math.random() * 2)],'flyingrodsNP');
      obstacle.play('flyrods-fly', 1);
      obstacle.body.height = obstacle.body.height / 1.5;     
    } else {
      obstacle = this.placeObstacleCore(width + obstacleDistance, groundHeight, `cactusObsNP${obstacleNum}`);
      obstacle.body.offset.y = +5;
    }
  }

  placeSpecialObstacle(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;
    let obstacle = this.placeObstacleCore(
      width + this.consts.npSpObstacleList[this.model.result.visited].distanceX,
      groundHeight - this.consts.npSpObstacleList[this.model.result.visited].posYUp,
      this.consts.npSpObstacleList[this.model.result.visited].name
    );
    obstacle.play(this.consts.npSpObstacleList[this.model.result.visited].anim,1);

    if(this.model.result.visited == 6 ){
      obstacle.setScale(1.2);
      obstacle.body.height = obstacle.body.height / 4;
      obstacle.body.width = obstacle.body.width / 2;
      obstacle.body.offset.y = +10;
      obstacle.body.offset.x = -10;
      const tween = this.tweens.add({
        targets: obstacle,
        delay:80,
        duration: 600,
        hold:80,
        loop:-1,
        yoyo:true,
        props: {
          //y: '+=300',
          y: 160,
          ease:Phaser.Math.Easing.Sine.InOut
        }
      });
    }

  }

  placeObstacleCore(posX,posY,texturekey){
    //Todo move objgroup and layer to parameter
    //for more general usage
    const obstacle = this.obstacles.create(posX, posY, texturekey);
    obstacle.setOrigin(0, 1).setImmovable();
    obstacle.hitFlg=false;
    
    this.objLayer.add(obstacle);
    return obstacle;
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

  placeBuilding(buildingNum){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;

    //const obstacleNum = 7;
    const buildingDistance = 200;

    let building;
    console.log(buildingNum);

    const buildingName = `buildingNP0${buildingNum}`

    console.log(buildingName);
    building = this.buildings
    .create(width + buildingDistance, groundHeight,buildingName);
    
    building
    .setOrigin(0, 1)
    .setImmovable();
    building.hitFlg=false;
    building.buildingNum=buildingNum;
    
    this.buildingLayer.add(building);
  }

  placePoteHome(){
    const {width, height} = this.game.config;
    const groundHeight = height*0.5;

    //const obstacleNum = 7;
    const Distance = 200;


    console.log('goalNP');
    this.poteHome = this.poteHomeGrp
      .create(width + Distance, groundHeight + 28,'goalNP')
      .setOrigin(0, 1).setImmovable();
    
    this.poteHome.hitFlg=false;
    this.poteHome.body.width = this.poteHome.body.width / 2;
    this.poteHome.body.offset.x = -24;
    
    this.poteHomeLayer.add(this.poteHome);
  }

  goClearScene(){
    //this.scene.start('ResultScene',{model: this.model});
    this.scene.start('ResultNPScene',{model: this.model});
  }

  /*goModeNP(){
    console.log("NOPE");
    this.restartGame(this.consts.gameModes[2]);
    //this.restartGame(this.consts.gameModes[0]);
  }*/

  update(time, delta) {
    if (!this.isGamerunning) {return;}
    this.coinCounterText.setText(`: ${this.coinCnt}`);
    //this.bookCounterText.setText(`: ${this.bookCnt}`);
    
    // scroll
    this.ground.tilePositionX += this.gameSpeed*this.consts.worldScroll;
    this.backMountains.tilePositionX += this.gameSpeed*this.consts.worldScroll*0.4;
    Phaser.Actions.IncX(this.environment.getChildren(), - 0.5);
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.coins.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.buildings.getChildren(), -this.gameSpeed*this.consts.worldScroll);
    Phaser.Actions.IncX(this.poteHomeGrp.getChildren(), -this.gameSpeed*this.consts.worldScroll);
    
    this.obsRespawnTime += delta * this.gameSpeed * 0.08;
    this.coinRespawnTime += delta * this.gameSpeed * 0.08;
    this.storeRespawnTime += delta * this.gameSpeed * 0.08;
    this.homeTime += delta * this.gameSpeed * 0.08;
    //this.npCloudIncAlphaIncTime+= delta * this.gameSpeed * 0.08;
    
    
    
    // place obstacle every xxseconds
    if (this.obsRespawnTime >= this.consts.obsRespawnInterval){
      //when mod5(number)=3
      if(this.numberOfObstacleSet % 5 == 3){
        this.placeSpecialObstacle();
      } else{
        this.placeObstacle();
      }
      this.obsRespawnTime = 0;
      this.numberOfObstacleSet++;
    }
    
    // place coin every XXseconds
    if (this.storePlacedCnt < this.consts.numberOfStores 
      && this.coinRespawnTime >= this.consts.coinRespawnIntervalNP){
        this.placeCoin();
        this.coinRespawnTime = 0;
    }
      
      // place bookstore or home
    if (this.storeRespawnTime >= this.consts.storeRespawnInterval){
      if(this.storePlacedCnt < this.consts.numberOfStores){
        
        this.placeBuilding(this.storePlacedCnt+1);
        this.storeRespawnTime = 0;
        this.storePlacedCnt ++;
      } else {
          // place home
          this.placePoteHome();
          this.storeRespawnTime = 0;
      }
    }
      
    // remove obstacles
    this.removeObjPassedDisplay(this.obstacles);
    this.removeObjPassedDisplay(this.coins);
    this.removeObjPassedDisplay(this.buildings);
      
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
