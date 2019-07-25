cc.Class({
  extends: cc.Component,

  properties: {
    partical: {
      default: null,
      type: cc.Node
    },
    director: {
      default: null,
      type: cc.Node
    }
  },

  // use this for initialization
  onLoad: function () {
    cc.director.getPhysicsManager().enabled = true
    this.winSize = cc.winSize
    this.border_width = this.winSize.width
    this.border_height = this.winSize.height
    this.x_up_limit = this.winSize.width / 2 + this.border_width / 2
    this.x_down_limit = this.winSize.width / 2 - this.border_width / 2
    this.y_up_limit = this.winSize.height / 2 + this.border_height / 2
    this.y_down_limit = this.winSize.height / 2 - this.border_height / 2
  },

  onBeginContact: function (contact, selfCollider, otherCollider) {
    let part = cc.instantiate(this.partical)
    part.position = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))
    part.active = true
    this.scene.addChild(part)
    this.node.destroy()
  },

  start () {
    this.scene = cc.director.getScene()
  },

  update: function (dt) {
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
  }
})
