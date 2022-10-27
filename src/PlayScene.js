import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    this.isGamerunning = false;
    this.gameSpeed = 9;
    this.respawnTime = 0;
    this.groundInitwidth = 100;
    this.jumpVelocity = -1600;
    const {height, width} = this.game.config;

    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.ground = this.add.tileSprite(0, height, this.groundInitwidth, 26, 'ground').setOrigin(0, 1);
    this.dino = this.physics.add.sprite(0, height, 'pote-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);
    
    this.obstacles = this.physics.add.group();
    this.initAnims();
    this.initStartTrigger();
    this.handleInputs();

  }

  initStartTrigger(){
    const {height, width} = this.game.config;

    this.physics.add.overlap(this.startTrigger, this.dino, () =>{

      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, height);
        return;
      }
      
      this.startTrigger.disableBody(true, true);
      
      const startEvent = this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callbackScope: this,
        callback: () => {
          this.dino.setVelocityX(80);
          this.dino.play('pote-run',1);

          if (this.ground.width < width ) {
            this.ground.width += 17 *2;
          } else {
            this.ground.width = width;
            this.isGamerunning = true;
            this.dino.setVelocityX(0);
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
      if (!this.dino.body.onFloor()){ return; }
      this.dino.setVelocityY(this.jumpVelocity);

    }, this)
  }

  placeObstacle(){
    const {width, height} = this.game.config;
    const obstacleNum = Math.floor(Math.random() * 7) + 1;
    //const obstacleNum = 7;
    const obstacleDistance = Phaser.Math.Between(500, 750);

    let obstacle;
    console.log(obstacleNum);

    if(obstacleNum > 6) {
      console.log('bird');
      const enemyHeight = [22, 50];
      obstacle = this.obstacles
      .create(width + obstacleDistance, height - enemyHeight[Math.floor(Math.random() * 2)],'enemy-bird');
      obstacle.play('enemy-bird-fly', 1);
      obstacle.body.height = obstacle.body.height / 1.5;
    } else {
      obstacle = this.obstacles
      .create(width + obstacleDistance, height, `obstacle-${obstacleNum}`);
      obstacle.body.offset.y = +5;
    }

    obstacle
    .setOrigin(0, 1)
    .setImmovable();
  }

  update(time, delta) {
    if (!this.isGamerunning) { return; }

    // background scroll
    this.ground.tilePositionX += this.gameSpeed;
    // obstacle scroll
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);

    this.respawnTime += delta * this.gameSpeed * 0.08;

    // place obstacle every 1.5seconds
    if (this.respawnTime >= 1500){
      this.placeObstacle();
      this.respawnTime = 0;
    }

    if (this.dino.body.deltaAbsY() >0 ) {
      this.dino.anims.stop();
      this.dino.setTexture('dino');

    } else {
      this.dino.play('dino-run',true);
    }

  }
}

export default PlayScene;
