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
    director: cc.Node,
    bullet_speed: 300,
    bullet: {
      default: null,
      type: cc.Node
    },
    renew_frequency: 10,
    life: 5,
    speed: 1000
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // let manager = cc.director.getPhysicsManager()
    // manager.enabled = true
    // this.score = 0
    // this.count = 0
    let size = cc.winSize
    this.x_up_limit = size.width / 2
    this.x_down_limit = -size.width / 2
    this.y_up_limit = size.height / 2
    this.y_down_limit = -size.height / 2
  },

  rad2deg: function (x) {
    return x * 180 / Math.PI
  },

  start () {
    this.scene = cc.director.getScene()
    this.rigidbody = this.node.getComponent(cc.RigidBody)
  },

  onBeginContact: function (contact, selfCollider, otherCollider) {
    this.life--
    if (this.life >= 0){
      this.node.dispatchEvent(new cc.Event.EventCustom('SHOOTER_HIT'))
    }
    if (this.life === 0){
      this.node.dispatchEvent(new cc.Event.EventCustom('SHOOTER_DIE'))
    }
  },

  shoot (distance, touchLoc) {
    if (this.life <= 0){
      return;
    }
    let self = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))
    let angle = Math.atan2(touchLoc.y - self.y, touchLoc.x - self.x)
    this.node.rotation = this.rad2deg(Math.PI / 2 - angle)
    this.rigidbody.linearVelocity = cc.v2(-this.speed * Math.cos(angle), -this.speed * Math.sin(angle))
    this.rigidbody.angularVelocity = 0
    let bullet = cc.instantiate(this.bullet)
    bullet.position = this.node.convertToWorldSpaceAR(new cc.Vec2(0, distance))
    bullet.rotation = this.rad2deg(-angle) - 45
    bullet.active = true
    let rigid = bullet.getComponent(cc.RigidBody)
    rigid.linearVelocity = cc.v2(this.bullet_speed * Math.cos(angle), this.bullet_speed * Math.sin(angle))
    this.scene.addChild(bullet)
  },

  update (dt) {
    // this.score += this.count
    // if (this.cycle_counter % this.renew_frequency !== 0) {
    //   return
    // }
    if (this.node.x > this.x_up_limit) {
      this.node.x = this.x_down_limit
    } else if (this.node.x < this.x_down_limit) {
      this.node.x = this.x_up_limit
    }
    if (this.node.y > this.y_up_limit) {
      this.node.y = this.y_down_limit
    } else if (this.node.y < this.y_down_limit) {
      this.node.y = this.y_up_limit
    }
    // this.score_label = cc.find('Canvas/scoreLabel').getComponent(cc.RichText)
    // this.score_label.string = 'Life: ' + this.life.toString() + ' Score: ' + this.score.toString()
  }
})
