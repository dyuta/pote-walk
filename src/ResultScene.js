import Phaser from 'phaser';
import Constants from './constants';
import Model from './model';
import MediaManager from './util/mediaManager';

class ResultScene extends Phaser.Scene {

  constructor(sceneName ='ResultScene') {
    super(sceneName);
  }
  init(data){
    this.model = data.model;
    console.log('init result ');
  }

  create() {
    this.consts = new Constants();
    this.isGamerunning = false;
    this.isResultPerfect = false;
    this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh);
    this.PassedTime=0;
    
    this.model.mediaManager.playSound('clearbgm',this.consts.volumeSound*0.1);

    //debug text
    //this.debugText = this.add.text(10, 10, 'for debug', { fill: '#00ffff' });

    this.groundInitwidth = 100;
    this.jumpVelocity = -1250;
    this.tintInc = 0;
    const {height, width} = this.game.config;
    const groundHeight = height*0.5 + 110;

    this.bgHome = this.add.image(280-220,20,"homeInside").setOrigin(0,0).setScale(1.4);
    this.wallLayer = this.add.layer();

    const bookNum = Math.min(18,this.model.result.book);
    this.bookTower = this.add.image(448,groundHeight,`endingBook${bookNum}`).setOrigin(0,1).setScale(1.6).setAlpha(0);
    
    this.startTrigger = this.physics.add.sprite(width * 1/5, groundHeight)
    .setOrigin(0, 1).setBodySize(230,20).setImmovable();

    this.resultTrigger = this.physics.add.sprite(width * 1/10 + 300, groundHeight)
    .setBodySize(20,20).setOrigin(0, 1).setImmovable();
    this.resultTrigger.hitflag = false;

    this.poteGround = this.physics.add.image(width * 1/2, groundHeight+30).setSize(width,20).setOrigin(0, 1).setImmovable();
    // this.ground = this.add.tileSprite(0, groundHeight, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    
    this.pote = this.physics.add.sprite(width * 1/10, groundHeight, 'pote-idle')
      .setScale(1.2)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(3000);
    this.pote.hitPose = false;

    // Clear Results
    this.gameClearScreen = this.add.container(width * 3/5+50, 100).setAlpha(0);
    
    let gameClearStates = "test";
    this.GameResultStr = 
    `book: ${this.model.result.book}\ncoin: ${this.model.result.coin} / ${this.model.result.coinGen}\nmiss: ${this.model.result.miss}`;
    this.gameClearText = this.add.text(0, 0, gameClearStates, this.consts.fontoConf.resultTitle)
    .setOrigin(0,0.5);
    
    // perfect
    if(this.model.result.miss == 0 &&this.model.result.coin == this.model.result.coinGen){
      this.isResultPerfect = true;
    }

    if(this.isResultPerfect){
      gameClearStates ="Perfect!";
      this.gameClearText.setText(gameClearStates);
      this.gameClearText.setStroke('#00f', 10);
      this.gameClearText.setColor('#ffffff');
      this.gameClearText.setShadow(2, 2, "#333333", 2, true, true);
    } else {
      gameClearStates ="Clear!";
      this.gameClearText.setText(gameClearStates);
      this.gameClearText.setStroke('#ffffff', 8);
    }

    this.gameResultText = this.add.text(0, 120, this.GameResultStr, this.consts.fontoConf.resultDetail)
      .setOrigin(0,0.5);
    this.gameResultText.setStroke('#ffffff', 4);
    // Restart Icons
    this.restart = this.add.image(10, 240, 'restart').setInteractive()
      .setOrigin(0,0.5).setScale(1.2);
    this.restartSafe = this.add.image(10, 304, 'restartSafe').setInteractive()
      .setOrigin(0,0.5).setScale(1.2)
    this.appVersionText = this.add.text(136, 360, "ver: " + this.consts.appVersion, this.consts.fontoConf.counter).setOrigin(0,0);
    this.appVersionText.setColor("#FFE7BF");
    // Link URLs
    this.tweetLink = this.initTweetLink(136, 212).setOrigin(0,0);
    this.creditLink = this.initInfoLinks(136,274).setOrigin(0,0);
    this.gameClearScreen.add([
      this.gameClearText, this.gameResultText,
      this.restart,this.restartSafe,
      this.tweetLink, this.creditLink,
      this.appVersionText
    ])

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

    this.bookStoreScreen = this.add.container(60, groundHeight + 80).setAlpha(0);
    this.bookStoreScreen.add( 
    this.InitBookstoreImages()
    );
    
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
      this.isGamerunning = true;
      // show Objects
      this.bookTower.setAlpha(1);
      this.gameClearScreen.setAlpha(1);
      this.bookStoreScreen.setAlpha(1);
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
      key: 'pote-dance',
      frames: this.anims.generateFrameNumbers('potedance', {start: 0, end: 3}),
      frameRate: 2.81,
      repeat: -1
    })

  }

  AddTapLinkToImage(image,url){
    let callback = function(){
        this.openExternalLink(url);
    };
    image.on('pointerup',callback, this);
    return image;
  }

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
      /*
      callback = function(){
        this.openExternalLink(this.consts.bookstoreList[i].url);
      };
      storeImages[i].on('pointerup',callback, this);
      */
      this.AddTapLinkToImage(storeImages[i],this.consts.bookstoreList[i].url);
    }
    

    return storeImages
  }
  handleInputs() {
    this.restart.on('pointerdown', () => {
      this.restartGame();
    }, this)

    this.restartSafe.on('pointerdown', () => {
      this.restartGame(this.consts.gameModes[1]);
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
    let snsShareString = this.createSNSShareString();
    
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

  createSNSShareString(){
    let snsShareString = "Potewalk\n";
    // mode
    snsShareString +="mode: "+ this.model.gameMode + "\n";

    // book,  miss, coin(got/generated)
    snsShareString += 
    `book: ${this.model.result.book}\ncoin: ${this.model.result.coin} / ${this.model.result.coinGen}\nmiss: ${this.model.result.miss}`;

    // clear status
    if(this.model.result.miss == 0 &&
      this.model.result.coin == this.model.result.coinGen){
      snsShareString +="\nperfect!"
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

  openExternalLink(url)
    {
        //let url = url
        //let s = window.open(url, '_blank','noopener','noreferrer');
        //let s = window.open(url, '_blank','noreferrer');
        //let s = window.open(url, '_blank','noopener');
        //let s = window.open(url, '_blank');
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

  restartGame(mode = this.consts.gameModes[0]){
    this.model.mediaManager.stopBGM();
    this.model.mediaManager.stopPlaingSound();
    // set default value
    this.model = new Model(this.consts);
    if(mode == this.consts.gameModes[1]){
      this.model.gameMode = this.consts.gameModes[1];
    }
    // ToDo move mediaManager from model
    this.model.mediaManager = new MediaManager({scene:this});
    this.scene.start('PlayScene',{model: this.model});
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
    if (this.pote.hitPose){
      this.pote.setTexture("pote-hurt");
    } else if (!this.pote.body.onFloor()) {
      this.pote.anims.stop();
      this.pote.setTexture('pote');

    } else {
      this.pote.play('pote-dance',true);
    }

  }
}

export default ResultScene;
