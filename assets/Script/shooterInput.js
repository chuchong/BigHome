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
    speed: 1000
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
    this.rigidbody = this.node.getComponent(cc.RigidBody)
    let canvas = cc.find('Canvas')
    canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this)
  },

  rad2deg: function (x) {
    return x * 180 / Math.PI
  },

  onTouchBegan: function (event) {
    let touchLoc = event.touch.getLocation()
    let self = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))
    let angle = Math.atan2(touchLoc.y - self.y, touchLoc.x - self.x)
    this.node.rotation = this.rad2deg(Math.PI / 2 - angle)
    this.rigidbody.linearVelocity = cc.v2(-this.speed * Math.cos(angle), -this.speed * Math.sin(angle))
    this.rigidbody.angularVelocity = 0
    this.node.getComponent('shooter').shoot(angle)
  }

  // update (dt) {},
})
