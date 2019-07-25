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
  setUpPoints () {
    this.points.push([-250, -250])
    this.points.push([0, -250])
    this.points.push([250, -250])
    this.points.push([250, 0])
    this.points.push([250, 250])
    this.points.push([0, 250])
    this.points.push([-250, 250])
    this.points.push([-250, 0])
  },

  ctor () {
    this.enemyNum = 6
    this.points = []
    this.setUpPoints()
  },

  setup () {
    for (let point of this.points) {
      this.director.enemyFactory.generateEnemy(point[0], point[1])
    }
    this.enemyNum = this.director.enemyFactory.enemyNum
  },

  hasNextStage () {
    return true
  },

  isWin () {
    if (this.director.enemyFactory.enemyNum <= 0) {
      return true
    } else {
      return false
    }
  },

  setScoreLabel () {
    let life = this.director.shooter.getComponent('shooter').life.toString()
    if (life < 0) {
      life = 0
    }
    this.director.scoreLabel.string = 'Life: ' + life.toString()
  },

  updateSprite () {

  },

  hasScore () {
    return false
  }

  // update (dt) {},
})
