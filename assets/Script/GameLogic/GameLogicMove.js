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
    this.points.push([700, 500])
    this.points.push([700, 100])
    this.points.push([700, 500])
    this.points.push([700, 100])
    this.points.push([400, 500])
    this.points.push([400, 100])
    this.points.push([400, 500])
    this.points.push([400, 100])
  },

  paintTopPoint () {
    if (this.currentP !== null) { this.currentP.destroy() }
    if (this.points.length) {
      let topP = this.points[this.points.length - 1]

      let point = cc.instantiate(this.director.point)
      point.position = new cc.Vec2(topP[0], topP[1])
      point.active = true

      this.currentP = point

      cc.director.getScene().addChild(point)
    }
  },

  ctor () {
    this.points = []// 当栈来用
    this.currentP = null
  },

  setup () {
    this.setUpPoints()
    this.paintTopPoint()
  },

  hasNextStage () {
    return true
  },

  isWin () {
    if (this.points.length === 0) {
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
    this.director.scoreLabel.string = 'Life: ' + life.toString() + '  ' + '<br/>Remain Points: ' + this.points.length.toString()
  },

  updateSprite () {
    if (this.points.length) {
      let topP = this.points[this.points.length - 1]
      let topPinVec2 = this.director.shooter.convertToNodeSpaceAR(new cc.Vec2(topP[0], topP[1]))
      console.log(topPinVec2)
      if (cc.Intersection.pointInPolygon(
        topPinVec2, this.director.shooter.getComponent(cc.PolygonCollider).points)) {
        this.points.pop()
        this.paintTopPoint()
      }
    }
  },

  hasScore () {
    return false
  }
  // update (dt) {},
})
