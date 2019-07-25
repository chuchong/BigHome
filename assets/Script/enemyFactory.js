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
    enemy: {
      default: null,
      type: cc.Node
    },
    Canvas: {
      default: null,
      type: cc.Node
    },
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    this.enemyNum = 0
    this.enemyList = []
  },

  generateEnemy (x, y) {
    console.log(this.enemyNum)
    if (this.enemyNum === 0) {
      let enemy = cc.instantiate(this.enemy)
      enemy.x = x
      enemy.y = y
      enemy.active = true
      this.Canvas.addChild(enemy)
      //this.enemyList.push(enemy)
      this.enemyNum++
      enemy.on('SHOOTER_DIE', function (event) {
        this.enemyNum--
      }, this)
    }
  }
  // update (dt) {},
})
