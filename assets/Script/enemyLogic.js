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
    timeInterval: 500,
    hero: cc.Node,
    speed: 500
  },
  rad2deg: function (x) {
    return x * 180 / Math.PI
  },
  // LIFE-CYCLE CALLBACKS:
  shootTowardsHero () {
    if (this.shooter !== null && this.node !== null) {
      let self = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))
      let hero = this.hero.convertToWorldSpaceAR(new cc.Vec2(0, 0))
      let angle = Math.atan2(hero.y - self.y, hero.x - self.x)

      this.node.getComponent('enemyDynamic').shoot(angle, 30)
      setTimeout(() => this.moveTowardsHero(), 1000)
    }
  },

  moveTowardsHero () {
    if (this.shooter !== null && this.node !== null) {
      let self = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))
      let hero = this.hero.convertToWorldSpaceAR(new cc.Vec2(0, 0))
      let angle = Math.atan2(hero.y - self.y, hero.x - self.x)

      this.node.rotation = this.rad2deg(Math.PI / 2 - angle)
      this.rigidbody.linearVelocity = cc.v2(this.speed * Math.cos(angle), this.speed * Math.sin(angle))
      this.rigidbody.angularVelocity = 0
      setTimeout(() => this.shootTowardsHero(), 1000)
    }
  },

  // onLoad () {},

  start () {
    this.shooter = this.node.getComponent('enemyDynamic')
    this.rigidbody = this.node.getComponent(cc.RigidBody)
    setTimeout(() => this.moveTowardsHero(), 1000)
  },

  update (dt) {
    if (this.node.opacity !== 255) {
      this.node.opacity += 2
    }
  }
})
