cc.Class({
    extends: cc.Component,

    properties: {
        speed: 300,
        border_width: 800,
        border_height: 500,
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;
        this.winSize = cc.winSize
        this.x_up_limit = this.winSize.width / 2 + this.border_width / 2
        this.x_down_limit = this.winSize.width / 2 - this.border_width / 2
        this.y_up_limit = this.winSize.height / 2 + this.border_height / 2
        this.y_down_limit = this.winSize.height / 2 - this.border_height / 2
    },

    onCollisionEnter: function (other, self) {
        //this.node.destroy();
    },

    start () {
        this.ctx = this.getComponent(cc.Graphics); 
        this.ctx.circle(0,0,5);
        this.ctx.stroke();
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.node.x > this.x_up_limit){
            this.node.x = this.x_down_limit
        }
        else if (this.node.x < this.x_down_limit){
            this.node.x = this.x_up_limit
        }
        if (this.node.y > this.y_up_limit){
            this.node.y = this.y_down_limit
        }
        else if (this.node.y < this.y_down_limit){
            this.node.y = this.y_up_limit
        }
    },
});
