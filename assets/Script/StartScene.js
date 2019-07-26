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
    canvas: {
      default: null,
      type: cc.Canvas
    },
    background: {
      default: null,
      type: cc.Sprite
    },
    startAudio: {
      default: null,
      type: cc.AudioClip
    },
    switchAudio: {
      default: null,
      type: cc.AudioClip
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    cc.game.setFrameRate(60);
    this.audioPool = []
    this.stages = 0
    this.titles = StageInfo.titles
    this.highestScore = StageInfo.highestScore
    for (let i = 0; i < this.titles.length; i++) {
      this.stages++
    }
    cc.director.getPhysicsManager().enabled = false
    this.setInfo()
    if (typeof wx !== 'undefined'){
      wx.getOpenDataContext().postMessage({
        renew: true
      });
    }
  },

  setInfo: function () {
    this.titleInfo.string = '<outline width = 5 color = #000000>' + this.titles[this.id - 1] + '</outline>'
    if (this.id === 4) {
      this.highestScoreInfo.string = '<outline width = 5 color = #000000> 最高分 : ' + this.highestScore[this.id - 1] + '</outline>'
    } else { // TODO whether succeed
      this.highestScoreInfo.string = 'Mission awaited'
    }
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

  startGameScene: function () {
    // cc.director.preloadScene('BattleScene')
    StageInfo.currentStage = this.id
    let fade_time = 1.5
    let number = fade_time * 60
    let dt = 1000.0 / 60.0
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        this.canvas.node.opacity = Math.floor((1 - i / number) * 255)
      }, i * dt)
    }
    setTimeout(() => {
      cc.director.loadScene('Interval')
    }, 1000 * fade_time)
  },

  playStartAudio () {
    var id = cc.audioEngine.play(this.startAudio, false, 1)
    this.audioPool.push(id)
  },

  playSwitchAudio () {
    var id = cc.audioEngine.play(this.switchAudio, false, 1)
    this.audioPool.push(id)
  }

  // update (dt) {
  // },
})
