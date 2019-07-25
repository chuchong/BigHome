// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: require('GameLogic'),

  properties: {
    requiredBullet: 50
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  ctor () {
    this.bulletCnt = 0
  },

  setup () {
    cc.find('Canvas').on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, true)
  },

  hasNextStage () {
    return true
  },

  isWin () {
    if (this.bulletCnt >= this.requiredBullet) {
      return true
    }
  },

  onTouchBegan (event) {
    this.bulletCnt++
  },

  setScoreLabel () {
    let life = this.director.shooter.getComponent('shooter').life.toString()
    if (life < 0) {
      life = 0
    }
    console.log(this.bulletCnt)
    this.director.scoreLabel.string = 'Life: ' + life.toString() + '  ' + '<br/>bullet count: ' + this.bulletCnt.toString()
  }

  // update (dt) {},
})
