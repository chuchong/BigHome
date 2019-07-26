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
    crashAudio: {
      default: null,
      type: cc.AudioClip
    }

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // let manager = cc.director.getPhysicsManager()
    // manager.enabled = true
    this.state = 0// state 0 代表一般,state 1代表无敌状态, -1代表死亡
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
    this.changeToInvincibleState(500)
  },

  onBeginContact: function (contact, selfCollider, otherCollider) {
    if (this.state === 0) {
      this.life--
      if (this.life > 0) {
        this.changeToInvincibleState(500)
      } else if (this.life === 0) {
        this.state = -1
        this.node.opacity = 0
        this.node.dispatchEvent(new cc.Event.EventCustom('SHOOTER_DIE'))
        this.node.destroy()
        cc.audioEngine.play(this.crashAudio, false, 1)
      }
    }
  },

  // 改变状态为无敌模式
  changeToInvincibleState (invicibleTime) {
    this.state = 1
    setTimeout(() => {
      if (this.node !== null) {
        this.state = 0
      }
    }, invicibleTime)
  },

  shoot (angle, distance) {
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
