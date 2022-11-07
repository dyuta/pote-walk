(()=>{"use strict";var t,e={439:(t,e,s)=>{var i=s(260),o=s.n(i);const n=class{constructor(){this.name="constObj",this.appURL="https://dyuta.github.io/pote-walk/",this.numberOfStores=6,this.bookstoreList=[{name:"NENOi",line:"東京メトロ",station:"早稲田"},{name:"双子のライオン堂",line:"東京メトロ",station:"赤坂"},{name:"マルジナリア書店",line:"京王 JR",station:"分倍河原"},{name:"書肆 海と夕焼",line:"JR",station:"谷保"},{name:"BREWBOOKS",line:"JR",station:"西荻窪"},{name:"山陽堂書店",line:"東京メトロ",station:"表参道"}],this.volumeBGM=.1,this.volumeSound=.2,this.START_GAME="START_GAME",this.GO_CREDIT="GO_CREDIT",this.GO_TITLE="GO_TITLE",this.VOLUME_OFF="VOLUME_OFF",this.VOLUME_ON="VOLUME_ON",this.GO_POTATO="GO_POTATO",this.colors={background:"E7E6E3",backgroundAsh:"FCFCFC"},this.jumpVelocity=-1250,this.gameSpeedNormal=9,this.gameSpeedFast=9,this.obsRespawnInterval=1100,this.coinRespawnInterval=2200,this.storeRespawnInterval=5500,this.coinCntInterval=128,this.distances={obstacleFrom:400,obstacleTo:700,coinFromFirst:100,coinToFirst:350,coinFromSec:850,coinToSec:950,bookstore:400,potehome:500},this.worldScroll=.6,this.fontoConf={},this.fontoConf.counter={fontFamily:'"Roboto"',fontSize:"28px",fill:"#878176"},this.fontoConf.storeinfo01={fontFamily:'"Zen Maru Gothic"',fontSize:"32px",fill:"#878176"},this.fontoConf.storeinfo02={fontFamily:'"Noto Sans JP"',fontSize:"28px",fill:"#878176"},this.fontoConf.storeinfo03={fontFamily:'"Sawarabi Gothic"',fontSize:"28px",fill:"#878176"};const t="#EFA92A";this.fontoConf.resultTitle={fontFamily:'"Concert One"',fontSize:"40px",fill:t},this.fontoConf.resultDetail={fontFamily:'"Concert One"',fontSize:"32px",fill:t}}};class a extends o().Scene{constructor(){super("PlayScene")}init(t){this.model=t.model}create(){this.consts=new n,this.isGamerunning=!1,this.destinationTxt=this.add.text(20,10,`行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`,this.consts.fontoConf.storeinfo01).setAlpha(0),this.gameSpeed=this.consts.gameSpeedNormal,this.obsRespawnTime=0,this.coinRespawnTime=0,this.storeRespawnTime=0,this.groundInitwidth=100;const{height:t,width:e}=this.game.config,s=.5*t;this.counterStr="coins:0    books:0",this.coinCnt=0,this.bookCnt=0,this.storePlacedCnt=0,this.startTrigger=this.physics.add.sprite(0,10).setOrigin(0,1).setImmovable(),this.poteGround=this.physics.add.image(0,s+26).setSize(250,20).setOrigin(0,1).setImmovable(),this.ground=this.add.tileSprite(0,s,this.groundInitwidth,26,"ground").setOrigin(0,1),this.envLayer=this.add.layer(),this.bookStoreLayer=this.add.layer(),this.objLayer=this.add.layer(),this.coinLayer=this.add.layer(),this.poteHomeLayer=this.add.layer(),this.counterIcons=this.add.group();const i=e-300;this.counterIcons.addMultiple([this.add.sprite(i,28,"coinBookIcon",0).setScale(2),this.add.sprite(i+140,28,"coinBookIcon",1).setScale(2)]),this.counterIcons.setAlpha(0),this.coinCounterText=this.add.text(i+20,11,"0",this.consts.fontoConf.counter).setAlpha(0),this.bookCounterText=this.add.text(i+160,11,"0",this.consts.fontoConf.counter).setAlpha(0),this.environment=this.add.group(),this.environment.addMultiple([this.add.image(.5*e,170,"cloud"),this.add.image(.7*e,80,"cloud"),this.add.image(.9*e,100,"cloud")]),this.environment.setAlpha(0),this.envLayer.add(this.environment.getChildren()),this.stayingCloud=this.add.image(.8*e,140,"cloud").setAlpha(0),this.envLayer.add(this.stayingCloud),this.pote=this.physics.add.sprite(0,s,"pote-idle").setOrigin(0,1).setCollideWorldBounds(!0).setGravityY(3e3),this.pote.hitPose=!1,this.bookParticle=this.add.particles("coinBookIcon"),this.obstacles=this.physics.add.group(),this.coins=this.physics.add.group(),this.bookStores=this.physics.add.group(),this.poteHomeGrp=this.physics.add.group(),this.initAnims(),this.initBookParticle(),this.initColliders(),this.initStartTrigger(),this.handleInputs()}initColliders(){this.physics.add.collider(this.pote,this.poteGround),this.physics.add.overlap(this.pote,this.bookStores,((t,e)=>{if(!e.hitFlg){console.log("enter store"),e.hitFlg=!0,this.model.storeVisit[`store${e.bookStoreNum}`]=!0,this.model.result.visited++,this.model.result.visited<this.consts.numberOfStores?this.destinationTxt.setText(`行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`):this.destinationTxt.setText("行先: 自宅"),this.bookCnt+=this.coinCnt,this.bookBoughtNow=this.coinCnt,this.coinCnt=0,this.model.result.book=this.bookCnt;for(let e=0;e<this.bookBoughtNow;e++)this.timerOneShot=this.time.delayedCall(140*e,(()=>{this.model.mediaManager.playSound("bookSound",20*this.consts.volumeSound),this.bookParticle.emitParticleAt(t.x+30,t.y-40)}),this);3==this.model.result.visited&&(this.gameSpeed=this.consts.gameSpeedFast)}}),null,this),this.physics.add.overlap(this.pote,this.obstacles,((t,e)=>{e.hitFlg||(console.log("hit"),e.hitFlg=!0,this.model.result.miss++,this.coinCnt>0&&this.coinCnt--,this.model.mediaManager.playSound("damageSound",.8*this.consts.volumeSound),this.pote.hitPose||(this.pote.hitPose=!0,console.log("hit-pose"),this.timerOneShot=this.time.delayedCall(300,(()=>{this.pote.hitPose=!1}),this)))}),null,this),this.physics.add.overlap(this.pote,this.coins,((t,e)=>{e.hitFlg||(console.log("getcoin"),e.hitFlg=!0,this.model.mediaManager.playSound("coinSound"),this.coinCnt++,this.model.result.coin++,this.coins.killAndHide(e))}),null,this),this.physics.add.overlap(this.pote,this.poteHomeGrp,(()=>{this.model.mediaManager.stopBGM(),this.timerOneShot=this.time.delayedCall(360,(()=>{this.goClearScene()}),this)}),null,this)}initStartTrigger(){const{height:t,width:e}=this.game.config,s=.5*t;this.physics.add.overlap(this.startTrigger,this.pote,(()=>{if(10===this.startTrigger.y)return this.startTrigger.body.reset(0,s),void this.model.mediaManager.setBGM("mainbgm");this.startTrigger.disableBody(!0,!0);const t=this.time.addEvent({delay:1e3/60,loop:!0,callbackScope:this,callback:()=>{this.pote.setVelocityX(80),this.pote.play("pote-run",1),this.ground.width<e?this.ground.width+=34:(this.ground.width=e,this.isGamerunning=!0,this.pote.setVelocityX(0),this.environment.setAlpha(1),this.destinationTxt.setAlpha(1),this.counterIcons.setAlpha(1),this.coinCounterText.setAlpha(1),this.bookCounterText.setAlpha(1),this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh),t.remove())}})}),null,this)}initAnims(){this.anims.create({key:"pote-run",frames:this.anims.generateFrameNumbers("pote",{start:1,end:2}),frameRate:10,repeat:-1}),this.anims.create({key:"enemy-bird-fly",frames:this.anims.generateFrameNumbers("enemy-bird",{start:0,end:1}),frameRate:6,repeat:-1}),this.anims.create({key:"bicyclelow-ride",frames:this.anims.generateFrameNumbers("obstacleOrg-1",{start:0,end:1}),frameRate:6,repeat:-1}),this.anims.create({key:"coin-rotate",frames:this.anims.generateFrameNumbers("coin",{start:0,end:5}),frameRate:6,repeat:-1})}initBookParticle(){this.bookParticle.createEmitter({frame:1,angle:{min:250,max:290},speed:{min:300,max:400},quantity:1,lifespan:400,alpha:{start:1,end:.5},scale:2,gravityY:800,on:!1})}handleInputs(){this.input.on("pointerdown",(()=>{this.pote.body.onFloor()&&(this.pote.setVelocityY(this.consts.jumpVelocity),this.model.mediaManager.playSound("jumpSound",.8*this.consts.volumeSound))}),this)}placeObstacle(){const{width:t,height:e}=this.game.config,s=.5*e,i=Math.floor(7*Math.random())+1,n=o().Math.Between(this.consts.distances.obstacleFrom,this.consts.distances.obstacleTo);let a;if(console.log(i),i>6){console.log("bird");const e=[22,50];a=this.obstacles.create(t+n,s-e[Math.floor(2*Math.random())],"enemy-bird"),a.play("enemy-bird-fly",1),a.body.height=a.body.height/1.5}else 1==i?(console.log("org1"),a=this.obstacles.create(t+n,s,"obstacleOrg-${obstacleNum}"),a.play("bicyclelow-ride",1)):(a=this.obstacles.create(t+n,s,`obstacle-${i}`),a.body.offset.y=5);a.setOrigin(0,1).setImmovable(),a.hitFlg=!1,this.objLayer.add(a)}placeCoin(){const{width:t,height:e}=this.game.config,s=.5*e;let i=o().Math.Between(850,950),n=22;const a=[o().Math.Between(100,350),o().Math.Between(850,950)],h=[22,70,100];let r;this.storePlacedCnt>1&&(n=h[Math.floor(3*Math.random())]),this.storePlacedCnt>2&&(i=a[Math.floor(2*Math.random())]),console.log("coin"),r=this.coins.create(t+i,s-n,"coin"),r.play("coin-rotate",0),r.scale=2*r.scale,r.setOrigin(0,1).setImmovable(),r.hitFlg=!1,this.model.result.coinGen++,this.coinLayer.add(r)}placeBookstore(t){const{width:e,height:s}=this.game.config,i=.5*s;let o;console.log(t);const n=`bookstore0${t}`;console.log(n),o=this.bookStores.create(e+200,i,n),o.setOrigin(0,1).setImmovable(),o.hitFlg=!1,o.bookStoreNum=t,this.bookStoreLayer.add(o)}placePoteHome(){const{width:t,height:e}=this.game.config,s=.5*e;console.log("potehome"),this.poteHome=this.poteHomeGrp.create(t+200,s+20,"potehome").setOrigin(0,1).setImmovable(),this.poteHome.hitFlg=!1,this.poteHomeLayer.add(this.poteHome)}goClearScene(){this.scene.start("ResultScene",{model:this.model})}update(t,e){if(!this.isGamerunning)return;const s=this.consts.obsRespawnInterval,i=this.consts.storeRespawnInterval,n=this.consts.coinRespawnInterval;this.coinCounterText.setText(`: ${this.coinCnt}`),this.bookCounterText.setText(`: ${this.bookCnt}`),this.ground.tilePositionX+=this.gameSpeed*this.consts.worldScroll,o().Actions.IncX(this.environment.getChildren(),-.5),o().Actions.IncX(this.obstacles.getChildren(),-this.gameSpeed),o().Actions.IncX(this.coins.getChildren(),-this.gameSpeed),o().Actions.IncX(this.bookStores.getChildren(),-this.gameSpeed*this.consts.worldScroll),o().Actions.IncX(this.poteHomeGrp.getChildren(),-this.gameSpeed*this.consts.worldScroll),this.obsRespawnTime+=e*this.gameSpeed*.08,this.coinRespawnTime+=e*this.gameSpeed*.08,this.storeRespawnTime+=e*this.gameSpeed*.08,this.homeTime+=e*this.gameSpeed*.08,this.obsRespawnTime>=s&&(this.placeObstacle(),this.obsRespawnTime=0),this.storePlacedCnt<this.consts.numberOfStores&&this.coinRespawnTime>=n&&(this.placeCoin(),this.coinRespawnTime=0),this.storeRespawnTime>=i&&(this.storePlacedCnt<this.consts.numberOfStores?(this.placeBookstore(this.storePlacedCnt+1),this.storeRespawnTime=0,this.storePlacedCnt++):(this.placePoteHome(),this.storeRespawnTime=0)),this.obstacles.getChildren().forEach((t=>{t.getBounds().right<0&&this.obstacles.killAndHide(t)})),this.coins.getChildren().forEach((t=>{t.getBounds().right<0&&this.coins.killAndHide(t)})),this.bookStores.getChildren().forEach((t=>{t.getBounds().right<0&&this.bookStores.killAndHide(t)})),this.environment.getChildren().forEach((t=>{t.getBounds().right<0&&(t.x=this.game.config.width+30)})),this.pote.hitPose?this.pote.setTexture("pote-hurt"):this.pote.body.onFloor()?this.pote.play("pote-run",!0):(this.pote.anims.stop(),this.pote.setTexture("pote"))}}const h=a;const r=class{constructor(){this.hsv=Phaser.Display.Color.HSVColorWheel(),this.storeVisit={store1:!1,store2:!1,store3:!1,store4:!1,store5:!1,store6:!1},this.result={coin:0,coinGen:0,miss:0,book:0,visited:0},this._isSceneChangeReserved=!1,this.mediaManager={}}};var l=s(933),d=s.n(l);class c extends o().Loader.File{constructor(t,e,s="google"){super(t,{type:"webfont",key:e.toString()}),this.fontNames=Array.isArray(e)?e:[e],this.service=s,this.fontsLoadedCount=0}load(){const t={fontactive:t=>{this.checkLoadedFonts(t)},fontinactive:t=>{this.checkLoadedFonts(t)}};switch(this.service){case"google":t[this.service]=this.getGoogleConfig();break;case"adobe-edge":t.typekit=this.getAdobeEdgeConfig();break;default:throw new Error("Unsupported font service")}d().load(t)}getGoogleConfig(){return{families:this.fontNames}}getAdobeEdgeConfig(){return{id:this.fontNames.join(";"),api:"//use.edgefonts.net"}}checkLoadedFonts(t){this.fontNames.indexOf(t)<0||(++this.fontsLoadedCount,this.fontsLoadedCount>=this.fontNames.length&&this.loader.nextFile(this,!0))}}const g=class{constructor(t){t.scene?(this.scene=t.scene,this.volumeBGM=this.scene.consts.volumeBGM,this.volumeSound=this.scene.consts.volumeSound):this.scene={},this.backGroundMusic={},this.sound={}}playSound(t,e=this.volumeSound){this.sound=this.scene.sound.add(t,{volume:e}),this.sound.play()}setBGM(t,e=this.volumeBGM){this.stopBGM(),this.stopPlaingSound(),this.backGroundMusic=this.scene.sound.add(t,{volume:e,loop:!0}),this.backGroundMusic.play()}stopBGM(){void 0===this.backGroundMusic.key||""!=this.backGroundMusic.key&&(this.backGroundMusic.stop(),this.backGroundMusic.destroy())}stopPlaingSound(){void 0===this.sound.key||""!=this.sound.key&&(this.sound.stop(),this.sound.destroy())}};class m extends o().Scene{constructor(){super("PreloadScene")}preload(){this.consts=new n,this.showLoadProgressBar(),this.load.audio("jump","assets/jump.m4a"),this.load.audio("hit","assets/hit.m4a"),this.load.audio("reach","assets/reach.m4a"),this.load.audio("mainbgm","assets/PW_01_Play_2022-11-06.mp3"),this.load.audio("bookSound","assets/PW_02_Book_2022-11-05.mp3"),this.load.audio("jumpSound","assets/PW_03_Jump_2022-11-05.mp3"),this.load.audio("damageSound","assets/PW_04_Damage_2022-11-05.mp3"),this.load.audio("coinSound","assets/PW_05_Coin_2022-11-05.mp3"),this.load.audio("clearbgm","assets/PM_07_ED_2022-05-08.mp3"),this.load.image("ground","assets/ground.png"),this.load.image("restart","assets/restart.png"),this.load.image("cloud","assets/cloud.png"),this.load.image("pote-idle","assets/pote_idle2.png"),this.load.image("pote-hurt","assets/pote_hurt.png"),this.load.image("bookstore01","assets/shop_1_Nenoi.png"),this.load.image("bookstore02","assets/shop_2_Futago.png"),this.load.image("bookstore03","assets/shop_3_Marginalia.png"),this.load.image("bookstore04","assets/shop_4_ShoshiYuYaketoUmi.png"),this.load.image("bookstore05","assets/shop_5_BrewBooks.png"),this.load.image("bookstore06","assets/shop_6_Sanyodo.png"),this.load.image("potehome","assets/home_tmp.png"),this.load.image("homeInside","assets/HomeInside2.png"),this.load.image("endingBook","assets/endingBook.png"),this.load.image("endingBook0","assets/endingBook0.png"),this.load.image("endingBook1","assets/endingBook1.png"),this.load.image("endingBook2","assets/endingBook2.png"),this.load.image("endingBook3","assets/endingBook3.png"),this.load.image("endingBook4","assets/endingBook4.png"),this.load.image("endingBook5","assets/endingBook5.png"),this.load.image("endingBook6","assets/endingBook6.png"),this.load.image("endingBook7","assets/endingBook7.png"),this.load.image("endingBook8","assets/endingBook8.png"),this.load.image("endingBook9","assets/endingBook9.png"),this.load.image("endingBook10","assets/endingBook10.png"),this.load.image("endingBook11","assets/endingBook11.png"),this.load.image("endingBook12","assets/endingBook12.png"),this.load.image("endingBook13","assets/endingBook13.png"),this.load.image("endingBook14","assets/endingBook14.png"),this.load.image("endingBook15","assets/endingBook15.png"),this.load.image("endingBook16","assets/endingBook16.png"),this.load.image("endingBook17","assets/endingBook17.png"),this.load.image("endingBook18","assets/endingBook18.png"),this.load.spritesheet("coinBookIcon","assets/Coin_Book_icon.png",{frameWidth:32,frameHeight:32}),this.load.spritesheet("star","assets/stars.png",{frameWidth:9,frameHeight:9}),this.load.spritesheet("moon","assets/moon.png",{frameWidth:20,frameHeight:40}),this.load.spritesheet("enemy-bird","assets/bird_pigeon.png",{frameWidth:96,frameHeight:72}),this.load.spritesheet("pote","assets/pote_run2.png",{frameWidth:88,frameHeight:94}),this.load.spritesheet("coin","assets/coin01_gold01_spriteSheet.png",{frameWidth:32,frameHeight:32}),this.load.spritesheet("obstacleOrg-1","assets/Bicycle_low_spr_large.png",{frameWidth:96,frameHeight:108}),this.load.image("obstacle-1","assets/cactuses_small_1.png"),this.load.image("obstacle-2","assets/Plant_2_small_small.png"),this.load.image("obstacle-3","assets/Plant_3_small_tall.png"),this.load.image("obstacle-4","assets/Plant_4_middle_small.png"),this.load.image("obstacle-5","assets/Plant_5_middle_tall2.png"),this.load.image("obstacle-6","assets/Plant_6_wide_tall.png"),this.load.addFile(new c(this.load,["Concert One","Roboto","Zen Maru Gothic","Noto Sans JP","Sawarabi Gothic"]))}showLoadProgressBar(){let t=this.add.graphics(),e=this.game.config.width,s=this.game.config.height,i=this.add.graphics();i.fillStyle(2236962,.8),i.fillRect(240,270,320,50);let o=this.make.text({x:e/2,y:s/4+30,text:"Loading...",style:this.consts.fontoConf.counter});o.setOrigin(.5,.5);let n=this.make.text({x:e/2,y:s/4+50,text:"files",style:this.consts.fontoConf.counter});n.setOrigin(.5,.5),this.load.on("progress",(function(e){t.clear(),t.fillStyle(16777215,1),t.fillRect(250,280,300*e,30)})),this.load.on("fileprogress",(function(t){console.log(t.src),n.setText(t.src)})),this.load.on("complete",(function(){console.log("complete"),t.destroy(),i.destroy(),o.destroy()}))}create(){this.model=new r,this.model.mediaManager=new g({scene:this}),this.scene.start("PlayScene",{model:this.model})}}const p=m;class u extends o().Scene{constructor(){super("ResultScene")}init(t){this.model=t.model,console.log("init result ")}create(){this.consts=new n,this.isGamerunning=!1,this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh),this.PassedTime=0,this.model.mediaManager.setBGM("clearbgm",.06),this.debugText=this.add.text(10,10,"for debug",{fill:"#00ffff"}),this.groundInitwidth=100,this.jumpVelocity=-1250;const{height:t,width:e}=this.game.config,s=.5*t;this.bgHome=this.add.image(60,28,"homeInside").setOrigin(0,0);const i=Math.min(18,this.model.result.book);this.bookTower=this.add.image(340,124,`endingBook${i}`).setOrigin(0,0).setAlpha(0),this.startTrigger=this.physics.add.sprite(1*e/10,s).setBodySize(260,20).setOrigin(0,1).setImmovable(),this.resultTrigger=this.physics.add.sprite(1*e/10+200,s).setBodySize(20,20).setOrigin(0,1).setImmovable(),this.resultTrigger.hitflag=!1,this.poteGround=this.physics.add.image(1*e/2,s+26).setSize(e,20).setOrigin(0,1).setImmovable(),this.pote=this.physics.add.sprite(1*e/10,s,"pote-idle").setOrigin(0,1).setCollideWorldBounds(!0).setGravityY(3e3),this.pote.hitPose=!1,this.gameClearScreen=this.add.container(1*e/2-0,130).setAlpha(0),0==this.model.result.miss&&this.model.result.coin==this.model.result.coinGen?this.GameClearStr="Perfect!":this.GameClearStr="Clear!",this.GameResultStr=`book: ${this.model.result.book}\ncoin: ${this.model.result.coin} / ${this.model.result.coinGen}\nmiss: ${this.model.result.miss}`,this.gameClearText=this.add.text(0,0,this.GameClearStr,this.consts.fontoConf.resultTitle).setOrigin(0,.5),this.gameClearText.setStroke("#ffffff",8),this.gameResultText=this.add.text(0,74,this.GameResultStr,this.consts.fontoConf.resultDetail).setOrigin(0,.5),this.gameResultText.setStroke("#ffffff",5),this.restart=this.add.image(20,160,"restart").setInteractive().setOrigin(0,.5),this.gameClearScreen.add([this.gameClearText,this.gameResultText,this.restart]),this.initColliders(),this.initAnims(),this.initStartTrigger(),this.handleInputs()}initColliders(){this.physics.add.collider(this.pote,this.poteGround),this.physics.add.overlap(this.resultTrigger,this.pote,((t,e)=>{1!=t.hitflag&&(console.log("show result"),t.hitflag=!0,this.bookTower.setAlpha(1),this.gameClearScreen.setAlpha(1))}),null,this)}initStartTrigger(){const{height:t,width:e}=this.game.config;this.physics.add.overlap(this.startTrigger,this.pote,(()=>{console.log("overlap"),this.pote.x+=1,this.pote.play("pote-run",1)}),null,this)}initAnims(){this.anims.create({key:"pote-run",frames:this.anims.generateFrameNumbers("pote",{start:1,end:2}),frameRate:10,repeat:-1})}handleInputs(){this.restart.on("pointerdown",(()=>{this.restartGame()}),this),this.input.on("pointerdown",(()=>{this.pote.body.onFloor()&&this.pote.setVelocityY(this.jumpVelocity)}),this)}restartGame(){this.model.mediaManager.stopBGM(),this.model=new r,this.model.mediaManager=new g({scene:this}),this.scene.start("PlayScene",{model:this.model})}update(t,e){const{height:s,width:i}=this.game.config;this.PassedTime+=e,this.debugText.setText("PassedTime: "+this.PassedTime),this.pote.hitPose?this.pote.setTexture("pote-hurt"):this.pote.body.onFloor()?this.pote.play("pote-run",!0):(this.pote.anims.stop(),this.pote.setTexture("pote"))}}const f=u,b={type:o().AUTO,width:900,height:680,pixelArt:!0,transparent:!0,physics:{default:"arcade"},scene:[p,h,f]};new(o().Game)(b)}},s={};function i(t){var o=s[t];if(void 0!==o)return o.exports;var n=s[t]={exports:{}};return e[t].call(n.exports,n,n.exports,i),n.exports}i.m=e,t=[],i.O=(e,s,o,n)=>{if(!s){var a=1/0;for(d=0;d<t.length;d++){for(var[s,o,n]=t[d],h=!0,r=0;r<s.length;r++)(!1&n||a>=n)&&Object.keys(i.O).every((t=>i.O[t](s[r])))?s.splice(r--,1):(h=!1,n<a&&(a=n));if(h){t.splice(d--,1);var l=o();void 0!==l&&(e=l)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[s,o,n]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={143:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var o,n,[a,h,r]=s,l=0;if(a.some((e=>0!==t[e]))){for(o in h)i.o(h,o)&&(i.m[o]=h[o]);if(r)var d=r(i)}for(e&&e(s);l<a.length;l++)n=a[l],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(d)},s=self.webpackChunkpote_walk=self.webpackChunkpote_walk||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var o=i.O(void 0,[736],(()=>i(439)));o=i.O(o)})();