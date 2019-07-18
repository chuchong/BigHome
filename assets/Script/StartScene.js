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
    titleInfo: {
      default: null,
      type: cc.RichText
    },
    highestScoreInfo: {
      default: null,
      type: cc.RichText
    },
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
    this.titleInfo.string = "<outline width = 5 color = #000000>" + this.titles[this.id - 1] + "</outline>"
    this.highestScoreInfo.string = '<outline width = 5 color = #000000> 最高分 : ' + this.highestScore[this.id - 1] + "</outline>"
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
