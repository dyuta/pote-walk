(()=>{"use strict";var t,e={439:(t,e,s)=>{var i=s(260),o=s.n(i);const n=class{constructor(){this.name="constObj",this.appURL="https://dyuta.github.io/pote-walk/",this.numberOfStores=6,this.noiUrl="https://www.tunecore.co.jp/artists/noiyuhi?lang=ja",this.kotobaUrl="https://liondo.jp/?page_id=3029",this.naoeUrl="https://twitter.com/naoeaki",this.gameModes=["Normal","Sanpo","Nope"],this.bookstoreList=[{name:"NENOi",line:"東京メトロ",station:"早稲田",url:"https://nenoi.jp/"},{name:"マルジナリア書店",line:"京王 JR",station:"分倍河原",url:"https://twitter.com/yohakushapub"},{name:"書肆 海と夕焼",line:"JR",station:"谷保",url:"https://twitter.com/bs_sea_sunset_"},{name:"BREWBOOKS",line:"JR",station:"西荻窪",url:"https://brewbooks.net/"},{name:"山陽堂書店",line:"東京メトロ",station:"表参道",url:"https://sanyodo-shoten.co.jp/"},{name:"双子のライオン堂",line:"東京メトロ",station:"赤坂",url:"https://liondo.jp/"}],this.volumeBGM=.1,this.volumeSound=.2,this.colors={background:"E7E6E3",backgroundAsh:"FCFCFC"},this.jumpVelocity=-1250,this.gameSpeedNormal=9,this.gameSpeedFast=9,this.obsRespawnInterval=1100,this.coinRespawnInterval=2200,this.storeRespawnInterval=5500,this.coinCntInterval=128,this.distances={obstacleFrom:400,obstacleTo:700,coinFromFirst:100,coinToFirst:350,coinFromSec:850,coinToSec:950,bookstore:400,potehome:500},this.worldScroll=.6,this.fontoConf={},this.fontoConf.counter={fontFamily:'"Roboto"',fontSize:"28px",fill:"#878176"},this.fontoConf.loader={fontFamily:'"Roboto"',fontSize:"18px",fill:"#878176"},this.fontoConf.openingDialogue={fontFamily:'"Zen Maru Gothic"',fontSize:"38px",fill:"#5E5A53",fontWeight:"bold"},this.fontoConf.storeinfo01={fontFamily:'"Zen Maru Gothic"',fontSize:"32px",fill:"#878176"};const t="#EFA92A";this.fontoConf.resultTitle={fontFamily:'"Concert One"',fontSize:"64px",fill:t},this.fontoConf.resultDetail={fontFamily:'"Concert One"',fontSize:"48px",fill:t},this.fontoConf.TapLink={fontFamily:'"Roboto"',fontSize:"40px",fill:"#878176"},this.nope={}}};class a extends o().Scene{constructor(){super("PlayScene")}init(t){this.model=t.model}create(){this.consts=new n;const{height:t,width:e}=this.game.config,s=.5*t;this.initProperties(),this.openingDialogue=this.add.text(100,170,"そうだ、本屋に行こう！",this.consts.fontoConf.openingDialogue).setOrigin(0,0),this.destinationTxt=this.add.text(20,10,`行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`,this.consts.fontoConf.storeinfo01).setAlpha(0),this.startTrigger=this.physics.add.sprite(0,10).setOrigin(0,1).setImmovable(),this.poteGround=this.physics.add.image(0,s+26).setSize(250,20).setOrigin(0,1).setImmovable(),this.backBuildings=this.add.tileSprite(0,s-20,e,112,"backBuildings").setOrigin(0,1).setScale(1.2).setAlpha(0),this.ground=this.add.tileSprite(0,s+22,this.groundInitwidth,48,"ground").setOrigin(0,1),this.envLayer=this.add.layer(),this.environment=this.add.group(),this.initEnvObjects(t,e,this.environment,this.envLayer),this.bookStoreLayer=this.add.layer(),this.bookStores=this.physics.add.group(),this.objLayer=this.add.layer(),this.obstacles=this.physics.add.group(),this.coinLayer=this.add.layer(),this.coins=this.physics.add.group(),this.poteHomeLayer=this.add.layer(),this.poteHomeGrp=this.physics.add.group(),this.counterItems=this.add.group();const i=e-300;this.initCounters(i,11,28,this.counterItems);this.bookStoreIcons=this.add.group(),this.bookStoreIcons.addMultiple([this.add.image(80,s+80,"bookstoreicon01"),this.add.image(200,s+80,"bookstoreicon02"),this.add.image(320,s+80,"bookstoreicon03"),this.add.image(440,s+80,"bookstoreicon04"),this.add.image(560,s+80,"bookstoreicon05"),this.add.image(680,s+80,"bookstoreicon06")]),this.bookStoreIcons.setAlpha(0),this.pote=this.physics.add.sprite(0,s,"pote-idle").setOrigin(0,1).setCollideWorldBounds(!0).setGravityY(3e3),this.pote.hitPose=!1,this.initAnims(),this.initBookParticle(),this.initCoinParticle(),this.initColliders(),this.initStartTrigger(),this.handleInputs()}initProperties(){this.isGamerunning=!1,this.gameSpeed=this.consts.gameSpeedNormal,this.groundInitwidth=100,this.obsRespawnTime=0,this.coinRespawnTime=0,this.storeRespawnTime=0,this.counterStr="coins:0    books:0",this.coinCnt=0,this.bookCnt=0,this.storePlacedCnt=0}initEnvObjects(t,e,s,i){this.stayingCloud=this.add.image(.8*e,100,"cloudNope").setAlpha(0).setScale(1),i.add(this.stayingCloud),s.addMultiple([this.add.image(.25*e,170,"cloud"),this.add.image(.62*e,80,"cloud"),this.add.image(.9*e,120,"cloud")]),s.setAlpha(0),i.add(s.getChildren())}initCounters(t,e,s,i){this.coinCounterText=this.add.text(t+20,e,"0",this.consts.fontoConf.counter),this.bookCounterText=this.add.text(t+160,e,"0",this.consts.fontoConf.counter),i.addMultiple([this.add.sprite(t,s,"coinBookIcon",0).setScale(2),this.add.sprite(t+140,s,"coinBookIcon",1).setScale(2),this.coinCounterText,this.bookCounterText]),i.setAlpha(0)}initColliders(){this.physics.add.collider(this.pote,this.poteGround),this.physics.add.overlap(this.pote,this.bookStores,((t,e)=>{if(!e.hitFlg){console.log("enter store"),e.hitFlg=!0,this.bookStoreIcons.getChildren()[this.model.result.visited].setAlpha(1),this.model.storeVisit[`store${e.bookStoreNum}`]=!0,this.model.result.visited++,this.model.result.visited<this.consts.numberOfStores?this.destinationTxt.setText(`行先: ${this.consts.bookstoreList[this.model.result.visited].station}駅  ${this.consts.bookstoreList[this.model.result.visited].name}`):this.destinationTxt.setText("行先: 自宅"),this.bookCnt+=this.coinCnt,this.bookBoughtNow=this.coinCnt,this.coinCnt=0,this.model.result.book=this.bookCnt;for(let e=0;e<this.bookBoughtNow;e++)this.timerOneShot=this.time.delayedCall(140*e,(()=>{this.model.mediaManager.playSound("bookSound",20*this.consts.volumeSound),this.bookParticle.emitParticleAt(t.x+30,t.y-100)}),this);3==this.model.result.visited&&(this.gameSpeed=this.consts.gameSpeedFast)}}),null,this),this.model.gameMode!==this.consts.gameModes[1]&&this.physics.add.overlap(this.pote,this.obstacles,((t,e)=>{e.hitFlg||(console.log("hit"),e.hitFlg=!0,this.model.result.miss++,this.coinCnt>0&&(this.coinCnt--,this.coinParticle.emitParticleAt(t.x+10,t.y-70)),this.model.mediaManager.playSound("damageSound",.8*this.consts.volumeSound),this.pote.hitPose||(this.pote.hitPose=!0,console.log("hit-pose"),this.timerOneShot=this.time.delayedCall(300,(()=>{this.pote.hitPose=!1}),this)))}),null,this),this.physics.add.overlap(this.pote,this.coins,((t,e)=>{e.hitFlg||(console.log("getcoin"),e.hitFlg=!0,this.model.mediaManager.playSound("coinSound"),this.coinCnt++,this.model.result.coin++,this.coins.killAndHide(e))}),null,this),this.physics.add.overlap(this.pote,this.poteHomeGrp,((t,e)=>{e.hitFlg||(e.hitFlg=!0,this.isGamerunning=!1,this.model.mediaManager.stopBGM(),this.model.mediaManager.playSound("goalSound",.2*this.consts.volumeSound),this.pote.play("pote-happy",1),this.timerOneShot=this.time.delayedCall(2800,(()=>{this.goClearScene()}),this))}),null,this)}initStartTrigger(){const{height:t,width:e}=this.game.config,s=.5*t;this.physics.add.overlap(this.startTrigger,this.pote,(()=>{if(10===this.startTrigger.y)return this.startTrigger.body.reset(0,s),this.model.mediaManager.setBGM("mainbgm"),void this.openingDialogue.setAlpha(0);this.startTrigger.disableBody(!0,!0);const t=this.time.addEvent({delay:1e3/60,loop:!0,callbackScope:this,callback:()=>{this.pote.setVelocityX(80),this.pote.play("pote-run",1),this.ground.width<e?this.ground.width+=34:(this.ground.width=e,this.isGamerunning=!0,this.pote.setVelocityX(0),this.environment.setAlpha(1),this.destinationTxt.setAlpha(1),this.backBuildings.setAlpha(.8),this.counterItems.setAlpha(1),this.coinCounterText.setAlpha(1),this.bookCounterText.setAlpha(1),this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh),t.remove())}})}),null,this)}callbackStartEvent(){}initAnims(){this.anims.create({key:"pote-run",frames:this.anims.generateFrameNumbers("pote",{start:1,end:2}),frameRate:10,repeat:-1}),this.anims.create({key:"pote-happy",frames:this.anims.generateFrameNumbers("potehappy",{start:0,end:1}),frameRate:6,repeat:-1}),this.anims.create({key:"enemy-bird-fly",frames:this.anims.generateFrameNumbers("enemy-bird",{start:0,end:1}),frameRate:6,repeat:-1}),this.anims.create({key:"UFO-X-fly",frames:this.anims.generateFrameNumbers("UFO-X",{start:0,end:1}),frameRate:5,repeat:-1}),this.anims.create({key:"bicyclelow-ride",frames:this.anims.generateFrameNumbers("obstacleOrg-1",{start:0,end:1}),frameRate:6,repeat:-1}),this.anims.create({key:"coin-rotate",frames:this.anims.generateFrameNumbers("coin",{start:0,end:5}),frameRate:6,repeat:-1})}initBookParticle(){this.bookParticle=this.add.particles("coinBookIcon"),this.bookParticle.createEmitter({frame:1,angle:{min:240,max:250},speed:{min:300,max:400},quantity:1,lifespan:400,alpha:{start:1,end:.5},scale:2,gravityY:800,on:!1})}initCoinParticle(){this.coinParticle=this.add.particles("coinBookIcon"),this.coinParticle.createEmitter({frame:0,angle:{min:240,max:250},speed:{min:100,max:150},quantity:1,lifespan:400,alpha:{start:1,end:0},scale:2,gravityY:800,on:!1})}handleInputs(){this.input.on("pointerdown",(()=>{this.pote.body.onFloor()&&(this.pote.setVelocityY(this.consts.jumpVelocity),this.model.mediaManager.playSound("jumpSound",.8*this.consts.volumeSound))}),this),this.input.keyboard.on("keydown-SPACE",(()=>{this.pote.body.onFloor()&&(this.pote.setVelocityY(this.consts.jumpVelocity),this.model.mediaManager.playSound("jumpSound",.8*this.consts.volumeSound))}),this)}placeObstacle(){const{width:t,height:e}=this.game.config,s=.5*e,i=Math.floor(7*Math.random())+1,n=o().Math.Between(this.consts.distances.obstacleFrom,this.consts.distances.obstacleTo);let a;if(console.log(i),i>6){console.log("bird");const e=[40,120],i=["enemy-bird-fly","UFO-X-fly"];a=this.obstacles.create(t+n,s-e[Math.floor(2*Math.random())],"enemy-bird"),a.play(i[Math.floor(2*Math.random())],1),a.body.height=a.body.height/1.5}else 1==i?(console.log("org1"),a=this.obstacles.create(t+n,s,"obstacleOrg-${obstacleNum}"),a.play("bicyclelow-ride",1)):(a=this.obstacles.create(t+n,s,`obstacle-${i}`),a.body.offset.y=5);a.setOrigin(0,1).setImmovable(),a.hitFlg=!1,this.objLayer.add(a)}placeCoin(){const{width:t,height:e}=this.game.config,s=.5*e;let i=o().Math.Between(850,950),n=22;const a=[o().Math.Between(100,350),o().Math.Between(850,950)],h=[22,70,100];let r;this.storePlacedCnt>1&&(n=h[Math.floor(3*Math.random())]),this.storePlacedCnt>2&&(i=a[Math.floor(2*Math.random())]),console.log("coin"),r=this.coins.create(t+i,s-n,"coin"),r.play("coin-rotate",0),r.scale=2*r.scale,r.setOrigin(0,1).setImmovable(),r.hitFlg=!1,this.model.result.coinGen++,this.coinLayer.add(r)}placeBookstore(t){const{width:e,height:s}=this.game.config,i=.5*s;let o;console.log(t);const n=`bookstore0${t}`;console.log(n),o=this.bookStores.create(e+200,i,n),o.setOrigin(0,1).setImmovable(),o.hitFlg=!1,o.bookStoreNum=t,this.bookStoreLayer.add(o)}placePoteHome(){const{width:t,height:e}=this.game.config,s=.5*e;console.log("potehome"),this.poteHome=this.poteHomeGrp.create(t+200,s+28,"potehome").setOrigin(0,1).setImmovable(),this.poteHome.hitFlg=!1,this.poteHomeLayer.add(this.poteHome)}goClearScene(){this.scene.start("ResultScene",{model:this.model})}update(t,e){if(!this.isGamerunning)return;const s=this.consts.obsRespawnInterval,i=this.consts.storeRespawnInterval,n=this.consts.coinRespawnInterval;this.coinCounterText.setText(`: ${this.coinCnt}`),this.bookCounterText.setText(`: ${this.bookCnt}`),this.ground.tilePositionX+=this.gameSpeed*this.consts.worldScroll,this.backBuildings.tilePositionX+=this.gameSpeed*this.consts.worldScroll*.4,o().Actions.IncX(this.environment.getChildren(),-.5),o().Actions.IncX(this.obstacles.getChildren(),-this.gameSpeed),o().Actions.IncX(this.coins.getChildren(),-this.gameSpeed),o().Actions.IncX(this.bookStores.getChildren(),-this.gameSpeed*this.consts.worldScroll),o().Actions.IncX(this.poteHomeGrp.getChildren(),-this.gameSpeed*this.consts.worldScroll),this.obsRespawnTime+=e*this.gameSpeed*.08,this.coinRespawnTime+=e*this.gameSpeed*.08,this.storeRespawnTime+=e*this.gameSpeed*.08,this.homeTime+=e*this.gameSpeed*.08,this.obsRespawnTime>=s&&(this.placeObstacle(),this.obsRespawnTime=0),this.storePlacedCnt<this.consts.numberOfStores&&this.coinRespawnTime>=n&&(this.placeCoin(),this.coinRespawnTime=0),this.storeRespawnTime>=i&&(this.storePlacedCnt<this.consts.numberOfStores?(this.placeBookstore(this.storePlacedCnt+1),this.storeRespawnTime=0,this.storePlacedCnt++):(this.placePoteHome(),this.storeRespawnTime=0)),this.obstacles.getChildren().forEach((t=>{t.getBounds().right<0&&this.obstacles.killAndHide(t)})),this.coins.getChildren().forEach((t=>{t.getBounds().right<0&&this.coins.killAndHide(t)})),this.bookStores.getChildren().forEach((t=>{t.getBounds().right<0&&this.bookStores.killAndHide(t)})),this.environment.getChildren().forEach((t=>{t.getBounds().right<0&&(t.x=this.game.config.width+30)})),this.pote.hitPose?this.pote.setTexture("pote-hurt"):this.pote.body.onFloor()?this.pote.play("pote-run",!0):(this.pote.anims.stop(),this.pote.setTexture("pote"))}}const h=a;const r=class{constructor(t){this.hsv=Phaser.Display.Color.HSVColorWheel(),this.gameMode=t.gameModes[0],this.storeVisit={store1:!1,store2:!1,store3:!1,store4:!1,store5:!1,store6:!1},this.result={coin:0,coinGen:0,miss:0,book:0,visited:0},this._isSceneChangeReserved=!1,this.mediaManager={}}};var l=s(933),d=s.n(l);class c extends o().Loader.File{constructor(t,e,s="google"){super(t,{type:"webfont",key:e.toString()}),this.fontNames=Array.isArray(e)?e:[e],this.service=s,this.fontsLoadedCount=0}load(){const t={fontactive:t=>{this.checkLoadedFonts(t)},fontinactive:t=>{this.checkLoadedFonts(t)}};switch(this.service){case"google":t[this.service]=this.getGoogleConfig();break;case"adobe-edge":t.typekit=this.getAdobeEdgeConfig();break;default:throw new Error("Unsupported font service")}d().load(t)}getGoogleConfig(){return{families:this.fontNames}}getAdobeEdgeConfig(){return{id:this.fontNames.join(";"),api:"//use.edgefonts.net"}}checkLoadedFonts(t){this.fontNames.indexOf(t)<0||(++this.fontsLoadedCount,this.fontsLoadedCount>=this.fontNames.length&&this.loader.nextFile(this,!0))}}const g=class{constructor(t){t.scene?(this.scene=t.scene,this.volumeBGM=this.scene.consts.volumeBGM,this.volumeSound=this.scene.consts.volumeSound):this.scene={},this.backGroundMusic={},this.sound={}}playSound(t,e=this.volumeSound){this.sound=this.scene.sound.add(t,{volume:e}),this.sound.play()}setBGM(t,e=this.volumeBGM){this.stopBGM(),this.stopPlaingSound(),this.backGroundMusic=this.scene.sound.add(t,{volume:e,loop:!0}),this.backGroundMusic.play()}stopBGM(){void 0===this.backGroundMusic.key||""!=this.backGroundMusic.key&&(this.backGroundMusic.stop(),this.backGroundMusic.destroy())}stopPlaingSound(){void 0===this.sound.key||""!=this.sound.key&&(this.sound.stop(),this.sound.destroy())}};class m extends o().Scene{constructor(){super("PreloadScene")}preload(){this.consts=new n,this.showLoadProgressBar(),this.load.audio("mainbgm","assets/PW_01_Play_2022-11-06.mp3"),this.load.audio("bookSound","assets/PW_02_Book_2022-11-05.mp3"),this.load.audio("jumpSound","assets/PW_03_Jump_2022-11-05.mp3"),this.load.audio("damageSound","assets/PW_04_Damage_2022-11-05.mp3"),this.load.audio("coinSound","assets/PW_05_Coin_2022-11-05.mp3"),this.load.audio("clearbgm","assets/PM_07_ED_2022-05-08.mp3"),this.load.audio("goalSound","assets/PW_06_Goal_2022-11-08.mp3"),this.load.image("ground","assets/ground2.png"),this.load.image("backBuildings","assets/Buildingsbackground.png"),this.load.image("restart","assets/restart.png"),this.load.image("cloud","assets/cloud_1.png"),this.load.image("cloudNope","assets/cloud_2.png"),this.load.image("pote-idle","assets/pote04_idle2.png"),this.load.image("pote-hurt","assets/pote05_hurt2.png"),this.load.image("bookstore01","assets/shop_1_Nenoi.png"),this.load.image("bookstore02","assets/shop_3_Marginalia.png"),this.load.image("bookstore03","assets/shop_4_ShoshiYuYaketoUmi.png"),this.load.image("bookstore04","assets/shop_5_BrewBooks.png"),this.load.image("bookstore05","assets/shop_6_Sanyodo.png"),this.load.image("bookstore06","assets/shop_2_Futago.png"),this.load.image("bookstoreicon01","assets/bookstore_icon/05_nenoi.png"),this.load.image("bookstoreicon02","assets/bookstore_icon/06_marginaria.png"),this.load.image("bookstoreicon03","assets/bookstore_icon/03_shoshiyuyaketoumi.png"),this.load.image("bookstoreicon04","assets/bookstore_icon/02_brewbooks.png"),this.load.image("bookstoreicon05","assets/bookstore_icon/04_sanyodo.png"),this.load.image("bookstoreicon06","assets/bookstore_icon/01_futago_lion.png"),this.load.image("potehome","assets/home_2.png"),this.load.image("homeInside","assets/HomeInside2.png"),this.load.image("endingBook","assets/endingBook.png"),this.load.image("endingBook0","assets/endingBook0.png"),this.load.image("endingBook1","assets/endingBook1.png"),this.load.image("endingBook2","assets/endingBook2.png"),this.load.image("endingBook3","assets/endingBook3.png"),this.load.image("endingBook4","assets/endingBook4.png"),this.load.image("endingBook5","assets/endingBook5.png"),this.load.image("endingBook6","assets/endingBook6.png"),this.load.image("endingBook7","assets/endingBook7.png"),this.load.image("endingBook8","assets/endingBook8.png"),this.load.image("endingBook9","assets/endingBook9.png"),this.load.image("endingBook10","assets/endingBook10.png"),this.load.image("endingBook11","assets/endingBook11.png"),this.load.image("endingBook12","assets/endingBook12.png"),this.load.image("endingBook13","assets/endingBook13.png"),this.load.image("endingBook14","assets/endingBook14.png"),this.load.image("endingBook15","assets/endingBook15.png"),this.load.image("endingBook16","assets/endingBook16.png"),this.load.image("endingBook17","assets/endingBook17.png"),this.load.image("endingBook18","assets/endingBook18.png"),this.load.image("noi_album","assets/soup_small_col2.png"),this.load.image("kotobadakenochizu","assets/kotobadakenochizu_comp.png"),this.load.image("pictframe_brown","assets/pictframe_brown.png"),this.load.image("pote-ganen","assets/potatoGannen_notitle.png"),this.load.spritesheet("coinBookIcon","assets/Coin_Book_icon.png",{frameWidth:32,frameHeight:32}),this.load.spritesheet("star","assets/stars.png",{frameWidth:9,frameHeight:9}),this.load.spritesheet("moon","assets/moon.png",{frameWidth:20,frameHeight:40}),this.load.spritesheet("enemy-bird","assets/bird_pigeon.png",{frameWidth:96,frameHeight:72}),this.load.spritesheet("UFO-X","assets/UFO_alienX.png",{frameWidth:96,frameHeight:72}),this.load.spritesheet("pote","assets/pote03_run.png",{frameWidth:88,frameHeight:94}),this.load.spritesheet("potehappy","assets/pote06_happy.png",{frameWidth:88,frameHeight:92}),this.load.spritesheet("potedance","assets/pote07_dance.png",{frameWidth:88,frameHeight:92}),this.load.spritesheet("coin","assets/coin01_gold01_spriteSheet.png",{frameWidth:32,frameHeight:32}),this.load.spritesheet("obstacleOrg-1","assets/Bicycle_low_spr_large.png",{frameWidth:96,frameHeight:108}),this.load.image("obstacle-1","assets/cactuses_small_1.png"),this.load.image("obstacle-2","assets/Plant_2_small_small.png"),this.load.image("obstacle-3","assets/Plant_3_small_tall.png"),this.load.image("obstacle-4","assets/Plant_4_middle_small.png"),this.load.image("obstacle-5","assets/Plant_3_small_tall.png"),this.load.image("obstacle-6","assets/Plant_6_wide_tall.png"),this.load.addFile(new c(this.load,["Concert One","Roboto","Zen Maru Gothic","Noto Sans JP","Sawarabi Gothic","Kumbh Sans","Albert Sans"]))}showLoadProgressBar(){let t=this.add.graphics(),e=this.game.config.width,s=this.game.config.height,i=this.add.graphics();i.fillStyle(2236962,.8),i.fillRect(240,270,320,50);let o=this.make.text({x:e/2,y:s/4+30,text:"Loading...",style:this.consts.fontoConf.loader});o.setOrigin(.5,.5);let n=this.make.text({x:e/2,y:s/4+50,text:"files",style:this.consts.fontoConf.loader});n.setOrigin(.5,.5),this.load.on("progress",(function(e){t.clear(),t.fillStyle(16777215,1),t.fillRect(250,280,300*e,30)})),this.load.on("fileprogress",(function(t){console.log(t.src),n.setText(t.src)})),this.load.on("complete",(function(){console.log("complete"),t.destroy(),i.destroy(),o.destroy()}))}create(){this.model=new r(this.consts),this.model.mediaManager=new g({scene:this}),this.scene.start("PlayScene",{model:this.model})}}const p=m;class u extends o().Scene{constructor(){super("ResultScene")}init(t){this.model=t.model,console.log("init result ")}create(){this.consts=new n,this.isGamerunning=!1,this.isResultPerfect=!1,this.cameras.main.setBackgroundColor(this.consts.colors.backgroundAsh),this.PassedTime=0,this.model.mediaManager.playSound("clearbgm",.1*this.consts.volumeSound),this.groundInitwidth=100,this.jumpVelocity=-1250,this.tintInc=0;const{height:t,width:e}=this.game.config,s=.5*t+110;this.bgHome=this.add.image(60,20,"homeInside").setOrigin(0,0).setScale(1.4),this.wallLayer=this.add.layer();const i=Math.min(18,this.model.result.book);this.bookTower=this.add.image(448,s,`endingBook${i}`).setOrigin(0,1).setScale(1.6).setAlpha(0),this.startTrigger=this.physics.add.sprite(1*e/5,s).setOrigin(0,1).setBodySize(230,20).setImmovable(),this.resultTrigger=this.physics.add.sprite(1*e/10+300,s).setBodySize(20,20).setOrigin(0,1).setImmovable(),this.resultTrigger.hitflag=!1,this.poteGround=this.physics.add.image(1*e/2,s+30).setSize(e,20).setOrigin(0,1).setImmovable(),this.pote=this.physics.add.sprite(1*e/10,s,"pote-idle").setScale(1.2).setOrigin(0,1).setCollideWorldBounds(!0).setGravityY(3e3),this.pote.hitPose=!1,this.gameClearScreen=this.add.container(3*e/5+50,100).setAlpha(0);let o="test";this.GameResultStr=`book: ${this.model.result.book}\ncoin: ${this.model.result.coin} / ${this.model.result.coinGen}\nmiss: ${this.model.result.miss}`,this.gameClearText=this.add.text(0,0,o,this.consts.fontoConf.resultTitle).setOrigin(0,.5),0==this.model.result.miss&&this.model.result.coin==this.model.result.coinGen&&(this.isResultPerfect=!0),this.isResultPerfect?(o="Perfect!",this.gameClearText.setText(o),this.gameClearText.setStroke("#00f",10),this.gameClearText.setColor("#ffffff"),this.gameClearText.setShadow(2,2,"#333333",2,!0,!0)):(o="Clear!",this.gameClearText.setText(o),this.gameClearText.setStroke("#ffffff",8)),this.gameResultText=this.add.text(0,120,this.GameResultStr,this.consts.fontoConf.resultDetail).setOrigin(0,.5),this.gameResultText.setStroke("#ffffff",4),this.restart=this.add.image(10,240,"restart").setInteractive().setOrigin(0,.5).setScale(1.2),this.restartSafe=this.add.image(10,304,"restart").setInteractive().setOrigin(0,.5).setScale(1.2).setTint(16252857),this.tweetLink=this.initTweetLink(136,212).setOrigin(0,0),this.creditLink=this.initInfoLinks(136,274).setOrigin(0,0),this.gameClearScreen.add([this.gameClearText,this.gameResultText,this.restart,this.restartSafe,this.tweetLink,this.creditLink]),this.pictframeScreen=this.add.container(1*e/5+60,s-300),this.pictframe=this.add.image(0,4,"pictframe_brown").setInteractive().setOrigin(0,0).setScale(.7),this.wallAlbum=this.add.image(3.5,7.5,"noi_album").setInteractive().setOrigin(0,0).setScale(.7),this.wallPotetoGannen=this.add.image(100,0,"pote-ganen").setInteractive().setOrigin(0,0).setScale(.5),this.kotobadakenochizu=this.add.image(0,90,"kotobadakenochizu").setInteractive().setOrigin(0,0).setScale(.7),this.pictframeScreen.add([this.pictframe,this.wallAlbum,this.wallPotetoGannen,this.kotobadakenochizu]),this.wallLayer.add(this.pictframeScreen),this.AddTapLinkToImage(this.wallAlbum,this.consts.noiUrl),this.AddTapLinkToImage(this.wallPotetoGannen,this.consts.naoeUrl),this.AddTapLinkToImage(this.kotobadakenochizu,this.consts.kotobaUrl),this.bookStoreScreen=this.add.container(60,s+80).setAlpha(0),this.bookStoreScreen.add(this.InitBookstoreImages()),this.initColliders(),this.initAnims(),this.initStartTrigger(),this.handleInputs()}initColliders(){this.physics.add.collider(this.pote,this.poteGround),this.physics.add.overlap(this.resultTrigger,this.pote,((t,e)=>{1!=t.hitflag&&(console.log("show result"),t.hitflag=!0,this.isGamerunning=!0,this.bookTower.setAlpha(1),this.gameClearScreen.setAlpha(1),this.bookStoreScreen.setAlpha(1))}),null,this)}initStartTrigger(){const{height:t,width:e}=this.game.config;this.physics.add.overlap(this.startTrigger,this.pote,(()=>{console.log("overlap"),this.pote.x+=1.4,this.pote.play("pote-run",1)}),null,this)}initAnims(){this.anims.create({key:"pote-run",frames:this.anims.generateFrameNumbers("pote",{start:1,end:2}),frameRate:10,repeat:-1}),this.anims.create({key:"pote-dance",frames:this.anims.generateFrameNumbers("potedance",{start:0,end:3}),frameRate:2.81,repeat:-1})}AddTapLinkToImage(t,e){return t.on("pointerup",(function(){this.openExternalLink(e)}),this),t}InitBookstoreImages(){let t=[];const e=.64;t=[this.add.image(0,0,"bookstore01").setInteractive().setOrigin(0,0).setScale(e),this.add.image(140,0,"bookstore02").setInteractive().setOrigin(0,0).setScale(e),this.add.image(280,0,"bookstore03").setInteractive().setOrigin(0,0).setScale(e),this.add.image(420,0,"bookstore04").setInteractive().setOrigin(0,0).setScale(e),this.add.image(560,0,"bookstore05").setInteractive().setOrigin(0,0).setScale(e),this.add.image(700,0,"bookstore06").setInteractive().setOrigin(0,0).setScale(e)];for(let e=0;e<this.consts.numberOfStores;e++)this.AddTapLinkToImage(t[e],this.consts.bookstoreList[e].url);return t}handleInputs(){this.restart.on("pointerdown",(()=>{this.restartGame()}),this),this.restartSafe.on("pointerdown",(()=>{this.restartGame(this.consts.gameModes[1])}),this),this.input.on("pointerdown",(()=>{this.pote.body.onFloor()&&this.pote.setVelocityY(this.jumpVelocity)}),this)}initInfoLinks(t,e){const s=this.consts.fontoConf.TapLink;return this.createTapLink.apply(this,[{xx:t,yy:e},"credits",s,function(){this.openExternalLink("./credits.html")}])}initTweetLink(t,e){const s=this.consts.fontoConf.TapLink;let i=this.createSNSShareString();const o="https://twitter.com/intent/tweet?text="+encodeURIComponent(i);return this.createTapLink.apply(this,[{xx:t,yy:e},"tweet!",s,function(){this.openExternalLink(o)}])}createSNSShareString(){let t="Potewalk\n";return t+="mode: "+this.model.gameMode+"\n",t+=`book: ${this.model.result.book}\ncoin: ${this.model.result.coin} / ${this.model.result.coinGen}\nmiss: ${this.model.result.miss}`,0==this.model.result.miss&&this.model.result.coin==this.model.result.coinGen&&(t+="\nperfect!"),t+="\n"+this.consts.appURL,console.log(t),t}createTapLink(t,e,s,i){const o=this.add.text(t.xx,t.yy,e,s).setInteractive();return o.setOrigin(.5,.5),o.on("pointerup",i,this),o}openExternalLink(t){let e=window.open();e.opener=null,e.referrer=null,e.location=t,e&&e.focus?e.focus():e||(window.location.href=t)}restartGame(t=this.consts.gameModes[0]){this.model.mediaManager.stopBGM(),this.model.mediaManager.stopPlaingSound(),this.model=new r(this.consts),t==this.consts.gameModes[1]&&(this.model.gameMode=this.consts.gameModes[1]),this.model.mediaManager=new g({scene:this}),this.scene.start("PlayScene",{model:this.model})}update(t,e){if(!this.isGamerunning)return;const s=this.model.hsv[this.tintInc].color,i=this.model.hsv[359-this.tintInc].color;this.isResultPerfect&&(this.gameClearText.setTint(s,i,s,i),this.tintInc++,this.tintInc>=360&&(this.tintInc=0)),this.pote.hitPose?this.pote.setTexture("pote-hurt"):this.pote.body.onFloor()?this.pote.play("pote-dance",!0):(this.pote.anims.stop(),this.pote.setTexture("pote"))}}const k=u,f={type:o().AUTO,width:900,height:680,pixelArt:!0,transparent:!0,physics:{default:"arcade"},scene:[p,h,k]};new(o().Game)(f)}},s={};function i(t){var o=s[t];if(void 0!==o)return o.exports;var n=s[t]={exports:{}};return e[t].call(n.exports,n,n.exports,i),n.exports}i.m=e,t=[],i.O=(e,s,o,n)=>{if(!s){var a=1/0;for(d=0;d<t.length;d++){for(var[s,o,n]=t[d],h=!0,r=0;r<s.length;r++)(!1&n||a>=n)&&Object.keys(i.O).every((t=>i.O[t](s[r])))?s.splice(r--,1):(h=!1,n<a&&(a=n));if(h){t.splice(d--,1);var l=o();void 0!==l&&(e=l)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[s,o,n]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={143:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var o,n,[a,h,r]=s,l=0;if(a.some((e=>0!==t[e]))){for(o in h)i.o(h,o)&&(i.m[o]=h[o]);if(r)var d=r(i)}for(e&&e(s);l<a.length;l++)n=a[l],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(d)},s=self.webpackChunkpote_walk=self.webpackChunkpote_walk||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var o=i.O(void 0,[736],(()=>i(439)));o=i.O(o)})();