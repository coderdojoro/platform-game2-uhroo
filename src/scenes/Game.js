/// <reference path="../../typings/phaser.d.ts" />
// @ts-check

import Phaser from 'phaser';

class Game extends Phaser.Scene {
  
  logo1;
  logo1Tween;

  constructor() {
    super({ key: 'GameScene' });
 }

  init(data) {}

  preload() {
    this.load.image("logo1", "assets/1.png");
    this.load.image("logo2", "assets/2.png");      
  }

  create(data) {
    this.cameras.main.fadeIn(2000);
    this.cameras.main.setBackgroundColor(0xeeeeff)

    var rect = this.add.rectangle(20, 20, 1240, 680, 0xeeeeff);
    rect.setOrigin(0, 0);
    rect.setStrokeStyle(6, 0x8888ff);

    this.logo1 = this.physics.add.image(130, 380, 'logo1');
    this.logo1.setScale(0.3);
    this.logo1.body.setAllowGravity(false)

    const logo = this.add.sprite(130, 380, 'logo2');
    logo.setScale(0.3);


    var tween = this.tweens.add({
      targets: this.logo1,
      angle: 360.0,
      duration: 3500,
      repeat: -1
    });
    
    var txt = this.add.text(240, 290, 'Bine ati venit la atelierele CoderDojo!');
    txt.setColor("#8888ff");
    txt.setFontFamily("VT323");
    txt.setFontSize(60);

    var txt = this.add.text(500, 350, 'JavaScript cu Phaser 3');
    txt.setColor("#0000ff");
    txt.setFontFamily("VT323");
    txt.setFontSize(40);

  }

  update(time, delta) {

    var pointer = this.input.activePointer;
    if (pointer.isDown) {
      if(this.logo1Tween) {
       this.logo1Tween.stop();
       this.logo1Tween = undefined;
      }
      var distance = Phaser.Math.Distance.Between(this.logo1.x, this.logo1.y, pointer.x, pointer.y);
      if (this.logo1.body.speed > 0 && distance < 50) {
        this.logo1.body.reset(pointer.x, pointer.y);
      } else {
        this.physics.moveToObject(this.logo1, pointer, 1540);
      }
      
    } else {
      if(this.logo1Tween === undefined) {
        this.logo1.body.velocity.setTo(0, 0);
        this.logo1Tween = this.tweens.add({
          targets: this.logo1,
          x: 130,
          y: 380,
          duration: 3000,
          ease: 'Elastic',
          easeParams: [ 1.5, 0.5 ]
        });
      }
    }
  }
}

export default Game;