// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// 无敌时间
function throttle (fn, time = 500) {
  let timer
  return function (...args) {
    if (timer == null) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, time)
    }
  }
}

cc.Class({
  extends: cc.Component,

  properties: {
    shooter: cc.Node,
    scoreLabel: cc.RichText
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

  onLoad () {
    // cc.director.getPhysicsManager().enabled = true
  },

  start () {
    this.scoreLabel.string = '剩余生命' + this.shooter.getComponent('shooter').life.toString()
  },

  changeToNextScene: function () {
    cc.director.loadScene('StartScene')
  },

  update (dt) {
    if (this.shooter.getComponent('shooter').life <= 0) {
      this.changeToNextScene()
    }
    this.scoreLabel.string = '剩余生命' + this.shooter.getComponent('shooter').life.toString()
  }
})
