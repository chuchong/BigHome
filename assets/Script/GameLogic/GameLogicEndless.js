// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var util = require('util')
cc.Class({
  extends: require('GameLogic'),

  properties: {
    enemyCD: 600
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  ctor () {

  },

  setup () {

  },

  hasNextStage () {
    return false
  },

  isWin () {
    return false
  },

  setScoreLabel () {
    let life = this.director.shooter.getComponent('shooter').life.toString()
    if (life < 0) {
      life = 0
    }
    this.director.scoreLabel.string = 'Life: ' + life.toString() + '  ' + '<br/>Score: ' + this.director.score.toString()
  },

  updateSprite () {
    if (this.director.frame % this.enemyCD === 10) {
      let shooterPos = this.director.shooter.getComponent('shooter').node
      let x = shooterPos.x
      let y = shooterPos.y
      while (x - shooterPos.x + y - shooterPos.y < 100) {
        x = util.randomRangeInt(this.director.x_down_limit, this.director.x_up_limit)
        y = util.randomRangeInt(this.director.y_down_limit, this.director.y_up_limit)
      }
      this.director.enemyFactory.generateEnemy(x, y)
    }

    // TODO 更改参数使得更有趣
    if (this.director.frame % 1000 === 0) {
      this.enemyCD /= 2
    }
  }

  // update (dt) {},
})
