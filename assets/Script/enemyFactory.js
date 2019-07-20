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
      enemy.getComponent('shooter').changeToInvincibleState(1000) // 添加了会出bug
      this.enemyList.push(enemy)
      this.enemyNum++
      enemy.on('SHOOTER_DIE', function (event) {
        this.enemyNum--
        // let newEnemyList = []
        // for (let enemy of this.enemyList) {
        //   if (enemy.life <= 0) {
        //     enemy.destroy()
        //   } else {
        //     newEnemyList.push(enemy)
        //   }
        // }
        // this.enemyList = newEnemyList
      }, this)
    }
  }
  // update (dt) {},
})
