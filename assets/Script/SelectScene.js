// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var StageInfo = require('StageInfo')
cc.Class({
  extends: cc.Component,

  properties: {
    id: {
      default: 1,
      type: cc.Integer
    },
    idInfo: {
      default: null,
      type: cc.Label
    },
    titleInfo: {
      default: null,
      type: cc.Label
    },
    highestScoreInfo: {
      default: null,
      type: cc.Label
    }
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

  start () {
    console.log(StageInfo)
    this.stages = 0
    // TODO: 这里可能有问题,关键在如何查询动态得最高成绩
    this.titles = StageInfo.titles
    this.highestScore = StageInfo.highestScore
    console.log(this.titles)
    for (let i = 0; i < this.titles.length; i++) {
      this.stages++
    }
    this.setInfo()
  },

  setInfo: function () {
    this.idInfo.string = '第' + this.id + '关'
    this.titleInfo.string = this.titles[this.id - 1]
    this.highestScoreInfo.string = '最高成绩:' + this.highestScore[this.id - 1]
  },

  increId: function () {
    this.id++
    if (this.id > this.stages) {
      this.id = 1
    }
    this.setInfo()
  },

  decreId: function () {
    this.id--
    if (this.id < 1) {
      this.id = this.stages
    }
    this.setInfo()
  },

  backScene: function () {
    cc.director.loadScene('StartScene')
  },

  startGameScene: function () {
    cc.director.loadScene('BattleScene')
  }
  // update (dt) {},
})
