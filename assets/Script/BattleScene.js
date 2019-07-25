// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Factory = require('enemyFactory')

function randomRangeInt (n, m) {
  var c = m - n + 1
  return Math.floor(Math.random() * c + n)
}

cc.Class({
  extends: cc.Component,

  properties: {
    shooter: cc.Node,
    scoreLabel: cc.RichText,
    score: 0,
    enemyFactory: Factory,
    background: cc.Node,
    ask: cc.Node,
    x_up_limit: 400,
    x_down_limit: -400,
    y_up_limit: 250,
    y_down_limit: -250// 中心战斗部分大小
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.director.getPhysicsManager().enabled = true
    this.shooter.on('SHOOTER_DIE', this._ask, this)
  },

  start () {
    this.scoreLabel.string = 'Life: ' + this.shooter.getComponent('shooter').life.toString()
    this.frame = 0
    this.ask.active = false;
    this.finish = false
    this.shooter.on('SHOOTER_HIT', function(){
      this.shake()
    }, this)
  },

  _ask() {
    this.finish = true;
    this.background.opacity = 100;
    this.ask.active = true;
    this.ask.getComponent('ask').setScore(this.score);
    this.ask.on("NEXT", ()=>{
      cc.director.loadScene('BattleScene')
    })
    this.ask.on("RETRY", ()=>{
      cc.director.loadScene('BattleScene')
    })
    this.ask.scaleX = 0.01
    this.ask.scaleY = 0.01
    let scale = cc.scaleTo(0.3, 1.0)
    this.ask.runAction(scale)
  },

  shake() {
    let x = this.background.x; let y = this.background.y;
    let offset = 3;
    let action = cc.repeatForever(
        cc.sequence(
            cc.moveTo(0.018, cc.v2(x + (5 + offset), y + (offset + 7))),
            cc.moveTo(0.018, cc.v2(x - (6 + offset), y + (offset + 7))),
            cc.moveTo(0.018, cc.v2(x - (13 + offset), y + (offset + 3))),
            cc.moveTo(0.018, cc.v2(x + (3 + offset), y - (6 + offset))),
            cc.moveTo(0.018, cc.v2(x - (5 + offset), y + (offset + 5))),
            cc.moveTo(0.018, cc.v2(x + (2 + offset), y - (8 + offset))),
            cc.moveTo(0.018, cc.v2(x - (8 + offset), y - (10 + offset))),
            cc.moveTo(0.018, cc.v2(x + (3 + offset), y + (offset + 10))),
            cc.moveTo(0.018, cc.v2(x + (0 + offset), y + (offset + 0)))
        )
    )
    this.background.runAction(action);
    setTimeout(() => {
        this.background.stopAction(action);
        this.background.x = x; this.background.y = y;
    }, 300);
  },

  update (dt) {
    if (!this.finish){
      this.score++
      this.frame++
    }
    let life = this.shooter.getComponent('shooter').life.toString()
    if (life < 0){
      life = 0
    }
    this.scoreLabel.string = 'Life: ' + life.toString() + '  ' + '<br/>Score: ' + this.score.toString()

    if (this.frame % 600 === 10) {
      console.log('suitable frame')
      let shooterPos = this.shooter.getComponent('shooter').node
      let x = shooterPos.x
      let y = shooterPos.y
      while (x - shooterPos.x + y - shooterPos.y < 100){
        x = randomRangeInt(this.x_down_limit, this.x_up_limit)
        y = randomRangeInt(this.y_down_limit, this.y_up_limit)
      }
      this.enemyFactory.generateEnemy(x, y)
    }
  },
})
