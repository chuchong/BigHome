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
var Factory = require('enemyFactory')
var GameLogicEndless = require('GameLogicEndless')
var GameLogicBullet = require('GameLogicBullet')
var GameLogicEnemy = require('GameLogicEnemy')
var GameLogicMove = require('GameLogicMove')

cc.Class({
  extends: cc.Component,

  properties: {
    shooter: cc.Node,
    scoreLabel: cc.RichText,
    score: 0,
    enemyFactory: Factory,
    background: cc.Node,
    loseAsk: cc.Node,
    winAsk: cc.Node,
    x_up_limit: 400,
    x_down_limit: -400,
    y_up_limit: 250,
    y_down_limit: -250, // 中心战斗部分大小
    bullet_num: 0,
    point: { // 用于标志移动过去的点
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.director.getPhysicsManager().enabled = true
    this.shooter.on('SHOOTER_DIE', this._loseAsk, this)
  },

  backToMenu () {
    cc.director.loadScene('StartScene')
  },

  start () {
    this.currentStage = StageInfo.currentStage
    switch (this.currentStage) {
      case 4:
        this.gameLogic = new GameLogicEndless()
        break
      case 3:
        this.gameLogic = new GameLogicEnemy()
        break
      case 2:
        this.gameLogic = new GameLogicMove()
        break
      case 1:
        this.gameLogic = new GameLogicBullet()
        break
    }
    this.gameLogic.director = this
    this.gameLogic.setup()

    this.frame = 0
    this.loseAsk.active = false
    this.winAsk.active = false
    this.finish = false
    this.shooter.on('SHOOTER_HIT', function () {
      this.shake()
    }, this)
  },

  _winAsk () { // Polym
    if (!this.finish) {
      this.finish = true
      this.background.opacity = 100
      this.winAsk.active = true
      this.winAsk.getComponent('ask').setScore(this.score)
      if (this.gameLogic.hasNextStage()) {
        this.winAsk.getComponent('ask').showNext()
        this.winAsk.on('NEXT', () => {
          StageInfo.currentStage += 1
          cc.director.loadScene('Interval')
        })
      } else {
        this.winAsk.getComponent('ask').hideNext()
      }

      this.winAsk.on('RETRY', () => {
        cc.director.loadScene('BattleScene')
      })
      this.winAsk.scaleX = 0.01
      this.winAsk.scaleY = 0.01
      let scale = cc.scaleTo(0.3, 1.0)
      this.winAsk.runAction(scale)
    }
  },

  _loseAsk () { // Polym
    if (!this.finish) {
      this.finish = true
      this.background.opacity = 100
      this.loseAsk.active = true
      this.loseAsk.getComponent('ask').setScore(this.score)
      // this.loseAsk.on('NEXT', () => {
      //   cc.director.loadScene('BattleScene')
      // })
      this.loseAsk.on('RETRY', () => {
        cc.director.loadScene('BattleScene')
      })
      this.loseAsk.scaleX = 0.01
      this.loseAsk.scaleY = 0.01
      let scale = cc.scaleTo(0.3, 1.0)
      this.loseAsk.runAction(scale)
    }
  },

  shake () {
    let x = this.background.x; let y = this.background.y
    let offset = 3
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
    this.background.runAction(action)
    setTimeout(() => {
      this.background.stopAction(action)
      this.background.x = x; this.background.y = y
    }, 300)
  },

  update (dt) {
    if (!this.finish) {
      if (this.gameLogic.isWin()) {
        this._winAsk()
        this.finish = true
      }
      this.score++
      this.frame++
    }

    this.gameLogic.setScoreLabel()
    // Polym

    this.gameLogic.updateSprite()
    // Polym
  }
})
