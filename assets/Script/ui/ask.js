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
  extends: cc.Component,

  properties: {
    score: cc.Label,
    next: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    this.node.x = cc.winSize.width / 2
    this.node.y = cc.winSize.height / 2
  },

  setScore (score) {
    this.score.string = 'Your score: ' + score
  },

  onNext () {
    this.node.dispatchEvent(new cc.Event.EventCustom('NEXT'))
  },

  onRetry () {
    this.node.dispatchEvent(new cc.Event.EventCustom('RETRY'))
  },

  hideNext () {
    if (this.next !== null) {
      this.next.active = false
    }
  },

  showNext () {
    if (this.next !== null) {
      this.next.active = true
    }
  }
  // update (dt) {},
})
