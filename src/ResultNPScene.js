import Phaser from 'phaser';
import Constants from './constants';
import Model from './model';
import MediaManager from './util/mediaManager';

export default class ResultNPScene extends Phaser.Scene {

  constructor(sceneName ='ResultNPScene') {
    super(sceneName);
  }
  init(data){
    this.model = data.model;
    console.log('init result');
  }

  create() {
    this.consts = new Constants();
    this.isGamerunning = false;
    this.isResultPerfect = false;
    this.cameras.main.setBackgroundColor(this.consts.colors.backgroundNPPlay);
    this.PassedTime=0;
    
    //this.model.mediaManager.playSound('clearbgm',this.consts.volumeSound*0.1);
    this.model.mediaManager.setBGM('windySound',0.2);

    //debug text
    //this.debugText = this.add.text(10, 10, 'for debug', { fill: '#00ffff' });

    this.groundInitwidth = 100;
    this.jumpVelocity = -1250;
    this.tintInc = 0;
    const {height, width} = this.game.config;
    const groundHeight = height*0.5 + 110;

    this.outYonderNP = this.add.image(400,20,"outYonderNP").setOrigin(0,0).setScale(0.8);
    this.perfectBroNP= this.add.image(500,116,"perfectBroNP").setOrigin(0,0).setScale(0.8).setAlpha(0.4).setVisible(false);
    this.wallLayer = this.add.layer();

    //const bookNum = Math.min(18,this.model.result.book);
    //this.bookTower = this.add.image(448,groundHeight,`endingBook${bookNum}`).setOrigin(0,1).setScale(1.6).setAlpha(0);
    
    this.startTrigger = this.physics.add.sprite(width * 1/5, groundHeight)
    .setOrigin(0, 1).setBodySize(230,20).setImmovable();

    this.resultTrigger = this.physics.add.sprite(width * 1/10 + 300, groundHeight)
    .setBodySize(20,20).setOrigin(0, 1).setImmovable();
    this.resultTrigger.hitflag = false;

    this.poteGround = this.physics.add.image(width * 1/2, groundHeight+30).setSize(width,20).setOrigin(0, 1).setImmovable();
    // this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    
    this.winkinwell = this.add.sprite(width * 1/10,groundHeight, "winkinwellNP").setOrigin(0,1);

    this.pote = this.physics.add.sprite(width * 1/10, groundHeight, 'pote-idle')
      .setScale(1.2)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;

    // Clear Results
    const clearScreenYshift=250;
    this.gameClearScreen = this.add.container(width * 3/5+50, 100+clearScreenYshift).setAlpha(0);
    
    let gameClearStates = "test";
    this.GameResultStr = 
    `coin: ${this.model.result.coin} / ${this.model.result.coinGen}`;
    this.gameClearText = this.add.text(0, 0, gameClearStates, this.consts.fontoConf.titleNP)
    .setOrigin(0,0.5).setFontSize("64px");
    
    // perfect
    if(this.model.result.miss == 0 &&this.model.result.coin == this.model.result.coinGen){
      this.isResultPerfect = true;
    }

    if(this.isResultPerfect){
      gameClearStates ="Perfect!";
      this.gameClearText.setText(gameClearStates);
      this.gameClearText.setStroke('#00f', 8);
      this.gameClearText.setColor('#ffffff');
      this.gameClearText.setShadow(2, 2, "#333333", 2, true, true);
    } else {
      gameClearStates ="Clear!";
      this.gameClearText.setText(gameClearStates);
      //this.gameClearText.setStroke('#ffffff', 8);
    }

    this.gameResultText = this.add.text(0, 70, this.GameResultStr, this.consts.fontoConf.bodyNP)
      .setOrigin(0,0.5);
    //this.gameResultText.setStroke('#ffffff', 2);
    // Restart Icons
    const iconShftY=100;
    this.restartWalk = this.add.image(10, 240-iconShftY, 'restartWalk').setInteractive()
      .setOrigin(0,0.5).setScale(1.2);
    this.restartNope = this.add.image(10, 304-iconShftY, 'restartNP').setInteractive()
      .setOrigin(0,0.5).setScale(1.2)
    this.appVersionText = this.add.text(136, 360-iconShftY, "ver: " + this.consts.appVersion, this.consts.fontoConf.counter).setOrigin(0,0);
    this.appVersionText.setColor("#FFE7BF");
    // Link URLs
    this.tweetLink = this.initTweetLink(136, 212-iconShftY).setOrigin(0,0);
    //this.creditLink = this.initInfoLinks(136,274-iconShftY).setOrigin(0,0);
    this.gameClearScreen.add([
      this.gameClearText, this.gameResultText,
      this.restartWalk,this.restartNope,
      this.tweetLink,
      //this.creditLink,
      this.appVersionText
    ])

    /*
    this.pictframeScreen = this.add.container(width * 1/5 + 60, groundHeight - 300);
    this.pictframe = this.add.image(0, 4,"pictframe_brown").setInteractive().setOrigin(0,0).setScale(0.7);
    this.wallAlbum = this.add.image(3.5, 3.5+4,"noi_album").setInteractive().setOrigin(0,0).setScale(0.7);
    this.wallPotetoGannen = this.add.image(100, 0,"pote-ganen").setInteractive().setOrigin(0,0).setScale(0.5);
    this.kotobadakenochizu = this.add.image(0, 90,"kotobadakenochizu").setInteractive().setOrigin(0,0).setScale(0.7);
    this.pictframeScreen.add([this.pictframe, this.wallAlbum, this.wallPotetoGannen,this.kotobadakenochizu]);
    this.wallLayer.add(this.pictframeScreen);

    this.AddTapLinkToImage(this.wallAlbum, this.consts.noiUrl);
    this.AddTapLinkToImage(this.wallPotetoGannen, this.consts.naoeUrl);
    this.AddTapLinkToImage(this.kotobadakenochizu, this.consts.kotobaUrl);
    */

    /*
    this.bookStoreScreen = this.add.container(60, groundHeight + 80).setAlpha(0);
    this.bookStoreScreen.add( 
    this.InitBookstoreImages()
    );
    */
    
    this.initColliders();
    this.initAnims();
    this.initCoinParticleNP();
    this.initOnAnimParticle();
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
      this.isGamerunning = true;

      //stop overlap on startTrigger
      this.startTrigger.disableBody(true, true);
      // show Objects
      //this.bookTower.setAlpha(1);

      if(this.model.result.coin>0){
        this.winkinwell.play("winkinwell-flash");
        this.pote.play("pote-oprah");
      }
      
      this.timerOneShot = this.time.delayedCall(
        200 + 3*(1000/this.consts.npOprahshotFrameRate)*this.model.result.coin,// wait for photoshoto animation
        ()=>{
          this.gameClearScreen.setAlpha(1)
          this.perfectEffect();
        }, this
      );
      //stop overlap on startTrigger
      this.resultTrigger.disableBody(true, true);
      //this.bookStoreScreen.setAlpha(1);
    }
    , null, this);
  }

  initStartTrigger(){
    const {height, width} = this.game.config;
    const groundHeight = height*0.5;

    this.physics.add.overlap(this.startTrigger, this.pote, () =>{
      console.log('overlap');
      this.pote.x +=1.4;
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

    this.anims.create({
      key: 'pote-oprah',
      frames: this.anims.generateFrameNumbers('poteOprah', {start: 0, end: 2}),
      frameRate: this.consts.npOprahshotFrameRate,
      repeat: Math.max(0,this.model.result.coin -1)
    })

    this.anims.create({
      key: 'winkinwell-flash',
      frames: this.anims.generateFrameNumbers('winkinwellNP', {start: 0, end: 2}),
      frameRate: this.consts.npOprahshotFrameRate,
      repeat: Math.max(0,this.model.result.coin -1)
    })

  }

  initCoinParticleNP(){
    this.coinParticle = this.add.particles('coinBookIcon');
    this.coinParticle.createEmitter({
      frame: 0,
      angle: { min: 250, max: 265 },
      speed: { min: 60, max: 70 },
      quantity: 1,//{ min: 2, max: 10 },
      lifespan: 350,
      alpha: { start: 1, end: 0.8 },
      scale: 2.2,//{ min: 0.05, max: 0.4 },
      //rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
      gravityY: 800,
      on: false
    });
  }

  initOnAnimParticle(){
    this.pote.on('animationupdate',(anim,frame,p)=>{
      if(anim.key == "pote-oprah" && frame.textureFrame == 1){
        this.coinParticle.emitParticleAt(p.x - 10,p.y - 70);
      }
      console.log("coinemitter frame"+anim.key+frame.textureFrame);
    },this);
    /*
    this.pote.on('animationrepeat',(anim,frame,p)=>{
      if(anim.key == "pote-oprah"){
        this.coinParticle.emitParticleAt(p.x - 10,p.y - 70);
      }
      console.log("coinemitter frame"+anim.key+frame.texturekey);
    },this);
    */
  }

  AddTapLinkToImage(image,url){
    let callback = function(){
        this.openExternalLink(url);
    };
    image.on('pointerup',callback, this);
    return image;
  }

  /*
  InitBookstoreImages(){
    let storeImages = [];
    const span = 140;
    const scale = 0.64;
    let bookstore01 = this.add.image(span*0, 0, 'bookstore01').setInteractive().setOrigin(0,0).setScale(scale);
    let bookstore02 = this.add.image(span*1, 0, 'bookstore02').setInteractive().setOrigin(0,0).setScale(scale);
    let bookstore03 = this.add.image(span*2, 0, 'bookstore03').setInteractive().setOrigin(0,0).setScale(scale);
    let bookstore04 = this.add.image(span*3, 0, 'bookstore04').setInteractive().setOrigin(0,0).setScale(scale);
    let bookstore05 = this.add.image(span*4, 0, 'bookstore05').setInteractive().setOrigin(0,0).setScale(scale);
    let bookstore06 = this.add.image(span*5, 0, 'bookstore06').setInteractive().setOrigin(0,0).setScale(scale);

    storeImages = [bookstore01,bookstore02,bookstore03,bookstore04,bookstore05,bookstore06];

    let callback = {};
    for (let i =0; i < this.consts.numberOfStores; i++) {
      this.AddTapLinkToImage(storeImages[i],this.consts.bookstoreList[i].url);
    }
    return storeImages
  }
  */

  handleInputs() {
    this.restartWalk.on('pointerdown', () => {
      this.restartGame(this.consts.gameModes[0]);
    }, this)

    this.restartNope.on('pointerdown', () => {
      this.restartGame(this.consts.gameModes[2]);
    }, this)

    this.input.on("pointerdown", () => {
      if (!this.pote.body.onFloor()){ return; }
      this.pote.setVelocityY(this.jumpVelocity);

    }, this)
  }
  
  initInfoLinks(xx,yy){
    const tapLinkStyle = this.consts.fontoConf.TapLink;
    let linkString = "credits";
    const linkURL ="./credits.html";
    const callbackExternal=function(){
      this.openExternalLink(linkURL);
    };

  let infoLink = this.createTapLink.apply(this,
      [{xx:xx, yy:yy},
        linkString, tapLinkStyle, callbackExternal]
      );
  return infoLink;
  }

  initTweetLink(xx,yy){
    //const tapLinkStyle = {fontFamily:'Mulish',fontSize:'36px',align:'center',fontStyle:'normal'};
    const tapLinkStyle = this.consts.fontoConf.TapLink;
    // twitter
    let snsShareString = this.createSNSShareStringNP();
    
    const tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(snsShareString);
    const callbackTweet=function(){
        this.openExternalLink(tweetUrl);
    };

    let tweetLink = this.createTapLink.apply(this,
        [{xx:xx, yy:yy},
         'tweet!', tapLinkStyle, callbackTweet]
        );
    return tweetLink;
  }

  createSNSShareStringNP(){
    let snsShareString = "Potewalk\n";
    // mode
    snsShareString +="mode: "+ this.model.gameMode + "(secret)\n";

    // coin(got/generated)
    snsShareString += `coin: ${this.model.result.coin} / ${this.model.result.coinGen}`;

    // clear status
    if(this.model.result.miss == 0 &&
      this.model.result.coin == this.model.result.coinGen){
      snsShareString +="\nperfect! amazing!"
    }
    snsShareString +='\n' + this.consts.appURL;
    console.log(snsShareString);
    return snsShareString;
  }
  createTapLink(position,str,style,callback){
    /* call with context this */
    const tapLink = this.add.text(
        position.xx, position.yy, str, style
    ).setInteractive();
    tapLink.setOrigin(0.5,0.5);
    
    tapLink.on('pointerup',callback, this);

    return tapLink;
  }

  openExternalLink(url){
        let s = window.open();
        s.opener = null;
        s.referrer = null;
        s.location = url;

        if (s && s.focus)
        {
            s.focus();
        }
        else if (!s)
        {
            window.location.href = url;
        }
  }

  goNPScene(){
    console.log("NOPE");
    this.restartGame(this.consts.gameModes[2]);
    //this.restartGame(this.consts.gameModes[0]);
  }

  perfectEffect(){
    //perfectBroNP
    if(this.isResultPerfect){
      this.perfectBroNP.setVisible(true);
    }

  }

  restartGame(mode = this.consts.gameModes[0], skipTitleNP = false){
    let sceneNameStr="PlayScene";
    this.model.mediaManager.stopBGM();
    this.model.mediaManager.stopPlaingSound();
    // set default value
    this.model = new Model(this.consts);
    // ToDo move mediaManager from model
    this.model.mediaManager = new MediaManager({scene:this});

    if(mode == this.consts.gameModes[1]){
      this.model.gameMode = this.consts.gameModes[1];
    } else if(mode == this.consts.gameModes[2]){
      console.log("NOPEsetting");
      sceneNameStr="PlayNPScene";
      this.model.gameMode = this.consts.gameModes[2];
      this.model.skipTitleNP = skipTitleNP;
    }

    this.scene.start(sceneNameStr,{model: this.model});
  }

  update(time, delta) {
    if (!this.isGamerunning) { return; }

    //perfect str rainbow
    const top = this.model.hsv[this.tintInc].color;
    const bottom = this.model.hsv[359 - this.tintInc].color;
    if (this.isResultPerfect){
      this.gameClearText.setTint(top, bottom, top, bottom);
      this.tintInc++;
      if (this.tintInc >= 360){
        this.tintInc = 0;
      }
    }
    //const {height, width} = this.game.config;
    //this.PassedTime += delta;
    //this.debugText.setText('PassedTime: ' + this.PassedTime);
    /*if(this.pote.x > width * 1/10 + 80){
      this.gameClearScreen.setAlpha(1);
    }*/

    /*if(this.PassedTime > 10000){
      this.restartGame();
    }*/

    // player potato effect
    /*
    if (this.pote.hitPose){
      this.pote.setTexture("pote-hurt");
    } else if (!this.pote.body.onFloor()) {
      this.pote.anims.stop();
      this.pote.setTexture('pote');

    } else {
      this.pote.setTexture('pote');
    }
    */

  }
}
